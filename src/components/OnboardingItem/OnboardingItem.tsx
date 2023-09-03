import React, { useRef, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { OnboardingData } from '../../data';

export interface OnboardingItemProps {
  item: OnboardingData;
  index: number;
  x: SharedValue<number>;
};

export const OnboardingItem = (props: OnboardingItemProps) => {
  const { item, index, x } = props;
  const animationRef = useRef<LottieView>(null);
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  const circleAnimation = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [1, 4, 4],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ scale }],
    };
  });

  const lottieAnimation = useAnimatedStyle(() => {
    const translateY = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [200, 0, -200],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ translateY }],
    };
  });

  return (
    <View style={[styles.container, { width: SCREEN_WIDTH }]}>
      <View style={styles.circleContainer}>
        <Animated.View
          style={[{
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH,
            borderRadius: SCREEN_WIDTH,
            backgroundColor: item.backgroundColor
          }, circleAnimation]}
        />
      </View>
      <Animated.View style={lottieAnimation}>
        <LottieView
          ref={animationRef}
          source={item.animation}
          style={{ height: SCREEN_WIDTH * 0.9, width: SCREEN_WIDTH * 0.9 }}
          autoPlay
          loop
        />
      </Animated.View>
      <Text style={[styles.title, { color: item.textColor }]}>{item.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 120,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    textAlign: 'center',
    fontSize: 44,
    fontWeight: 'bold',
    marginBottom: 10,
    marginHorizontal: 20
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
