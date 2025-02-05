import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useFarmInfo } from '@/context/FarmInfoContext';
import { BatchHeader } from '@/components/batch/BatchHeader';
import { QuickActions } from '@/components/batch/QuickActions';
import { BatchActivityLog } from '@/components/batch/BatchActivityLog';
import MortalityModal from '@/components/batch/modals/MortalityModal';
import WeightModal from '@/components/batch/modals/WeightModal';
import FeedModal from '@/components/batch/modals/FeedModal';
import { WeightSample, MortalityRecord, DailyRecord } from '@/types/batch';
import COLORS from '@/constants/Colors';

export default function BatchDetail() {
  const { batches, setBatches } = useFarmInfo();
  const { id } = useLocalSearchParams();
  const [showMortalityModal, setShowMortalityModal] = useState(false);
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [showFeedModal, setShowFeedModal] = useState(false);

  const batch = batches.find(b => b.id === id);

  if (!batch) {
    return (
      <>
        <Stack.Screen
          options={{
            headerTitle: 'Batch Not Found',
            headerTitleStyle: styles.headerTitle,
            headerStyle: styles.header,
          }}
        />
        <View style={styles.container}>
          <Text>Batch not found</Text>
        </View>
      </>
    );
  }

  const formatBatchId = (id: string) => {
    // Assuming format like "20250204-cc"
    const [date, type] = id.split('-');
    const formattedDate = date.replace(/(\d{4})(\d{2})(\d{2})/, '$2/$3/$1');
    const formattedType = type.toUpperCase();
    return `Batch ${formattedType} - ${formattedDate}`;
  };

  const getLastFeedRecord = () => {
    return batch.dailyRecords
    .filter((record) => record.feedConsumed > 0)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  };

  const handleFeedRecord = (feedData: DailyRecord) => {
    const todayRecord = batch.dailyRecords.find(
      (record) => record.date.toDateString() === new Date().toDateString(),
    );

    const updatedBatch = {...batch };

    if (todayRecord) {
      // Add to existing record
      todayRecord.feedConsumed += feedData.feedConsumed;
      todayRecord.notes = feedData.notes
      ? `${todayRecord.notes}\nFeed: ${feedData.notes}`
      : todayRecord.notes;
    } else {
      // Create new daily record
      updatedBatch.dailyRecords = [
        ...batch.dailyRecords,
        {
          ...feedData,
          id: Date.now().toString(),
          date: new Date(),
          mortality: 0,
          weightSamples: [],
          weather: undefined,
         
        },
      ];
    }

    const updatedBatches = batches.map((b) => (b.id === batch.id? updatedBatch: b));

    setBatches(updatedBatches);
    setShowFeedModal(false);
  };

  const handleWeightRecord = (weightSample: WeightSample) => {
    const todayRecord = batch.dailyRecords.find(
      (record) => record.date.toDateString() === new Date().toDateString(),
    );

    const updatedBatch = {...batch };

    if (todayRecord) {
      // Add to existing record
      todayRecord.weightSamples = [...todayRecord.weightSamples, weightSample];
    } else {
      // Create new daily record
      updatedBatch.dailyRecords = [
      ...batch.dailyRecords,
        {
          id: Date.now().toString(),
          date: new Date(),
          mortality: 0,
          notes: "",
          feedConsumed: 0,
          weightSamples: [weightSample],
          weather: undefined,
        },
      ];
    }

    const updatedBatches = batches.map((b) => (b.id === batch.id? updatedBatch: b));

    setBatches(updatedBatches);
    setShowWeightModal(false);
  };

  const handleMortalityRecord = (mortality: MortalityRecord) => {
    const updatedBatch = {
    ...batch,
      currentBirdCount: batch.currentBirdCount - mortality.numberOfDeaths,
      dailyRecords: [
      ...batch.dailyRecords,
        {
          id: Date.now().toString(),
          date: mortality.date,
          mortality: mortality.numberOfDeaths,
          notes: mortality.notes,
          feedConsumed: 0,
          weightSamples: [],
        },
      ],
    };

    const updatedBatches = batches.map((b) => (b.id === batch.id? updatedBatch: b));

    setBatches(updatedBatches);
    setShowMortalityModal(false);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: formatBatchId(batch.id),
          headerTitleStyle: styles.headerTitle,
          headerStyle: styles.header,
        }}
      />
      <ScrollView style={styles.container}>
        <BatchHeader batchId={batch.id} status={batch.status} breed={batch.breed} />

        <QuickActions
          onMortalityPress={() => setShowMortalityModal(true)}
          onWeightPress={() => setShowWeightModal(true)}
          onFeedPress={() => setShowFeedModal(true)}
        />

        <BatchActivityLog dailyRecords={batch.dailyRecords} />

        <MortalityModal
          isVisible={showMortalityModal}
          onClose={() => setShowMortalityModal(false)}
          onSubmit={handleMortalityRecord}
        />

        <WeightModal
          isVisible={showWeightModal}
          onClose={() => setShowWeightModal(false)}
          onSubmit={handleWeightRecord}
        />

        <FeedModal
          isVisible={showFeedModal}
          onClose={() => setShowFeedModal(false)}
          onSubmit={handleFeedRecord}
          lastFeedRecord={getLastFeedRecord()}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.earthBrown,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    // Add text shadow for better readability
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});