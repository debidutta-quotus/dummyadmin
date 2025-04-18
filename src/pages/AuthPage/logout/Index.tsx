import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Cookies.remove('token', { path: '/' });
    navigate('/login');
  }, []);

  return <p>Logging out...</p>;
};

export default Logout;
