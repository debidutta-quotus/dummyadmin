import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import ActionButtons from '../UI/NavbarActionButtons/Index';
import './Navbar.css';

const NavbarComponent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const scrollPosition = useScrollPosition();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className={`navbar-component ${scrollPosition > 10 ? 'navbar-component-scrolled' : ''}`}>
      <div className="navbar-component-search">
        <input
          type="text"
          placeholder="Enter your search request..."
          className="navbar-component-search-input"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <span className="navbar-component-search-icon">
          <Search size={16} />
        </span>
      </div>

      <ActionButtons className="navbar-actions" />
    </nav>
  );
};

export default NavbarComponent;
