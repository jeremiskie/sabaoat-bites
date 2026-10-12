import { Pressable, Text, View } from 'react-native';

type QuantityControlProps = {
  label: string;
  quantity: number;
  onChange: (quantity: number) => void;
};

export function QuantityControl({ label, quantity, onChange }: QuantityControlProps) {
  return (
    <View className="mt-[6px] flex-row items-center gap-[9px] self-start">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Remove one ${label}`}
        onPress={() => onChange(quantity - 1)}
        className="h-[25px] w-[25px] items-center justify-center rounded-full bg-[#fff0e8]">
        <Text className="text-[16px] font-extrabold leading-[19px] text-[#df6745]">−</Text>
      </Pressable>
      <Text className="min-w-[12px] text-center text-[12px] font-extrabold text-[#3a322c]">
        {quantity}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Add one ${label}`}
        onPress={() => onChange(quantity + 1)}
        className="h-[25px] w-[25px] items-center justify-center rounded-full bg-[#fff0e8]">
        <Text className="text-[16px] font-extrabold leading-[19px] text-[#df6745]">＋</Text>
      </Pressable>
    </View>
  );
}
