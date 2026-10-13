import { useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { CustomerProfile } from '../data/customerAccount';
import { foodItems, type CartItems } from '../data/foodData';
import type { CustomerDetails, Order, PaymentMethod } from '../data/orders';
import type { AuthMode } from './AuthScreen';
import { AccountAvatar } from './AccountAvatar';
import { AccountSettingsScreen } from './AccountSettingsScreen';
import { Brand } from './Brand';
import { BottomNavigation } from './BottomNavigation';
import { CartScreen } from './CartScreen';
import { CategoryChips } from './CategoryChips';
import { CustomerOrdersScreen } from './CustomerOrdersScreen';
import { EmptyState } from './EmptyState';
import { FeaturedFoodCard } from './FeaturedFoodCard';
import { MenuCard } from './MenuCard';
import { SearchField } from './SearchField';

type GuestHomeScreenProps = {
  customerProfile: CustomerProfile | null;
  orders: Order[];
  onOpenAuth: (mode: AuthMode) => void;
  onLogout: () => void;
  onUpdateProfile: (profile: CustomerProfile) => void;
  onOrderPlaced: (order: Order) => void;
};

export function GuestHomeScreen({
  customerProfile,
  orders,
  onOpenAuth,
  onLogout,
  onUpdateProfile,
  onOrderPlaced,
}: GuestHomeScreenProps) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 700;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<CartItems>({});
  const [activeTab, setActiveTab] = useState('Home');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [accountMenuVisible, setAccountMenuVisible] = useState(false);
  const searchRef = useRef<TextInput>(null);
  const pageRef = useRef<ScrollView>(null);
  const menuListOffset = useRef(0);

  const visibleItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    return foodItems.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        !query || `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(query);
      const matchesSaved = activeTab !== 'Saved' || savedIds.includes(item.id);
      return matchesCategory && matchesSearch && matchesSaved;
    });
  }, [activeTab, savedIds, search, selectedCategory]);

  const cartCount = Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
  const cartSubtotal = foodItems.reduce(
    (total, item) => total + item.price * (cartItems[item.id] ?? 0),
    0
  );
  const cartEntries = foodItems.filter((item) => (cartItems[item.id] ?? 0) > 0);

  const scrollToMenu = () => {
    requestAnimationFrame(() => {
      pageRef.current?.scrollTo({ y: menuListOffset.current, animated: true });
    });
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    setCartItems((current) => {
      const next = { ...current };
      if (quantity <= 0) {
        delete next[id];
      } else {
        next[id] = quantity;
      }
      return next;
    });
  };

  const addToCart = (id: string) => {
    setOrderPlaced(false);
    setCartItems((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
  };

  const selectTab = (tab: string) => {
    setActiveTab(tab);
    if (tab !== 'Cart') {
      setOrderPlaced(false);
    }
    if (tab === 'Menu') {
      scrollToMenu();
    } else if (tab === 'Search') {
      searchRef.current?.focus();
    } else {
      pageRef.current?.scrollTo({ y: 0, animated: true });
    }
  };

  const placeOrder = (customer: CustomerDetails, paymentMethod: PaymentMethod) => {
    if (customerProfile) {
      onUpdateProfile({
        ...customerProfile,
        fullName: customer.name,
        contactNumber: customer.phone,
        address: customer.address,
      });
    }
    onOrderPlaced({
      id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
      createdAt: new Date().toISOString(),
      customerEmail: customerProfile?.email,
      customer,
      paymentMethod,
      items: cartEntries.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: cartItems[item.id] ?? 0,
        unitPrice: item.price,
      })),
      total: cartSubtotal,
      status: 'Received',
    });
    setOrderPlaced(true);
    setCartItems({});
  };

  return (
    <SafeAreaView className="flex-1 bg-[#fffaf3]" edges={['top', 'bottom']}>
      <ScrollView
        ref={pageRef}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerClassName={isTablet ? 'px-8 pb-6' : 'px-5 pb-6'}>
        <View
          className="w-full self-center"
          style={{ maxWidth: activeTab === 'Cart' ? 720 : 1120 }}>
          {activeTab === 'Cart' ? (
            <CartScreen
              items={cartEntries}
              quantities={cartItems}
              subtotal={cartSubtotal}
              orderPlaced={orderPlaced}
              defaultCustomer={{
                name: customerProfile?.fullName ?? '',
                phone: customerProfile?.contactNumber ?? '',
                address: customerProfile?.address ?? '',
              }}
              onChangeQuantity={updateCartQuantity}
              onPlaceOrder={placeOrder}
              onBrowseMenu={() => selectTab('Menu')}
            />
          ) : (
            <>
              <View className="relative z-20">
                <View
                  className={`flex-row items-center justify-between ${
                    isTablet ? 'pb-7 pt-2' : 'pb-5 pt-[3px]'
                  }`}>
                  <Brand />
                  <View className="flex-row items-center gap-3">
                    <View className="flex-row items-center gap-[5px] rounded-full bg-[#f5eee5] px-[10px] py-2">
                      <Text className="text-[17px] text-[#f26d45]">⌖</Text>
                      <Text className="text-[10px] font-bold text-[#62584f]">
                        Your neighborhood
                      </Text>
                      <Text className="text-[13px] text-[#82776e]">⌄</Text>
                    </View>
                    <AccountAvatar
                      onPress={() => setAccountMenuVisible((visible) => !visible)}
                    />
                  </View>
                </View>

                {accountMenuVisible && (
                  <View
                    className="absolute right-0 top-full z-30 mt-1 w-[220px] rounded-[16px] border border-[#f0e5d9] bg-white p-2 shadow-sm"
                    style={{ elevation: 12 }}>
                  {customerProfile ? (
                    <>
                      <Text
                        numberOfLines={1}
                        className="px-3 pb-2 pt-1 text-[12px] font-extrabold text-[#302b27]">
                        {customerProfile.fullName || customerProfile.email}
                      </Text>
                      {(
                        [
                          ['Orders', '▤'],
                          ['Cart', '🛍'],
                          ['Settings', '⚙'],
                        ] as const
                      ).map(([label, icon]) => (
                        <Pressable
                          key={label}
                          accessibilityRole="button"
                          onPress={() => {
                            setAccountMenuVisible(false);
                            selectTab(label);
                          }}
                          className="flex-row items-center gap-3 rounded-[10px] px-3 py-[11px]">
                          <Text className="text-[14px] text-[#e8754f]">{icon}</Text>
                          <Text className="text-[12px] font-semibold text-[#62584f]">
                            {label}
                          </Text>
                        </Pressable>
                      ))}
                      <View className="my-1 h-px bg-[#f1e9e0]" />
                      <Pressable
                        accessibilityRole="button"
                        onPress={() => {
                          setAccountMenuVisible(false);
                          setActiveTab('Home');
                          onLogout();
                        }}
                        className="rounded-[10px] px-3 py-[11px]">
                        <Text className="text-[12px] font-bold text-[#a34b35]">Log out</Text>
                      </Pressable>
                    </>
                  ) : (
                    <>
                      <Text className="px-3 pb-2 pt-1 text-[12px] font-extrabold text-[#302b27]">
                        Your account
                      </Text>
                      {(
                        [
                          ['Log in', 'login'],
                          ['Create account', 'register'],
                        ] as const
                      ).map(([label, mode]) => (
                        <Pressable
                          key={mode}
                          accessibilityRole="button"
                          onPress={() => {
                            setAccountMenuVisible(false);
                            onOpenAuth(mode);
                          }}
                          className="rounded-[10px] px-3 py-[11px]">
                          <Text className="text-[12px] font-semibold text-[#62584f]">
                            {label}
                          </Text>
                        </Pressable>
                      ))}
                    </>
                  )}
                  </View>
                )}
              </View>

              {customerProfile && activeTab === 'Orders' ? (
                <CustomerOrdersScreen
                  orders={orders.filter((order) => order.customerEmail === customerProfile.email)}
                />
              ) : customerProfile && activeTab === 'Settings' ? (
                <AccountSettingsScreen profile={customerProfile} onChange={onUpdateProfile} />
              ) : (
                <>
              <View className={`mb-[17px] ${isTablet ? 'mt-2' : ''}`}>
                <Text className="mb-[7px] text-[9px] font-extrabold tracking-[1.8px] text-[#d77c5d]">
                  A GOOD DAY STARTS HERE
                </Text>
                <Text
                  className={`font-extrabold tracking-[-1px] text-[#302b27] ${
                    isTablet
                      ? 'max-w-[620px] text-[36px] leading-[43px]'
                      : 'max-w-[320px] text-[27px] leading-[33px]'
                  }`}>
                  Hungry for <Text className="text-[#f26d45]">something good?</Text>
                </Text>
                <Text className="mt-[6px] text-[12px] text-[#897e74]">
                  A little delicious is just around the corner.
                </Text>
              </View>

              <SearchField value={search} onChangeText={setSearch} inputRef={searchRef} />

              {activeTab === 'Home' && (
                <FeaturedFoodCard
                  isTablet={isTablet}
                  onPress={() => {
                    setSelectedCategory('Bowls');
                    scrollToMenu();
                  }}
                />
              )}

              <View className="mb-[13px] flex-row items-center justify-between">
                <View>
                  <Text className="text-[18px] font-extrabold tracking-[-0.5px] text-[#302b27]">
                    {activeTab === 'Saved'
                      ? 'Your saved bites'
                      : activeTab === 'Menu'
                        ? 'The menu'
                        : 'Find your favorite'}
                  </Text>
                  <Text className="mt-[3px] text-[10px] text-[#92867b]">
                    Good things, made fresh today
                  </Text>
                </View>
                {activeTab !== 'Saved' && (
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => selectTab('Menu')}
                    hitSlop={8}>
                    <Text className="text-[11px] font-bold text-[#e8754f]">See all →</Text>
                  </Pressable>
                )}
              </View>

              {activeTab !== 'Saved' && (
                <CategoryChips selected={selectedCategory} onSelect={setSelectedCategory} />
              )}

              <View
                style={{
                  flexDirection: isTablet ? 'row' : 'column',
                  flexWrap: isTablet ? 'wrap' : 'nowrap',
                  justifyContent: isTablet ? 'space-between' : 'flex-start',
                  rowGap: isTablet ? 14 : 11,
                }}
                onLayout={(event) => {
                  menuListOffset.current = event.nativeEvent.layout.y;
                }}>
                {visibleItems.length > 0 ? (
                  visibleItems.map((item, index) => (
                    <View
                      key={item.id}
                      style={isTablet ? { width: '48.5%', flexShrink: 0 } : { width: '100%' }}>
                      <MenuCard
                        item={item}
                        index={index}
                        isSaved={savedIds.includes(item.id)}
                        quantity={cartItems[item.id] ?? 0}
                        onToggleSaved={(id) =>
                          setSavedIds((current) =>
                            current.includes(id)
                              ? current.filter((savedId) => savedId !== id)
                              : [...current, id]
                          )
                        }
                        onAddToCart={addToCart}
                        onUpdateQuantity={updateCartQuantity}
                      />
                    </View>
                  ))
                ) : (
                  <View className="w-full">
                    <EmptyState
                      icon={activeTab === 'Saved' ? '♡' : '🍽️'}
                      title={
                        activeTab === 'Saved' ? 'Save a bite for later' : 'No bites found just yet'
                      }
                      description={
                        activeTab === 'Saved'
                          ? 'Tap the heart on anything that catches your eye.'
                          : 'Try another search or choose a different category.'
                      }
                    />
                  </View>
                )}
              </View>
              <Text className="py-[17px] text-center text-[10px] text-[#a69a8f]">
                {customerProfile
                  ? `Signed in as ${customerProfile.email}`
                  : 'Browsing as a guest · No account needed'}
              </Text>
                </>
              )}
            </>
          )}
        </View>
      </ScrollView>
      <BottomNavigation activeTab={activeTab} cartCount={cartCount} onSelect={selectTab} />
    </SafeAreaView>
  );
}
