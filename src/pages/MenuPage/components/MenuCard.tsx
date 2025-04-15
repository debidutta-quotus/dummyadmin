import React, { useState } from 'react';
import { Clock, Tag, Edit2, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import './MenuCard.css';
import veg from '../../../assets/veg.png';
import nonVeg from '../../../assets/non_veg.png';
import vegan from '../../../assets/vegan.png';
import { BeatLoader } from 'react-spinners';
import { FoodItem } from '../../../Types/Menu/Index';
import { updateMenu } from '../API/updateMenuItemAPI';

interface MenuCardProps extends FoodItem {
  _id: string;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

const MenuCard: React.FC<MenuCardProps> = ({
  _id,
  name,
  description,
  price,
  available: initialAvailability,
  minPrepTime,
  maxPrepTime,
  images,
  tags,
  category,
  dietary,
  onEditClick,
  onDeleteClick,
  maxPossibleOrders,
  storeId,
}) => {
  const [availability, setAvailability] = useState(initialAvailability);
  const [availabilityLoding, setAvailabilityLoading] = useState(false);

  const getDietaryImage = (dietaryType: string) => {
    switch (dietaryType) {
      case 'vegan':
        return { src: vegan, alt: 'Vegan' };
      case 'veg':
        return { src: veg, alt: 'Vegetarian' };
      case 'non-veg':
        return { src: nonVeg, alt: 'Non-vegetarian' };
      default:
        return { src: nonVeg, alt: 'Non-vegetarian' };
    }
  };

  const toggleAvailability = async () => {
    setAvailabilityLoading(true);
    try {
      // Create complete menu item data with toggled availability
      const updatedMenuItem: FoodItem = {
        _id,
        name,
        description,
        price,
        available: !availability,
        minPrepTime,
        maxPrepTime,
        images,
        tags,
        category,
        dietary,
        maxPossibleOrders,
        storeId,
      };

      await updateMenu(updatedMenuItem);
      setAvailability(!availability);
    } catch (error) {
      console.error('Error updating availability:', error);
    } finally {
      setAvailabilityLoading(false);
    }
  };

  const dietaryImage = getDietaryImage(dietary);

  return (
    <div className={`food-card ${!availability ? 'food-card--unavailable' : ''}`}>
      <div className="food-card__image">
        <img src={images[0]} alt={name} />
      </div>
      <div className="food-card__content">
        <div className="food-card__main-info">
          <div className="food-card__header">
            <div className="food-card__title-section">
              <div className="food-card__title-wrapper">
                <div className="food-card__diet-indicator-container">
                  <div className="food-card-veg-non-veg-img-container">
                    <img
                      src={dietaryImage.src}
                      alt={dietaryImage.alt}
                      className="food-card__diet-indicator"
                    />
                  </div>
                </div>
                <h2 className="food-card__title">{name}</h2>
              </div>
              <span className="food-card__category">{category}</span>
            </div>
            <div className="food-card__actions">
              <button
                className="food-card__action-btn food-card__action-btn--edit"
                onClick={onEditClick}
                title="Edit item"
              >
                <Edit2 size={16} />
              </button>
              <button
                className="food-card__action-btn food-card__action-btn--delete"
                onClick={onDeleteClick}
                title="Delete item"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          <p className="food-card__description">{description}</p>
        </div>

        <div className="food-card__details">
          <div className="food-card__meta">
            <div className="food-card__prep-time">
              <Clock size={14} />
              <span>
                {minPrepTime}-{maxPrepTime} mins
              </span>
            </div>
            <div className="food-card__price">${price.toFixed(2)}</div>
            <button
              className={`food-card__toggle ${!availability ? 'food-card__toggle--off' : ''}`}
              onClick={toggleAvailability}
              title={availability ? 'Mark as unavailable' : 'Mark as available'}
            >
              {availabilityLoding ? (
                <BeatLoader margin={6} size={10} />
              ) : availability ? (
                <>
                  <ToggleRight size={20} />
                  <span>Available</span>
                </>
              ) : (
                <>
                  <ToggleLeft size={20} />
                  <span>Unavailable</span>
                </>
              )}
            </button>
          </div>
          <div className="food-card__tags">
            {tags.map((tag, index) => (
              <span key={index} className="food-card__tag">
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
