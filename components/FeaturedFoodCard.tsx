import { Image, Pressable, Text, View } from 'react-native';

type FeaturedFoodCardProps = {
  onPress: () => void;
  isTablet: boolean;
};

export function FeaturedFoodCard({ onPress, isTablet }: FeaturedFoodCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={`relative mb-[22px] overflow-hidden rounded-[22px] bg-[#667446] ${
        isTablet ? 'h-[230px]' : 'h-[170px]'
      }`}>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1100&q=85',
        }}
        accessibilityLabel="Colorful fresh salad bowl"
        resizeMode="cover"
        className="absolute inset-0 h-full w-full"
      />
      <View className="absolute inset-0 bg-black/40" />
      <View className={`absolute left-[18px] ${isTablet ? 'top-6' : 'top-[18px]'}`}>
        <Text className="self-start overflow-hidden rounded-[10px] bg-white/20 px-[9px] py-[6px] text-[9px] font-extrabold tracking-[1.4px] text-[#fff7e8]">
          FRESH FAVORITES
        </Text>
        <Text
          className={`mt-[9px] font-extrabold tracking-[-0.7px] text-[#fffaf3] ${
            isTablet ? 'text-[31px] leading-[35px]' : 'text-[25px] leading-[27px]'
          }`}>
          A bowl full{'\n'}of sunshine.
        </Text>
        <Text className="mt-[9px] text-[11px] font-bold text-[#fff4e4]">Find your fresh →</Text>
      </View>
      <View
        className={`absolute right-[15px] items-center justify-center rounded-full bg-[#fffaf3]/95 ${
          isTablet ? 'bottom-5 h-14 w-14' : 'bottom-[13px] h-12 w-12'
        }`}>
        <Text className="text-2xl">🥑</Text>
      </View>
    </Pressable>
  );
}
