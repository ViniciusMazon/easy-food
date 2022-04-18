export interface MenuItemModel {
  title: string;
  description: string;
  price: string;
  categoryId: number;
  image: string;
  isAvailable: boolean;
  id?: number;
  link?: string;
}

export interface MenuCategoryModel {
  id: number;
  title: string;
  items?: MenuItemModel[];
}

export interface Meta {
  totalCount: number;
}
