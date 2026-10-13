import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { demoAdminAccount } from '../data/adminAccount';
import { Brand } from './Brand';

export type AuthMode = 'login' | 'register';

type AuthScreenProps = {
  initialMode: AuthMode;
  onBack: () => void;
  onBrowseAsGuest: () => void;
  onAdminAuthenticated: () => void;
  onCustomerAuthenticated: (email: string, password: string, mode: AuthMode) => boolean;
};

export function AuthScreen({
  initialMode,
  onBack,
  onBrowseAsGuest,
  onAdminAuthenticated,
  onCustomerAuthenticated,
}: AuthScreenProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [notice, setNotice] = useState('');

  const submit = () => {
    if (!email.trim() || !password) {
      setNotice('Enter your email and password to continue.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setNotice('Enter a valid email address to continue.');
      return;
    }

    if (mode === 'login' && email.trim().toLowerCase() === demoAdminAccount.email) {
      if (password === demoAdminAccount.password) {
        onAdminAuthenticated();
      } else {
        setNotice('The email or password is incorrect.');
      }
      return;
    }

    if (!onCustomerAuthenticated(email.trim().toLowerCase(), password, mode)) {
      setNotice(
        mode === 'register'
          ? 'An account with this email already exists.'
          : 'The email or password is incorrect.'
      );
    }
  };

  const changeMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setNotice('');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#fffaf3]" edges={['top', 'bottom']}>
      <ScrollView
        contentContainerClassName="flex-grow px-6 pb-8"
        keyboardShouldPersistTaps="handled">
        <View className="w-full max-w-[520px] flex-1 self-center">
          <View className="flex-row items-center justify-between py-3">
            <Brand />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Back to welcome slides"
              hitSlop={12}
              onPress={onBack}
              className="rounded-full bg-[#f5eee5] px-4 py-[10px]">
              <Text className="text-[13px] font-bold text-[#776b61]">Back</Text>
            </Pressable>
          </View>

          <View className="flex-1 justify-center py-8">
            <Text className="mb-2 text-[10px] font-extrabold tracking-[2px] text-[#dd6845]">
              GOOD FOOD, GOOD TO HAVE YOU
            </Text>
            <Text className="text-[34px] font-extrabold leading-[40px] tracking-[-1.4px] text-[#302b27]">
              {mode === 'register' ? 'Create your' : 'Welcome'}{' '}
              <Text className="text-[#f26d45]">
                {mode === 'register' ? 'account' : 'back'}
              </Text>
            </Text>
            <Text className="mb-7 mt-2 text-[14px] leading-[21px] text-[#80756b]">
              {mode === 'register'
                ? 'Sign up to make your next favorite bite yours.'
                : 'Sign in to pick up where your appetite left off.'}
            </Text>

            <View className="gap-4">
              <View>
                <Text className="mb-2 text-[13px] font-bold text-[#49382d]">Email</Text>
                <TextInput
                  accessibilityLabel="Email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                  className="min-h-[54px] rounded-[16px] border border-[#e8dcd0] bg-white px-4 text-[15px] text-[#302b27]"
                  keyboardType="email-address"
                  onChangeText={(value) => {
                    setEmail(value);
                    setNotice('');
                  }}
                  placeholder="you@example.com"
                  placeholderTextColor="#a99d92"
                  returnKeyType="next"
                  textContentType="emailAddress"
                  value={email}
                />
              </View>

              <View>
                <Text className="mb-2 text-[13px] font-bold text-[#49382d]">Password</Text>
                <View className="min-h-[54px] flex-row items-center rounded-[16px] border border-[#e8dcd0] bg-white pl-4 pr-2">
                  <TextInput
                    accessibilityLabel="Password"
                    autoCapitalize="none"
                    autoComplete={mode === 'register' ? 'new-password' : 'password'}
                    className="min-h-[52px] flex-1 py-0 text-[15px] text-[#302b27]"
                    onChangeText={(value) => {
                      setPassword(value);
                      setNotice('');
                    }}
                    placeholder="Enter your password"
                    placeholderTextColor="#a99d92"
                    returnKeyType="done"
                    secureTextEntry={!passwordVisible}
                    textContentType={mode === 'register' ? 'newPassword' : 'password'}
                    value={password}
                  />
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
                    accessibilityState={{ checked: passwordVisible }}
                    hitSlop={10}
                    onPress={() => setPasswordVisible((visible) => !visible)}
                    className="h-11 w-11 items-center justify-center">
                    <View className="h-[14px] w-[21px] items-center justify-center rounded-[50%] border-2 border-[#897e74]">
                      <View className="h-[6px] w-[6px] rounded-full bg-[#897e74]" />
                      {!passwordVisible && (
                        <View className="absolute h-[2px] w-[25px] rotate-[-38deg] bg-[#897e74]" />
                      )}
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>

            {notice ? (
              <Text accessibilityRole="alert" className="mt-4 text-[13px] leading-5 text-[#a34b35]">
                {notice}
              </Text>
            ) : null}

            <Pressable
              accessibilityRole="button"
              onPress={submit}
              style={({ pressed }) => ({ opacity: pressed ? 0.88 : 1 })}
              className="mt-6 min-h-[54px] items-center justify-center rounded-[18px] bg-[#f26d45]">
              <Text className="text-[15px] font-extrabold text-white">
                {mode === 'register' ? 'Create Account' : 'Log In'}
              </Text>
            </Pressable>

            <View className="mt-5 flex-row flex-wrap justify-center">
              <Text className="text-[13px] text-[#80756b]">
                {mode === 'register' ? 'Already have an account? ' : "Don't have an account? "}
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => changeMode(mode === 'register' ? 'login' : 'register')}>
                <Text className="text-[13px] font-extrabold text-[#dd6845]">
                  {mode === 'register' ? 'Log in' : 'Create one'}
                </Text>
              </Pressable>
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={onBrowseAsGuest}
            className="items-center py-3">
            <Text className="text-[12px] font-semibold text-[#84776d]">
              Continue to the menu
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
