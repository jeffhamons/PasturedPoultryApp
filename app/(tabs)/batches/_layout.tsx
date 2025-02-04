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
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: COLORS.earthBrown,
        },
        headerTitleStyle: {
          color: 'white',
          fontSize: 20,
          fontWeight: '600',
        },
        // Hide tab labels and use only icons
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          headerTitle: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <Home size={ICON_SIZE} color={color} strokeWidth={2} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="batches"
        options={{
          title: 'Batches',
          headerShown: false, // Hide header for batch stack
          tabBarIcon: ({ color }) => (
            <Bird size={ICON_SIZE} color={color} strokeWidth={2} />
          ),
        }}
      />

      <Tabs.Screen
        name="farm"
        options={{
          title: 'Farm',
          headerTitle: 'Farm Info',
          tabBarIcon: ({ color }) => (
            <Building2 size={ICON_SIZE} color={color} strokeWidth={2} />
          ),
        }}
      />

      <Tabs.Screen
        name="reports"
        options={{
          title: 'Reports',
          headerTitle: 'Reports & Analytics',
          tabBarIcon: ({ color }) => (
            <BarChart size={ICON_SIZE} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}