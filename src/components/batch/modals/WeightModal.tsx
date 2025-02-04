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
import { WeightSample } from '@/types/batch';

interface WeightModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (weightSample: WeightSample) => void;
}

export default function WeightModal({ isVisible, onClose, onSubmit }: WeightModalProps) {
  const [weight, setWeight] = useState('');
  const [sampleSize, setSampleSize] = useState('');

  const handleSubmit = () => {
    const weightSample: WeightSample = {
      id: Date.now().toString(),
      weight: parseFloat(weight) || 0,
      sampleSize: parseInt(sampleSize) || 0,
    };

    onSubmit(weightSample);
    setWeight('');
    setSampleSize('');
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
          <Text style={styles.heading}>Record Weight Sample</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Average Weight (lbs)</Text>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
              keyboardType="decimal-pad"
              placeholder="Enter average weight"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Number of Birds Sampled</Text>
            <TextInput
              style={styles.input}
              value={sampleSize}
              onChangeText={setSampleSize}
              keyboardType="number-pad"
              placeholder="Enter sample size"
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
}

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