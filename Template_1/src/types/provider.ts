export interface Provider {
  id: string;
  profileImage: string;
  firstName: string;
  middleInitial?: string;
  lastName: string;
  degree: string; 
  providerType: string;
  specialtyName: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  state: string;
  county: string;
  country: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  phoneNumber: string;
  emailId?: string;
  yearsOfExperience: number;
  acceptingNewPatients: boolean;
  rating: number;
  planName: string;
  acceptedAllPlans: string[] ; // Can be an array of plan names or a boolean indicating all plans accepted
  affiliationName?: string;
  boardName?: string;
  boardCertified: boolean;
  workingHours?: string;
  raceEthnicity?: string;
  gender: 'Male' | 'Female' | 'Other';
  languagesSpoken: string[];
  npiId: string;
  virtualCareAvailable: boolean;
  hospitalAffiliations: boolean;
}

export interface FilterOptions {
  distance: number;
  nearMe: boolean;
  acceptingNewPatients: boolean | null;
  languagesSpoken: string[];
  gender: string | null;
  virtualCareAvailable: boolean | null;
  hospitalAffiliations: boolean | null;
  boardCertified: boolean | null;
  yearsOfExperience: number | null;
  specialty: string | null;
}

export interface BrandingConfig {
  logo: string;
  brandName: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
}