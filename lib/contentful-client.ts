import { createClient, type EntryCollection, type EntrySkeletonType } from 'contentful';

// Validate required environment variables
const requiredEnvVars = {
  NEXT_PUBLIC_CONTENTFUL_SPACE_ID: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
};

// Throw error if required environment variables are missing in production
if (process.env.NODE_ENV === 'production') {
  const missingVars = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
} else if (process.env.NODE_ENV === 'development') {
  // Only log warnings in development
  for (const [key, value] of Object.entries(requiredEnvVars)) {
    if (!value) {
      console.warn(`Warning: ${key} is not defined`);
    }
  }
}

// Create Contentful client with environment variables
export const contentfulClient = createClient({
  space: requiredEnvVars.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || '',
  accessToken: requiredEnvVars.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || '',
  environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || 'master',
  host: 'cdn.contentful.com'
});

// Add error handling for Contentful client with proper TypeScript types
type GetEntriesType = <T extends EntrySkeletonType>(query?: any) => Promise<EntryCollection<T, undefined, string>>;

const originalGetEntries = contentfulClient.getEntries.bind(contentfulClient) as GetEntriesType;
contentfulClient.getEntries = async function<T extends EntrySkeletonType>(query?: any) {
  try {
    const result = await originalGetEntries<T>(query);
    // Sanitize the result to remove any sensitive data
    const sanitizedResult = {
      ...result,
      // Remove any sensitive fields from the response
      sys: undefined,
      // Ensure no raw Contentful metadata is exposed
      toPlainObject: undefined,
      update: undefined,
      delete: undefined
    };
    
    return sanitizedResult as unknown as ReturnType<GetEntriesType>;
  } catch (error) {
    // Only log error details in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Contentful API Error:', error instanceof Error ? error.message : 'Unknown error');
    }
    throw new Error('Failed to fetch content');
  }
} as GetEntriesType;

// Test the connection when the module loads in development
if (process.env.NODE_ENV === 'development') {
  contentfulClient.getContentTypes()
    .then((response) => {
      console.log('✅ Successfully connected to Contentful');
      if (process.env.DEBUG) {
        console.debug('Available content types:', response.items.map(ct => ({
          id: ct.sys.id,
          name: ct.name,
          displayField: ct.displayField,
          fields: ct.fields.map((f: any) => ({
            id: f.id,
            name: f.name,
            type: f.type,
            required: f.required,
          }))
        })));
      }
    })
    .catch((error: Error) => {
      console.error('❌ Failed to connect to Contentful:', error.message);
    });
}

// Export the client as default
export default contentfulClient;
