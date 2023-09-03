import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  Extrapolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';

export interface DotProps {
  x: SharedValue<number>;
  index: number;
}

export const Dot: React.FC<DotProps> = (props) => {
  const { x, index } = props;
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const animatedDotStyle = useAnimatedStyle(() => {
    const width = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [10, 25, 10],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP,
    );

    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ['#005b4f', '#1e2169', '#f15937'],
    );

    return { width, opacity, backgroundColor };
  });

  return (
    <Animated.View style={[styles.dot, animatedDotStyle]} />
  )
}

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
})
