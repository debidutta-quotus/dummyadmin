import { BaggageClaim, LayoutDashboard, ShoppingBag } from 'lucide-react';
import { useRef } from 'react';
import { NavLink } from 'react-router-dom';

export const DashboardNavigation = () => {
  return (
    <li>
      <NavLink
        to="/admin/dashboard"
        className={({ isActive }) => `sidebar-component-nav-link ${isActive ? 'active' : ''}`}
      >
        <span className="sidebar-component-icon">
          <LayoutDashboard size={20} />
        </span>
        <span className="sidebar-component-nav-text">Dashboard</span>
      </NavLink>
    </li>
  );
};

interface OutletManagementNavigationProps {
  toggleOutletSubmenu: (e: React.MouseEvent<HTMLDivElement>) => void;
  outletSubmenuOpen: boolean;
}

export const OutletManagementNavigation = ({
  toggleOutletSubmenu,
  outletSubmenuOpen,
}: OutletManagementNavigationProps) => {
  const outletButtonRef = useRef<HTMLDivElement>(null);
  const submenuRef = useRef<HTMLDivElement>(null);

  const isOutletActive =
    location.pathname === '/admin/outletlist' ||
    location.pathname === '/admin/addchannel' ||
    location.pathname === '/admin/integrationstatus';
  return (
    <li className="sidebar-submenu-container">
      <div
        ref={outletButtonRef}
        className={`sidebar-component-nav-link ${isOutletActive ? 'active' : ''}`}
        onClick={toggleOutletSubmenu}
      >
        <span className="sidebar-component-icon">
          <BaggageClaim size={20} />
        </span>
        <span className="sidebar-component-nav-text">Outlet</span>
      </div>
      <div ref={submenuRef} className={`sidebar-submenu ${outletSubmenuOpen ? 'open' : ''}`}>
        <div className="submenu-line"></div>
        <NavLink to="/admin/outletlist" className="submenu-item">
          <span className="submenu-dot"></span>
          <span className="sidebar-component-nav-text">Outlet List</span>
        </NavLink>
        <NavLink to="/admin/addchannel" className="submenu-item">
          <span className="submenu-dot"></span>
          <span className="sidebar-component-nav-text">Add Channel</span>
        </NavLink>
        <NavLink to="/admin/integrationstatus" className="submenu-item">
          <span className="submenu-dot"></span>
          <span className="sidebar-component-nav-text">Integration Status</span>
        </NavLink>
      </div>
    </li>
  );
};

interface OrderManagementNavigationProps {
  isOrderActive: boolean;
  orderSubmenuOpen: boolean;
  toggleOrderSubmenu: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const OrderManagementNavigation = ({
  isOrderActive,
  orderSubmenuOpen,
  toggleOrderSubmenu,
}: OrderManagementNavigationProps) => {
  const orderButtonRef = useRef<HTMLDivElement>(null);
  const orderSubmenuRef = useRef<HTMLDivElement>(null);

  return (
    <li className="sidebar-submenu-container">
      <div
        ref={orderButtonRef}
        className={`sidebar-component-nav-link ${isOrderActive ? 'active' : ''}`}
        onClick={toggleOrderSubmenu}
      >
        <span className="sidebar-component-icon">
          <ShoppingBag size={20} />
        </span>
        <span className="sidebar-component-nav-text">Order Management</span>
      </div>
      <div ref={orderSubmenuRef} className={`sidebar-submenu ${orderSubmenuOpen ? 'open' : ''}`}>
        <div className="submenu-line"></div>
        <NavLink to="/admin/active-orders" className="submenu-item">
          <span className="submenu-dot"></span>
          <span className="sidebar-component-nav-text">Active Orders</span>
        </NavLink>
        <NavLink to="/admin/order-history" className="submenu-item">
          <span className="submenu-dot"></span>
          <span className="sidebar-component-nav-text">Order History</span>
        </NavLink>
      </div>
    </li>
  );
};
