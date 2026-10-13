import { Text, View } from 'react-native';

import type { Order } from '../data/orders';

type CustomerOrdersScreenProps = {
  orders: Order[];
};

export function CustomerOrdersScreen({ orders }: CustomerOrdersScreenProps) {
  return (
    <View className="pt-6">
      <Text className="text-[24px] font-extrabold tracking-[-0.7px] text-[#302b27]">
        Your orders
      </Text>
      {orders.length === 0 ? (
        <View className="mt-4 items-center rounded-[18px] border border-[#f3ece3] bg-white px-6 py-9">
          <Text className="text-[14px] font-extrabold text-[#302b27]">No orders yet</Text>
          <Text className="mt-1 text-center text-[12px] leading-[18px] text-[#92867b]">
            Orders you place while signed in will show up here.
          </Text>
        </View>
      ) : (
        <View className="mt-4 gap-3">
          {orders.map((order) => (
            <View
              key={order.id}
              className="rounded-[18px] border border-[#f3ece3] bg-white p-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-[13px] font-extrabold text-[#302b27]">
                  Order #{order.id.slice(-6)}
                </Text>
                <Text className="rounded-full bg-[#fff0e8] px-3 py-1 text-[10px] font-bold text-[#b95e3e]">
                  {order.status}
                </Text>
              </View>
              <Text className="mt-2 text-[11px] leading-5 text-[#62584f]">
                {order.items.map((item) => `${item.quantity} × ${item.name}`).join('\n')}
              </Text>
              <View className="mt-3 flex-row justify-between">
                <Text className="text-[11px] text-[#80756b]">{order.paymentMethod}</Text>
                <Text className="text-[13px] font-extrabold text-[#302b27]">
                  ${order.total.toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
