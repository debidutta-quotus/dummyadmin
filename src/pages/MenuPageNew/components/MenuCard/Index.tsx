// src/pages/MenuPageNew/components/MenuCard/Index.tsx

import React, { useState, useRef, useEffect } from 'react';
import './MenuCardNew.css';
import { FoodItem } from '../../../../Types/Menu/Index';
import { EllipsisVertical, ToggleLeft, ToggleRight } from 'lucide-react';
import { RootState } from '../../../../store/store';
import { useSelector } from 'react-redux';
import { updateMenu } from '../../../MenuPage/API/updateMenuItemAPI';
import { BeatLoader } from 'react-spinners';

interface MenuCardProps {
  item: FoodItem;
  onEdit?: (item: FoodItem) => void;
  onDelete?: (item: FoodItem) => void;
  onStatusChange?: (item: FoodItem, status: boolean) => void;
}

const MenuCardNew: React.FC<MenuCardProps> = ({ item, onEdit, onDelete, onStatusChange }) => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [availability, setAvailability] = useState(item.available);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);

  const handleMoreClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleActionClick = (action: string) => {
    setIsDropdownOpen(false);
    switch (action) {
      case 'Edit':
        onEdit?.(item);
        break;
      case 'Delete':
        onDelete?.(item);
        break;
      default:
        break;
    }
  };

  const toggleAvailability = async () => {
    setAvailabilityLoading(true);
    try {
      const updatedMenuItem: FoodItem = {
        ...item,
        available: !availability,
      };

      await updateMenu(updatedMenuItem);
      setAvailability(!availability);
      onStatusChange?.(item, !availability);
    } catch (error) {
      console.error('Error updating availability:', error);
    } finally {
      setAvailabilityLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className={`menu-card-new-container ${isDarkMode ? 'dark' : ''} ${!availability ? 'unavailable' : ''}`}
    >
      <div className="menu-card-new-image-container">
        <img src={item.images[0]} alt={item.name} className="menu-card-new-image" />
      </div>
      <div className="menu-card-new-details">
        <div className="menu-card-new-product">
          <div className="menu-card-new-product-label">Product Name</div>
          <div className="menu-card-new-product-name">{item.name}</div>
          <div className="menu-card-new-product-category">{item.category}</div>
        </div>
        <div className="menu-card-new-delivery">
          <div className="menu-card-new-delivery-label">Delivery Time</div>
          <div className="menu-card-new-delivery-time">
            {item.minPrepTime}-{item.maxPrepTime} mins
          </div>
        </div>
        <div className="menu-card-new-price">
          <div className="menu-card-new-price-label">Price</div>
          <div className="menu-card-new-price-value">${item.price.toFixed(2)}</div>
        </div>
        <div className="menu-card-new-tags">
          <div className="menu-card-new-tags-label">Tag</div>
          <div className="menu-card-new-tags-list">
            {item.tags.map((tag) => (
              <span key={tag} className="menu-card-new-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="menu-card-new-status">
          <div className="menu-card-new-status-label">Status</div>
          <div className="menu-card-new-status-toggle">
            <button
              className={`menu-card-new-toggle ${!availability ? 'menu-card-new-toggle--off' : ''}`}
              onClick={toggleAvailability}
              title={availability ? 'Mark as unavailable' : 'Mark as available'}
            >
              {availabilityLoading ? (
                <div className="menu-card-new-toggle-loader">
                  <BeatLoader margin={2} size={5} color={isDarkMode ? '#fff' : '#333'} />
                </div>
              ) : availability ? (
                <ToggleRight size={26} color="green" />
              ) : (
                <ToggleLeft size={26} color="red" />
              )}
            </button>
          </div>
        </div>
        <div className="menu-card-new-more-container" ref={dropdownRef}>
          <div className="menu-card-new-more" onClick={handleMoreClick}>
            <div className="menu-card-new-more-icon">
              <EllipsisVertical size={15} />
            </div>
          </div>
          {isDropdownOpen && (
            <div className="menu-card-new-dropdown">
              <button onClick={() => handleActionClick('Edit')}>Edit</button>
              <button onClick={() => handleActionClick('Delete')}>Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCardNew;
