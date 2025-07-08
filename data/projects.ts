import React from 'react';
import { Project, ProjectStatus, ProjectSpecifications, ProjectType } from './types';
import { contentfulClient } from '@/lib/contentful-client';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

interface Document {
  nodeType: string;
  data: Record<string, unknown>;
  content: Array<{
    nodeType: string;
    value?: string;
    content?: any[];
    data?: Record<string, unknown>;
  }>;
}

// Contentful content type ID for projects
const CONTENT_TYPE = 'projects';

// Define the project fields that match our application's Project type
interface ProjectFields {
  title: string;
  type: string;
  status: ProjectStatus;
  location: string;
  price: string;
  area: string;
  completion: string;
  description: Document;
  images: string[];
  specifications: ProjectSpecifications;
  amenities: string[];
  locationAdvantages: string[];
}

// Type for the project type reference in Contentful
interface ContentfulProjectType {
  sys: {
    id: string;
  };
  fields: {
    name: { 'en-US': string };
    slug: { 'en-US': string };
  };
}

// Type for the project filter reference in Contentful
interface ContentfulProjectFilter {
  sys: {
    id: string;
  };
  fields: {
    name: { 'en-US': string };
    slug: { 'en-US': string };
  };
}

// Type for the raw Contentful entry fields
interface ContentfulFields {
  title: { 'en-US': string };
  type: { 'en-US': string };
  projectType?: { 'en-US': ContentfulProjectType };
  projectFilter?: { 'en-US': ContentfulProjectFilter };
  status: { 'en-US': ProjectStatus };
  location: { 'en-US': string };
  price: { 'en-US': string };
  area: { 'en-US': string };
  completion: { 'en-US': string };
  description: { 'en-US': Document };
  images: { 'en-US': { fields: { file: { url: string } } }[] };
  specifications: { 'en-US': ProjectSpecifications };
  amenities: { 'en-US': string[] };
  locationAdvantages: { 'en-US': string[] };
}

// Type for the raw Contentful entry
type ContentfulEntry = {
  sys: {
    id: string;
  };
  fields: ContentfulFields;
};

/**
 * Safely gets a localized field value from Contentful
 * @param field The field object from Contentful (may be undefined or null)
 * @param defaultValue The default value to return if the field is not available
 * @returns The localized field value or the default value
 */
function getLocalizedField<T>(
  field: { 'en-US': T } | undefined | null,
  defaultValue: T
): T {
  // Handle null/undefined field
  if (field == null) {
    return defaultValue;
  }
  
  // Handle direct value (non-localized)
  if ((typeof field === 'string') || 
      (typeof field === 'number') || 
      (typeof field === 'boolean') ||
      Array.isArray(field) ||
      (typeof field === 'object' && !('en-US' in field))) {
    return field as unknown as T;
  }
  
  // Handle localized field
  const value = field['en-US'];
  
  // Return default if the localized value is null/undefined
  if (value == null) {
    return defaultValue;
  }
  
  return value;
}

// Default empty document for rich text
const EMPTY_DOCUMENT: Document = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: []
};

/**
 * Renders rich text content as plain text with basic formatting
 * @param doc The document to render
 * @returns Plain text representation of the rich text content
 */
function renderRichText(doc: Document): string {
  if (!doc?.content?.length) return '';
  
  const processNode = (node: any, depth = 0): string => {
    // Handle text nodes
    if (node.nodeType === 'text') {
      return node.value || '';
    }
    
    // Handle block elements with content
    if (node.content) {
      const nodeContent = Array.isArray(node.content) 
        ? node.content.map((n: any) => processNode(n, depth + 1)).join('')
        : processNode(node.content, depth + 1);
      
      // Add appropriate spacing for block elements
      switch (node.nodeType) {
        case 'paragraph':
          return `\n${nodeContent}\n`;
        case 'heading-1':
          return `\n${nodeContent.toUpperCase()}\n`;
        case 'heading-2':
        case 'heading-3':
          return `\n${nodeContent}\n`;
        case 'unordered-list':
          return `\n• ${nodeContent}\n`;
        case 'list-item':
          return `• ${nodeContent}\n`;
        default:
          return nodeContent;
      }
    }
    
    return '';
  };
  
  try {
    const result = doc.content
      .map(node => processNode(node))
      .join('')
      .replace(/\n{3,}/g, '\n\n') // Remove excessive newlines
      .trim();
    
    return result || '';
  } catch (error) {
    console.error('Error rendering rich text:', error);
    return '';
  }
}

// Helper function to map Contentful entry to our Project type
function mapContentfulEntry(entry: ContentfulEntry): Project {
  const { sys, fields } = entry;
  const description = getLocalizedField(fields.description, EMPTY_DOCUMENT);
  const rawImages = getLocalizedField(fields.images, []);
  const images = Array.isArray(rawImages) 
    ? rawImages
        .map((img: any) => typeof img === 'object' && img?.fields?.file?.url)
        .filter(Boolean)
    : [];
  
  // Get project type from the new projectType reference or fallback to the old type field
  const projectTypeRef = getLocalizedField(fields.projectType, null);
  const projectType = projectTypeRef
    ? {
        id: projectTypeRef.sys.id,
        name: projectTypeRef.fields?.name?.['en-US'] || '',
        slug: projectTypeRef.fields?.slug?.['en-US'] || ''
      }
    : null;
    
  // Get project filter if available
  const projectFilterRef = getLocalizedField(fields.projectFilter, null);
  const projectFilter = projectFilterRef
    ? {
        id: projectFilterRef.sys.id,
        name: projectFilterRef.fields?.name?.['en-US'] || '',
        slug: projectFilterRef.fields?.slug?.['en-US'] || ''
      }
    : null;

  // Determine the type value - use projectType.slug if available, otherwise fallback to the old type field
  const typeValue = (projectType?.slug || getLocalizedField(fields.type, 'residential')) as ProjectType;
  
  return {
    id: sys.id,
    title: getLocalizedField(fields.title, ''),
    type: typeValue,
    status: getLocalizedField(fields.status, 'Ongoing'),
    location: getLocalizedField(fields.location, ''),
    price: getLocalizedField(fields.price, ''),
    area: getLocalizedField(fields.area, ''),
    completion: getLocalizedField(fields.completion, ''),
    description: renderRichText(description),
    images,
    specifications: getLocalizedField(fields.specifications, {}),
    amenities: getLocalizedField(fields.amenities, []),
    locationAdvantages: getLocalizedField(fields.locationAdvantages, []),
    projectType: projectType || undefined,
    projectFilter: projectFilter || undefined
  };
}



export async function getProjectById(id: string): Promise<Project | undefined> {
  if (!id) return undefined;
  
  try {
    // Use type assertion to handle Contentful client response
    const response = await (contentfulClient as any).getEntries({
      'sys.id': id,
      content_type: CONTENT_TYPE,
      include: 2,
      limit: 1
    });
    
    const entry = response?.items?.[0] as ContentfulEntry | undefined;
    if (!entry) {
      console.warn(`No project found with ID: ${id}`);
      return undefined;
    }
    
    try {
      return mapContentfulEntry(entry);
    } catch (mappingError) {
      console.error(`Error mapping project with ID ${id}:`, mappingError);
      return undefined;
    }
  } catch (error) {
    console.error(`Error fetching project with ID ${id}:`, error);
    return undefined;
  }
}

export async function getSuggestedProjects(
  currentId: string,
  limit: number = 3
): Promise<Project[]> {
  if (!currentId) {
    console.warn('No current project ID provided for suggested projects');
    return [];
  }

  try {
    const allProjects = await getProjects();
    
    // Filter out the current project and any invalid projects
    const validProjects = allProjects.filter(
      (project): project is Project => 
        !!project && 
        project.id !== currentId && 
        project.id !== undefined
    );

    // Shuffle and limit the results
    const shuffled = [...validProjects].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(limit, shuffled.length));
  } catch (error) {
    console.error('Error getting suggested projects:', error);
    return [];
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    // Use type assertion to handle Contentful client response
    const response = await (contentfulClient as any).getEntries({
      content_type: CONTENT_TYPE,
      include: 2,
    });

    const entries = (response?.items || []) as ContentfulEntry[];
    if (!entries.length) return [];

    // Map and validate each entry
    return entries
      .map(entry => {
        try {
          return mapContentfulEntry(entry);
        } catch (error) {
          console.error('Error mapping project entry:', error);
          return null;
        }
      })
      .filter((project): project is Project => project !== null);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

// For backward compatibility
export const projects: Project[] = [];
