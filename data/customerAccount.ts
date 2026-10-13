export type CustomerSex = 'Female' | 'Male' | 'Prefer not to say';

export type WalletProvider = 'GCash' | 'Maya' | 'MariBank';

export type CustomerProfile = {
  email: string;
  fullName: string;
  sex: CustomerSex | '';
  birthday: string;
  address: string;
  contactNumber: string;
  walletProvider: WalletProvider | '';
};

export const customerSexOptions: CustomerSex[] = [
  'Female',
  'Male',
  'Prefer not to say',
];

export const walletProviders: WalletProvider[] = ['GCash', 'Maya', 'MariBank'];

export function createCustomerProfile(email: string): CustomerProfile {
  return {
    email,
    fullName: '',
    sex: '',
    birthday: '',
    address: '',
    contactNumber: '',
    walletProvider: '',
  };
}
