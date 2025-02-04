/**
 * Interface for calculated dates within a batch lifecycle
 */
export interface CalculatedBatchDates {
    chickArrivalDate: Date;
    firstFeedTransitionDate: Date;
    secondFeedTransitionDate: Date;
    firstPastureMoveDate: Date;
  }
  
  /**
   * Configuration for different breed types
   */
  export interface BreedConfig {
    daysToProcessing: number;
    daysToFirstFeedTransition: number;
    daysToSecondFeedTransition: number;
    daysToFirstPastureMove: number;
  }
  
  /**
   * Interface for weather conditions
   */
  export interface WeatherConditions {
    temperature: number;
    isRaining: boolean;
  }
  
  /**
   * Interface for pasture move validation result
   */
  export interface PastureMoveResult {
    canMove: boolean;
    reason?: string;
  }