import { Project } from '@/data/types';

export const getStatusStyles = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'Ongoing':
      return 'bg-blue-100 text-blue-800';
    case 'Upcoming':
      return 'bg-yellow-100 text-yellow-800';
    case 'Available':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const formatProjectData = (project: Project) => ({
  ...project,
  // Add any data formatting here if needed
});
