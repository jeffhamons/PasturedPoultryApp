//... other types

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