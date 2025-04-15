import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Index';

export const Layout: React.FC = () => (
  <Sidebar>
    <Outlet />
  </Sidebar>
);
