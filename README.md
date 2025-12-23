# Srisanari Infra

A Next.js project for Srisanari Infra website.

## Getting Started


### Prerequisites

- Node.js 18.0.0 or later
- pnpm package manager
- Contentful account with a space and content model set up

### Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```bash
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_access_token
NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT=master  # optional, defaults to 'master'
```

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run the development server:
   ```bash
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The project is configured to be deployed on Vercel. Push your changes to the `main` branch to trigger a new deployment.

## Contentful Setup

Make sure you have the following content types set up in your Contentful space:

1. **Projects**
   - Title (Short text)
   - Type (Reference to Project Type)
   - Status (Short text, predefined values: 'upcoming', 'ongoing', 'completed')
   - Location (Short text)
   - Price (Short text)
   - Area (Short text)
   - Completion (Short text)
   - Description (Rich text)
   - Images (Media, multiple)
   - Specifications (JSON object)
   - Amenities (Short text, multiple)
   - Location Advantages (Short text, multiple)

2. **Project Type**
   - Name (Short text)
   - Slug (Short text)

## Troubleshooting

### Contentful Connection Issues

If you're seeing warnings about Contentful not being initialized, make sure:
1. Your environment variables are correctly set in `.env.local`
2. The Contentful space ID and access token are correct
3. The Contentful space has the required content types set up

### Build Errors

If you encounter build errors related to missing environment variables, make sure to set them in your deployment environment (e.g., Vercel project settings).
