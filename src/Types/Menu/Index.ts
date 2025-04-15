export interface FoodItem {
  _id?: string;
  storeId?: string;
  name: string;
  description: string;
  price: number;
  minPrepTime: number;
  maxPrepTime: number;
  maxPossibleOrders: number;
  images: string[];
  tags: string[];
  category: string;
  dietary: string;
  available: boolean;
}

export interface CategoryGroup {
  [key: string]: FoodItem[];
}

export interface MenuItemsResponse {
  menus: FoodItem[];
}
