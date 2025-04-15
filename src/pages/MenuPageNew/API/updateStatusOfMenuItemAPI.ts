import axios from 'axios';
import { config } from '../../../config/Index';
import Cookies from 'js-cookie';

export const updateMenuAvailabilityStatus = async (_id: string) => {
  // Changed String to string
  try {
    // const POS_URL = import.meta.env.VITE_POS_URL;
    const POS_URL = config.POS_URL;

    if (!POS_URL) {
      throw new Error('VITE_POS_URL is not defined in import.meta.env');
    }

    // const token = localStorage.getItem('token');
    const token = Cookies.get('token');

    if (!token) {
      throw new Error('Token not found in localStorage');
    }

    const response = await axios.patch(
      `${POS_URL}/menu/${_id}`,
      { available: true },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Menu update failed:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    } else {
      console.error('An unexpected error occurred:', error);
      throw error;
    }
  }
};
