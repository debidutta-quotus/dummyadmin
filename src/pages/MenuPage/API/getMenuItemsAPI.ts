import axios from 'axios';
import { FoodItem, MenuItemsResponse } from '../../../Types/Menu/Index';
import { config } from '../../../config/Index';
import Cookies from 'js-cookie';

export const getMenuItems = async (): Promise<FoodItem[]> => {
  // const POS_URL = import.meta.env.VITE_POS_URL;
  const POS_URL = config.POS_URL;

  try {
    // const token = localStorage.getItem('token');
    const token = Cookies.get('token');

    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get<MenuItemsResponse>(`${POS_URL}/menu`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.menus;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.message);
      throw error;
    } else {
      console.error('An unexpected error occurred:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};
