// ./API/StoreRegister.ts

import axios from 'axios';
import { FoodItem } from '../../../Types/Menu/Index';
import { config } from '../../../config/Index';
import Cookies from 'js-cookie';

export const addMenu = async (formData: FoodItem) => {
  try {
    // Use import.meta.env for Vite environment variables
    // const POS_URL = import.meta.env.VITE_POS_URL;
    const POS_URL = config.POS_URL;

    if (!POS_URL) {
      throw new Error('VITE_POS_URL is not defined in import.meta.env');
    }

    // Retrieve token from localStorage
    // const token = localStorage.getItem('token');
    const token = Cookies.get('token');

    if (!token) {
      throw new Error('Token not found in localStorage');
    }

    const response = await axios.post(`${POS_URL}/menu`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Menu Addition failed:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    } else {
      console.error('An unexpected error occurred:', error);
      throw error;
    }
  }
};
