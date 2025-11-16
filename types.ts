
export type Language = 'ar' | 'fr';

export interface Donor {
  fullName: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  wilaya: string;
  phone: string;
  lastDonation: string;
  notes: string;
}
