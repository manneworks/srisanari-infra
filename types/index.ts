export interface Property {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  alt?: string;
  width: number;
  height: number;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}
