// MortalityModal.tsx
import React, { useState } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  TextInput,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import COLORS from '@/constants/Colors';

interface MortalityModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (mortality: { date: Date; count: number; notes: string }) => void;
}

export const MortalityModal = ({ 
  visible, 
  onClose,
  onSave 
}: MortalityModalProps) => {
  const [date, setDate] = useState(new Date());
  const [count, setCount] = useState('');
  const [notes, setNotes] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    if (!count) {
      alert('Please enter the number of mortalities');
      return;
    }

    onSave({
      date,
      count: parseInt(count),
      notes
    });

    // Reset form
    setDate(new Date());
    setCount('');
    setNotes('');
    onClose();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Record Mortality</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date</Text>
            {Platform.OS === 'ios' ? (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  if (selectedDate) setDate(selectedDate);
                }}
                style={styles.datePicker}
              />
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  style={styles.dateButton}
                >
                  <Text style={styles.dateButtonText}>{formatDate(date)}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate) setDate(selectedDate);
                    }}
                  />
                )}
              </>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Number of Birds</Text>
            <TextInput
              style={styles.input}
              value={count}
              onChangeText={text => setCount(text.replace(/[^0-9]/g, ''))}
              keyboardType="numeric"
              placeholder="Enter number"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Add any relevant details"
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
            >
              <Text style={[styles.buttonText, styles.saveButtonText]}>Save</Text>
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
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.darkBrown,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: COLORS.darkBrown,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
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
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  saveButton: {
    backgroundColor: COLORS.earthBrown,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkBrown,
  },
  saveButtonText: {
    color: 'white',
  },
});