import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AdminDashboardScreen } from './components/AdminDashboardScreen';
import { AuthScreen, type AuthMode } from './components/AuthScreen';
import { GuestHomeScreen } from './components/GuestHomeScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import {
  createCustomerProfile,
  type CustomerProfile,
} from './data/customerAccount';
import { demoAdminAccount } from './data/adminAccount';
import type { Order, OrderStatus } from './data/orders';

import './global.css';

export default function App() {
  const [screen, setScreen] = useState<'onboarding' | 'auth' | 'guest' | 'admin-dashboard'>(
    'onboarding'
  );
  const [authReturnScreen, setAuthReturnScreen] = useState<'onboarding' | 'guest'>('onboarding');
  const [authMode, setAuthMode] = useState<AuthMode>('register');
  const [customerAccounts, setCustomerAccounts] = useState<
    Record<string, { password: string; profile: CustomerProfile }>
  >({});
  const [signedInCustomerEmail, setSignedInCustomerEmail] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const openAuth = (returnScreen: 'onboarding' | 'guest', mode: AuthMode = 'register') => {
    setAuthReturnScreen(returnScreen);
    setAuthMode(mode);
    setScreen('auth');
  };

  const authenticateCustomer = (email: string, password: string, mode: AuthMode) => {
    if (email === demoAdminAccount.email) {
      return false;
    }

    if (mode === 'register') {
      if (customerAccounts[email]) {
        return false;
      }
      setCustomerAccounts((current) => ({
        ...current,
        [email]: { password, profile: createCustomerProfile(email) },
      }));
    } else {
      const account = customerAccounts[email];
      if (!account || account.password !== password) {
        return false;
      }
    }

    setSignedInCustomerEmail(email);
    setScreen('guest');
    return true;
  };

  const updateCustomerProfile = (profile: CustomerProfile) => {
    setCustomerAccounts((current) => {
      const account = current[profile.email];
      if (!account) {
        return current;
      }
      return { ...current, [profile.email]: { ...account, profile } };
    });
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((current) =>
      current.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {screen === 'guest' ? (
        <GuestHomeScreen
          customerProfile={
            signedInCustomerEmail ? customerAccounts[signedInCustomerEmail]?.profile ?? null : null
          }
          orders={orders}
          onOpenAuth={(mode) => openAuth('guest', mode)}
          onLogout={() => setSignedInCustomerEmail(null)}
          onUpdateProfile={updateCustomerProfile}
          onOrderPlaced={(order) => setOrders((current) => [order, ...current])}
        />
      ) : screen === 'admin-dashboard' ? (
        <AdminDashboardScreen
          orders={orders}
          onSignOut={() => {
            setSignedInCustomerEmail(null);
            setScreen(authReturnScreen);
          }}
          onUpdateStatus={updateOrderStatus}
        />
      ) : screen === 'auth' ? (
        <AuthScreen
          initialMode={authMode}
          onBack={() => setScreen(authReturnScreen)}
          onBrowseAsGuest={() => setScreen('guest')}
          onAdminAuthenticated={() => setScreen('admin-dashboard')}
          onCustomerAuthenticated={authenticateCustomer}
        />
      ) : (
        <OnboardingScreen
          onExplore={() => setScreen('guest')}
          onGetStarted={() => openAuth('onboarding')}
        />
      )}
    </SafeAreaProvider>
  );
}
