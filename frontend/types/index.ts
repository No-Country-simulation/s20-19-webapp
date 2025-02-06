export interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  date: string;
}

export interface Supermarket {
  id: number;
  name: string;
  logo: string;
  address: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  category: string;
  previousPrice: string;
  currentPrice: string;
  discount: number;
  supermarket: Supermarket;
  imageUrl: string;
  location: string;
  likes: number;
  dislikes: number;
  reports: number;
  comments: Comment[];
}

export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}