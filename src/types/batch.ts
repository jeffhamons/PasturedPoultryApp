/**
 * Represents different statuses a batch can have.
 */
export const BatchStatus = {
  PLANNED: 'PLANNED',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
} as const;

export type BatchStatus = typeof BatchStatus[keyof typeof BatchStatus];

/**
 * Types of feed used during the batch lifecycle.
 */
export const FeedType = {
  STARTER: 'STARTER',
  GROWER: 'GROWER',
  FINISHER: 'FINISHER'
} as const;

export type FeedType = typeof FeedType[keyof typeof FeedType];

/**
 * Possible weather conditions.
 */
export const WeatherCondition = {
  SUNNY: 'SUNNY',
  PARTLY_CLOUDY: 'PARTLY_CLOUDY',
  CLOUDY: 'CLOUDY',
  RAINY: 'RAINY',
  STORMY: 'STORMY'
} as const;

export type WeatherCondition = typeof WeatherCondition[keyof typeof WeatherCondition];

/**
 * Weather information for a given day.
 */
export interface WeatherRecord {
  temperature: number;
  conditions: WeatherCondition;
  rainfall?: number;
}

/**
 * Details a sample of weight measurements.
 */
export interface WeightSample {
  id: string;
  weight: number;
  sampleSize: number;
}

/**
 * Records a change in feed type for a batch.
 */
export interface FeedTransition {
  date: Date;
  fromFeedType: FeedType;
  toFeedType: FeedType;
}

/**
 * Logs a movement between pastures for a batch.
 */
export interface PastureMovement {
  date: Date;
  fromLocation: string;
  toLocation: string;
}

/**
 * A record of daily metrics for a batch.
 */
export interface DailyRecord {
  id: string;
  date: Date;
  feedConsumed: number; // measured in pounds or kilos
  mortality: number;
  weightSamples: WeightSample[];
  notes: string;
  weather?: WeatherRecord;
}

/**
 * Represents a poultry processing batch.
 */
export interface Batch {
  id: string;
  breed: string;
  processingDate: Date;

  // Calculated dates based on the processing date
  chickArrivalDate: Date;
  firstFeedTransitionDate: Date;
  secondFeedTransitionDate: Date;
  firstPastureMoveDate: Date;

  // The current status of the batch lifecycle
  status: BatchStatus;
  currentBirdCount: number;
  initialBirdCount: number;

  // Tracking details for the batch
  dailyRecords: DailyRecord[];
  feedTransitions: FeedTransition[];
  pastureMovements: PastureMovement[];
}
export interface WeightSample {
  id: string;
  date: Date;
  weight: number;
  sampleSize: number;
  notes: string;
}

export interface MortalityRecord {
  date: Date;
  numberOfDeaths: number;
  notes: string;
}

export interface MortalityModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (mortality: MortalityRecord) => void;
}

export interface WeightModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (weightSample: WeightSample) => void;
}
/**
 * Type guard to check if a value is a valid BatchStatus
 */
export function isBatchStatus(value: unknown): value is BatchStatus {
  return typeof value === 'string' && value in BatchStatus;
}

/**
 * Type guard to check if a value is a valid FeedType
 */
export function isFeedType(value: unknown): value is FeedType {
  return typeof value === 'string' && value in FeedType;
}

/**
 * Type guard to check if a value is a valid WeatherCondition
 */
export function isWeatherCondition(value: unknown): value is WeatherCondition {
  return typeof value === 'string' && value in WeatherCondition;
}

/**
 * Type guard to check if an object is a valid Batch
 */
export function isBatch(value: unknown): value is Batch {
  if (!value || typeof value !== 'object') return false;
  
  const batch = value as Partial<Batch>;
  
  return (
    typeof batch.id === 'string' &&
    typeof batch.breed === 'string' &&
    batch.processingDate instanceof Date &&
    batch.chickArrivalDate instanceof Date &&
    batch.firstFeedTransitionDate instanceof Date &&
    batch.secondFeedTransitionDate instanceof Date &&
    batch.firstPastureMoveDate instanceof Date &&
    isBatchStatus(batch.status) &&
    typeof batch.currentBirdCount === 'number' &&
    typeof batch.initialBirdCount === 'number' &&
    Array.isArray(batch.dailyRecords) &&
    Array.isArray(batch.feedTransitions) &&
    Array.isArray(batch.pastureMovements)
  );
}

/**
 * Helper function to create a new Batch with default values
 */
export function createNewBatch(params: Partial<Batch> = {}): Batch {
  return {
    id: params.id || crypto.randomUUID(),
    breed: params.breed || '',
    processingDate: params.processingDate || new Date(),
    chickArrivalDate: params.chickArrivalDate || new Date(),
    firstFeedTransitionDate: params.firstFeedTransitionDate || new Date(),
    secondFeedTransitionDate: params.secondFeedTransitionDate || new Date(),
    firstPastureMoveDate: params.firstPastureMoveDate || new Date(),
    status: params.status || BatchStatus.PLANNED,
    currentBirdCount: params.currentBirdCount || 0,
    initialBirdCount: params.initialBirdCount || 0,
    dailyRecords: params.dailyRecords || [],
    feedTransitions: params.feedTransitions || [],
    pastureMovements: params.pastureMovements || [],
  };
}

/**
 * Helper function to calculate batch statistics
 */
export function calculateBatchStats(batch: Batch) {
  return {
    totalMortality: batch.dailyRecords.reduce((sum, record) => sum + record.mortality, 0),
    mortalityRate: (batch.initialBirdCount - batch.currentBirdCount) / batch.initialBirdCount,
    averageDailyFeed: batch.dailyRecords.reduce((sum, record) => sum + record.feedConsumed, 0) / 
                      batch.dailyRecords.length || 0,
  };
}