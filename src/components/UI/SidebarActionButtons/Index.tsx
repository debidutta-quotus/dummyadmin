import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bell, Settings, Edit, Moon, Sun, User } from 'lucide-react';
import './SidebarActionButtons.css';
import { RootState } from '../../../store/store';
import { toggleTheme } from '../../../store/features/theme/themeSlice';

interface SidebarActionButtonsProps {
  className?: string;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarActionButtons: React.FC<SidebarActionButtonsProps> = ({
  className = '',
  setCollapsed,
}) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode); // Get theme state

  const toggleDarkMode = () => {
    dispatch(toggleTheme()); // Toggle theme in Redux store
    document.documentElement.classList.toggle('dark', !isDarkMode); // Apply theme to the document
    setCollapsed((prev) => !prev); // Close sidebar
  };

  return (
    <div className={`sidebar-action-buttons ${className}`}>
      <button className="sidebar-action-button" onClick={toggleDarkMode}>
        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        <span className="sidebar-button-text">Toggle Theme</span>
      </button>
      <button className="sidebar-action-button" onClick={() => setCollapsed((prev) => !prev)}>
        <Edit size={18} />
        <span className="sidebar-button-text">Edit</span>
      </button>
      <button className="sidebar-action-button" onClick={() => setCollapsed((prev) => !prev)}>
        <Settings size={18} />
        <span className="sidebar-button-text">Settings</span>
      </button>
      <button className="sidebar-action-button" onClick={() => setCollapsed((prev) => !prev)}>
        <Bell size={18} />
        <span className="sidebar-button-text">Notifications</span>
      </button>
      <button className="sidebar-action-button" onClick={() => setCollapsed((prev) => !prev)}>
        <User size={18} />
        <span className="sidebar-button-text">Profile</span>
      </button>
    </div>
  );
};

export default SidebarActionButtons;
