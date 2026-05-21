export interface Artwork {
  id: string;
  title: string;
  medium: string;
  date: string;
  image: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
}

export interface TravelLog {
  id: string;
  title: string;
  destination: string;
  date: string;
  description: string;
  image: string;
}

export interface GuestbookMessage {
  id: string;
  name: string;
  relation: string;
  message: string;
  date: string;
}

export type Category = 'Daily Life' | 'Heritage' | 'Celebrations' | 'Holidays' | 'Travel';

export interface Moment {
  id: string;
  category: Category;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  location?: string;
  details?: string;
  comments?: any[];
}

