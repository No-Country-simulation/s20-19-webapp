export interface Promotion {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  originalPrice: number;
  discount: number;
  store: Store;
  category: Category;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Store {
  id: number;
  name: string;
  logo: string;
  address: string;
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