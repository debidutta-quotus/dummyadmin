import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { config } from '../../../../config/Index';
import { showErrorToast } from '../../../../utils/Toast/Toast';

export const loginUser = async (email: string, password: string) => {
  try {
    const BASE_URL = config.BASE_URL;

    const response = await axios.post(
      `${BASE_URL}/store/login`,
      { email, password }
      // {withCredentials: true}
    );

    const token = response.data.data.token;

    if (token) {
      try {
        // Decode the token to extract expiration time
        const decodedToken: { exp: number } = jwtDecode(token);
        const currentTimestamp = Math.floor(Date.now() / 1000); // Convert to seconds
        const expirationInDays = (decodedToken.exp - currentTimestamp) / 86400; // Convert seconds to days

        // Set cookie with dynamic expiration time
        Cookies.set('token', token, {
          expires: expirationInDays,
          path: '/',
          secure: true,
          sameSite: 'Strict',
        });
      } catch (decodeError) {
        console.error('Error decoding JWT:', decodeError);
      }
    } else {
      showErrorToast('Token not found');
    }

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Server Error:', error.response.data.message || 'Something went wrong');
      throw new Error(error.response.data.message || 'Login failed');
    } else if (error.request) {
      console.error('Network Error: No response from server');
      throw new Error('Network error. Please try again later.');
    } else {
      console.error('Error:', error.message);
      throw new Error('An unexpected error occurred.');
    }
  }
};
