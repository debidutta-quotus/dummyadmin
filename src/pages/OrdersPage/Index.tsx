import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  X,
  Clock,
  Package,
  History,
  ChefHat,
  User,
  Phone,
  Mail,
  ChevronDown,
} from 'lucide-react';
import { PulseLoader } from 'react-spinners';
import './OrdersPage.css';
import { showErrorToast, showInfoToast, showSuccessToast } from '../../utils/Toast/Toast';
import { Order } from '../../Types/index';
import OrderStatusModal from './Modals/OrderStatusModal/Index';
import OrderHistoryModal from './Modals/OrderHistoryModal/Index';
import { getOrders, updateOrderStatus } from './API/getOrdersAPI';
import AcceptedOrderCard from './components/AcceptedOrderCard/AcceptedOrderCard';
import CountdownTimer from './components/CountDownPickup/CountdownTimer';
import Cookies from 'js-cookie';

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<'all' | 'uber' | 'doordash' | 'grubhub'>('all');
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [showCustomerDetails, setShowCustomerDetails] = useState<string | null>(null);
  const [showPartnerDropdown, setShowPartnerDropdown] = useState(false);
  const [loadingAcceptOrders, setLoadingAcceptOrders] = useState<string[]>([]);
  const [loadingRejectOrders, setLoadingRejectOrders] = useState<string[]>([]);
  const [isAcceptedOrderStatusLoading, setIsAcceptedOrderStatusLoading] = useState(false);

  const token = Cookies.get('token');

  // Sort orders by updatedAt timestamp
  const sortByUpdatedAt = (orders: Order[]) => {
    return [...orders].sort(
      (a, b) => new Date(b.pickUpTime).getTime() - new Date(a.pickUpTime).getTime()
    );
  };

  // Filter and sort orders for each column
  const newOrders = sortByUpdatedAt(orders.filter((order) => order.orderStatus === 'pending'));

  const acceptedOrders = sortByUpdatedAt(
    orders.filter(
      (order) =>
        order.orderStatus === 'accept' ||
        order.orderStatus === 'preparing' ||
        order.orderStatus === 'ready'
    )
  );

  const historyOrders = sortByUpdatedAt(
    orders.filter((order) => order.orderStatus === 'dispatched' || order.orderStatus === 'reject')
  );

  const getLatestOrders = async () => {
    try {
      const response = await getOrders(token);
      setOrders(response);
    } catch (error) {
      console.error('Error fetching orders:', error);
      showErrorToast('Failed to fetch orders');
    }
  };

  useEffect(() => {
    getLatestOrders();
    // Set up polling to refresh orders every 5 Second
    const interval = setInterval(getLatestOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle order status change
  const handleStatusChange = async (orderId: string, status: Order['orderStatus']) => {
    try {
      setLoadingAcceptOrders((prev) => [...prev, orderId]);
      setIsAcceptedOrderStatusLoading(true);
      const response = await updateOrderStatus(orderId, status, token);
      if (response.success) {
        setOrders((prev) =>
          prev.map((order) => {
            if (order.orderId === orderId) {
              return {
                ...order,
                orderStatus: status,
                pickUpTime: new Date().toISOString(),
              };
            }
            return order;
          })
        );

        // Show appropriate toast message
        switch (status) {
          case 'preparing':
            showInfoToast(`Order ${orderId} is now being prepared`);
            break;
          case 'ready':
            showSuccessToast(`Order ${orderId} preparation is complete`);
            break;
          case 'dispatched':
            showSuccessToast(`Order ${orderId} has been dispatched`);
            break;
        }
      } else {
        showErrorToast('Failed to update order status');
      }
    } catch (error) {
      showErrorToast('Error updating order status');
      console.error('Error updating status:', error);
    } finally {
      setLoadingAcceptOrders((prev) => prev.filter((id) => id !== orderId));
      setIsAcceptedOrderStatusLoading(false);
    }
  };

  // Accept an order
  const handleAccept = async (orderId: string) => {
    try {
      setLoadingAcceptOrders((prev) => [...prev, orderId]);
      const response = await updateOrderStatus(orderId, 'accept', token);
      if (response.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order.orderId === orderId
              ? {
                  ...order,
                  orderStatus: 'accept',
                  pickUpTime: new Date().toISOString(),
                }
              : order
          )
        );
        showSuccessToast(`Order ${orderId} has been accepted`);
      } else {
        showErrorToast('Failed to accept order');
      }
    } catch (error) {
      showErrorToast('Error accepting order');
      console.error('Error accepting order:', error);
    } finally {
      setLoadingAcceptOrders((prev) => prev.filter((id) => id !== orderId));
    }
  };

  // Reject an order
  const handleReject = async (orderId: string) => {
    try {
      setLoadingRejectOrders((prev) => [...prev, orderId]);
      const response = await updateOrderStatus(orderId, 'reject', token);
      if (response.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order.orderId === orderId
              ? {
                  ...order,
                  orderStatus: 'reject',
                  pickUpTime: new Date().toISOString(),
                }
              : order
          )
        );
        showErrorToast(`Order ${orderId} has been rejected`);
      } else {
        showErrorToast('Failed to reject order');
      }
    } catch (error) {
      showErrorToast('Error rejecting order');
      console.error('Error rejecting order:', error);
    } finally {
      setLoadingRejectOrders((prev) => prev.filter((id) => id !== orderId));
    }
  };

  // Open status modal for an order
  const openStatusModal = (order: Order) => {
    setSelectedOrder(order);
    setIsStatusModalOpen(true);
  };

  // Toggle customer details visibility
  const toggleCustomerDetails = (orderId: string) => {
    if (showCustomerDetails === orderId) {
      setShowCustomerDetails(null);
    } else {
      setShowCustomerDetails(orderId);
    }
  };

  // Calculate time difference
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

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  // Toggle history modal
  const toggleHistoryModal = () => {
    setShowHistoryModal(!showHistoryModal);
  };

  // Toggle partner dropdown
  const togglePartnerDropdown = () => {
    setShowPartnerDropdown(!showPartnerDropdown);
  };

  // Select partner filter
  const selectPartner = (partner: 'all' | 'uber' | 'doordash' | 'grubhub') => {
    setFilter(partner);
    setShowPartnerDropdown(false);
  };

  return (
    <div className="orders-container">
      <header className="orders-header">
        <h1 className="orders-title">Order Management</h1>

        <div className="orders-filters">
          <button
            className={`filter-button ${!showHistoryModal ? 'active' : ''}`}
            onClick={() => setShowHistoryModal(false)}
          >
            <ChefHat size={16} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }} />
            Active Orders
          </button>
          <button
            className={`filter-button ${showHistoryModal ? 'active' : ''}`}
            onClick={toggleHistoryModal}
          >
            <History size={16} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }} />
            Order History
          </button>

          {/* Partner dropdown */}
          <div className="partner-dropdown-container">
            <button
              className={`filter-button ${filter !== 'all' ? 'active' : ''}`}
              onClick={togglePartnerDropdown}
            >
              {filter === 'all'
                ? 'All Partners'
                : filter === 'uber'
                  ? 'Uber Eats'
                  : filter === 'doordash'
                    ? 'DoorDash'
                    : 'Grubhub'}
              <ChevronDown size={16} style={{ marginLeft: '4px', verticalAlign: 'text-bottom' }} />
            </button>

            {showPartnerDropdown && (
              <div className="partner-dropdown">
                <button
                  className={`dropdown-item ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => selectPartner('all')}
                >
                  All Partners
                </button>
                <button
                  className={`dropdown-item ${filter === 'uber' ? 'active' : ''}`}
                  onClick={() => selectPartner('uber')}
                >
                  Uber Eats
                </button>
                <button
                  className={`dropdown-item ${filter === 'doordash' ? 'active' : ''}`}
                  onClick={() => selectPartner('doordash')}
                >
                  DoorDash
                </button>
                <button
                  className={`dropdown-item ${filter === 'grubhub' ? 'active' : ''}`}
                  onClick={() => selectPartner('grubhub')}
                >
                  Grubhub
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="orders-content">
        {/* New Orders Column */}
        <div className="orders-column">
          <div className="column-header">
            New Orders <span className="count">{newOrders.length}</span>
          </div>

          <AnimatePresence>
            {newOrders.length > 0 ? (
              newOrders.map((order) => (
                <motion.div
                  key={order.orderId}
                  className="order-card"
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  layout
                >
                  <div className="order-id">{order.orderId}</div>

                  <div className="order-meta">
                    <div className="order-time">{getTimeDifference(order.pickUpTime)}</div>
                    <button
                      className="customer-details-toggle"
                      onClick={() => toggleCustomerDetails(order.orderId)}
                    >
                      <User size={14} /> {order.customerDetails.name}
                    </button>
                  </div>

                  {showCustomerDetails === order.orderId && (
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
                  )}

                  <div className="order-details">
                    <div className="detail-row">
                      <span className="detail-label">Items:</span>
                      <span className="detail-value">{order.orderDetails.length}</span>
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

                  <div className="order-actions">
                    <button
                      className="action-button accept-button"
                      onClick={() => handleAccept(order.orderId)}
                      disabled={
                        loadingAcceptOrders.includes(order.orderId) ||
                        loadingRejectOrders.includes(order.orderId)
                      }
                    >
                      {loadingAcceptOrders.includes(order.orderId) ? (
                        <PulseLoader color="#ffffff" size={8} margin={4} />
                      ) : (
                        <>
                          <Check size={16} /> Accept
                        </>
                      )}
                    </button>
                    <button
                      className="action-button reject-button"
                      onClick={() => handleReject(order.orderId)}
                      disabled={
                        loadingAcceptOrders.includes(order.orderId) ||
                        loadingRejectOrders.includes(order.orderId)
                      }
                    >
                      {loadingRejectOrders.includes(order.orderId) ? (
                        <PulseLoader color="#ffffff" size={8} margin={4} />
                      ) : (
                        <>
                          <X size={16} /> Reject
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="empty-column">
                <Clock className="empty-icon" />
                <div className="empty-text">No new orders</div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Accepted Orders Column */}
        <div className="orders-column">
          <div className="column-header">
            Accepted Orders <span className="count">{acceptedOrders.length}</span>
          </div>

          <AnimatePresence>
            {acceptedOrders.length > 0 ? (
              acceptedOrders.map((order) => (
                <motion.div
                  key={order.orderId}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  layout
                >
                  <AcceptedOrderCard
                    order={order}
                    onStatusChange={handleStatusChange}
                    onClick={() => openStatusModal(order)}
                  />
                </motion.div>
              ))
            ) : (
              <div className="empty-column">
                <Package className="empty-icon" />
                <div className="empty-text">No accepted orders</div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Recent Activity Column */}
        <div className="orders-column recent-activity">
          <div className="column-header">
            Recent Activity <span className="count">{historyOrders.slice(0, 3).length}</span>
          </div>

          <AnimatePresence>
            {historyOrders.length > 0 ? (
              historyOrders.slice(0, 3).map((order) => (
                <motion.div
                  key={order.orderId}
                  className="order-card mini-card"
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  layout
                >
                  <div className="order-id">{order.orderId}</div>
                  <div className="order-meta">
                    <div className="order-time mini">{getTimeDifference(order.pickUpTime)}</div>
                    <div className="mini-total">${order.totalAmount.toFixed(2)}</div>
                  </div>

                  <div
                    className={`completed-label ${
                      order.orderStatus === 'dispatched'
                        ? 'completed-success'
                        : 'completed-rejected'
                    }`}
                  >
                    {order.orderStatus === 'dispatched' ? (
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
              <div className="empty-column">
                <History className="empty-icon" />
                <div className="empty-text">No recent activity</div>
              </div>
            )}
          </AnimatePresence>

          <button className="view-all-button" onClick={toggleHistoryModal}>
            View All History
          </button>
        </div>
      </div>

      {/* History Modal */}
      <OrderHistoryModal
        isOpen={showHistoryModal}
        onClose={toggleHistoryModal}
        historyOrders={historyOrders}
        filter={filter}
        getTimeDifference={getTimeDifference}
      />

      {/* Order Status Modal */}
      {selectedOrder && (
        <OrderStatusModal
          isOpen={isStatusModalOpen}
          onClose={() => setIsStatusModalOpen(false)}
          order={selectedOrder}
          onStatusChange={handleStatusChange}
          isAcceptedOrderStatusLoading={isAcceptedOrderStatusLoading}
        />
      )}
    </div>
  );
};

export default OrdersPage;
