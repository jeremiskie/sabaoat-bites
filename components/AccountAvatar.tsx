import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { demoAdminAccount } from '../data/adminAccount';

type AccountAvatarProps = {
  isAdmin?: boolean;
  onPress?: () => void;
};

export function AccountAvatar({ isAdmin = false, onPress }: AccountAvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);

  const content = (
    <View className="h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#eadbcb] bg-[#f5eee5]">
      {isAdmin && !imageFailed ? (
        <Image
          accessibilityLabel="Admin profile photo"
          source={{ uri: demoAdminAccount.avatar }}
          onError={() => setImageFailed(true)}
          resizeMode="cover"
          className="h-full w-full"
        />
      ) : (
        <Text accessibilityLabel="Default account avatar" className="text-[20px]">
          👤
        </Text>
      )}
    </View>
  );

  return onPress ? (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={isAdmin ? 'Admin account' : 'Account, sign in or register'}
      onPress={onPress}
      className="items-center">
      {content}
    </Pressable>
  ) : (
    <View accessibilityLabel={isAdmin ? 'Admin account' : 'Account'} className="items-center">
      {content}
    </View>
  );
}
