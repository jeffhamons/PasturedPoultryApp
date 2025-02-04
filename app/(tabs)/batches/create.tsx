import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Platform, ScrollView, TextInput } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useFarmInfo } from '@/context/FarmInfoContext';
import { Batch, BatchStatus, FeedType } from '@/types/batch';
import { router } from 'expo-router';

// Define breed options with their abbreviations
const BREED_OPTIONS = {
  'Cornish Cross': 'CC',
  'Red Ranger': 'RR',
  'Heritage': 'HE'
} as const;

type BreedType = keyof typeof BREED_OPTIONS;

// Function to generate batch name based on date and breed
const generateBatchName = (date: Date, breed: BreedType): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const breedCode = BREED_OPTIONS[breed];
  return `${year}${month}${day}-${breedCode}`;
};

// Function to calculate dates based on processing date
const calculateBatchDates = (processingDate: Date) => {
  const DAYS_TO_PROCESSING = 56; // Standard grow-out period
  const DAYS_TO_FIRST_FEED = 14; // Starter to Grower
  const DAYS_TO_SECOND_FEED = 35; // Grower to Finisher
  const DAYS_TO_PASTURE = 21; // Time to first pasture move

  const chickArrivalDate = new Date(processingDate);
  chickArrivalDate.setDate(processingDate.getDate() - DAYS_TO_PROCESSING);

  const firstFeedTransitionDate = new Date(processingDate);
  firstFeedTransitionDate.setDate(processingDate.getDate() - DAYS_TO_PROCESSING + DAYS_TO_FIRST_FEED);

  const secondFeedTransitionDate = new Date(processingDate);
  secondFeedTransitionDate.setDate(processingDate.getDate() - DAYS_TO_PROCESSING + DAYS_TO_SECOND_FEED);

  const firstPastureMoveDate = new Date(processingDate);
  firstPastureMoveDate.setDate(processingDate.getDate() - DAYS_TO_PROCESSING + DAYS_TO_PASTURE);

  return {
    chickArrivalDate,
    firstFeedTransitionDate,
    secondFeedTransitionDate,
    firstPastureMoveDate
  };
};

export default function Create() {
  const { setBatches, batches } = useFarmInfo();
  const [breed, setBreed] = useState<BreedType>('Cornish Cross');
  const [processingDate, setProcessingDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [birdCount, setBirdCount] = useState('');
  const [calculatedDates, setCalculatedDates] = useState(calculateBatchDates(processingDate));

  const handleBirdCountChange = (text: string) => {
    // Only allow numbers
    const numericValue = text.replace(/[^0-9]/g, '');
    setBirdCount(numericValue);
  };

  // Handler for date picker changes
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }
    
    if (selectedDate) {
      setProcessingDate(selectedDate);
      setCalculatedDates(calculateBatchDates(selectedDate));
    }
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Function to create a new batch
  const handleCreateBatch = () => {
    if (!breed.trim()) {
      alert('Please select a breed');
      return;
    }

    if (!birdCount || parseInt(birdCount) <= 0) {
      alert('Please enter a valid number of birds');
      return;
    }

    const plannedBirdCount = parseInt(birdCount);
    const batchName = generateBatchName(processingDate, breed);
    
    const newBatch: Batch = {
      id: batchName,
      breed,
      processingDate,
      ...calculatedDates,
      status: BatchStatus.PLANNED,
      currentBirdCount: plannedBirdCount,
      initialBirdCount: plannedBirdCount,
      dailyRecords: [],
      feedTransitions: [
        {
          date: calculatedDates.firstFeedTransitionDate,
          fromFeedType: FeedType.STARTER,
          toFeedType: FeedType.GROWER
        },
        {
          date: calculatedDates.secondFeedTransitionDate,
          fromFeedType: FeedType.GROWER,
          toFeedType: FeedType.FINISHER
        }
      ],
      pastureMovements: []
    };

    setBatches([...batches, newBatch]);
    alert(`Batch ${batchName} created successfully!`);
    
    // Reset form
    setBreed('Cornish Cross');
    setProcessingDate(new Date());
    setBirdCount('');
    setCalculatedDates(calculateBatchDates(new Date()));
    
    router.push('/');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Create New Batch</Text>

        <View style={styles.previewContainer}>
          <Text style={styles.label}>Batch ID Preview:</Text>
          <Text style={styles.batchPreview}>{generateBatchName(processingDate, breed)}</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Breed</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={breed}
              onValueChange={(itemValue) => setBreed(itemValue as BreedType)}
              style={styles.picker}
            >
              {Object.keys(BREED_OPTIONS).map((breedOption) => (
                <Picker.Item 
                  key={breedOption} 
                  label={breedOption} 
                  value={breedOption} 
                />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Number of Birds for Processing</Text>
          <View style={styles.birdCountContainer}>
            <TextInput
              style={styles.birdCountInput}
              value={birdCount}
              onChangeText={handleBirdCountChange}
              keyboardType="numeric"
              placeholder="Enter number of birds"
              maxLength={5}
            />
            {birdCount !== '' && (
              <Text style={styles.birdCountHelp}>
                Planning to process {parseInt(birdCount).toLocaleString()} birds
              </Text>
            )}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Processing Date</Text>
          <Text style={styles.dateDisplay}>
            {formatDate(processingDate)}
          </Text>
          {Platform.OS === 'web' ? (
            <input
              type="date"
              value={processingDate.toISOString().split('T')[0]}
              onChange={(e) => {
                const newDate = new Date(e.target.value);
                setProcessingDate(newDate);
                setCalculatedDates(calculateBatchDates(newDate));
              }}
              style={{
                padding: 10,
                marginBottom: 10,
                borderRadius: 5,
                borderColor: '#ddd',
                borderWidth: 1,
              }}
            />
          ) : (
            <>
              <Button 
                onPress={() => setShow(true)} 
                title="Select Processing Date"
              />
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={processingDate}
                  mode="date"
                  display="default"
                  onChange={onChange}
                />
              )}
            </>
          )}
        </View>

        <View style={styles.datesContainer}>
          <Text style={styles.datesHeader}>Important Dates:</Text>
          
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>Chick Arrival:</Text>
            <Text style={styles.dateValue}>{formatDate(calculatedDates.chickArrivalDate)}</Text>
          </View>

          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>First Feed Transition:</Text>
            <Text style={styles.dateValue}>{formatDate(calculatedDates.firstFeedTransitionDate)}</Text>
          </View>

          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>Second Feed Transition:</Text>
            <Text style={styles.dateValue}>{formatDate(calculatedDates.secondFeedTransitionDate)}</Text>
          </View>

          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>First Pasture Move:</Text>
            <Text style={styles.dateValue}>{formatDate(calculatedDates.firstPastureMoveDate)}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button 
            title="Create Batch" 
            onPress={handleCreateBatch}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  previewContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  batchPreview: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  birdCountContainer: {
    marginBottom: 10,
  },
  birdCountInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 5,
  },
  birdCountHelp: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  dateDisplay: {
    fontSize: 16,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  datesContainer: {
    marginTop: 20,
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  datesHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  dateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  dateValue: {
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 20,
  }
});