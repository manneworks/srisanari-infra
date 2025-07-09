import { contentfulClient } from '@/lib/contentful-client';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import type { Entry, EntryFields } from 'contentful';

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
  fullContent?: string;
  tags?: string[];
  socialMediaLinks?: Record<string, string>;
  recentArticles?: string[];
  categories?: string[];
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
    console.error('Error extracting plain text:', error);
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
    console.error('Error formatting date:', error);
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
      console.warn('Blog post has no title, skipping:', entry.sys?.id);
      return null;
    }

    // Log the raw entry to see all available data
    console.log('Raw entry data:', JSON.stringify(entry, null, 2));
    
    // Get blogdescription or fallback to first paragraph of fullBlogContent
    let blogdescription = getLocalizedField(fields.blogdescription, '');
    
    // If no blogdescription, try to extract from fullBlogContent
    if (!blogdescription && fields.fullBlogContent?.content?.[0]?.content?.[0]?.value) {
      blogdescription = fields.fullBlogContent.content[0].content[0].value;
    }
    
    console.log('Blog post data:', {
      id: entry.sys.id,
      title,
      blogdescription,
      hasDescription: !!blogdescription,
      availableFields: Object.keys(fields),
      fieldValues: Object.entries(fields).reduce((acc, [key, value]) => {
        acc[key] = value ? 'Exists' : 'Empty';
        return acc;
      }, {} as Record<string, string>)
    });
    
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
    const fullContent = getField<any>(
      fields,
      ['fullBlogContent'],
      ''
    );

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

    // Get recent articles (array of entry IDs)
    const recentArticles = Array.isArray(fields.recentArticles)
      ? fields.recentArticles.map((ref: any) => ref?.sys?.id || '').filter(Boolean)
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
      fullContent: fullContent || undefined,
      tags: tags.length ? tags : undefined,
      socialMediaLinks: Object.keys(socialMediaLinks).length ? socialMediaLinks : undefined,
      recentArticles: recentArticles.length ? recentArticles : undefined,
      categories: categories.length ? categories : undefined,
    };
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

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!contentfulClient) {
    console.warn('Contentful client is not configured');
    return null;
  }

  try {
    const entries = await contentfulClient.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1
    });

    if (entries.items.length === 0) {
      return null;
    }

    return mapContentfulEntry(entries.items[0] as unknown as ContentfulEntry);
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return null;
  }
}
