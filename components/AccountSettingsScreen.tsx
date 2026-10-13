import { Pressable, Text, TextInput, View } from 'react-native';

import {
  customerSexOptions,
  walletProviders,
  type CustomerProfile,
} from '../data/customerAccount';

type AccountSettingsScreenProps = {
  profile: CustomerProfile;
  onChange: (profile: CustomerProfile) => void;
};

export function AccountSettingsScreen({ profile, onChange }: AccountSettingsScreenProps) {
  const update = <K extends keyof CustomerProfile>(key: K, value: CustomerProfile[K]) => {
    onChange({ ...profile, [key]: value });
  };

  return (
    <View className="pt-6">
      <Text className="text-[24px] font-extrabold tracking-[-0.7px] text-[#302b27]">
        Account settings
      </Text>
      <Text className="mb-5 mt-1 text-[12px] leading-[18px] text-[#92867b]">
        Your profile and preferred e-wallet are saved for this demo session.
      </Text>

      <View className="gap-4 rounded-[18px] border border-[#f3ece3] bg-white p-4">
        <View>
          <Text className="mb-2 text-[12px] font-bold text-[#49382d]">Email</Text>
          <Text className="rounded-[14px] bg-[#f8f3ed] px-3 py-4 text-[13px] text-[#776b61]">
            {profile.email}
          </Text>
        </View>
        <View>
          <Text className="mb-2 text-[12px] font-bold text-[#49382d]">Full name</Text>
          <TextInput
            accessibilityLabel="Full name"
            autoCapitalize="words"
            className="min-h-12 rounded-[14px] border border-[#e8dcd0] px-3 text-[14px] text-[#302b27]"
            onChangeText={(value) => update('fullName', value)}
            placeholder="Your full name"
            placeholderTextColor="#a99d92"
            value={profile.fullName}
          />
        </View>
        <View>
          <Text className="mb-2 text-[12px] font-bold text-[#49382d]">Sex</Text>
          <View className="flex-row flex-wrap gap-2">
            {customerSexOptions.map((option) => (
              <Pressable
                key={option}
                accessibilityRole="button"
                accessibilityState={{ selected: profile.sex === option }}
                onPress={() => update('sex', option)}
                className={`rounded-full px-3 py-[10px] ${
                  profile.sex === option ? 'bg-[#f26d45]' : 'bg-[#f5eee5]'
                }`}>
                <Text
                  className={`text-[11px] font-bold ${
                    profile.sex === option ? 'text-white' : 'text-[#776b61]'
                  }`}>
                  {option}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View>
          <Text className="mb-2 text-[12px] font-bold text-[#49382d]">Birthday</Text>
          <TextInput
            accessibilityLabel="Birthday"
            className="min-h-12 rounded-[14px] border border-[#e8dcd0] px-3 text-[14px] text-[#302b27]"
            keyboardType="numbers-and-punctuation"
            onChangeText={(value) => update('birthday', value)}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#a99d92"
            value={profile.birthday}
          />
        </View>
        <View>
          <Text className="mb-2 text-[12px] font-bold text-[#49382d]">Delivery address</Text>
          <TextInput
            accessibilityLabel="Delivery address"
            autoComplete="street-address"
            className="min-h-12 rounded-[14px] border border-[#e8dcd0] px-3 text-[14px] text-[#302b27]"
            onChangeText={(value) => update('address', value)}
            placeholder="Street, barangay, city"
            placeholderTextColor="#a99d92"
            value={profile.address}
          />
        </View>
        <View>
          <Text className="mb-2 text-[12px] font-bold text-[#49382d]">Contact number</Text>
          <TextInput
            accessibilityLabel="Contact number"
            autoComplete="tel"
            className="min-h-12 rounded-[14px] border border-[#e8dcd0] px-3 text-[14px] text-[#302b27]"
            keyboardType="phone-pad"
            onChangeText={(value) => update('contactNumber', value)}
            placeholder="09XX XXX XXXX"
            placeholderTextColor="#a99d92"
            value={profile.contactNumber}
          />
        </View>
        <View>
          <Text className="mb-2 text-[12px] font-bold text-[#49382d]">Preferred e-wallet</Text>
          <View className="flex-row flex-wrap gap-2">
            {walletProviders.map((provider) => (
              <Pressable
                key={provider}
                accessibilityRole="button"
                accessibilityState={{ selected: profile.walletProvider === provider }}
                onPress={() => update('walletProvider', provider)}
                className={`rounded-full px-4 py-[10px] ${
                  profile.walletProvider === provider ? 'bg-[#f26d45]' : 'bg-[#f5eee5]'
                }`}>
                <Text
                  className={`text-[12px] font-bold ${
                    profile.walletProvider === provider ? 'text-white' : 'text-[#776b61]'
                  }`}>
                  {provider}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
