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

export interface ClientModel {
  id: number;
  name: string;
}

export interface AddressModel {
  id: number;
  street: string;
  number: string;
  district: string;
  city: string;
  uf: string;
}

export interface ItemModel {
  id: number;
  qtd: number;
  title: string;
  priceUnity: string;
}

export interface OrderModel {
  id: number;
  status: 'new'|'inProgress'|'delivered'|'finished'|'canceled';
  observations: string;
  deliveryTax: number;
  discount: number;
  client: ClientModel;
  address: AddressModel;
  cart: ItemModel[];
}
