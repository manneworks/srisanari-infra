import { createClient, ContentfulClientApi } from 'contentful';

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

let contentfulClient: ContentfulClientApi<undefined> | null = null;

if (space && accessToken) {
  contentfulClient = createClient({
    space,
    accessToken,
    environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || 'master',
  });
} else {
  console.warn('Contentful environment variables are not set. Contentful functionality will be disabled.');
}

export { contentfulClient };
