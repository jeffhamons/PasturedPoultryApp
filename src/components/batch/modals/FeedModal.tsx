import React, { useState } from 'react';
import { 
  View, 
  Modal, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  Switch
} from 'react-native';
import { Text } from '@/components/ui/Themed';
import COLORS from '@/constants/Colors';
import { DailyRecord } from '@/types/batch';

interface FeedModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (feedData: { amount: number; unit: 'bags' | 'pounds'; notes: string }) => void;
  lastFeedRecord?: DailyRecord;
}

export default function FeedModal({ 
  isVisible, 
  onClose, 
  onSubmit,
  lastFeedRecord 
}: FeedModalProps) {
  const [amount, setAmount] = useState('');
  const [useBags, setUseBags] = useState(true);
  const [notes, setNotes] = useState('');

  const lastFeedDisplay = lastFeedRecord ? new Date(lastFeedRecord.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }) : 'No previous feed recorded';

  const handleSubmit = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    // If using bags, convert to pounds (assuming 50lb bags)
    const poundAmount = useBags ? numericAmount * 50 : numericAmount;

    onSubmit({
      amount: poundAmount,
      unit: useBags ? 'bags' : 'pounds',
      notes
    });

    // Reset form
    setAmount('');
    setNotes('');
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
          <Text style={styles.title}>Record Feed</Text>
          
          <View style={styles.lastFeedContainer}>
            <Text style={styles.lastFeedText}>
              Last feed recorded: {lastFeedDisplay}
            </Text>
            {lastFeedRecord && (
              <Text style={styles.lastFeedAmount}>
                Amount: {lastFeedRecord.feedConsumed} lbs
              </Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Amount"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
            />
            
            <View style={styles.unitToggle}>
              <Text>Use Bags</Text>
              <Switch
                value={useBags}
                onValueChange={setUseBags}
                trackColor={{ false: COLORS.softGreen, true: COLORS.accentGreen }}
              />
              <Text>{useBags ? '(50 lb bags)' : 'pounds'}</Text>
            </View>

            <TextInput
              style={[styles.input, styles.notesInput]}
              placeholder="Notes (optional)"
              value={notes}
              onChangeText={setNotes}
              multiline
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
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Record Feed</Text>
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
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: COLORS.darkBrown,
  },
  lastFeedContainer: {
    backgroundColor: COLORS.paleGreen,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  lastFeedText: {
    fontSize: 14,
    color: COLORS.darkBrown,
  },
  lastFeedAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkBrown,
    marginTop: 4,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.softGreen,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  notesInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  unitToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: COLORS.warningRed,
  },
  submitButton: {
    backgroundColor: COLORS.accentGreen,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});