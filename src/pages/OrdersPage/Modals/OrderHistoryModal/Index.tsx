import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, History, User, Phone, Mail, Search } from 'lucide-react';
import './OrderHistoryModal.css';
import { Order } from '../../../../Types';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  historyOrders: Order[];
  filter: 'all' | 'uber' | 'doordash' | 'grubhub';
  getTimeDifference: (dateString: string) => string;
}

const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  isOpen,
  onClose,
  historyOrders,
  filter,
  getTimeDifference,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showTopScroll, setShowTopScroll] = useState(false);
  const [showBottomScroll, setShowBottomScroll] = useState(true);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const handleModalScroll = () => {
    if (modalContentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = modalContentRef.current;
      setShowTopScroll(scrollTop > 10);
      setShowBottomScroll(scrollTop + clientHeight < scrollHeight - 10);
    }
  };

  // Initialize scroll indicators when modal opens
  useEffect(() => {
    if (isOpen && modalContentRef.current) {
      handleModalScroll();
    }
  }, [isOpen, historyOrders]);

  const filteredOrders = historyOrders.filter(
    (order: any) =>
      (filter === 'all' || order.channelId === filter) &&
      (searchTerm === '' ||
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerDetails.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.items &&
          order.items.some((item: any) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )))
  );

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  if (!isOpen) return null;

  return (
    <div className="history-modal-overlay" onClick={onClose}>
      <div className="history-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Order History</h2>

          <div className="modal-search">
            <div className="search-input-container">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search orders by ID, customer, or items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button className="clear-search" onClick={() => setSearchTerm('')}>
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-content-wrapper">
          <div
            className={`scroll-indicator scroll-indicator-top ${showTopScroll ? 'visible' : ''}`}
            aria-hidden="true"
          />

          <div ref={modalContentRef} className="modal-content" onScroll={handleModalScroll}>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order: any) => (
                <motion.div
                  key={order.orderId}
                  className="order-card history-card"
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <div className={`partner-label partner-${order.channelId}`}>
                    {order.channelId === 'uber'
                      ? 'UBER EATS'
                      : order.channelId === 'doordash'
                        ? 'DOORDASH'
                        : 'GRUBHUB'}
                  </div>
                  <div className="order-id">{order.orderId}</div>
                  <div className="order-meta">
                    <div className="order-time">{getTimeDifference(order.timestamp)}</div>
                    <div className="customer-name">{order.customerDetails.name}</div>
                  </div>

                  <div className="customer-details-expanded">
                    <div className="customer-detail">
                      <User size={14} />
                      <span>{order.customerDetails.name}</span>
                    </div>
                    <div className="customer-detail">
                      <Phone size={14} />
                      <span>{order.customerDetails.phone}</span>
                    </div>
                    <div className="customer-detail">
                      <Mail size={14} />
                      <span>{order.customerDetails.email}</span>
                    </div>
                  </div>

                  <div className="order-details">
                    <div className="detail-row">
                      <span className="detail-label">Items:</span>
                      <span className="detail-value">{order.quantity}</span>
                    </div>
                  </div>

                  {order.items && (
                    <div className="order-items">
                      {order.items.map((item: any, index: any) => (
                        <div className="item" key={index}>
                          <span className="item-name">{item.name}</span>
                          <span className="item-quantity">x{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="order-total">
                    <span>Total</span>
                    <span>${order.totalAmount.toFixed(2)}</span>
                  </div>

                  <div
                    className={`completed-label ${order.orderStatus === 'completed' ? 'completed-success' : 'completed-rejected'}`}
                  >
                    {order.orderStatus === 'ready' ? (
                      <>
                        <Check size={16} /> Completed
                      </>
                    ) : (
                      <>
                        <X size={16} /> Rejected
                      </>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="empty-history">
                <History size={48} />
                <p>No order history available</p>
              </div>
            )}
          </div>

          <div
            className={`scroll-indicator scroll-indicator-bottom ${showBottomScroll ? 'visible' : ''}`}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryModal;
