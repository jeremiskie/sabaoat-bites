import { useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';

import type { CartItems, FoodItem } from '../data/foodData';
import type { CustomerDetails, PaymentMethod } from '../data/orders';
import { QuantityControl } from './QuantityControl';

type CartScreenProps = {
  items: FoodItem[];
  quantities: CartItems;
  subtotal: number;
  orderPlaced: boolean;
  defaultCustomer?: CustomerDetails;
  onChangeQuantity: (id: string, quantity: number) => void;
  onPlaceOrder: (customer: CustomerDetails, paymentMethod: PaymentMethod) => void;
  onBrowseMenu: () => void;
};

export function CartScreen({
  items,
  quantities,
  subtotal,
  orderPlaced,
  defaultCustomer = { name: '', phone: '', address: '' },
  onChangeQuantity,
  onPlaceOrder,
  onBrowseMenu,
}: CartScreenProps) {
  const [customer, setCustomer] = useState<CustomerDetails>(defaultCustomer);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash');
  const [checkoutError, setCheckoutError] = useState('');

  const submitOrder = () => {
    if (!customer.name.trim() || !customer.phone.trim() || !customer.address.trim()) {
      setCheckoutError('Please enter your name, phone number, and delivery address.');
      return;
    }
    setCheckoutError('');
    onPlaceOrder(
      {
        name: customer.name.trim(),
        phone: customer.phone.trim(),
        address: customer.address.trim(),
      },
      paymentMethod
    );
  };

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
          Your demo order has been saved for the admin dashboard.
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
        <Text className="mb-3 text-[15px] font-extrabold text-[#302b27]">
          Delivery details
        </Text>
        <View className="gap-3">
          <TextInput
            accessibilityLabel="Customer name"
            autoCapitalize="words"
            className="min-h-[48px] rounded-[14px] border border-[#e8dcd0] px-3 text-[14px] text-[#302b27]"
            onChangeText={(name) => setCustomer((current) => ({ ...current, name }))}
            placeholder="Full name"
            placeholderTextColor="#a99d92"
            value={customer.name}
          />
          <TextInput
            accessibilityLabel="Phone number"
            autoComplete="tel"
            className="min-h-[48px] rounded-[14px] border border-[#e8dcd0] px-3 text-[14px] text-[#302b27]"
            keyboardType="phone-pad"
            onChangeText={(phone) => setCustomer((current) => ({ ...current, phone }))}
            placeholder="Phone number"
            placeholderTextColor="#a99d92"
            value={customer.phone}
          />
          <TextInput
            accessibilityLabel="Delivery address"
            autoComplete="street-address"
            className="min-h-[48px] rounded-[14px] border border-[#e8dcd0] px-3 text-[14px] text-[#302b27]"
            onChangeText={(address) => setCustomer((current) => ({ ...current, address }))}
            placeholder="Delivery address"
            placeholderTextColor="#a99d92"
            value={customer.address}
          />
        </View>
        <Text className="mb-2 mt-4 text-[13px] font-bold text-[#49382d]">Mode of payment</Text>
        <View className="flex-row flex-wrap gap-2">
          {(['Cash', 'E-wallet', 'Card'] as const).map((method) => (
            <Pressable
              key={method}
              accessibilityRole="button"
              accessibilityState={{ selected: paymentMethod === method }}
              onPress={() => setPaymentMethod(method)}
              className={`rounded-full px-4 py-[10px] ${
                paymentMethod === method ? 'bg-[#f26d45]' : 'bg-[#f5eee5]'
              }`}>
              <Text
                className={`text-[12px] font-bold ${
                  paymentMethod === method ? 'text-white' : 'text-[#776b61]'
                }`}>
                {method}
              </Text>
            </Pressable>
          ))}
        </View>
        {checkoutError ? (
          <Text accessibilityRole="alert" className="mt-3 text-[12px] text-[#a34b35]">
            {checkoutError}
          </Text>
        ) : null}
        <View className="flex-row items-center justify-between">
          <Text className="text-[13px] font-semibold text-[#73685e]">Total</Text>
          <Text className="text-[16px] font-extrabold text-[#302b27]">${subtotal.toFixed(2)}</Text>
        </View>
        <Text className="mb-[14px] mt-3 text-[10px] leading-[15px] text-[#92867b]">
          Sample checkout only — no payment will be taken.
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={submitOrder}
          className="min-h-12 items-center justify-center rounded-[15px] bg-[#f26d45] px-[14px]">
          <Text className="text-center text-[12px] font-extrabold text-white">
            Place demo order · ${subtotal.toFixed(2)}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
