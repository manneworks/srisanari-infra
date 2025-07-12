export type ProjectStatus = 'Completed' | 'Ongoing' | 'Upcoming' | 'Available';

export interface ProjectSpecifications {
  [key: string]: string;
}

import { ReactNode } from 'react';

export type ProjectType = 'residential' | 'commercial' | 'agriculture' | 'apartments' | 'villas';

export interface Project {
  id: string;
  title: string;
  type: ProjectType; // This will be the new projectType field from Contentful
  status: ProjectStatus;
  location: string;
  price: string;
  area: string;
  completion: string;
  description: string | ReactNode;
  images: string[];
  specifications: ProjectSpecifications;
  amenities: string[];
  locationAdvantages: string[];
  projectType?: {
    id: string;
    name: string;
    slug: string;
  };
  filtertype?: string;
}
