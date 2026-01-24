import React, { useState, useRef } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";

interface CarouselItem {
  id: string;
  content: React.ReactNode;
}

interface CarouselAppProps {
  items: CarouselItem[];
  showDots?: boolean;
  autoScroll?: boolean;
  itemsGap?: number;
  itemsWidthPercentage?: number;
  scrollDetectionThresholdPercentage?: number;
}

export function CarouselApp({
  items,
  showDots = true,
  autoScroll = true,
  itemsGap = 16,
  itemsWidthPercentage = 85,
  scrollDetectionThresholdPercentage = 15,
}: CarouselAppProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [scrollStartX, setScrollStartX] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const colors = useThemeColor();

  const itemWidth = containerWidth * (itemsWidthPercentage / 100);
  const totalItemWidth = itemWidth + itemsGap;

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const scrollToIndex = (index: number) => {
    if (scrollViewRef.current && containerWidth > 0) {
      const targetIndex = Math.max(0, Math.min(index, items.length - 1));
      scrollViewRef.current.scrollTo({
        x: targetIndex * totalItemWidth,
        animated: true,
      });
      setCurrentIndex(targetIndex);
    }
  };

  const handleScrollBeginDrag = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    setScrollStartX(event.nativeEvent.contentOffset.x);
  };

  const handleScrollEndDrag = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    if (containerWidth === 0) return;

    const currentScrollX = event.nativeEvent.contentOffset.x;
    const scrollDiff = currentScrollX - scrollStartX;
    const threshold =
      totalItemWidth * (scrollDetectionThresholdPercentage / 100);

    let newIndex = currentIndex;

    if (scrollDiff > threshold) {
      // rigth swipe (next)
      newIndex = Math.min(currentIndex + 1, items.length - 1);
    } else if (scrollDiff < -threshold) {
      // left swipe (previous)
      newIndex = Math.max(currentIndex - 1, 0);
    }

    scrollToIndex(newIndex);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // update dots based on scroll position
    if (!autoScroll || containerWidth === 0) return;

    const contentOffset = event.nativeEvent.contentOffset;
    const calculatedIndex = Math.round(contentOffset.x / totalItemWidth);
    const boundedIndex = Math.max(
      0,
      Math.min(calculatedIndex, items.length - 1)
    );

    if (boundedIndex !== currentIndex) {
      setCurrentIndex(boundedIndex);
    }
  };

  return (
    <ThemedView style={styles.container} onLayout={handleLayout}>
      <View style={styles.carouselContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          onScrollBeginDrag={handleScrollBeginDrag}
          onScrollEndDrag={handleScrollEndDrag}
          scrollEventThrottle={16}
          bounces={false}
          decelerationRate="fast"
          directionalLockEnabled={true}
          contentContainerStyle={{
            paddingRight: containerWidth * ((100 - itemsWidthPercentage) / 100),
          }}
        >
          {items.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.slide,
                {
                  width: itemWidth,
                  marginRight: index < items.length - 1 ? itemsGap : 0,
                },
              ]}
            >
              {item.content}
            </View>
          ))}
        </ScrollView>
      </View>

      {showDots && (
        <View style={styles.dotsContainer}>
          {items.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === currentIndex
                      ? colors.tint
                      : colors.tabIconDefault,
                },
              ]}
              onTouchEnd={() => scrollToIndex(index)}
            />
          ))}
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  carouselContainer: {
    flex: 1,
  },
  slide: {
    flex: 1,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
