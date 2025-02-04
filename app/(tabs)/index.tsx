import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useFarmInfo } from '../../src/context/FarmInfoContext';

export default function Dashboard() {
  const { batches, farmInfo } = useFarmInfo();

  // Handler for creating a new batch
  const handleCreateBatch = () => {
    router.push('/batches/create');
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Render each batch item in the list
  const renderBatchItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.batchItem}
      // For now, just log the batch ID until we create the BatchDetail screen
      onPress={() => console.log('Selected batch:', item.id)}
    >
      <View style={styles.batchHeader}>
        <Text style={styles.batchTitle}>{item.breed}</Text>
        <Text style={[styles.statusBadge, 
          { backgroundColor: item.status === 'PLANNED' ? '#FFF3CD' : '#D4EDDA' }]}>
          {item.status}
        </Text>
      </View>

      <View style={styles.dateRow}>
        <Text style={styles.dateLabel}>Processing Date:</Text>
        <Text style={styles.dateValue}>{formatDate(item.processingDate)}</Text>
      </View>

      <View style={styles.dateRow}>
        <Text style={styles.dateLabel}>Chick Arrival:</Text>
        <Text style={styles.dateValue}>{formatDate(item.chickArrivalDate)}</Text>
      </View>

      <View style={styles.birdCount}>
        <Text>Birds: {item.currentBirdCount}/{item.initialBirdCount}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.welcome}>
        Welcome, {farmInfo?.firstName || 'Farmer'}!
      </Text>

      <TouchableOpacity 
        style={styles.newBatchButton} 
        onPress={handleCreateBatch}
      >
        <Text style={styles.buttonText}>Create New Batch</Text>
      </TouchableOpacity>

      <Text style={styles.sectionHeader}>Your Batches</Text>
      
      {batches.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            No batches yet. Create your first batch to get started!
          </Text>
        </View>
      ) : (
        <FlatList
          data={batches}
          renderItem={renderBatchItem}
          keyExtractor={(item) => item.id}
          style={styles.batchList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  welcome: {
    fontSize: 18,
    marginBottom: 16,
  },
  newBatchButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionHeader: {
    fontSize: 20,
    marginVertical: 8,
    fontWeight: '600',
  },
  batchList: {
    flex: 1,
  },
  batchItem: {
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  batchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  batchTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  dateLabel: {
    color: '#666',
  },
  dateValue: {
    fontWeight: '500',
  },
  birdCount: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#E9ECEF',
    borderRadius: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
});