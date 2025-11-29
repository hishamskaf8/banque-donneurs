import { CSV_URL } from '../constants';
import type { Donor } from '../types';

// Robust CSV parser to handle commas within quoted fields
const parseCSV = (csvText: string): string[][] => {
  // Remove potential UTF-8 BOM
  if (csvText.charCodeAt(0) === 0xFEFF) {
    csvText = csvText.substring(1);
  }

  const lines = csvText.trim().replace(/\r\n/g, '\n').split('\n').filter(line => line.trim() !== '');
  const contentLines = lines.slice(1); // Skip header

  return contentLines.map(line => {
    const row: string[] = [];
    let currentField = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        // Check for escaped quote ("")
        if (i + 1 < line.length && line[i + 1] === '"') {
          currentField += '"';
          i++; // Skip the next quote
        } else {
          inQuotes = !inQuotes; // Toggle quote state
        }
      } else if (char === ',' && !inQuotes) {
        // End of field
        row.push(currentField);
        currentField = '';
      } else {
        currentField += char;
      }
    }
    // Push the last field
    row.push(currentField);
    return row;
  });
};

export const fetchDonors = async (): Promise<Donor[]> => {
  let csvText = '';
  
  try {
    // Attempt 1: Direct Fetch
    const response = await fetch(CSV_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error('Network response was not ok');
    csvText = await response.text();
  } catch (error) {
    console.warn('Direct fetch failed, attempting via proxy...', error);
    try {
        // Attempt 2: CORS Proxy Fallback
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(CSV_URL)}`;
        const response = await fetch(proxyUrl, { cache: 'no-store' });
        if (!response.ok) throw new Error('Proxy network response was not ok');
        csvText = await response.text();
    } catch (proxyError) {
        console.error('Proxy fetch also failed', proxyError);
        throw new Error('Failed to fetch donor data. Please check your connection.');
    }
  }

  const dataRows = parseCSV(csvText);

  return dataRows.map((row): Donor | null => {
    // Basic validation to ensure the row has enough columns
    // We expect at least the columns up to Phone (index 6) to be present
    if (row.length < 7) return null;
    
    // The columns are: Timestamp, Full Name, DOB, Gender, Blood Group, Wilaya, Phone, Last Donation, Notes
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
  }).filter((donor): donor is Donor => donor !== null && !!donor.fullName && !!donor.phone);
};