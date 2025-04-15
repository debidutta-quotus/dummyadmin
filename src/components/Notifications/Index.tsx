import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, AlertCircle, AlertOctagon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { alerts as initialAlerts, Notification } from '../../assets/DummyData/alerts';
import './Notifications.css';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { SyncLoader } from 'react-spinners'; // Import the loader

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onNotificationChange: (count: number) => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  isOpen,
  onClose,
  onNotificationChange,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]); // Initialize as empty
  const [removingNotificationIds, setRemovingNotificationIds] = useState<Set<string>>(new Set());
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [isLoading, setIsLoading] = useState(true); // State for loading

  useEffect(() => {
    // Simulate fetching notifications with a 3-second delay
    const timer = setTimeout(() => {
      setNotifications(initialAlerts);
      setIsLoading(false); // Set loading to false after the delay
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      // Reset animations if needed
    }
  }, [isOpen]);

  const handleMarkAllAsRead = () => {
    const ids = notifications.map((n) => n.id);
    setRemovingNotificationIds(new Set(ids));
    setTimeout(() => {
      setNotifications([]);
      setRemovingNotificationIds(new Set());
      onNotificationChange(0);
    }, 300);
  };

  const handleNotificationClick = (id: string) => {
    setRemovingNotificationIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setNotifications((prev) => {
        const updated = prev.filter((n) => n.id !== id);
        onNotificationChange(updated.length);
        return updated;
      });
      setRemovingNotificationIds((prev) => {
        const updated = new Set(prev);
        updated.delete(id);
        return updated;
      });
    }, 300);
  };

  const getIcon = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return <AlertOctagon size={20} />;
      case 'medium':
        return <AlertTriangle size={20} />;
      case 'low':
        return <AlertCircle size={20} />;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`notification-comp-dropdown ${isOpen ? 'open' : 'closed'} ${
        isDarkMode ? 'dark' : ''
      }`}
    >
      <div className="notification-comp-header">
        <h3>Notifications ({notifications.length})</h3>
        <button
          className="notification-comp-mark-all-read"
          onClick={handleMarkAllAsRead}
          disabled={isLoading || notifications.length === 0} // Disable button during loading or if no notifications
        >
          Mark all as read
        </button>
      </div>

      {isLoading ? (
        <div className="notification-comp-loader">
          <SyncLoader color={isDarkMode ? '#d1d5db' : '#374151'} size={10} />
          <div className="notification-comp-loader-text">Loading notifications...</div>
        </div>
      ) : notifications.length === 0 ? (
        <div className="notification-comp-item no-notifications">No new notifications</div>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-comp-item animated-item ${
              removingNotificationIds.has(notification.id) ? 'removing' : ''
            }`}
            onClick={() => handleNotificationClick(notification.id)}
          >
            <div className={`notification-comp-icon ${notification.priority}`}>
              {getIcon(notification.priority)}
            </div>
            <div className="notification-comp-content">
              <div className="notification-comp-title">
                {notification.type.replace(/_/g, ' ').toUpperCase()}
              </div>
              <div className="notification-comp-message">{notification.message}</div>
              <div className="notification-comp-time">
                {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
              </div>
              <div className="notification-comp-actions">
                <button className="notification-comp-action-button notification-comp-see-reason">
                  See Reason
                </button>
                <button className="notification-comp-action-button notification-comp-decline">
                  Decline
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationDropdown;
