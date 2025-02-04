import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Batch } from '@/types/batch';
import { FarmInfo, FarmInfoContextType } from '@/types/farminfo';

const defaultFarmInfo: FarmInfo = {
  firstName: 'Default',
  lastName: '',
  farmName: 'Default Farm',
  address: {
    street1: '',
    street2: '',
    city: '',
    state: '',
    zipCode: ''
  }
};

interface ExtendedFarmInfoContextType extends FarmInfoContextType {
  batches: Batch[];
  setBatches: React.Dispatch<React.SetStateAction<Batch[]>>;
}

const defaultContextValue: ExtendedFarmInfoContextType = {
  farmInfo: defaultFarmInfo,
  setFarmInfo: () => {
    console.warn('FarmInfoProvider not found');
  },
  batches: [],
  setBatches: () => {
    console.warn('FarmInfoProvider not found');
  }
};

const FarmInfoContext = createContext<ExtendedFarmInfoContextType>(defaultContextValue);

export function FarmInfoProvider({ children }: { children: ReactNode }) {
  const [farmInfo, setFarmInfo] = useState<FarmInfo>(defaultFarmInfo);
  const [batches, setBatches] = useState<Batch[]>([]);

  const value = React.useMemo(
    () => ({
      farmInfo,
      setFarmInfo,
      batches,
      setBatches
    }),
    [farmInfo, batches]
  );

  return (
    <FarmInfoContext.Provider value={value}>
      {children}
    </FarmInfoContext.Provider>
  );
}

export function useFarmInfo(): ExtendedFarmInfoContextType {
  const context = useContext(FarmInfoContext);
  
  if (process.env.NODE_ENV !== 'production') {
    if (context === defaultContextValue) {
      console.warn(
        'useFarmInfo was called outside of FarmInfoProvider. ' +
        'Make sure your app is wrapped in FarmInfoProvider.'
      );
    }
  }

  return context;
}

// Re-export the FarmInfo type for convenience
export type { FarmInfo };