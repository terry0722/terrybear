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
