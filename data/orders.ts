export type PaymentMethod = 'Cash' | 'E-wallet' | 'Card';

export type OrderStatus = 'Received' | 'Preparing' | 'Ready' | 'Completed' | 'Cancelled';

export type CustomerDetails = {
  name: string;
  phone: string;
  address: string;
};

export type Order = {
  id: string;
  createdAt: string;
  customerEmail?: string;
  customer: CustomerDetails;
  paymentMethod: PaymentMethod;
  items: {
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
  }[];
  total: number;
  status: OrderStatus;
};

export const orderStatuses: OrderStatus[] = [
  'Received',
  'Preparing',
  'Ready',
  'Completed',
  'Cancelled',
];
