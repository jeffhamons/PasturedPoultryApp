interface FeedRates {
    starter: number;
    grower: number;
    finisher: number;
  }
  
  const DAILY_FEED_RATES: FeedRates = {
    starter: 0.15,  // 15% of body weight per day
    grower: 0.12,   // 12% of body weight per day
    finisher: 0.10  // 10% of body weight per day
  };
  
  export function calculateDailyFeed(
    currentWeight: number,
    ageInDays: number,
    birdCount: number
  ): number {
    let feedRate: number;
    
    if (ageInDays <= 14) {
      feedRate = DAILY_FEED_RATES.starter;
    } else if (ageInDays <= 35) {
      feedRate = DAILY_FEED_RATES.grower;
    } else {
      feedRate = DAILY_FEED_RATES.finisher;
    }
  
    return currentWeight * feedRate * birdCount;
  }
  
  export function calculateExpectedWeight(ageInDays: number): number {
    // Simplified growth curve for Cornish Cross
    const baseWeight = 0.1; // Starting weight in lbs
    const dailyGain = ageInDays <= 21 ? 0.15 : 0.2; // lbs per day
    
    return baseWeight + (ageInDays * dailyGain);
  }