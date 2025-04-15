import React from 'react';
import './AcceptedOrderCard.css';
import { Order } from '../../../../Types';
import CountdownTimer from '../CountDownPickup/CountdownTimer';

interface AcceptedOrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, status: Order['orderStatus']) => Promise<void>;
  onClick: () => void;
}

const getTimeDifference = (dateString: string) => {
  const orderDate = new Date(dateString);
  const now = new Date();
  const diffMinutes = Math.floor((now.getTime() - orderDate.getTime()) / 60000);

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes === 1) return '1 minute ago';
  if (diffMinutes < 60) return `${diffMinutes} minutes ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours === 1) return '1 hour ago';
  return `${diffHours} hours ago`;
};

const getStatusTag = (status: string | undefined) => {
  switch (status) {
    case 'accept':
      return <span className="status-tag status-pending">Accepted</span>;
    case 'preparing':
      return <span className="status-tag status-preparing">Preparing</span>;
    case 'ready':
      return <span className="status-tag status-completed">Ready </span>;
    case 'dispatched':
      return <span className="status-tag status-dispatched">Dispatched</span>;
    default:
      return <span className="status-tag status-pending">Pending</span>;
  }
};

const AcceptedOrderCard: React.FC<AcceptedOrderCardProps> = ({ order, onClick }) => {
  return (
    <div className="order-card order-card-accepted-order" onClick={onClick}>
      <div className="order-id">{order.orderId}</div>

      <div className="order-meta">
        <div className="order-time">{getTimeDifference(order.pickUpTime)}</div>
        <div className="customer-name">{order.customerDetails.name}</div>
      </div>

      <div className="order-details">
        <div className="detail-row">
          <span className="detail-label">Items:</span>
          <span className="detail-value">{order.orderDetails.length}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Status:</span>
          <span className="detail-value">{getStatusTag(order.orderStatus)}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Pickup in:</span>
          <span className="detail-value">
            <CountdownTimer pickupTime={order.pickUpTime} />
          </span>
        </div>
      </div>

      <div className="order-items">
        {order.orderDetails.map((item) => (
          <div className="item" key={item._id}>
            <span className="item-name">
              {item.menuId && item.menuId.name ? item.menuId.name : 'Unknown Item'}
            </span>
            <span className="item-quantity">x{item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="order-total">
        <span>Total</span>
        <span>${order.totalAmount.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default AcceptedOrderCard;
