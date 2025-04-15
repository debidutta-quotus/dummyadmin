import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { X, Upload, Plus, Trash2 } from 'lucide-react';
import './EditMenu.css';
import { FoodItem } from '../../../Types/Menu/Index';
import { AddMenuFormValidator } from '../../../utils/Validator/AddMenuFormValidator';
import { updateMenu } from '../API/updateMenuItemAPI';
import { showErrorToast, showSuccessToast } from '../../../utils/Toast/Toast';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

interface EditMenuProps {
  onClose: () => void;
  onSubmit: (data: FoodItem) => void;
  menuItem: FoodItem;
}

// Default food image URL
const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';

const EditMenu: React.FC<EditMenuProps> = ({ onClose, onSubmit, menuItem }) => {
  const [formData, setFormData] = useState<FoodItem>({
    ...menuItem,
    // Ensure we have at least one image
    images: menuItem.images.length > 0 ? menuItem.images : [DEFAULT_IMAGE],
  });

  const [currentTag, setCurrentTag] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditMenuLoading, setIsEditMenuLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: checked });
    } else if (
      name === 'price' ||
      name === 'minPrepTime' ||
      name === 'maxPrepTime' ||
      name === 'maxPossibleOrders'
    ) {
      setFormData({ ...formData, [name]: parseFloat(value) || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(currentTag.trim())) {
        setFormData({
          ...formData,
          tags: [...formData.tags, currentTag.trim()],
        });
      }
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    // Create a copy of the current images array
    const newImages = [...formData.images];

    // Process each file
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target && typeof e.target.result === 'string') {
            // Check if this is the first upload and we have the default image
            if (newImages.length === 1 && newImages[0] === DEFAULT_IMAGE) {
              // Replace the default image with the uploaded one
              newImages[0] = e.target.result;
            } else {
              // Otherwise add to the array
              newImages.push(e.target.result);
            }

            // Update state with new images array
            setFormData({
              ...formData,
              images: newImages,
            });
          }
        };

        // Reset the file input to ensure the same file can be selected again
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);

    // If all images are removed, add back the default image
    if (newImages.length === 0) {
      newImages.push(DEFAULT_IMAGE);
    }

    setFormData({
      ...formData,
      images: newImages,
    });
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      // Clear the file input value to ensure the change event fires even if the same file is selected
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationResult = AddMenuFormValidator(formData);

    if (validationResult.isValid) {
      try {
        setIsEditMenuLoading(true);
        const responseData = await updateMenu(formData);
        showSuccessToast(responseData.message || 'Menu Updation successful!');
        navigate('/menu');
      } catch (error: any) {
        showErrorToast(error.message || 'Update Menu failed. Please try again.');
      } finally {
        setIsEditMenuLoading(false);
      }
    } else {
      if (validationResult.errors.length > 0) {
        showErrorToast(validationResult.errors[0]);
      }
    }

    onSubmit(formData);
  };

  return (
    <div
      className="edit-menu-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="edit-menu-container">
        <div className="edit-menu-header">
          <h2>Edit Menu Item</h2>
          <button className="edit-menu-close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-menu-form">
          <div className="edit-menu-form-grid">
            <div className="edit-menu-form-column">
              <div className="edit-menu-form-group">
                <label htmlFor="itemName">Item Name</label>
                <input
                  type="text"
                  id="itemName"
                  name="itemName"
                  onChange={handleChange}
                  value={formData.name}
                  required
                  placeholder="e.g. Chicken Tikka"
                />
              </div>

              <div className="edit-menu-form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Describe your dish..."
                  rows={3}
                />
              </div>

              <div className="edit-menu-form-row">
                <div className="edit-menu-form-group">
                  <label htmlFor="price">Price ($)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price || ''}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>

                <div className="edit-menu-form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="Appetizer">Appetizer</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Beverage">Beverage</option>
                    <option value="Side Dish">Side Dish</option>
                  </select>
                </div>
              </div>

              <div className="edit-menu-form-row">
                <div className="edit-menu-form-group">
                  <label htmlFor="minPrepTime">Min Prep Time (mins)</label>
                  <input
                    type="number"
                    id="minPrepTime"
                    name="minPrepTime"
                    value={formData.minPrepTime || ''}
                    onChange={handleChange}
                    required
                    min="0"
                    placeholder="0"
                  />
                </div>

                <div className="edit-menu-form-group">
                  <label htmlFor="maxPrepTime">Max Prep Time (mins)</label>
                  <input
                    type="number"
                    id="maxPrepTime"
                    name="maxPrepTime"
                    value={formData.maxPrepTime || ''}
                    onChange={handleChange}
                    required
                    min="0"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="edit-menu-form-row">
                <div className="edit-menu-form-group">
                  <label htmlFor="maxPossibleOrders">Max Possible Orders</label>
                  <input
                    type="number"
                    id="maxPossibleOrders"
                    name="maxPossibleOrders"
                    value={formData.maxPossibleOrders || ''}
                    onChange={handleChange}
                    required
                    min="0"
                    placeholder="0"
                  />
                </div>

                <div className="add-menu-form-group">
                  <label htmlFor="dietary">Dietary Type</label>
                  <select
                    id="dietary"
                    name="dietary"
                    value={formData.dietary}
                    onChange={handleChange}
                    required
                  >
                    <option value="vegan">Vegan</option>
                    <option value="veg">Vegetarian</option>
                    <option value="non-veg">Non-Vegetarian</option>
                  </select>
                </div>

                {/* <div className="edit-menu-form-group edit-menu-checkbox-group">
                  <label htmlFor="isVeg" className="edit-menu-checkbox-label">
                    <input
                      type="checkbox"
                      id="isVeg"
                      name="isVeg"
                      // checked={formData.isVeg}
                      onChange={handleChange}
                    />
                    <span>Vegetarian</span>
                  </label>
                </div> */}
              </div>
            </div>

            <div className="edit-menu-form-column">
              <div className="edit-menu-form-group">
                <label>Tags</label>
                <div className="edit-menu-tags-input-container">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder="Add tags and press Enter"
                  />
                  <div className="edit-menu-tags-container">
                    {formData.tags.map((tag, index) => (
                      <div key={index} className="edit-menu-tag">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)}>
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="edit-menu-form-group">
                <label>Images</label>
                <div
                  className={`edit-menu-image-upload-area ${isDragging ? 'edit-menu-dragging' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={triggerFileInput}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInput}
                    accept="image/*"
                    multiple
                    hidden
                  />
                  <Upload size={36} strokeWidth={1.5} />
                  <p>Drag & drop images here or click to browse</p>
                </div>

                {formData.images.length > 0 && (
                  <div className="edit-menu-image-preview-container">
                    {formData.images.map((image, index) => (
                      <div key={index} className="edit-menu-image-preview">
                        <img src={image} alt={`Preview ${index}`} />
                        <button
                          type="button"
                          className="edit-menu-remove-image"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(index);
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    {formData.images.length < 5 && (
                      <button
                        type="button"
                        className="edit-menu-add-more-images"
                        onClick={(e) => {
                          e.stopPropagation();
                          triggerFileInput();
                        }}
                      >
                        <Plus size={28} strokeWidth={1.5} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="edit-menu-form-actions">
            <button type="button" className="edit-menu-cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="add-menu-submit-button">
              {!isEditMenuLoading ? (
                'Update Menu Item'
              ) : (
                <PulseLoader color="#fff" margin={5} size={5} />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMenu;
