import React from 'react';
import { PosIntegration } from '../../../types/Index';
import './PosIntegrationCard.css';

interface PosIntegrationCardProps {
  integration: PosIntegration;
}

const PosIntegrationCard: React.FC<PosIntegrationCardProps> = ({ integration }) => {
  return (
    <div className="pos-integration-card">
      <div className="pos-integration-card-content">
        <div className="pos-integration-card-left">
          <div className="pos-integration-card-header">
            <div className="pos-integration-logo-container">
              <img
                src={integration.logo}
                alt={integration.posName}
                className="pos-integration-logo"
              />
            </div>
            <div className="pos-integration-header-info">
              <div className="pos-integration-header-name-storeid-container">
                <h3 className="pos-integration-name">{integration.posName}</h3>
                <span className="pos-integration-id">{integration.storeId}</span>
              </div>
              <span className={`pos-integration-status ${integration.status}`}>
                {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="pos-integration-details">
          <div className="pos-detail-item">
            <span className="pos-detail-label">Connection</span>
            <span
              className={`pos-detail-value pos-connection-type ${integration.connection.toLowerCase()}`}
            >
              {integration.connection}
            </span>
          </div>

          <div className="pos-detail-item">
            <span className="pos-detail-label">Last Sync</span>
            <div className="pos-sync-info">
              <span className="pos-sync-date">{integration.lastSync}</span>
              <span className="pos-sync-time">{integration.lastSyncTime}</span>
            </div>
          </div>

          <div className="pos-detail-item">
            <span className="pos-detail-label">Sync Frequency</span>
            <span className="pos-detail-value">{integration.syncFrequency}</span>
          </div>

          <div className="pos-detail-item">
            <span className="pos-detail-label">Menu Sync</span>
            <span className="pos-detail-value">{integration.menuSync}</span>
          </div>

          <div className="pos-detail-item">
            <span className="pos-detail-label">Revenue</span>
            <span className="pos-detail-value pos-revenue">{integration.revenue}</span>
          </div>

          <div className="pos-detail-item">
            <span className="pos-detail-label">Error Rate</span>
            <span
              className={`pos-error-rate ${parseFloat(integration.errorRate) > 1 ? 'high' : 'low'}`}
            >
              {integration.errorRate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosIntegrationCard;
