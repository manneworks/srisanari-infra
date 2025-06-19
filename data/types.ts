export type ProjectStatus = 'Completed' | 'Ongoing' | 'Upcoming' | 'Available';

export interface ProjectSpecifications {
  [key: string]: string;
}

export interface Project {
  id: string;
  title: string;
  type: string;
  status: ProjectStatus;
  location: string;
  price: string;
  area: string;
  completion: string;
  description: string;
  images: string[];
  specifications: ProjectSpecifications;
  amenities: string[];
  locationAdvantages: string[];
}
