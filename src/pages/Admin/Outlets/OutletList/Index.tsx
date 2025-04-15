import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MoreVertical, ChevronDown } from 'lucide-react';
import './OutletList.css';
import outletData from '../../../../assets/DummyData/OutletList.json';
import { Outlet } from './types/Index';
import { RootState } from '../../../../store/store';
import { usePagination } from '../../../../hooks/usePagination'; // Import your usePagination hook
import Pagination from '../../../../common/Pagination/Index';

const OutletList: React.FC = () => {
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  useEffect(() => {
    const typedOutlets: Outlet[] = outletData.outlets.map((outlet) => ({
      ...outlet,
      status: outlet.status as 'active' | 'inactive',
    }));
    setOutlets(typedOutlets);
  }, []);

  const itemsPerPage = 10;

  const { currentPage, totalPages, nextPage, prevPage, goToPage } = usePagination({
    totalItems: outlets.length,
    itemsPerPage,
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = outlets.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className={`outlet-list-container fade-in ${isDarkMode ? 'dark' : ''}`}>
      <div className="outlet-header">
        <h1>Outlet List</h1>
        <div className="name-filter">
          <span>Name</span>
          <ChevronDown size={16} />
        </div>
      </div>

      <div className="table-container">
        <table className="outlet-table">
          <thead>
            <tr>
              <th>Store Name</th>
              <th>Store ID</th>
              <th>Type</th>
              <th>Registration Date</th>
              <th>POS System</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((outlet) => (
              <tr key={outlet.id}>
                <td>{outlet.storeName}</td>
                <td>{outlet.storeId}</td>
                <td>{outlet.type}</td>
                <td>{outlet.registrationDate}</td>
                <td>{outlet.posSystem}</td>
                <td>
                  <span className={`status-badge status-${outlet.status}`}>
                    {outlet.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className="dropdown-wrapper">
                    <MoreVertical size={18} className="dropdown-menu" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            prevPage={prevPage}
            nextPage={nextPage}
            goToPage={goToPage}
          />
        </div>
      )}
    </div>
  );
};

export default OutletList;
