import { Outlet, Route } from 'react-router-dom';
import ProtectedRoutes from '../guards/ProtectedRoutes';
import Sidebar from '../components/Sidebar/Index';
import { lazy } from 'react';
import SuspenseWrapper from '../utils/Wrapper/SuspenseWrapper';

const Dashboard = lazy(() => import('../pages/Dashboard/Index'));
const StoreRegisterNew = lazy(() => import('../pages/StoreRegisterPageNew/Index'));
const OutletList = lazy(() => import('../pages/Admin/Outlets/OutletList/Index'));
const AddChannelPage = lazy(() => import('../pages/Admin/Outlets/AddChannel/Index'));
const IntegrationStatus = lazy(() => import('../pages/Admin/Outlets/IntegrationStatus/Index'));
const AdminActiveOrderPage = lazy(() => import('../pages/Admin/OrderManagement/ActiveOrder/Index'));
const AdminOrderHistoryPage = lazy(
  () => import('../pages/Admin/OrderManagement/OrderHistory/Index')
);

export const AdminRoutes = (
  <Route element={<ProtectedRoutes />}>
    <Route
      element={
        <Sidebar>
          <Outlet />
        </Sidebar>
      }
    >
      <Route
        path="/admin/dashboard"
        element={
          <SuspenseWrapper>
            <Dashboard />
          </SuspenseWrapper>
        }
      />
      <Route
        path="/admin/storeregisternew"
        element={
          <SuspenseWrapper>
            <StoreRegisterNew />
          </SuspenseWrapper>
        }
      />
      <Route
        path="/admin/outletlist"
        element={
          <SuspenseWrapper>
            <OutletList />
          </SuspenseWrapper>
        }
      />
      <Route
        path="/admin/addchannel"
        element={
          <SuspenseWrapper>
            <AddChannelPage />
          </SuspenseWrapper>
        }
      />
      <Route
        path="/admin/integrationstatus"
        element={
          <SuspenseWrapper>
            <IntegrationStatus />
          </SuspenseWrapper>
        }
      />
      <Route
        path="/admin/active-orders"
        element={
          <SuspenseWrapper>
            <AdminActiveOrderPage />
          </SuspenseWrapper>
        }
      />
      <Route
        path="/admin/order-history"
        element={
          <SuspenseWrapper>
            <AdminOrderHistoryPage />
          </SuspenseWrapper>
        }
      />
    </Route>
  </Route>
);
