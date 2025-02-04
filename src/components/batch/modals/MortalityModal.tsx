import React, { useState } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import COLORS from '@/constants/Colors';

interface MortalityRecord {
  date: Date;
  count: number;
  notes: string;
}

interface MortalityModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (mortality: MortalityRecord) => void;
}

const MortalityModal: React.FC<MortalityModalProps> = ({ 
  isVisible, 
  onClose, 
  onSubmit 
}) => {
  const [count, setCount] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    const mortalityData: MortalityRecord = {
      date: new Date(),
      count: parseInt(count) || 0,
      notes: notes.trim()
    };

    onSubmit(mortalityData);
    // Reset form
    setCount('');
    setNotes('');
    onClose();
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
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Number of Deaths</Text>
            <TextInput
              style={styles.input}
              value={count}
              onChangeText={setCount}
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
              placeholder="Add any relevant notes"
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={onClose}
            >
              <Text style={[styles.buttonText, styles.cancelText]}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}
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
      height: 2
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