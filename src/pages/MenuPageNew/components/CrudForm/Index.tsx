import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { X, Upload, Plus, Trash2 } from 'lucide-react';
import './CrudForm.css';
import { FoodItem } from '../../../../Types/Menu/Index';
import { AddMenuFormValidator } from '../../../../utils/Validator/AddMenuFormValidator';
import { showErrorToast, showSuccessToast } from '../../../../utils/Toast/Toast';
import { useNavigate } from 'react-router-dom';
import { addMenu } from '../../API/addMenuItemAPI';
import { PulseLoader } from 'react-spinners';
import { updateMenu } from '../../API/updateMenuItemAPI';

interface CRUDFormContainerProps {
  onClose: () => void;
  onSubmit: (data: FoodItem) => void;
  menuItem?: FoodItem | null;
  mode: 'add' | 'edit';
}

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80';

const CRUDFormContainer: React.FC<CRUDFormContainerProps> = ({
  onClose,
  onSubmit,
  menuItem,
  mode,
}) => {
  const [formData, setFormData] = useState<FoodItem>(
    menuItem || {
      name: '',
      description: '',
      price: 0,
      minPrepTime: 0,
      maxPrepTime: 0,
      maxPossibleOrders: 1,
      images: [DEFAULT_IMAGE],
      tags: [],
      category: 'Appetizer',
      dietary: 'non-veg',
      available: true,
    }
  );

  const [currentTag, setCurrentTag] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    const newImages = [...formData.images];

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target && typeof e.target.result === 'string') {
            if (newImages.length === 1 && newImages[0] === DEFAULT_IMAGE) {
              newImages[0] = e.target.result;
            } else {
              newImages.push(e.target.result);
            }

            setFormData({
              ...formData,
              images: newImages,
            });
          }
        };

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
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationResult = AddMenuFormValidator(formData);

    if (validationResult.isValid) {
      try {
        setIsLoading(true);
        const responseData = mode === 'add' ? await addMenu(formData) : await updateMenu(formData);

        showSuccessToast(
          responseData.message || `Menu ${mode === 'add' ? 'Addition' : 'Update'} successful!`
        );
        navigate('/menus');
      } catch (error: any) {
        showErrorToast(
          error.message ||
            `Menu ${mode === 'add' ? 'Addition' : 'Update'} failed. Please try again.`
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      if (validationResult.errors.length > 0) {
        showErrorToast(validationResult.errors[0]);
      }
    }

    onSubmit(formData);
  };

  return (
    <div className="crud-form-overlay">
      <div className="crud-form-container">
        <div className="crud-form-header">
          <h2>{mode === 'add' ? 'Add New Item' : 'Edit Item'}</h2>
          <button className="crud-form-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="crud-form">
          <div className="crud-form-field">
            <label htmlFor="name">Item Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Chicken Tikka"
            />
          </div>

          <div className="crud-form-field">
            <label htmlFor="tags">Tags</label>
            <div className="crud-form-tags-input-container">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Add tags and press Enter"
              />
              {formData.tags.length > 0 && (
                <div className="crud-form-tags-container">
                  {formData.tags.map((tag, index) => (
                    <div key={`${tag}-${index}`} className="crud-form-tag">
                      {' '}
                      {/* Use more robust key */}
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        aria-label={`Remove tag ${tag}`} // Accessibility
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="crud-form-row">
            <div className="crud-form-field">
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

            <div className="crud-form-field">
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

          <div className="crud-form-row">
            <div className="crud-form-field">
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

            <div className="crud-form-field">
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

          <div className="crud-form-row">
            <div className="crud-form-field">
              <label htmlFor="maxPossibleOrders">Max Possible Orders</label>
              <input
                type="number"
                id="maxPossibleOrders"
                name="maxPossibleOrders"
                value={formData.maxPossibleOrders || ''}
                onChange={handleChange}
                required
                min="1"
                placeholder="1"
              />
            </div>

            <div className="crud-form-field">
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
          </div>

          <div className="crud-form-field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe your dish..."
              rows={4}
            />
          </div>

          <div className="crud-form-field">
            <label>Image</label>
            <div
              className={`crud-form-image-upload-area ${isDragging ? 'crud-form-dragging' : ''}`}
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
              <Upload size={24} strokeWidth={1.5} />
              <p>Drag and drop image here or click to browse</p>
            </div>

            {formData.images.length > 0 && (
              <div className="crud-form-image-preview-container">
                {formData.images.map((image, index) => (
                  <div key={index} className="crud-form-image-preview">
                    <img src={image} alt={`Preview ${index}`} />
                    <button
                      type="button"
                      className="crud-form-remove-image"
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
                    className="crud-form-add-more-images"
                    onClick={triggerFileInput}
                  >
                    <Plus size={24} strokeWidth={1.5} />
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="crud-form-actions">
            <button type="button" className="crud-form-cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="crud-form-submit-button">
              {!isLoading ? (
                mode === 'add' ? (
                  'Add Item'
                ) : (
                  'Update Item'
                )
              ) : (
                <PulseLoader color="#fff" margin={5} size={4} />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CRUDFormContainer;
