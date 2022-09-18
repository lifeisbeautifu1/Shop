export interface IProduct {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  brand: string;
  count_in_stock: number;
  price: number;
  rating: number;
  image: string;
  images: string[];
}

export interface IUser {
  id: string;
  email: string;
  username: string;
  image_url: string;
  is_admin: boolean;
}
