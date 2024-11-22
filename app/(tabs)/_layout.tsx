import {HapticTab} from '@/components/ui/HapticTab';
import {IconSymbol} from '@/components/ui/IconSymbol';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import {Tabs} from 'expo-router';
import React from 'react';
import {Platform} from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].primary,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          default: {},
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({color}) => (
            <IconSymbol size={28} name="home-outline" color={color} />
          ),
          title: 'Home',
        }}
      />
    </Tabs>
  );
}
