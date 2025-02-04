import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import COLORS from '@/constants/Colors';

// Define missing interfaces
interface FeedTransition {
  date: Date;
  toFeedType: string;
}

interface PastureMovement {
  date: Date;
  toLocation: string;
}

interface Batch {
  id: string;
  currentBirdCount: number;
  feedTransitions: FeedTransition[];
  pastureMovements: PastureMovement[];
}

interface DashboardSummaryProps {
  batches: Batch[];
}

export function DashboardSummary({ batches }: DashboardSummaryProps) {
  // Calculate total birds across all batches
  const totalBirds = batches.reduce((sum, batch) => sum + batch.currentBirdCount, 0);

  // Get actions for next 3 days
  const getUpcomingActions = () => {
    const actions: { date: Date; action: string; batchId: string }[] = [];
    const nextThreeDays = new Date();
    nextThreeDays.setDate(nextThreeDays.getDate() + 3);

    batches.forEach(batch => {
      const today = new Date();
      
      // Check feed transitions
      batch.feedTransitions.forEach((transition: FeedTransition) => {
        const transitionDate = new Date(transition.date);
        if (transitionDate >= today && transitionDate <= nextThreeDays) {
          actions.push({
            date: transitionDate,
            action: `Feed transition to ${transition.toFeedType}`,
            batchId: batch.id
          });
        }
      });
      
      // Check pasture movements
      batch.pastureMovements.forEach((movement: PastureMovement) => {
        const moveDate = new Date(movement.date);
        if (moveDate >= today && moveDate <= nextThreeDays) {
          actions.push({
            date: moveDate,
            action: `Pasture move to ${movement.toLocation}`,
            batchId: batch.id
          });
        }
      });
    });

    return actions.sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const upcomingActions = getUpcomingActions();

  return (
    <View style={styles.container}>
      <View style={styles.statsSection}>
        <Text style={styles.statsHeading}>Total Birds in Care</Text>
        <Text style={styles.statsValue}>{totalBirds}</Text>
      </View>

      <View style={styles.actionsSection}>
        <Text style={styles.sectionHeading}>Next 3 Days</Text>
        {upcomingActions.length > 0 ? (
          upcomingActions.map((action, index) => (
            <View key={index} style={styles.actionItem}>
              <Text style={styles.actionDate}>
                {action.date.toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </Text>
              <Text style={styles.actionText}>
                {action.action} (Batch {action.batchId})
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noActions}>
            No actions needed for the next 3 days
          </Text>
        )}
      </View>

      <View style={styles.weatherSection}>
        <Text style={styles.sectionHeading}>Weather Forecast</Text>
        <Text style={styles.weatherPlaceholder}>
          Weather forecast will be displayed here
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  statsHeading: {
    fontSize: 16,
    color: COLORS.darkBrown,
    marginBottom: 4,
  },
  statsValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.earthBrown,
  },
  actionsSection: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkBrown,
    marginBottom: 12,
  },
  actionItem: {
    flexDirection: 'row',
    marginBottom: 8,
    padding: 8,
    backgroundColor: COLORS.paleGreen,
    borderRadius: 6,
  },
  actionDate: {
    fontWeight: '500',
    marginRight: 8,
    color: COLORS.darkBrown,
  },
  actionText: {
    flex: 1,
    color: COLORS.darkBrown,
  },
  noActions: {
    color: COLORS.darkBrown,
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 12,
    backgroundColor: COLORS.paleGreen,
    borderRadius: 6,
  },
  weatherSection: {
    marginTop: 8,
  },
  weatherPlaceholder: {
    color: COLORS.darkBrown,
    textAlign: 'center',
    padding: 12,
    backgroundColor: COLORS.paleGreen,
    borderRadius: 6,
  },
});