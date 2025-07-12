export interface Property {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  alt?: string;
  width: number;
  height: number;
  price: number;
  location?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  features?: string[];
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}
