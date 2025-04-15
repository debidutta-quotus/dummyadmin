import React, { useEffect, useState } from 'react';
import { X, ChefHat, Package, Truck, Clock } from 'lucide-react';
import { Order } from '../../../../Types';
import './OrderStatusModal.css';

interface OrderStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
  onStatusChange: (orderId: string, status: Order['orderStatus']) => void;
  isAcceptedOrderStatusLoading: boolean;
}

const OrderStatusModal: React.FC<OrderStatusModalProps> = ({
  isOpen,
  onClose,
  order,
  onStatusChange,
  isAcceptedOrderStatusLoading,
}) => {
  const [isChangingStatus, setIsChangingStatus] = useState(false);

  useEffect(() => {
    // Close modal only when loading ends after a status change
    if (isChangingStatus && !isAcceptedOrderStatusLoading) {
      setIsChangingStatus(false);
      onClose();
    }
  }, [isAcceptedOrderStatusLoading, isChangingStatus, onClose]);

  const handleStatusChange = (orderId: string, status: Order['orderStatus']) => {
    setIsChangingStatus(true);
    onStatusChange(orderId, status);
  };

  const getStatusButton = () => {
    const isLoading = isAcceptedOrderStatusLoading;

    const commonProps = {
      disabled: isLoading,
      className: `order-status-modal-button ${isLoading ? 'loading' : ''}`,
    };

    switch (order.orderStatus) {
      case 'accept':
        return (
          <button {...commonProps} onClick={() => handleStatusChange(order.orderId, 'preparing')}>
            {isLoading ? (
              'Processing...'
            ) : (
              <>
                <ChefHat size={16} /> Start Preparing
              </>
            )}
          </button>
        );
      case 'preparing':
        return (
          <button {...commonProps} onClick={() => handleStatusChange(order.orderId, 'ready')}>
            {isLoading ? (
              'Processing...'
            ) : (
              <>
                <Package size={16} /> Complete Preparation
              </>
            )}
          </button>
        );
      case 'ready':
        return (
          <button {...commonProps} onClick={() => handleStatusChange(order.orderId, 'dispatched')}>
            {isLoading ? (
              'Processing...'
            ) : (
              <>
                <Truck size={16} /> Ready to Dispatch
              </>
            )}
          </button>
        );
      case 'dispatched':
        return null;
      default:
        return (
          <button {...commonProps} onClick={() => handleStatusChange(order.orderId, 'preparing')}>
            {isLoading ? (
              'Processing...'
            ) : (
              <>
                <ChefHat size={16} /> Start Preparing
              </>
            )}
          </button>
        );
    }
  };

  const getStatusTag = (status: Order['orderStatus']) => {
    switch (status) {
      case 'accept':
        return 'Accepted';
      case 'preparing':
        return 'Preparing';
      case 'ready':
        return 'Ready';
      case 'dispatched':
        return 'Dispatched';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const formatPickupTime = (pickupTime: string) => {
    const pickup = new Date(pickupTime);
    const now = new Date();
    const diffMinutes = Math.floor((pickup.getTime() - now.getTime()) / 60000);

    if (diffMinutes < 0) return 'ASAP';
    if (diffMinutes < 60) return `${diffMinutes} minutes`;

    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    if (hours === 1) {
      return minutes > 0 ? `1 hour ${minutes} minutes` : '1 hour';
    }

    return minutes > 0 ? `${hours} hours ${minutes} minutes` : `${hours} hours`;
  };

  if (!isOpen) return null;

  return (
    <div className="order-status-modal-overlay" onClick={onClose}>
      <div className="order-status-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="order-status-modal-header">
          <h2>Order Status</h2>
          <button className="order-status-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="order-status-modal-content">
          <div className="order-status-modal-info">
            <div className="order-status-modal-order-header">
              <div className="order-status-modal-order-id">Order ID: {order.orderId}</div>
              <div className="order-status-modal-pickup-time">
                <Clock size={16} />
                Pickup in: {formatPickupTime(order.pickUpTime)}
              </div>
            </div>

            <div className="order-status-modal-status-section">
              <span
                className={`order-status-modal-tag order-status-modal-tag-${order.orderStatus}`}
              >
                {getStatusTag(order.orderStatus)}
              </span>
            </div>

            <div className="order-status-modal-customer">
              <h3>Customer Details</h3>
              <p>{order.customerDetails.name}</p>
              <p>{order.customerDetails.phone}</p>
              <p>{order.customerDetails.email}</p>
            </div>

            <div className="order-status-modal-items">
              <h3>Order Items</h3>
              {order.orderDetails.map((item) => (
                <div key={item._id} className="order-status-modal-item">
                  <span className="item-name">
                    {item.menuId && item.menuId.name ? item.menuId.name : 'Unknown Item'}
                  </span>
                  <span className="order-status-modal-item-quantity">x{item.quantity}</span>
                  <span className="order-status-modal-item-price">${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="order-status-modal-total">
              <span>Total Amount</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="order-status-modal-actions">{getStatusButton()}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusModal;
