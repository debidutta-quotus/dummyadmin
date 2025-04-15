import axios from 'axios';
import { Order } from '../../../Types';
import { config } from '../../../config/Index';
// import Cookies from 'js-cookie';

// const POS_URL = import.meta.env.VITE_POS_URL;
const POS_URL = config.POS_URL;
// const token = Cookies.get('token');

export const getOrders = async (token: any) => {
  try {
    const response = await axios.get(`${POS_URL}/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const updateOrderStatus = async (
  orderId: string,
  status: Order['orderStatus'],
  token: any
) => {
  try {
    const response = await fetch(`${POS_URL}/order/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ orderStatus: status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update order status');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};
