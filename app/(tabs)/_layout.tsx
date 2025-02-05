import { Tabs } from 'expo-router';
import { Home, Bird, Building2, BarChart } from 'lucide-react-native';
import COLORS from '@/constants/Colors';

const ICON_SIZE = 24;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.earthBrown,
        tabBarInactiveTintColor: COLORS.softGreen,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: COLORS.softGreen,
          height: 60,
        },
        headerStyle: {
          backgroundColor: COLORS.earthBrown,
        },
        headerTitleStyle: {
          color: 'white',
          fontSize: 20,
          fontWeight: '600',
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <Home size={ICON_SIZE} color={color} strokeWidth={2} />,
        }}
      />
      
      <Tabs.Screen
        name="batches"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Bird size={ICON_SIZE} color={color} strokeWidth={2} />,
        }}
      />

      <Tabs.Screen
        name="farm"
        options={{
          tabBarIcon: ({ color }) => <Building2 size={ICON_SIZE} color={color} strokeWidth={2} />,
        }}
      />

      <Tabs.Screen
        name="reports"
        options={{
          tabBarIcon: ({ color }) => <BarChart size={ICON_SIZE} color={color} strokeWidth={2} />,
        }}
      />
    </Tabs>
  );
}