import React from 'react';
import { DeliveryPartnerIntegration } from '../../../types/Index';
import './DeliveryPartnerCard.css';

interface DeliveryPartnerCardProps {
  integration: DeliveryPartnerIntegration;
}

const DeliveryPartnerCard: React.FC<DeliveryPartnerCardProps> = ({ integration }) => {
  return (
    <div className="delivery-partner-card">
      <div className="delivery-partner-card-content">
        <div className="delivery-partner-card-left">
          <div className="delivery-partner-card-header">
            <div className="delivery-partner-logo-container">
              <img
                src={integration.logo}
                alt={integration.partnerName}
                className="delivery-partner-logo"
              />
            </div>
            <div className="delivery-partner-header-info">
              <div className="delivery-partner-header-name-storeid-container">
                <h3 className="delivery-partner-name">{integration.partnerName}</h3>
                <span className="delivery-partner-id">{integration.deliveryPartnerId}</span>
              </div>
              <span className={`delivery-partner-status ${integration.status}`}>
                {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="delivery-partner-details">
          <div className="delivery-partner-detail-item">
            <span className="delivery-partner-detail-label">Connection</span>
            <span
              className={`delivery-partner-detail-value delivery-partner-connection-type ${integration.connection.toLowerCase()}`}
            >
              {integration.connection}
            </span>
          </div>

          <div className="delivery-partner-detail-item">
            <span className="delivery-partner-detail-label">Last Sync</span>
            <div className="delivery-partner-sync-info">
              <span className="delivery-partner-sync-date">{integration.lastSync}</span>
              <span className="delivery-partner-sync-time">{integration.lastSyncTime}</span>
            </div>
          </div>

          <div className="delivery-partner-detail-item">
            <span className="delivery-partner-detail-label">Sync Frequency</span>
            <span className="delivery-partner-detail-value">{integration.syncFrequency}</span>
          </div>

          <div className="delivery-partner-detail-item">
            <span className="delivery-partner-detail-label">Menu Sync</span>
            <span className="delivery-partner-detail-value">{integration.menuSync}</span>
          </div>

          <div className="delivery-partner-detail-item">
            <span className="delivery-partner-detail-label">Revenue</span>
            <span className="delivery-partner-detail-value delivery-partner-revenue">
              {integration.revenue}
            </span>
          </div>

          <div className="delivery-partner-detail-item">
            <span className="delivery-partner-detail-label">Error Rate</span>
            <span
              className={`delivery-partner-error-rate ${parseFloat(integration.errorRate) > 1 ? 'high' : 'low'}`}
            >
              {integration.errorRate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPartnerCard;
