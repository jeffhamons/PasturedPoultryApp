import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/ui/Themed';
import COLORS, { getStatusColor } from '@/constants/Colors';
import { BatchStatus } from '@/types/batch';

export interface BatchHeaderProps {
  batchId: string;
  status: BatchStatus;
  breed: string;
}

export function BatchHeader({ batchId, status, breed }: BatchHeaderProps) {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.background,
      padding: 16,
      borderRadius: 8,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: COLORS.border,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    label: {
      fontSize: 14,
      color: COLORS.label,
      marginRight: 8,
    },
    value: {
      fontSize: 16,
      color: COLORS.text,
      fontWeight: '500',
    },
    status: {
      fontSize: 16,
      fontWeight: 'bold',
      textTransform: 'capitalize',
      backgroundColor: getStatusColor(status),
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Batch ID:</Text>
        <Text style={styles.value}>{batchId}</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.status}>{status.toLowerCase()}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Breed:</Text>
        <Text style={styles.value}>{breed}</Text>
      </View>
    </View>
  );
}