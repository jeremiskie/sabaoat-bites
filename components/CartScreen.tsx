import { Image, Pressable, Text, View } from 'react-native';

import type { CartItems, FoodItem } from './foodData';
import { QuantityControl } from './QuantityControl';

type CartScreenProps = {
  items: FoodItem[];
  quantities: CartItems;
  subtotal: number;
  orderPlaced: boolean;
  onChangeQuantity: (id: string, quantity: number) => void;
  onPlaceOrder: () => void;
  onBrowseMenu: () => void;
};

export function CartScreen({
  items,
  quantities,
  subtotal,
  orderPlaced,
  onChangeQuantity,
  onPlaceOrder,
  onBrowseMenu,
}: CartScreenProps) {
  if (orderPlaced) {
    return (
      <View className="mt-[22px] items-center rounded-[20px] border border-[#f3ece3] bg-white px-[22px] py-9">
        <Text className="mb-[14px] h-[58px] w-[58px] overflow-hidden rounded-full bg-[#e8f3dc] text-center text-[34px] leading-[58px] text-[#59853e]">
          ✓
        </Text>
        <Text className="text-[23px] font-extrabold tracking-[-0.7px] text-[#302b27]">
          Order placed!
        </Text>
        <Text className="mb-5 mt-2 text-center text-[12px] leading-[18px] text-[#92867b]">
          Thanks for trying Sabaoat Bites. This sample order is just a demo.
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={onBrowseMenu}
          className="min-h-12 items-center justify-center rounded-[15px] bg-[#f26d45] px-4">
          <Text className="text-[12px] font-extrabold text-white">Back to the menu</Text>
        </Pressable>
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View className="items-center rounded-[18px] border border-[#f3ece3] bg-white px-6 py-[34px]">
        <Text className="mb-[7px] text-[34px] text-[#e97854]">🛍️</Text>
        <Text className="text-[14px] font-extrabold text-[#3a322c]">Your cart is waiting</Text>
        <Text className="mt-[5px] text-center text-[11px] leading-[17px] text-[#92867b]">
          Add something delicious from the menu to get started.
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={onBrowseMenu}
          className="mt-5 min-h-12 items-center justify-center rounded-[15px] bg-[#f26d45] px-4">
          <Text className="text-[12px] font-extrabold text-white">Explore the menu</Text>
        </Pressable>
      </View>
    );
  }

  const itemCount = items.reduce((total, item) => total + (quantities[item.id] ?? 0), 0);

  return (
    <View className="pt-[22px]">
      <View className="mb-[18px] flex-row items-center justify-between">
        <Text className="text-[23px] font-extrabold tracking-[-0.7px] text-[#302b27]">
          Your cart
        </Text>
        <Text className="text-[12px] font-semibold text-[#92867b]">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </Text>
      </View>

      <View className="gap-[10px]">
        {items.map((item) => (
          <View
            key={item.id}
            className="min-h-[78px] flex-row items-center rounded-2xl border border-[#f3ece3] bg-white p-[9px]">
            <Image
              source={{ uri: item.image }}
              accessibilityLabel={item.name}
              resizeMode="cover"
              className="h-[58px] w-[58px] flex-shrink-0 rounded-xl bg-[#eadbcb]"
            />
            <View className="flex-1 px-[10px]">
              <Text numberOfLines={1} className="text-[11px] font-extrabold text-[#342d27]">
                {item.name}
              </Text>
              <Text className="mt-[5px] text-[11px] font-bold text-[#e36e4a]">
                ${(item.price * (quantities[item.id] ?? 0)).toFixed(2)}
              </Text>
            </View>
            <QuantityControl
              label={item.name}
              quantity={quantities[item.id] ?? 0}
              onChange={(quantity) => onChangeQuantity(item.id, quantity)}
            />
          </View>
        ))}
      </View>

      <View className="mt-5 rounded-[18px] border border-[#f3ece3] bg-white p-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-[13px] font-semibold text-[#73685e]">Subtotal</Text>
          <Text className="text-[16px] font-extrabold text-[#302b27]">${subtotal.toFixed(2)}</Text>
        </View>
        <Text className="mb-[14px] mt-3 text-[10px] leading-[15px] text-[#92867b]">
          Sample checkout only — no payment will be taken.
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={onPlaceOrder}
          className="min-h-12 items-center justify-center rounded-[15px] bg-[#f26d45] px-[14px]">
          <Text className="text-center text-[12px] font-extrabold text-white">
            Place demo order · ${subtotal.toFixed(2)}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
