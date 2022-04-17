export interface MenuItemModel {
  id: number;
  title: string;
  description: string;
  price: string;
  categoryId: number;
  link: string;
  image: string;
  isAvailable: boolean;
}

export interface MenuCategoryModel {
  id: number;
  title: string;
  items: MenuItemModel[];
}

export interface Meta {
  totalCount: number;
}
