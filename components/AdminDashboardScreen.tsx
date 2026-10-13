import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { Order, OrderStatus } from '../data/orders';
import { orderStatuses } from '../data/orders';
import { AccountAvatar } from './AccountAvatar';
import { Brand } from './Brand';

type AdminDashboardScreenProps = {
  orders: Order[];
  onSignOut: () => void;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
};

function formatDate(date: string) {
  return new Date(date).toLocaleString();
}

export function AdminDashboardScreen({
  orders,
  onSignOut,
  onUpdateStatus,
}: AdminDashboardScreenProps) {
  const activeOrders = orders.filter(
    (order) => order.status !== 'Completed' && order.status !== 'Cancelled'
  ).length;

  return (
    <SafeAreaView className="flex-1 bg-[#fffaf3]" edges={['top', 'bottom']}>
      <ScrollView
        contentContainerClassName="px-5 pb-8"
        showsVerticalScrollIndicator={false}>
        <View className="w-full max-w-[900px] self-center">
          <View className="flex-row items-center justify-between py-3">
            <Brand />
            <View className="flex-row items-center gap-4">
              <AccountAvatar isAdmin />
              <Pressable
                accessibilityRole="button"
                onPress={onSignOut}
                className="rounded-full bg-[#f5eee5] px-4 py-[10px]">
                <Text className="text-[12px] font-bold text-[#776b61]">Sign out</Text>
              </Pressable>
            </View>
          </View>

          <Text className="mb-1 mt-5 text-[10px] font-extrabold tracking-[2px] text-[#dd6845]">
            ADMIN
          </Text>
          <Text className="text-[29px] font-extrabold tracking-[-1px] text-[#302b27]">
            Orders dashboard
          </Text>
          <Text className="mb-5 mt-1 text-[13px] text-[#80756b]">
            Review customer details and keep order statuses up to date.
          </Text>

          <View className="mb-5 flex-row gap-3">
            <View className="flex-1 rounded-[16px] border border-[#f3ece3] bg-white p-4">
              <Text className="text-[11px] font-semibold text-[#80756b]">Total orders</Text>
              <Text className="mt-1 text-[25px] font-extrabold text-[#302b27]">{orders.length}</Text>
            </View>
            <View className="flex-1 rounded-[16px] border border-[#f3ece3] bg-white p-4">
              <Text className="text-[11px] font-semibold text-[#80756b]">In progress</Text>
              <Text className="mt-1 text-[25px] font-extrabold text-[#f26d45]">{activeOrders}</Text>
            </View>
          </View>

          {orders.length === 0 ? (
            <View className="items-center rounded-[18px] border border-[#f3ece3] bg-white px-6 py-10">
              <Text className="mb-2 text-[30px]">🧾</Text>
              <Text className="text-[15px] font-extrabold text-[#302b27]">No orders yet</Text>
              <Text className="mt-1 text-center text-[12px] leading-[18px] text-[#92867b]">
                New customer orders will appear here with their delivery and payment details.
              </Text>
            </View>
          ) : (
            <View className="gap-4">
              {orders.map((order) => (
                <View
                  key={order.id}
                  className="rounded-[18px] border border-[#f3ece3] bg-white p-4">
                  <View className="flex-row flex-wrap items-start justify-between gap-2">
                    <View>
                      <Text className="text-[15px] font-extrabold text-[#302b27]">
                        Order #{order.id.slice(-6)}
                      </Text>
                      <Text className="mt-1 text-[10px] text-[#92867b]">
                        {formatDate(order.createdAt)}
                      </Text>
                    </View>
                    <View className="rounded-full bg-[#fff0e8] px-3 py-[6px]">
                      <Text className="text-[10px] font-extrabold text-[#b95e3e]">
                        {order.status}
                      </Text>
                    </View>
                  </View>

                  <View className="my-4 h-px bg-[#f1e9e0]" />
                  <Text className="mb-2 text-[12px] font-extrabold text-[#49382d]">
                    Customer details
                  </Text>
                  <Text className="text-[12px] leading-5 text-[#62584f]">
                    {order.customer.name}
                    {'\n'}
                    {order.customer.phone}
                    {'\n'}
                    {order.customer.address}
                  </Text>

                  <Text className="mb-2 mt-4 text-[12px] font-extrabold text-[#49382d]">
                    Items
                  </Text>
                  <View className="gap-1">
                    {order.items.map((item) => (
                      <View key={item.id} className="flex-row justify-between gap-3">
                        <Text className="flex-1 text-[11px] text-[#62584f]">
                          {item.quantity} × {item.name}
                        </Text>
                        <Text className="text-[11px] font-semibold text-[#62584f]">
                          ${(item.unitPrice * item.quantity).toFixed(2)}
                        </Text>
                      </View>
                    ))}
                  </View>

                  <View className="mt-4 flex-row items-center justify-between">
                    <Text className="text-[11px] font-semibold text-[#62584f]">
                      Payment · {order.paymentMethod}
                    </Text>
                    <Text className="text-[15px] font-extrabold text-[#302b27]">
                      ${order.total.toFixed(2)}
                    </Text>
                  </View>

                  <Text className="mb-2 mt-4 text-[11px] font-bold text-[#49382d]">
                    Update status
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {orderStatuses.map((status) => (
                      <Pressable
                        key={status}
                        accessibilityRole="button"
                        accessibilityState={{ selected: order.status === status }}
                        onPress={() => onUpdateStatus(order.id, status)}
                        className={`rounded-full px-3 py-2 ${
                          order.status === status ? 'bg-[#f26d45]' : 'bg-[#f5eee5]'
                        }`}>
                        <Text
                          className={`text-[10px] font-bold ${
                            order.status === status ? 'text-white' : 'text-[#776b61]'
                          }`}>
                          {status}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}
          <Text className="mt-5 text-center text-[10px] leading-4 text-[#a69a8f]">
            Demo dashboard · Orders are stored in memory and clear when the app restarts.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
