export interface Notification {
  id: string;
  type: string;
  message: string;
  createdAt: string;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
}

export const alerts: Notification[] = [
  {
    id: '1',
    type: 'pos_connection_failed',
    message: 'POS connection failed for Store #A23',
    createdAt: '2025-04-08T09:50:00.000+00:00',
    priority: 'high',
    read: false,
  },
  {
    id: '2',
    type: 'partner_api_down',
    message: 'Swiggy API is unreachable',
    createdAt: '2025-04-08T08:50:00.000+00:00',
    priority: 'high',
    read: false,
  },
  {
    id: '3',
    type: 'order_sync_failed',
    message: 'Failed to push order #1132 to POS of Store #B19',
    createdAt: '2025-04-08T08:40:00.000+00:00',
    priority: 'high',
    read: false,
  },
  {
    id: '4',
    type: 'order_not_acknowledged',
    message: "Store #C05 hasn't accepted order #1129 within SLA",
    createdAt: '2025-04-08T08:30:00.000+00:00',
    priority: 'high',
    read: false,
  },
  {
    id: '5',
    type: 'unmapped_items_detected',
    message: 'Unmapped items found in order #1125 for Store #A45',
    createdAt: '2025-04-08T08:20:00.000+00:00',
    priority: 'medium',
    read: false,
  },
  {
    id: '6',
    type: 'manual_action_required',
    message: 'Manual action needed to resolve mismatch in Store #D11',
    createdAt: '2025-04-08T08:10:00.000+00:00',
    priority: 'medium',
    read: false,
  },
  {
    id: '7',
    type: 'order_auto_cancelled',
    message: 'Order #1120 auto-cancelled due to no response',
    createdAt: '2025-04-08T08:00:00.000+00:00',
    priority: 'high',
    read: false,
  },
  {
    id: '8',
    type: 'inventory_update_failed',
    message: 'Stock update failed for Store #B88 on Zomato',
    createdAt: '2025-04-08T07:50:00.000+00:00',
    priority: 'medium',
    read: false,
  },
  {
    id: '9',
    type: 'store_offline',
    message: 'POS is offline for Store #C20',
    createdAt: '2025-04-08T07:40:00.000+00:00',
    priority: 'high',
    read: false,
  },
  {
    id: '10',
    type: 'delivery_partner_cancelled',
    message: 'Swiggy cancelled order #1118 from Store #B19',
    createdAt: '2025-04-08T07:30:00.000+00:00',
    priority: 'low',
    read: false,
  },
];
