import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { GuestHomeScreen } from './components/GuestHomeScreen';
import { OnboardingScreen } from './components/OnboardingScreen';

import './global.css';

export default function App() {
  const [hasExplored, setHasExplored] = useState(false);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {hasExplored ? (
        <GuestHomeScreen />
      ) : (
        <OnboardingScreen onExplore={() => setHasExplored(true)} />
      )}
    </SafeAreaProvider>
  );
}
