import { Pressable, Text, View } from 'react-native';

const tabs = [
  { name: 'Home', icon: '⌂' },
  { name: 'Menu', icon: '▤' },
  { name: 'Search', icon: '⌕' },
  { name: 'Saved', icon: '♡' },
  { name: 'Cart', icon: '🛍' },
];

type BottomNavigationProps = {
  activeTab: string;
  cartCount: number;
  onSelect: (tab: string) => void;
};

export function BottomNavigation({ activeTab, cartCount, onSelect }: BottomNavigationProps) {
  return (
    <View className="min-h-[58px] border-t border-[#f1e9e0] bg-[#fffdf9] px-[10px]">
      <View className="min-h-[58px] w-full max-w-[800px] flex-row items-center justify-around self-center">
        {tabs.map((tab) => (
          <Pressable
            key={tab.name}
            accessibilityRole="button"
            accessibilityState={{ selected: activeTab === tab.name }}
            onPress={() => onSelect(tab.name)}
            className="min-w-12 items-center justify-center gap-[2px] py-1">
            <View className="relative">
              <Text
                className={`text-[21px] leading-6 ${
                  activeTab === tab.name ? 'text-[#ef704b]' : 'text-[#a3978d]'
                }`}>
                {tab.icon}
              </Text>
              {tab.name === 'Cart' && cartCount > 0 && (
                <View className="absolute -right-[9px] -top-1 min-h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#f26d45] px-[3px]">
                  <Text className="text-[8px] font-extrabold leading-[10px] text-white">
                    {cartCount}
                  </Text>
                </View>
              )}
            </View>
            <Text
              className={`text-[9px] ${
                activeTab === tab.name
                  ? 'font-extrabold text-[#e46d4b]'
                  : 'font-semibold text-[#9a8e84]'
              }`}>
              {tab.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
