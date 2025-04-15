import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import { toggleTheme } from '../../../store/features/theme/themeSlice';
import { Bell, Settings, Edit, Moon, Sun, LogOut } from 'lucide-react';
import profileImg from '../../../assets/Restominder/profile.jpg';
import NotificationDropdown from '../../Notifications/Index';
import './ActionButtons.css';
import { useNavigate } from 'react-router-dom';
import { alerts } from '../../../assets/DummyData/alerts';

interface ActionButtonsProps {
  className?: string;
  isMobile?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ className = '', isMobile = false }) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const navigate = useNavigate();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(
    alerts.filter((notification) => !notification.read).length
  );

  const toggleDarkMode = () => {
    dispatch(toggleTheme());
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleNotificationChange = (count: number) => {
    setUnreadCount(count);
  };

  return (
    <div
      className={`navbar-action-buttons ${className} ${isMobile ? 'navbar-action-buttons-mobile' : ''}`}
    >
      <button
        className="navbar-action-buttons-button navbar-action-buttons-theme-toggle"
        onClick={toggleDarkMode}
        aria-label="Toggle theme"
      >
        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        {isMobile && <span className="navbar-action-buttons-button-text">Toggle Theme</span>}
      </button>
      <button className="navbar-action-buttons-button navbar-action-buttons-edit" aria-label="Edit">
        <Edit size={18} />
        {isMobile && <span className="navbar-action-buttons-button-text">Edit</span>}
      </button>
      <button
        className="navbar-action-buttons-button navbar-action-buttons-settings"
        aria-label="Settings"
      >
        <Settings size={18} />
        {isMobile && <span className="navbar-action-buttons-button-text">Settings</span>}
      </button>
      <div style={{ position: 'relative' }}>
        <button
          className="navbar-action-buttons-button navbar-action-buttons-notifications"
          aria-label="Notifications"
          onClick={toggleNotifications}
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="navbar-action-buttons-notification-badge">{unreadCount}</span>
          )}
          {isMobile && <span className="navbar-action-buttons-button-text">Notifications</span>}
        </button>
        <NotificationDropdown
          isOpen={isNotificationOpen}
          onClose={() => setIsNotificationOpen(false)}
          onNotificationChange={handleNotificationChange}
        />
      </div>
      <button
        className="navbar-action-buttons-button navbar-action-buttons-logout"
        aria-label="logout"
        onClick={() => navigate('/logout')}
      >
        <LogOut size={18} />
        {isMobile && <span className="navbar-action-buttons-button-text">Logout</span>}
      </button>
      <button
        className="navbar-action-buttons-button navbar-action-buttons-profile"
        aria-label="Profile"
      >
        <img src={profileImg} alt="Profile" />
        {isMobile && <span className="navbar-action-buttons-button-text">Profile</span>}
      </button>
    </div>
  );
};

export default ActionButtons;
