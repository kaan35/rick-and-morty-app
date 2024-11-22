import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import {AntDesign, Ionicons, MaterialIcons} from '@expo/vector-icons';
import {SymbolWeight} from 'expo-symbols';
import React from 'react';
import {OpaqueColorValue, StyleProp, ViewStyle} from 'react-native';

export function IconSymbol({
  color,
  name,
  pack = 'Ionicons',
  size = 24,
  style,
}: {
  name: string;
  size?: number;
  color?: string | OpaqueColorValue;
  pack?: string | 'AntDesign' | 'Ionicons' | 'MaterialIcons';
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  const colorScheme = useColorScheme();
  const iconColor = color ? color : Colors[colorScheme ?? 'light'].primary;

  return pack === 'AntDesign' ? (
    <AntDesign color={iconColor} size={size} name={name} style={style} />
  ) : pack === 'Ionicons' ? (
    <Ionicons color={iconColor} size={size} name={name} style={style} />
  ) : (
    <MaterialIcons color={iconColor} size={size} name={name} style={style} />
  );
}
