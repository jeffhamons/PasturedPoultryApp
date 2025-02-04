// src/utils/batchCalculations.ts

import { FeedType } from '@/types/batch';
import { 
  CalculatedBatchDates, 
  BreedConfig, 
  WeatherConditions, 
  PastureMoveResult 
} from '@/types/batchCalculations';

// Constants
const DAYS_TO_PROCESSING = 56; // Standard grow-out period for Cornish Cross
const DAYS_TO_FIRST_FEED_TRANSITION = 14; // Starter to Grower
const DAYS_TO_SECOND_FEED_TRANSITION = 35; // Grower to Finisher
const DAYS_TO_FIRST_PASTURE_MOVE = 21; // When birds typically go to pasture

// Breed configurations
const breedConfigs: Record<string, BreedConfig> = {
  'Cornish Cross': {
    daysToProcessing: DAYS_TO_PROCESSING,
    daysToFirstFeedTransition: DAYS_TO_FIRST_FEED_TRANSITION,
    daysToSecondFeedTransition: DAYS_TO_SECOND_FEED_TRANSITION,
    daysToFirstPastureMove: DAYS_TO_FIRST_PASTURE_MOVE
  },
  // Add other breeds as needed
};

// Helper function to properly subtract days from a date
const subtractDays = (date: Date, days: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() - days);
  return newDate;
};

// Calculate dates based on processing date and optionally breed
export const calculateBatchDates = (
  processingDate: Date, 
  breed: string = 'Cornish Cross'
): CalculatedBatchDates => {
  const config = breedConfigs[breed] || breedConfigs['Cornish Cross'];
  
  return {
    chickArrivalDate: subtractDays(processingDate, config.daysToProcessing),
    firstFeedTransitionDate: subtractDays(
      processingDate, 
      config.daysToProcessing - config.daysToFirstFeedTransition
    ),
    secondFeedTransitionDate: subtractDays(
      processingDate, 
      config.daysToProcessing - config.daysToSecondFeedTransition
    ),
    firstPastureMoveDate: subtractDays(
      processingDate, 
      config.daysToProcessing - config.daysToFirstPastureMove
    ),
  };
};

// Get the appropriate feed type based on bird age in days
export const getFeedTypeForAge = (
  ageInDays: number, 
  breed: string = 'Cornish Cross'
): FeedType => {
  const config = breedConfigs[breed] || breedConfigs['Cornish Cross'];
  
  if (ageInDays < config.daysToFirstFeedTransition) {
    return FeedType.STARTER;
  } else if (ageInDays < config.daysToSecondFeedTransition) {
    return FeedType.GROWER;
  } else {
    return FeedType.FINISHER;
  }
};

// Calculate feed consumption
export const calculateFeedConsumption = (
  initialCount: number, 
  days: number, 
  feedPerDay: number
): number => {
  return initialCount * days * feedPerDay;
};

// Calculate mortality rate
export const calculateMortalityRate = (
  initialCount: number, 
  currentCount: number
): number => {
  if (initialCount === 0) return 0;
  return ((initialCount - currentCount) / initialCount) * 100;
};

// Validate if weather conditions are suitable for pasture move
export const canMoveToPasture = (
  currentDate: Date,
  batchStartDate: Date,
  weather: WeatherConditions
): PastureMoveResult => {
  const ageInDays = Math.floor(
    (currentDate.getTime() - batchStartDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  if (ageInDays < DAYS_TO_FIRST_PASTURE_MOVE) {
    return { 
      canMove: false, 
      reason: `Birds are too young. Minimum age is ${DAYS_TO_FIRST_PASTURE_MOVE} days.` 
    };
  }
  
  if (weather.temperature < 45) {
    return { 
      canMove: false, 
      reason: 'Temperature is too low for pasture move.' 
    };
  }
  
  if (weather.isRaining) {
    return { 
      canMove: false, 
      reason: 'Cannot move to pasture during rain.' 
    };
  }
  
  return { canMove: true };
};