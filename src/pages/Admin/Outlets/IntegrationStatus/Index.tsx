import React, { useState } from 'react';
import './IntegrationStatus.css';
import posData from '../../../../assets/DummyData/posIntegration.json';
import deliveryData from '../../../../assets/DummyData/deliveryPartnerIntegration.json';
import { PosIntegration, DeliveryPartnerIntegration } from './types/Index';
import PosIntegrationCard from './components/Cards/POS_IntegrationCard/PosIntegrationCard';
import DeliveryPartnerCard from './components/Cards/DP_IntegrationCard/DeliveryPartnerCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { usePagination } from '../../../../hooks/usePagination'; // Import your usePagination hook
import Pagination from '../../../../common/Pagination/Index';

const IntegrationStatus: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pos' | 'delivery'>('pos');
  const itemsPerPage = 6;
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const integrations =
    activeTab === 'pos'
      ? (posData.integrations as PosIntegration[])
      : (deliveryData.integrations as DeliveryPartnerIntegration[]);

  const { currentPage, totalPages, nextPage, prevPage, goToPage } = usePagination({
    totalItems: integrations.length,
    itemsPerPage,
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = integrations.slice(indexOfFirstItem, indexOfLastItem);

  const handleTabChange = (tab: 'pos' | 'delivery') => {
    setActiveTab(tab);
  };

  return (
    <div className={`outlet-integration-status-container fade-in ${isDarkMode ? 'dark' : ''}`}>
      <div className="outlet-integration-status-header">
        <h1>Integration Status</h1>
        <div className="outlet-integration-status-tab-switcher">
          <button
            className={`outlet-integration-status-tab-button ${activeTab === 'pos' ? 'active' : ''}`}
            onClick={() => handleTabChange('pos')}
          >
            POS Integration
          </button>
          <button
            className={`outlet-integration-status-tab-button ${activeTab === 'delivery' ? 'active' : ''}`}
            onClick={() => handleTabChange('delivery')}
          >
            Delivery Partner Integration
          </button>
        </div>
      </div>

      <div className="integration-cards-container">
        {currentItems.map((integration) =>
          activeTab === 'pos' ? (
            <PosIntegrationCard key={integration.id} integration={integration as PosIntegration} />
          ) : (
            <DeliveryPartnerCard
              key={integration.id}
              integration={integration as DeliveryPartnerIntegration}
            />
          )
        )}
      </div>

      {totalPages > 1 && (
        <div className="outlet-integration-status-pagination">
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

export default IntegrationStatus;
