import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useFarmInfo } from '@/context/FarmInfoContext';
import COLORS from '@/constants/Colors';

export default function Dashboard() {
 const { batches, farmInfo } = useFarmInfo();

 const handleCreateBatch = () => {
   router.push('/batches/create');
 };

 const formatDate = (date: Date) => {
   return new Date(date).toLocaleDateString('en-US', {
     month: 'short',
     day: 'numeric',
     year: 'numeric'
   });
 };

 const renderBatchItem = ({ item }: { item: any }) => (
   <TouchableOpacity
     style={styles.batchItem}
     onPress={() => router.push(`/batches/${item.id}`)}
   >
     <View style={styles.batchHeader}>
       <Text style={styles.batchTitle}>{item.breed}</Text>
       <View style={[styles.statusBadge, 
         { backgroundColor: item.status === 'PLANNED' ? COLORS.sandBeige : COLORS.paleGreen }]}>
         <Text style={styles.statusText}>{item.status}</Text>
       </View>
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
       <Text style={styles.birdCountText}>
         Birds: {item.currentBirdCount}/{item.initialBirdCount}
       </Text>
     </View>
   </TouchableOpacity>
 );

 return (
   <View style={styles.container}>
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
   backgroundColor: 'white',
 },
 welcome: {
   fontSize: 18,
   marginBottom: 16,
   color: COLORS.darkBrown,
 },
 newBatchButton: {
   backgroundColor: COLORS.earthBrown,
   padding: 16,
   borderRadius: 8,
   marginBottom: 16,
   alignItems: 'center',
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.2,
   shadowRadius: 4,
   elevation: 3,
 },
 buttonText: {
   color: 'white',
   fontWeight: '600',
   fontSize: 16,
 },
 sectionHeader: {
   fontSize: 20,
   marginVertical: 8,
   fontWeight: '600',
   color: COLORS.darkBrown,
 },
 batchList: {
   flex: 1,
 },
 batchItem: {
   padding: 16,
   backgroundColor: 'white',
   borderRadius: 8,
   marginBottom: 12,
   borderWidth: 1,
   borderColor: COLORS.softGreen,
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.1,
   shadowRadius: 2,
   elevation: 2,
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
   color: COLORS.darkBrown,
 },
 statusBadge: {
   paddingHorizontal: 12,
   paddingVertical: 4,
   borderRadius: 16,
 },
 statusText: {
   fontSize: 14,
   fontWeight: '500',
   color: COLORS.darkBrown,
 },
 dateRow: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   marginBottom: 4,
 },
 dateLabel: {
   color: COLORS.darkBrown,
   opacity: 0.7,
 },
 dateValue: {
   fontWeight: '500',
   color: COLORS.darkBrown,
 },
 birdCount: {
   marginTop: 8,
   padding: 8,
   backgroundColor: COLORS.paleGreen,
   borderRadius: 4,
 },
 birdCountText: {
   color: COLORS.darkBrown,
   fontWeight: '500',
 },
 emptyState: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   padding: 20,
 },
 emptyStateText: {
   textAlign: 'center',
   color: COLORS.darkBrown,
   opacity: 0.7,
   fontSize: 16,
 },
});