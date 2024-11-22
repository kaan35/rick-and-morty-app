import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Styles} from '@/utils/Styles';

export default function Accordion({
  isExpanded,
  children,
  viewKey,
  style,
  duration = 100,
}: {
  isExpanded: boolean;
  duration?: number;
  children: React.ReactNode;
  viewKey: string;
  style?: StyleProp<ViewStyle>;
}) {
  const height = useSharedValue(0);

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(isExpanded), {
      duration,
    }),
  );
  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  return (
    <Animated.View
      key={`accordionItem_${viewKey}`}
      style={[Styles.animatedView, bodyStyle, style]}>
      <View
        onLayout={e => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={Styles.wrapper}>
        {children}
      </View>
    </Animated.View>
  );
}
