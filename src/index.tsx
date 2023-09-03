import React from 'react';
import { View, FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedRef,
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

import { data, OnboardingData } from './data';
import { OnboardingItem, Pagination, CustomButton } from './components';

export const Root: React.FC = () => {
  const flatListRef = useAnimatedRef<Animated.FlatList<OnboardingData>>();
  const x = useSharedValue(0);

  const flatListIndex = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        horizontal
        data={data}
        pagingEnabled
        bounces={false}
        ref={flatListRef}
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <OnboardingItem index={index} item={item} x={x} />}
        onViewableItemsChanged={({ viewableItems }) => {
          if (viewableItems[0] && viewableItems[0].index !== null) {
            flatListIndex.value = viewableItems[0].index;
          }
        }}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <View style={styles.bottomContainer}>
        <Pagination data={data} x={x} />
        <CustomButton
          x={x}
          dataLength={data.length}
          flatlistRef={flatListRef as React.RefObject<FlatList<OnboardingData>>}
          flatlistIndex={flatListIndex}
        />
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    left: 0,
    right: 0,
    bottom: 20,
    paddingVertical: 30,
    position: 'absolute',
    marginHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
