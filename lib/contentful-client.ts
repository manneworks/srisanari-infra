import { createClient } from 'contentful';

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

if (!space) {
  throw new Error('NEXT_PUBLIC_CONTENTFUL_SPACE_ID is not defined');
}

if (!accessToken) {
  throw new Error('NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN is not defined');
}

// Create and export the Contentful client
export const contentfulClient = createClient({
  space,
  accessToken,
  environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || 'master',
});
