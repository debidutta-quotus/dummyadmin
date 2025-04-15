import React, { useEffect, useRef } from 'react';
import './AdminOrderHistory.css';
import orderHistory from '../../../../assets/DummyData/Admin/OrderHistory.json';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { usePagination } from '../../../../hooks/usePagination'; // Import your usePagination hook
import Pagination from '../../../../common/Pagination/Index';

const AdminOrderHistoryPage: React.FC = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const ordersPerPage = 10;

  const { currentPage, totalPages, nextPage, prevPage, goToPage } = usePagination({
    totalItems: orderHistory.length,
    itemsPerPage: ordersPerPage,
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orderHistory.slice(indexOfFirstOrder, indexOfLastOrder);

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'preparing':
        return 'admin-order-history-page-status-preparing';
      case 'out for delivery':
        return 'admin-order-history-page-status-out-for-delivery';
      case 'pending':
        return 'admin-order-history-page-status-pending';
      case 'delivered':
        return 'admin-order-history-page-status-delivered';
      default:
        return '';
    }
  };

  useEffect(() => {
    const tableCells = tableRef.current?.querySelectorAll('td, th');
    tableCells?.forEach((cell) => {
      cell.setAttribute('title', cell.textContent || '');
    });
  }, [currentOrders]);

  return (
    <div className={`admin-order-history-page-container ${isDarkMode ? 'dark' : ''}`}>
      <h1>Order History</h1>
      <div className="admin-order-history-page-table-container">
        <table className="admin-order-history-page-table" ref={tableRef}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Outlet</th>
              <th>POS System</th>
              <th>Delivery Partner</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Delivery Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.outlet}</td>
                <td>{order.pos_system}</td>
                <td className="admin-order-history-page-delivery-partner">
                  {order.delivery_partner}
                </td>
                <td>{order.customer}</td>
                <td>{order.total_amount}</td>
                <td>
                  <span
                    className={`admin-order-history-page-status-badge ${getStatusClass(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>{order.mode_of_payment}</td>
                <td>{order.delivery_details}</td>
                <td>
                  <button className="admin-order-history-page-action-button">⋮</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="admin-order-history-page-pagination">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          prevPage={prevPage}
          nextPage={nextPage}
          goToPage={goToPage}
        />
      </div>
    </div>
  );
};

export default AdminOrderHistoryPage;
