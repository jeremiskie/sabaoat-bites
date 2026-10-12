import { Pressable, Text, TextInput, View } from 'react-native';

type SearchFieldProps = {
  value: string;
  onChangeText: (value: string) => void;
  inputRef?: React.RefObject<TextInput | null>;
};

export function SearchField({ value, onChangeText, inputRef }: SearchFieldProps) {
  return (
    <View className="mb-[17px] min-h-12 flex-row items-center rounded-2xl border border-[#f0e8df] bg-white px-[14px]">
      <Text className="mr-2 text-[25px] leading-[28px] text-[#9b8f84]">⌕</Text>
      <TextInput
        ref={inputRef}
        accessibilityLabel="Search dishes"
        placeholder="Search dishes, flavors, cravings..."
        placeholderTextColor="#a89d91"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        className="flex-1 py-[10px] text-[12px] text-[#3e3731]"
      />
      {value.length > 0 && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          onPress={() => onChangeText('')}
          hitSlop={10}>
          <Text className="pl-2 text-[21px] text-[#978b80]">×</Text>
        </Pressable>
      )}
    </View>
  );
}
