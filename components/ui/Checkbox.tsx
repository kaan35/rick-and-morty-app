import React from 'react';
import {OpaqueColorValue, TouchableOpacity, View} from 'react-native';
import {IconSymbol} from '@/components/ui/IconSymbol';
import {ThemedText} from '@/components/ui/ThemedText';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';

export default function CheckBox({
  isChecked = false,
  onPress,
  color,
  title,
  size = 32,
}: {
  color?: string | OpaqueColorValue;
  isChecked?: boolean;
  onPress: () => void;
  size?: number;
  title?: string;
}) {
  const iconName = isChecked ? 'checkbox-outline' : 'square-outline';
  const colorScheme = useColorScheme();

  return (
    <View>
      <View>
        <TouchableOpacity onPress={onPress}>
          <IconSymbol
            size={size}
            name={iconName}
            color={color ? color : Colors[colorScheme ?? 'light'].primary}
          />
        </TouchableOpacity>
      </View>
      <View>{title ? <ThemedText>{title}</ThemedText> : ''}</View>
    </View>
  );
}
