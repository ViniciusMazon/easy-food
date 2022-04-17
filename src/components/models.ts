export interface ModelItemModel {
  id: number;
  title: string;
  description: string;
  price: string;
  categoryId: number;
  link: string;
  image: string;
  isAvailable: boolean;
}

export interface Meta {
  totalCount: number;
}
