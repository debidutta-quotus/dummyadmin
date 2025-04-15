import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './Sidebar.css';
import { PanelRightOpen, PanelRightClose } from 'lucide-react';
import RestomLogo from '../../assets/Restominder/Logo.png';
import Navbar from '../Navbar/Index';
import SidebarActionButtons from '../UI/SidebarActionButtons/Index';
import {
  DashboardNavigation,
  OrderManagementNavigation,
  OutletManagementNavigation,
} from './components/navigations/Index';
import { handleClickOutside } from './utils/handleClickOutside';

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
    const onClick = (event: MouseEvent) => {
      handleClickOutside(
        event,
        [submenuRef, outletButtonRef, orderSubmenuRef, orderButtonRef],
        [() => setOutletSubmenuOpen(false), () => setOrderSubmenuOpen(false)]
      );
    };

    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
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
            <OrderManagementNavigation
              isOrderActive={isOrderActive}
              orderSubmenuOpen={orderSubmenuOpen}
              toggleOrderSubmenu={toggleOrderSubmenu}
            />
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
