import {StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';

type GapProps = {
  height: number;
};

const Gap: React.FC<GapProps> = ({height}) => {
  return <View style={[styles.gap, {height}]} />;
};

export default Gap;

const styles = StyleSheet.create<{gap: ViewStyle}>({
  gap: {
    height: 0,
  },
});
