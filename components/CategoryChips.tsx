import { Pressable, ScrollView, Text } from 'react-native';

import { categories } from './foodData';

type CategoryChipsProps = {
  selected: string;
  onSelect: (category: string) => void;
};

export function CategoryChips({ selected, onSelect }: CategoryChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      scrollEventThrottle={16}
      contentContainerClassName="gap-2 pb-[14px]">
      {categories.map((category) => (
        <Pressable
          key={category}
          accessibilityRole="button"
          accessibilityState={{ selected: selected === category }}
          onPress={() => onSelect(category)}
          className={`rounded-full border px-[15px] py-2 ${
            selected === category ? 'border-[#f26d45] bg-[#f26d45]' : 'border-[#efe6dc] bg-white'
          }`}>
          <Text
            className={`text-[11px] font-bold ${
              selected === category ? 'text-white' : 'text-[#786e64]'
            }`}>
            {category}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
