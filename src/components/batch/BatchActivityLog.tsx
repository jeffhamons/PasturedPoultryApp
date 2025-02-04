import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from '@/components/ui/Themed';
import COLORS from '@/constants/Colors';
import { DailyRecord } from '@/types/batch';

interface BatchActivityLogProps {
  dailyRecords: DailyRecord[];
}

export function BatchActivityLog({ dailyRecords }: BatchActivityLogProps) {
  const sortedRecords = [...dailyRecords].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderActivity = (record: DailyRecord) => {
    const activities = [];

    if (record.mortality > 0) {
      activities.push(
        <View key={`mortality-${record.id}`} style={styles.activityItem}>
          <View style={styles.activityHeader}>
            <Text style={styles.date}>{formatDate(record.date)}</Text>
            <Text style={styles.activityType}>Mortality</Text>
          </View>
          <Text style={styles.activityDetail}>
            Lost {record.mortality} birds
          </Text>
          {record.notes && (
            <Text style={styles.notes}>Note: {record.notes}</Text>
          )}
        </View>
      );
    }

    if (record.feedConsumed > 0) {
      activities.push(
        <View key={`feed-${record.id}`} style={styles.activityItem}>
          <View style={styles.activityHeader}>
            <Text style={styles.date}>{formatDate(record.date)}</Text>
            <Text style={styles.activityType}>Feed</Text>
          </View>
          <Text style={styles.activityDetail}>
            {record.feedConsumed} lbs of feed consumed
          </Text>
        </View>
      );
    }

    if (record.weightSamples.length > 0) {
      const avgWeight = record.weightSamples.reduce((sum, sample) => 
        sum + sample.weight, 0) / record.weightSamples.length;
      
      activities.push(
        <View key={`weight-${record.id}`} style={styles.activityItem}>
          <View style={styles.activityHeader}>
            <Text style={styles.date}>{formatDate(record.date)}</Text>
            <Text style={styles.activityType}>Weight Sample</Text>
          </View>
          <Text style={styles.activityDetail}>
            Average weight: {avgWeight.toFixed(2)} lbs
          </Text>
          <Text style={styles.subDetail}>
            Samples taken: {record.weightSamples.length}
          </Text>
        </View>
      );
    }

    return activities;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity Log</Text>
      <ScrollView style={styles.scrollView}>
        {sortedRecords.length === 0 ? (
          <Text style={styles.emptyState}>No activities recorded yet</Text>
        ) : (
          sortedRecords.map(record => (
            <View key={record.id}>{renderActivity(record)}</View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: COLORS.darkBrown,
  },
  scrollView: {
    flex: 1,
  },
  activityItem: {
    backgroundColor: COLORS.paleGreen,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.softGreen,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: COLORS.darkBrown,
  },
  activityType: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.earthBrown,
  },
  activityDetail: {
    fontSize: 16,
    color: COLORS.darkBrown,
    marginBottom: 4,
  },
  subDetail: {
    fontSize: 14,
    color: COLORS.label,
  },
  notes: {
    fontSize: 14,
    color: COLORS.label,
    fontStyle: 'italic',
    marginTop: 4,
  },
  emptyState: {
    textAlign: 'center',
    color: COLORS.label,
    fontSize: 16,
    marginTop: 20,
  },
});