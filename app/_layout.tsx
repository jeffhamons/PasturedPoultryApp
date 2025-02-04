import { Stack } from 'expo-router';
import { Outlet } from 'react-router-dom'; // Correct import for SDK 48 and below
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { FarmInfoProvider } from '../src/context/FarmInfoContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function RootLayout() {
  //... (rest of your code: unstable_settings, SplashScreen, useFonts, useEffects)

  return (
    <FarmInfoProvider>
      <ThemeProvider value={useColorScheme() === 'dark'? DarkTheme: DefaultTheme}>
        <RootLayoutNav />
      </ThemeProvider>
    </FarmInfoProvider>
  );
}


function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}