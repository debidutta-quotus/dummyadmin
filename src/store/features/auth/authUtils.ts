import Cookies from 'js-cookie';

export const loadTokenFromCookies = (): string | null => {
  try {
    // const token = localStorage.getItem('token');
    const token = Cookies.get('token') ?? null;
    return token;
  } catch (error) {
    console.error('Error loading token from Cookie:', error);
    return null;
  }
};
