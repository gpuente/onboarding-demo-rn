import React from 'react';
import { SharedValue } from 'react-native-reanimated';
import { StyleSheet, Text, View } from 'react-native';

import { Dot } from '../Dot';
import { OnboardingData } from '../../data'

export interface PaginationProps {
  data: OnboardingData[];
  x: SharedValue<number>;
};

export const Pagination: React.FC<PaginationProps> = (props) => {
  const { data, x } = props;

  return (
    <View style={styles.container}>
      {data.map((_, index) => (
        <Dot key={index} index={index} x={x} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
