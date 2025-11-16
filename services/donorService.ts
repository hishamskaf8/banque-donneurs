import { CSV_URL } from '../constants';
import type { Donor } from '../types';

// A more robust CSV parser specifically for Google Sheets export format.
const parseCSV = (csvText: string): string[][] => {
  // Remove potential UTF-8 BOM from the start of the file, which can interfere with parsing.
  if (csvText.charCodeAt(0) === 0xFEFF) {
    csvText = csvText.substring(1);
  }

  // Normalize line endings to \n, then split into lines and filter out any empty ones.
  const lines = csvText.trim().replace(/\r\n/g, '\n').split('\n').filter(line => line.trim() !== '');

  // Skip the header row.
  const contentLines = lines.slice(1);

  return contentLines.map(line => {
    // This simple split works because the Google Sheets CSV export wraps every field in quotes.
    return line.split(',').map(field => {
      // Remove the surrounding quotes from each field.
      // e.g., '"field data"' becomes 'field data'
      if (field.startsWith('"') && field.endsWith('"')) {
        // Also handle escaped double quotes ("") inside the field by replacing them with a single quote (")
        return field.substring(1, field.length - 1).replace(/""/g, '"');
      }
      return field;
    });
  });
};


export const fetchDonors = async (): Promise<Donor[]> => {
  const response = await fetch(CSV_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch donor data');
  }
  const csvText = await response.text();
  const dataRows = parseCSV(csvText);

  return dataRows.map((row): Donor | null => {
    // Basic validation to ensure the row has enough columns
    if (row.length < 9) return null;
    
    // The columns are: Timestamp, Full Name, DOB, Gender, Blood Group, Wilaya, Phone, Last Donation, Notes
    // We map them starting from row[0] as the parser now excludes the header.
    return {
      fullName: (row[1] || '').trim(),
      dob: (row[2] || '').trim(),
      gender: (row[3] || '').trim(),
      bloodGroup: (row[4] || '').trim(),
      wilaya: (row[5] || '').trim(),
      phone: (row[6] || '').trim(),
      lastDonation: (row[7] || '').trim(),
      notes: (row[8] || '').trim(),
    };
  }).filter((donor): donor is Donor => donor !== null && !!donor.fullName && !!donor.phone); // Filter out nulls and invalid donors
};