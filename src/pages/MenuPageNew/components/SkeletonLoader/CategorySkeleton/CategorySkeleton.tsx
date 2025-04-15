// CategorySkeleton.tsx
import React from 'react';
import './CategorySkeleton.css';

const CategorySkeleton: React.FC = () => {
  return (
    <div className="menu-page-resto-category-sidebar">
      <ul className="menu-page-resto-category-list">
        {[...Array(8)].map((_, index) => (
          <li key={index} className="menu-page-resto-category-item skeleton-item">
            <div className="skeleton-text"></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySkeleton;
