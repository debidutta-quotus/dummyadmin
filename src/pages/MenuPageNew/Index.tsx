import React, { useEffect, useMemo, useState } from 'react';
import './MenuPageNew.css';
import { FoodItem } from '../../Types/Menu/Index';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { usePagination } from '../../hooks/usePagination';
import Pagination from '../../common/Pagination/Index';
import { getMenuItems } from './API/getMenuItemsAPI';
import CategorySkeleton from './components/SkeletonLoader/CategorySkeleton/CategorySkeleton';
import MenuCardSkeleton from './components/SkeletonLoader/MenuCardSkeleton/MenuCardSkeleton';
import { PlusCircle as CirclePlus } from 'lucide-react';
import CRUDFormContainer from './components/CrudForm/Index';
import MenuCardNew from './components/MenuCard/Index';
import { deleteMenu } from './API/deleteMenuItemAPI'; // Import the deleteMenu API
import ConfirmationModal from '../../utils/Modal/ConfirmationModal'; // Import the ConfirmationModal component

const ITEMS_PER_PAGE = 6;

const MenuPageNew: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [menus, setMenus] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<FoodItem | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const items = await getMenuItems();
        setMenus(items);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch menu items');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(menus.map((item) => item.category));
    return ['All Categories', ...Array.from(uniqueCategories)].sort((a, b) => {
      if (a === 'All Categories') return -1;
      if (b === 'All Categories') return 1;
      return a.localeCompare(b);
    });
  }, [menus]);

  const filteredMenus =
    activeCategory === 'All Categories'
      ? menus
      : menus.filter((item) => item.category === activeCategory);

  const { currentPage, totalPages, nextPage, prevPage, goToPage } = usePagination({
    totalItems: filteredMenus.length,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredMenus.slice(startIndex, endIndex);

  const handleAddClick = () => {
    setFormMode('add');
    setSelectedItem(null);
    setShowForm(true);
  };

  const handleEditClick = (item: FoodItem) => {
    setFormMode('edit');
    setSelectedItem(item);
    setShowForm(true);
  };

  const handleFormSubmit = (data: FoodItem) => {
    if (formMode === 'add') {
      setMenus([...menus, data]);
    } else {
      setMenus(menus.map((item) => (item._id === data._id ? data : item)));
    }
    setShowForm(false);
  };

  const openConfirmationModal = (item: FoodItem) => {
    setItemToDelete(item);
    setIsConfirmationOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationOpen(false);
    setItemToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      try {
        setIsLoading(true);
        setError(null);
        await deleteMenu(itemToDelete);
        setMenus((prevMenus) => prevMenus.filter((menuItem) => menuItem._id !== itemToDelete._id));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete menu item');
      } finally {
        setIsLoading(false);
        closeConfirmationModal();
      }
    }
  };

  if (error) {
    return (
      <div className="menu-page-resto-error">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className={`menu-page-resto-container ${isDarkMode ? 'dark' : ''}`}>
      <div className="menu-page-resto-header-container">
        <div className="menu-page-resto-header-title-add-menu-container">
          <h1>Menu Management</h1>
          <div className="menu-page-resto-add-menu-button-container">
            <button className="menu-page-resto-add-menu-button" onClick={handleAddClick}>
              <CirclePlus size={15} /> Add Menu
            </button>
          </div>
        </div>
      </div>

      <div className="menu-page-resto-category-sidebar-and-menu-list-container">
        {isLoading ? (
          <CategorySkeleton />
        ) : (
          <aside className="menu-page-resto-category-sidebar">
            <ul className="menu-page-resto-category-list">
              {categories.map((category) => (
                <li
                  key={category}
                  className={`menu-page-resto-category-item ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(category);
                    goToPage(1);
                  }}
                >
                  <div className="menu-page-resto-category-name-container">{category}</div>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <main className="menu-page-resto-content">
          <div className="menu-page-resto-header">
            <div className="menu-page-resto-category-dropdown">
              <label htmlFor="category-select">Select Category:</label>
              <select
                id="category-select"
                value={activeCategory}
                onChange={(e) => {
                  setActiveCategory(e.target.value);
                  goToPage(1);
                }}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="menu-page-resto-list">
            {isLoading ? (
              [...Array(6)].map((_, index) => <MenuCardSkeleton key={index} />)
            ) : currentItems.length === 0 ? (
              <div className="menu-page-resto-empty-state">
                <p>No menu items found in this category.</p>
              </div>
            ) : (
              currentItems.map((item: FoodItem) => (
                <MenuCardNew
                  key={item._id}
                  item={item}
                  onEdit={() => handleEditClick(item)}
                  onDelete={() => openConfirmationModal(item)} // Open confirmation modal on delete click
                />
              ))
            )}
          </div>

          {!isLoading && currentItems.length > 0 && (
            <div className="menu-page-resto-pagination">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                prevPage={prevPage}
                nextPage={nextPage}
                goToPage={goToPage}
              />
            </div>
          )}
        </main>
      </div>

      {showForm && (
        <CRUDFormContainer
          mode={formMode}
          menuItem={selectedItem}
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        header="Delete Menu Item?"
        message={`Are you sure you want to delete "${itemToDelete?.name}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={closeConfirmationModal}
        onRequestClose={closeConfirmationModal}
        proceedBtnText="Delete"
        closeBtnText="Cancel"
      />
    </div>
  );
};

export default MenuPageNew;
