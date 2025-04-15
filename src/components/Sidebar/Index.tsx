import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './Sidebar.css';
import { ShoppingBag, PanelRightOpen, PanelRightClose } from 'lucide-react';
import RestomLogo from '../../assets/Restominder/Logo.png';
import Navbar from '../Navbar/Index';
import SidebarActionButtons from '../UI/SidebarActionButtons/Index';
import { DashboardNavigation, OutletManagementNavigation } from './components/navigations/Index';

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(() => window.innerWidth <= 768);
  const [outletSubmenuOpen, setOutletSubmenuOpen] = useState(false);
  const [orderSubmenuOpen, setOrderSubmenuOpen] = useState(false);
  const location = useLocation();
  const submenuRef = useRef<HTMLDivElement>(null);
  const outletButtonRef = useRef<HTMLDivElement>(null);
  const orderButtonRef = useRef<HTMLDivElement>(null);
  const orderSubmenuRef = useRef<HTMLDivElement>(null);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    if (!collapsed) {
      setOutletSubmenuOpen(false);
      setOrderSubmenuOpen(false);
    }
  };

  const toggleOutletSubmenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOutletSubmenuOpen(!outletSubmenuOpen);
    setOrderSubmenuOpen(false);
  };

  const toggleOrderSubmenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOrderSubmenuOpen(!orderSubmenuOpen);
    setOutletSubmenuOpen(false);
  };

  useEffect(() => {
    setOutletSubmenuOpen(false);
    setOrderSubmenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        submenuRef.current &&
        outletButtonRef.current &&
        !submenuRef.current.contains(event.target as Node) &&
        !outletButtonRef.current.contains(event.target as Node) &&
        orderSubmenuRef.current &&
        orderButtonRef.current &&
        !orderSubmenuRef.current.contains(event.target as Node) &&
        !orderButtonRef.current.contains(event.target as Node)
      ) {
        setOutletSubmenuOpen(false);
        setOrderSubmenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setCollapsed(true);
    }
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.querySelector('.sidebar-component-sidebar');
      const hamburger = document.querySelector('.sidebar-component-mobile-toggle');

      if (
        sidebar &&
        hamburger &&
        !sidebar.contains(event.target as Node) &&
        !hamburger.contains(event.target as Node) &&
        window.innerWidth <= 768 &&
        !collapsed
      ) {
        setCollapsed(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [collapsed]);

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth <= 768);
      setOutletSubmenuOpen(false);
      setOrderSubmenuOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isOrderActive =
    location.pathname === '/admin/active-orders' || location.pathname === '/admin/order-history';

  return (
    <div className={`sidebar-component-container ${isDarkMode ? 'dark' : ''}`}>
      <aside className={`sidebar-component-sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-component-header">
          <div className="sidebar-component-logo">
            <div className="sidebar-component-logo-icon-container">
              <img src={RestomLogo} alt="Restominder" className="sidebar-component-logo-icon" />
            </div>
            <span className="sidebar-component-logo-text">Restominder</span>
          </div>
          {collapsed ? (
            <button className="sidebar-component-mobile-toggle" onClick={toggleSidebar}>
              <PanelRightClose size={20} />
            </button>
          ) : (
            <button className="sidebar-component-toggle" onClick={toggleSidebar}>
              <PanelRightOpen size={20} />
            </button>
          )}
        </div>
        <nav className="sidebar-component-nav">
          <ul className="sidebar-component-nav-item">
            <DashboardNavigation />
            <OutletManagementNavigation
              toggleOutletSubmenu={toggleOutletSubmenu}
              outletSubmenuOpen={outletSubmenuOpen}
            />
            {/* <li>
              <NavLink
                to="/menus"
                className={({ isActive }) =>
                  `sidebar-component-nav-link ${isActive ? 'active' : ''}`
                }
              >
                <span className="sidebar-component-icon">
                  <Clipboard size={20} />
                </span>
                <span className="sidebar-component-nav-text">Menu Management</span>
              </NavLink>
            </li> */}
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
              <div
                ref={orderSubmenuRef}
                className={`sidebar-submenu ${orderSubmenuOpen ? 'open' : ''}`}
              >
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
            {/* <li>
              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  `sidebar-component-nav-link ${isActive ? 'active' : ''}`
                }
              >
                <span className="sidebar-component-icon">
                  <Clipboard size={20} />
                </span>
                <span className="sidebar-component-nav-text">Menu Services</span>
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `sidebar-component-nav-link ${isActive ? 'active' : ''}`
                }
              >
                <span className="sidebar-component-icon">
                  <Utensils size={20} />
                </span>
                <span className="sidebar-component-nav-text">Orders</span>
              </NavLink>
            </li> */}
          </ul>
          <div className="sidebar-mobile-actions">
            <SidebarActionButtons setCollapsed={setCollapsed} />
          </div>
        </nav>
      </aside>
      <div
        className={`sidebar-component-overlay ${!collapsed ? 'active' : ''}`}
        onClick={toggleSidebar}
      ></div>
      <main className={`sidebar-component-main ${collapsed ? 'collapsed' : 'expanded'}`}>
        <Navbar />
        <div className="sidebar-component-content">{children}</div>
      </main>
    </div>
  );
};

export default Sidebar;
