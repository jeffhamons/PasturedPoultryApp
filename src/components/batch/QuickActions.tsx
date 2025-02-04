import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import COLORS from '@/constants/Colors';

interface QuickActionsProps {
  onMortalityPress: () => void;
  onWeightPress: () => void;
  onFeedPress: () => void;
}

export const QuickActions = ({ 
  onMortalityPress, 
  onWeightPress, 
  onFeedPress 
}: QuickActionsProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={onMortalityPress}
      >
        <View style={[styles.iconContainer, { backgroundColor: COLORS.sandBeige }]}>
          <FontAwesome name="warning" size={24} color={COLORS.warningRed} />
        </View>
        <Text style={styles.actionText}>Record{'\n'}Mortality</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.actionButton}
        onPress={onWeightPress}
      >
        <View style={[styles.iconContainer, { backgroundColor: COLORS.paleGreen }]}>
          <FontAwesome name="balance-scale" size={24} color={COLORS.softGreen} />
        </View>
        <Text style={styles.actionText}>Log{'\n'}Weight</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.actionButton}
        onPress={onFeedPress}
      >
        <View style={[styles.iconContainer, { backgroundColor: COLORS.paleGreen }]}>
          <FontAwesome name="cutlery" size={24} color={COLORS.accentGreen} />
        </View>
        <Text style={styles.actionText}>Record{'\n'}Feed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 16,
    marginTop: 12,
    borderRadius: 12,
    shadowColor: COLORS.darkBrown,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButton: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    color: COLORS.darkBrown,
    fontSize: 12,
    textAlign: 'center',
  },
});