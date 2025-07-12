import { contentfulClient } from '@/lib/contentful-client';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { ContentfulClientApi, Entry } from 'contentful';
import { Document } from '@contentful/rich-text-types';

// Type for the raw Contentful entry fields
interface ContentfulFields {
  // Required fields
  title: { 'en-US': string };
  blogdescription: { 'en-US': any }; // Rich text field
  slug: { 'en-US': string };
  
  // Optional fields with all possible variations
  coverImage?: { 'en-US': any };
  publishDate?: { 'en-US': string };
  publishedDate?: { 'en-US': string };
  date?: { 'en-US': string };
  authorName?: { 'en-US': string };
  author?: { 'en-US': string };
  readTime?: { 'en-US': string };
  read_time?: { 'en-US': string };
  category?: { 'en-US': string };
  categories?: { 'en-US': string[] };
  [key: string]: any; // Allow any other fields
}

// Type for the raw Contentful entry
interface ContentfulEntry {
  sys: {
    id: string;
  };
  fields: ContentfulFields;
}



// Helper function to get a field with fallback
function getField<T>(
  fields: Record<string, any>,
  possibleKeys: string[],
  defaultValue: T
): T {
  if (!fields) return defaultValue;
  
  for (const key of possibleKeys) {
    if (fields[key] !== undefined) {
      const value = fields[key];
      // Handle localized fields (en-US or first available)
      if (value && typeof value === 'object' && !Array.isArray(value) && !value.sys) {
        return value['en-US'] || value[Object.keys(value)[0]] || defaultValue;
      }
      return value;
    }
  }
  return defaultValue;
}

// Helper function to get localized field
function getLocalizedField(field: any, defaultValue: any) {
  if (!field) return defaultValue;
  if (typeof field === 'string') return field;
  return field['en-US'] || field[Object.keys(field)[0]] || defaultValue;
}

// Helper function to extract plain text from rich text
function extractPlainText(richText: any): string {
  if (!richText) return '';
  try {
    if (typeof richText === 'string') return richText;
    return documentToPlainTextString(richText);
  } catch (error) {
    return '';
  }
}

// Format date to a readable string
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    return new Date().toLocaleDateString('en-US');
  }
}

// Map Contentful entry to our BlogPost type
function mapContentfulEntry(entry: ContentfulEntry): BlogPost | null {
  try {
    const fields = entry.fields || {};
    
    // Get title first to ensure we have at least a title
    const title = getLocalizedField(fields.title, 'Untitled Blog Post');
    if (!title) {
      return null;
    }


    
    // Get blog description - handle both direct string and rich text content
    let blogdescription = '';
    
    // First, try to get from blogdescription field
    if (fields.blogdescription) {
      blogdescription = getLocalizedField(fields.blogdescription, '');
    } 
    // If still empty, try to extract from fullBlogContent
    if (!blogdescription && fields.fullBlogContent) {
      try {
        const content = fields.fullBlogContent['en-US'] || fields.fullBlogContent;
        if (content?.content?.[0]?.content?.[0]?.value) {
          blogdescription = content.content[0].content[0].value;
        } else if (content?.content?.[0]?.value) {
          blogdescription = content.content[0].value;
        }
      } catch (e) {
    
      }
    }
    

    
    // Create excerpt from description (first 150 chars)
    const excerpt = blogdescription.length > 150 
      ? `${blogdescription.substring(0, 150)}...` 
      : blogdescription;

    // Get date with fallback to current date
    const dateField = getField<string>(
      fields,
      ['publishDate'],
      new Date().toISOString()
    );

    // Get read time with fallback to '2 min read'
    const readTime = getField<string>(
      fields,
      ['readTime'],
      '2 min read'
    );

    // Get category with fallback to 'Uncategorized'
    const category = getField<string>(
      fields,
      ['category'],
      'Uncategorized'
    );

    // Get author name
    const authorName = getField<string>(
      fields,
      ['authorName'],
      ''
    );

    // Get full blog content (rich text)
    const fullContent = fields.fullBlogContent;
    


    // Get tags (array of strings)
    const tags = Array.isArray(fields.tags) 
      ? fields.tags.map(tag => String(tag || '').trim()).filter(Boolean)
      : [];

    // Get social media links (JSON object)
    const socialMediaLinks = getField<Record<string, string>>(
      fields,
      ['socialMediaLinks'],
      {}
    );

    // Get recent articles (single linked entry)
    const recentArticles = fields.recentArticles 
      ? [{
          sys: { id: fields.recentArticles.sys.id },
          fields: {
            title: fields.recentArticles.fields.title,
            slug: fields.recentArticles.fields.slug,
            coverImage: fields.recentArticles.fields.coverImage,
            publishDate: fields.recentArticles.fields.publishDate
          }
        }]
      : []; 

    // Get categories (array of category IDs)
    const categories = Array.isArray(fields.categories)
      ? fields.categories.map((ref: any) => ref?.sys?.id || '').filter(Boolean)
      : [];

    // Get slug from fields or generate from title
    const slug = getField<string>(
      fields,
      ['slug'],
      title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    );

    // Get cover image URL if available
    const imageField = getField<any>(
      fields,
      ['coverImage'],
      null
    );

    const imageUrl = imageField?.fields?.file?.url 
      ? `https:${imageField.fields.file.url}` 
      : '';

    return {
      id: entry.sys.id,
      title,
      blogdescription,
      excerpt,
      image: imageUrl,
      date: formatDate(dateField),
      readTime,
      category,
      slug,
      authorName: authorName || undefined,
      fullContent: fullContent,
      tags: tags.length ? tags : undefined,
      recentArticles: recentArticles.length ? recentArticles : undefined,
      categories: categories.length ? categories : undefined,
      publishDate: dateField
    } as BlogPost;
  } catch (error) {
    console.error('Error mapping blog post:', error);
    console.error('Problematic entry ID:', entry.sys?.id);
    return null;
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  console.log('Fetching blog posts from Contentful...');
  
  if (!contentfulClient) {
    console.error('Contentful client is not properly initialized');
    return [];
  }

  try {
    // First, get the content types to verify 'blogs' exists
    const contentTypes = await contentfulClient.getContentTypes();
    const blogsType = contentTypes.items.find(ct => 
      ct.sys.id.toLowerCase() === 'blogs' || ct.name.toLowerCase() === 'blogs'
    );

    if (!blogsType) {
      console.error('Could not find "blogs" content type in Contentful. Available types:', 
        contentTypes.items.map(ct => `${ct.name} (${ct.sys.id})`).join(', '));
      return [];
    }

    console.log(`Found blogs content type: ${blogsType.name} (${blogsType.sys.id})`);
    
    // Get all published blog entries
    const response = await contentfulClient.getEntries({
      content_type: blogsType.sys.id,
      limit: 12,
      include: 2, // Include linked entries (for author, category, etc.)
      order: ['-sys.createdAt']
    });

    console.log(`Found ${response.total} blog posts in Contentful`);

    if (!response.items || response.items.length === 0) {
      console.warn('No blog posts found in Contentful. Please check if:');
      console.warn('1. You have published any blog posts');
      console.warn('2. The content type ID is correct');
      console.error('1. You have published any blog posts');
      console.error('2. The content type is named "blogs" (case sensitive)');
      console.error('3. The entries are published and not in draft state');
      return [];
    }

    // Log detailed info about the first entry
    const firstItem = response.items[0];
    if (firstItem?.fields) {
      console.log('First blog post fields:', {
        id: firstItem.sys.id,
        contentType: firstItem.sys.contentType?.sys.id,
        fields: Object.keys(firstItem.fields),
        fieldDetails: Object.entries(firstItem.fields).map(([key, value]) => ({
          key,
          type: typeof value,
          hasEnUS: !!(value as any)?.['en-US'] !== undefined
        }))
      });
    }

    // Map and filter entries safely
    const blogPosts: BlogPost[] = [];
    
    for (const entry of response.items) {
      try {
        const mapped = mapContentfulEntry(entry as unknown as ContentfulEntry);
        if (mapped) {
          console.log('Mapped post:', {
            id: mapped.id,
            title: mapped.title,
            hasImage: !!mapped.image,
            date: mapped.date,
            slug: mapped.slug
          });
          blogPosts.push(mapped);
        }
      } catch (error) {
        console.error('Error mapping blog post:', error);
        console.error('Problematic entry ID:', entry?.sys?.id);
      }
    }

    console.log(`Successfully mapped ${blogPosts.length} out of ${response.items.length} blog posts`);
    return blogPosts;
  } catch (error) {
    console.error('Error fetching blog posts from Contentful:', error);
    return [];
  }
}

export interface BlogPost {
  id: string;
  title: string;
  blogdescription: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
  authorName?: string;
  fullContent?: any; // Rich text content from Contentful - handled in component
  tags?: string[];
  recentArticles?: {
    sys: { id: string };
    fields: {
      title: string;
      slug: string;
      coverImage?: {
        fields: {
          file: {
            url: string;
          };
        };
      };
      publishDate: string;
      blogDescription?: string;
    };
  }[];
  categories?: string[];
  publishDate: string;
  coverImage?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!contentfulClient) {
    console.warn('Contentful client is not configured');
    return null;
  }

  try {
    const contentType = 'blogs-2'; // The actual content type ID from Contentful
    console.log(`Fetching blog post with slug ${slug} using content type: ${contentType}`);

    const entries = await contentfulClient.getEntries({
      content_type: contentType,
      'fields.slug': slug,
      limit: 1
    });

    if (entries.items.length === 0) {
      console.log(`No blog post found with slug: ${slug}`);
      return null;
    }

    return mapContentfulEntry(entries.items[0] as unknown as ContentfulEntry);
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return null;
  }
}
