import { Image, Pressable, Text, View } from 'react-native';
import Animated, { FadeInDown, LinearTransition } from 'react-native-reanimated';

import type { FoodItem } from './foodData';
import { QuantityControl } from './QuantityControl';

type MenuCardProps = {
  item: FoodItem;
  index: number;
  isSaved: boolean;
  quantity: number;
  onToggleSaved: (id: string) => void;
  onAddToCart: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
};

export function MenuCard({
  item,
  index,
  isSaved,
  quantity,
  onToggleSaved,
  onAddToCart,
  onUpdateQuantity,
}: MenuCardProps) {
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 55)
        .duration(320)
        .springify()
        .damping(18)}
      layout={LinearTransition.springify()}
      className="min-h-[104px] w-full flex-row rounded-[18px] border border-[#f3ece3] bg-white p-2">
      <View className="relative h-[88px] w-[100px] flex-shrink-0 overflow-hidden rounded-[13px] bg-[#eadbcb]">
        <Image
          source={{ uri: item.image }}
          accessibilityLabel={item.name}
          resizeMode="cover"
          className="h-[88px] w-[100px]"
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isSaved ? `Unsave ${item.name}` : `Save ${item.name}`}
          onPress={() => onToggleSaved(item.id)}
          className="absolute right-[6px] top-[6px] h-[26px] w-[26px] items-center justify-center rounded-full bg-[#fffaf3]/95">
          <Text
            className={`text-[17px] leading-5 ${isSaved ? 'text-[#ef6847]' : 'text-[#74675d]'}`}>
            {isSaved ? '♥' : '♡'}
          </Text>
        </Pressable>
        <View className="absolute bottom-[6px] left-[6px] rounded-lg bg-[#fffaf3]/95 px-[6px] py-[3px]">
          <Text className="text-[9px] font-extrabold text-[#54483e]">★ {item.rating}</Text>
        </View>
      </View>

      <View className="flex-1 justify-center px-[11px] py-1">
        <View className="flex-row items-center justify-between gap-[5px]">
          <Text numberOfLines={1} className="flex-1 text-[12px] font-extrabold text-[#342d27]">
            {item.name}
          </Text>
          <Text className="text-[11px] font-extrabold text-[#e36e4a]">
            ${item.price.toFixed(2)}
          </Text>
        </View>
        <Text numberOfLines={1} className="mt-1 text-[10px] text-[#8d8278]">
          {item.description}
        </Text>
        <Text className="mt-2 text-[9px] font-semibold text-[#887b70]">◷ {item.time}</Text>

        {quantity === 0 ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Add ${item.name} to cart`}
            onPress={() => onAddToCart(item.id)}
            className="mt-[7px] self-start rounded-[11px] bg-[#fff0e8] px-[9px] py-[5px]">
            <Text className="text-[10px] font-extrabold text-[#df6745]">＋ Add to cart</Text>
          </Pressable>
        ) : (
          <QuantityControl
            label={item.name}
            quantity={quantity}
            onChange={(nextQuantity) => onUpdateQuantity(item.id, nextQuantity)}
          />
        )}
      </View>
    </Animated.View>
  );
}
