import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';

export default function NewRoomScreen() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(steps)/roomNameStep" options={{ title:'Crear Sala' }} />
        <Stack.Screen name="(steps)/roomTypeStep" options={{ title:'Tipo de Sala' }} />
        <Stack.Screen name="(steps)/roomScopeStep" options={{ title:'Sala pública o privada?' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}