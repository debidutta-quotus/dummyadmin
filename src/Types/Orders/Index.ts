export interface MenuItem {
  name: string;
  _id: string;
}

export interface OrderItem {
  menuId: MenuItem;
  price: number;
  quantity: number;
  _id: string;
}

export interface CustomerDetails {
  email: string;
  name: string;
  phone: string;
}

export interface Order {
  _id: string;
  customerDetails: CustomerDetails;
  orderDetails: OrderItem[];
  orderId: string;
  orderStatus: 'pending' | 'accept' | 'preparing' | 'ready' | 'dispatched' | 'reject';
  pickUpTime: string;
  storeId: number;
  totalAmount: number;
}
