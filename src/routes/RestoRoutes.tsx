import { Outlet, Route } from 'react-router-dom';
import ProtectedRoutes from '../guards/ProtectedRoutes';
import Sidebar from '../components/Sidebar/Index';
import { lazy } from 'react';
import SuspenseWrapper from '../utils/Wrapper/SuspenseWrapper';

const MenuServices = lazy(() => import('../pages/MenuPage/Index'));
const MenuPageNew = lazy(() => import('../pages/MenuPageNew/Index'));
const OrdersPage = lazy(() => import('../pages/OrdersPage/Index'));

export const RestoRoutes = (
  <Route element={<ProtectedRoutes />}>
    <Route element={<Sidebar><Outlet /></Sidebar>}>
      <Route path="/menu" element={<SuspenseWrapper><MenuServices /></SuspenseWrapper>} />
      <Route path="/menus" element={<SuspenseWrapper><MenuPageNew /></SuspenseWrapper>} />
      <Route path="/orders" element={<SuspenseWrapper><OrdersPage /></SuspenseWrapper>} />
    </Route>
  </Route>
);
