import { Text, View } from 'react-native';

type EmptyStateProps = {
  title: string;
  description: string;
  icon: string;
};

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <View className="items-center rounded-[18px] border border-[#f3ece3] bg-white px-6 py-[34px]">
      <Text className="mb-[7px] text-[34px] text-[#e97854]">{icon}</Text>
      <Text className="text-[14px] font-extrabold text-[#3a322c]">{title}</Text>
      <Text className="mt-[5px] text-center text-[11px] leading-[17px] text-[#92867b]">
        {description}
      </Text>
    </View>
  );
}
