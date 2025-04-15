export type PosIntegration = {
  id: string;
  storeId: string;
  posName: string;
  logo: string;
  connection: string;
  lastSync: string;
  lastSyncTime: string;
  syncFrequency: string;
  menuSync: string;
  revenue: string;
  errorRate: string;
  status: 'active' | 'inactive';
};

export type DeliveryPartnerIntegration = {
  id: string;
  deliveryPartnerId: string;
  partnerName: string;
  logo: string;
  connection: string;
  lastSync: string;
  lastSyncTime: string;
  syncFrequency: string;
  menuSync: string;
  revenue: string;
  errorRate: string;
  status: 'active' | 'inactive';
};
