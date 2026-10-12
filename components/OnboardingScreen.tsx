import { useRef, useState } from 'react';
import { FlatList, Image, Pressable, Text, View, useWindowDimensions } from 'react-native';
import Animated, { FadeIn, FadeInDown, LinearTransition } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Brand } from './Brand';
import { slides } from './foodData';

type OnboardingScreenProps = {
  onExplore: () => void;
};

export function OnboardingScreen({ onExplore }: OnboardingScreenProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const { height, width } = useWindowDimensions();
  const slideListRef = useRef<FlatList<(typeof slides)[number]>>(null);

  const goToSlide = (index: number) => {
    setActiveSlide(index);
    slideListRef.current?.scrollToOffset({ offset: index * width, animated: true });
  };

  const goNext = () => {
    if (activeSlide === slides.length - 1) {
      onExplore();
      return;
    }
    goToSlide(activeSlide + 1);
  };

  const updateActiveSlide = (offset: number) => {
    const nextSlide = Math.round(offset / width);
    setActiveSlide((current) => (current === nextSlide ? current : nextSlide));
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#fffaf3]"
      style={{ paddingHorizontal: 24 }}
      edges={['top', 'bottom']}>
      <View
        className="mb-3 h-14 w-full flex-row items-center justify-between self-center"
        style={{ maxWidth: 680 }}>
        <Brand />
        <Pressable accessibilityRole="button" onPress={onExplore} hitSlop={12}>
          <Text className="p-2 text-[14px] font-semibold text-[#776b61]">Skip</Text>
        </Pressable>
      </View>

      <FlatList
        ref={slideListRef}
        horizontal
        pagingEnabled
        bounces={false}
        data={slides}
        keyExtractor={(item) => item.eyebrow}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        scrollEventThrottle={16}
        className="flex-1"
        style={{ marginHorizontal: -24 }}
        contentContainerStyle={{ flexGrow: 1 }}
        getItemLayout={(_, index) => ({
          length: width,
          offset: index * width,
          index,
        })}
        onScroll={(event) => updateActiveSlide(event.nativeEvent.contentOffset.x)}
        onScrollEndDrag={(event) => updateActiveSlide(event.nativeEvent.contentOffset.x)}
        onMomentumScrollEnd={(event) => updateActiveSlide(event.nativeEvent.contentOffset.x)}
        renderItem={({ item }) => (
          <View className="flex-1" style={{ width, paddingHorizontal: 24, alignItems: 'center' }}>
            <Animated.View
              entering={FadeIn.duration(450)}
              className="relative min-h-[190px] w-full flex-1 flex-shrink overflow-hidden rounded-[30px] bg-[#eadbcb]"
              style={{
                width: '100%',
                maxWidth: 680,
                height: Math.min(height * 0.42, 350),
                maxHeight: 390,
              }}>
              <Image
                source={{ uri: item.image }}
                accessibilityLabel={item.imageLabel}
                resizeMode="cover"
                className="h-full w-full"
              />
              <View className="absolute bottom-[15px] left-[15px] rounded-full bg-[#fffaf3]/95 px-[13px] py-[9px]">
                <Text className="text-[12px] font-bold text-[#49382d]">✳ A fresh take on food</Text>
              </View>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.duration(450)}
              className="w-full max-w-[680px] self-center pt-[25px]">
              <Text className="mb-[9px] text-[10px] font-extrabold tracking-[2px] text-[#dd6845]">
                {item.eyebrow}
              </Text>
              <Text className="text-[37px] font-extrabold leading-[42px] tracking-[-1.6px] text-[#302b27]">
                {item.title}
                {'\n'}
                <Text className="text-[#f26d45]">{item.accent}</Text>
              </Text>
              <Text className="mt-[9px] max-w-[310px] text-[14px] leading-[21px] text-[#80756b]">
                {item.description}
              </Text>
            </Animated.View>
          </View>
        )}
      />

      <View className="w-full self-center pb-1 pt-5" style={{ maxWidth: 680 }}>
        <View
          className="mb-4 flex-row items-center justify-center gap-[7px]"
          accessibilityLabel={`Slide ${activeSlide + 1} of ${slides.length}`}>
          {slides.map((item, index) => (
            <Pressable
              key={item.eyebrow}
              accessibilityRole="button"
              accessibilityLabel={`Go to slide ${index + 1}`}
              accessibilityState={{ selected: index === activeSlide }}
              hitSlop={8}
              onPress={() => goToSlide(index)}>
              <Animated.View
                layout={LinearTransition.springify()}
                className={`h-[7px] rounded-full ${
                  index === activeSlide ? 'w-[22px] bg-[#f26d45]' : 'w-[7px] bg-[#e8dcd0]'
                }`}
              />
            </Pressable>
          ))}
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={goNext}
          style={({ pressed }) => ({ opacity: pressed ? 0.88 : 1 })}
          className="min-h-[54px] flex-row items-center justify-center gap-[9px] rounded-[18px] bg-[#f26d45]">
          <Text className="text-[15px] font-extrabold text-white">
            {activeSlide === slides.length - 1 ? 'Get started' : 'Next'}
          </Text>
          <Text className="text-[19px] font-semibold text-white">→</Text>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={onExplore} className="items-center py-3">
          <Text className="text-[12px] font-semibold text-[#84776d]">
            Just looking? Browse as a guest
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
