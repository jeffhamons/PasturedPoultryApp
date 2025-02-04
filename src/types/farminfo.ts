export interface Address {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface FarmInfo {
  firstName: string;
  lastName: string;
  farmName: string;
  address: Address;
}

export interface FarmInfoContextType {
  farmInfo: FarmInfo | null;
  setFarmInfo: (info: FarmInfo) => void;
}

export function validateZipCode(zipCode: string): boolean {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode);
}

export function validateAddress(address: Address): boolean {
  return (
    address.street1.length > 0 &&
    address.city.length > 0 &&
    address.state.length === 2 &&
    validateZipCode(address.zipCode)
  );
}