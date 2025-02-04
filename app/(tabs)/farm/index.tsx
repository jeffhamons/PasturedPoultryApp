import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useFarmInfo } from '@/context/FarmInfoContext';
import COLORS from '@/constants/Colors';
import { 
  FarmInfo, 
  Address, 
  validateZipCode, 
  validateAddress 
} from '@/types/farminfo';

export default function FarmInfoScreen() {
  const { farmInfo, setFarmInfo } = useFarmInfo();

  const [formData, setFormData] = useState<FarmInfo>({
    firstName: farmInfo?.firstName || '',
    lastName: farmInfo?.lastName || '',
    farmName: farmInfo?.farmName || '',
    address: farmInfo?.address || {
      street1: '',
      street2: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });

  const handleAddressChange = useCallback((field: keyof Address, value: string) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: field === 'state' ? value.toUpperCase() : value
      }
    }));
  }, []);

  const handlePersonalInfoChange = useCallback((field: keyof Omit<FarmInfo, 'address'>, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const validateForm = useCallback((): boolean => {
    // Check required fields
    if (!formData.firstName.trim()) {
      Alert.alert('Error', 'First name is required');
      return false;
    }

    if (!formData.lastName.trim()) {
      Alert.alert('Error', 'Last name is required');
      return false;
    }

    if (!formData.farmName.trim()) {
      Alert.alert('Error', 'Farm name is required');
      return false;
    }

    if (!validateAddress(formData.address)) {
      Alert.alert(
        'Invalid Address', 
        'Please check your address information:\n\n' +
        '- Street address is required\n' +
        '- City is required\n' +
        '- State must be 2 characters\n' +
        '- ZIP code must be 5 digits'
      );
      return false;
    }

    return true;
  }, [formData]);

  const handleSave = useCallback(() => {
    if (validateForm()) {
      setFarmInfo(formData);
      Alert.alert('Success', 'Farm information has been updated.');
    }
  }, [formData, setFarmInfo, validateForm]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={formData.firstName}
          onChangeText={(text) => handlePersonalInfoChange('firstName', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={formData.lastName}
          onChangeText={(text) => handlePersonalInfoChange('lastName', text)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Farm Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Farm Name"
          value={formData.farmName}
          onChangeText={(text) => handlePersonalInfoChange('farmName', text)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Street Address"
          value={formData.address.street1}
          onChangeText={(text) => handleAddressChange('street1', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Apt, Suite, etc. (optional)"
          value={formData.address.street2}
          onChangeText={(text) => handleAddressChange('street2', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={formData.address.city}
          onChangeText={(text) => handleAddressChange('city', text)}
        />
        <View style={styles.stateZip}>
          <TextInput
            style={[styles.input, styles.stateInput]}
            placeholder="State"
            maxLength={2}
            autoCapitalize="characters"
            value={formData.address.state}
            onChangeText={(text) => handleAddressChange('state', text)}
          />
          <TextInput
            style={[styles.input, styles.zipInput]}
            placeholder="ZIP Code"
            keyboardType="numeric"
            maxLength={5}
            value={formData.address.zipCode}
            onChangeText={(text) => handleAddressChange('zipCode', text)}
          />
        </View>
      </View>

      <TouchableOpacity 
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>Save Information</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkBrown,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.softGreen,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  stateZip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stateInput: {
    flex: 1,
    marginRight: 12,
  },
  zipInput: {
    flex: 2,
  },
  saveButton: {
    backgroundColor: COLORS.earthBrown,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});