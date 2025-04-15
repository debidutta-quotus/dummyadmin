// MenuCardSkeleton.tsx
import React from 'react';
import './MenuCardSkeleton.css';

const MenuCardSkeleton: React.FC = () => {
  return (
    <div className="menu-card-new-container">
      <div className="menu-card-new-image-container skeleton"></div>
      <div className="menu-card-new-details">
        <div className="menu-card-new-product">
          <div className="skeleton-text short"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text short"></div>
        </div>
        <div className="menu-card-new-delivery">
          <div className="skeleton-text short"></div>
          <div className="skeleton-text"></div>
        </div>
        <div className="menu-card-new-price">
          <div className="skeleton-text short"></div>
          <div className="skeleton-text"></div>
        </div>
        <div className="menu-card-new-tags">
          <div className="skeleton-text short"></div>
          <div className="skeleton-tags">
            <div className="skeleton-tag"></div>
            <div className="skeleton-tag"></div>
          </div>
        </div>
        <div className="menu-card-new-status">
          <div className="skeleton-text short"></div>
          <div className="skeleton-toggle"></div>
        </div>
        <div className="menu-card-new-more-container">
          <div className="skeleton-more"></div>
        </div>
      </div>
    </div>
  );
};

export default MenuCardSkeleton;
