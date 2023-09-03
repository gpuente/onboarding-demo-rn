import React from 'react';
import {
  Linking,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  withSpring,
  withTiming,
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { OnboardingData } from '../../data';

export interface CustomButtonProps {
  dataLength: number;
  x: SharedValue<number>;
  flatlistIndex: SharedValue<number>;
  flatlistRef: React.RefObject<Animated.FlatList<OnboardingData>>;
}

export const CustomButton: React.FC<CustomButtonProps> = (props) => {
  const { x, dataLength, flatlistRef, flatlistIndex } = props;
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const onPress = async () => {
    if (flatlistIndex.value < dataLength - 1) {
      // @ts-ignore
      flatlistRef.current?.scrollToIndex({
        index: flatlistIndex.value + 1,
      });
    } else {
      await Linking.openURL('https://gpuente.me');
    }
  };

  const buttonAnimationStyles = useAnimatedStyle(() => ({
    width: flatlistIndex.value === dataLength - 1
      ? withSpring(140)
      : withSpring(60),
    height: 60,
  }));

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH, 3 * SCREEN_WIDTH],
      ['#005b4f', '#1e2169', '#f15937', '#1e2169'],
    );

    return { backgroundColor };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => ({
    opacity: flatlistIndex.value === dataLength - 1
      ? withTiming(0)
      : withTiming(1),
    transform: [{
      translateX: flatlistIndex.value === dataLength - 1
        ? withTiming(100)
        : withTiming(0),
    }],
  }));

  const textAnimationStyle = useAnimatedStyle(() => ({
    opacity: flatlistIndex.value === dataLength - 1
      ? withTiming(1)
      : withTiming(0),
    transform: [{
      translateX: flatlistIndex.value === dataLength - 1
        ? withTiming(0)
        : withTiming(-100),
    }],
  }));

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View style={[styles.container, animatedColor, buttonAnimationStyles]}>
        <Animated.Text style={[styles.text, textAnimationStyle]}>
          Portfolio
        </Animated.Text>
        <Animated.Image
          style={[styles.arrow, arrowAnimationStyle]}
          source={require('../.././../assets/img/ArrowIcon.png')}
        />
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    position: 'absolute',
    width: 30,
    height: 30,
  },
  text: {
    fontSize: 16,
    color: 'white',
    position: 'absolute',
  },
})
