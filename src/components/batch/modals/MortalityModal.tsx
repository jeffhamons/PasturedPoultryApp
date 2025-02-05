import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import COLORS from '@/constants/Colors';

// Import the types
import { MortalityRecord, MortalityModalProps } from '@/types/batch';

const MortalityModal: React.FC<MortalityModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
}) => {
  // Default to the current date
  const [date, setDate] = useState(new Date());
  const [numberOfDeaths, setNumberOfDeaths] = useState('');
  const [notes, setNotes] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    const numDeaths = parseInt(numberOfDeaths, 10);

    if (isNaN(numDeaths)) {
      alert('Number of deaths must be a number.');
      return;
    }

    if (typeof onSubmit === 'function') {
      onSubmit({
        date: date,
        numberOfDeaths: numDeaths,
        notes: notes.trim(),
      });
    } else {
      console.warn("onSubmit is not a function. Check your props.");
    }

    // Reset form
    setDate(new Date());
    setNumberOfDeaths('');
    setNotes('');
    onClose();
  };

  // Simplified date formatter to display only the date
  const formattedDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.heading}>Record Mortality</Text>

          {/* Date Picker */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date</Text>
            {Platform.OS === 'ios' ? (
              <DateTimePicker
                value={date}
                mode="date" // Only date selection
                display="default"
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    setDate(selectedDate);
                  }
                }}
                style={styles.datePicker}
              />
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  style={styles.dateButton}
                >
                  <Text style={styles.dateButtonText}>{formattedDate(date)}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate) {
                        setDate(selectedDate);
                      }
                    }}
                  />
                )}
              </>
            )}
          </View>

          {/* Number of Deaths Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Number of Deaths</Text>
            <TextInput
              style={styles.input}
              value={numberOfDeaths}
              onChangeText={setNumberOfDeaths}
              keyboardType="numeric"
              placeholder="Enter number"
            />
          </View>

          {/* Notes Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Add any relevant notes"
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
              accessibilityLabel="Cancel recording mortality"
            >
              <Text style={[styles.buttonText, styles.cancelText]}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}
              accessibilityLabel="Submit mortality record"
            >
              <Text style={[styles.buttonText, styles.submitText]}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: COLORS.darkBrown,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: COLORS.darkBrown,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.softGreen,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  datePicker: {
    width: '100%',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  dateButtonText: {
    fontSize: 16,
    color: COLORS.darkBrown,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: COLORS.sandBeige,
  },
  submitButton: {
    backgroundColor: COLORS.accentGreen,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelText: {
    color: COLORS.darkBrown,
  },
  submitText: {
    color: 'white',
  },
});

export default MortalityModal;
