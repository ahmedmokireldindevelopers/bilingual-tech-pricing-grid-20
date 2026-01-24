// Google Sheets Integration for Property Submissions
// Uses Replit's Google Sheets connector

import { google } from 'googleapis';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-sheet',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Google Sheet not connected');
  }
  return accessToken;
}

// WARNING: Never cache this client.
// Access tokens expire, so a new client must be created each time.
// Always call this function again to get a fresh client.
export async function getUncachableGoogleSheetClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.sheets({ version: 'v4', auth: oauth2Client });
}

// Property submission data interface
export interface PropertySubmission {
  ownerName: string;
  email: string;
  phone: string;
  whatsapp: string;
  propertyType: string;
  listingType: string;
  country: string;
  city: string;
  address: string;
  area: string;
  bedrooms: string;
  bathrooms: string;
  parking: string;
  price: string;
  currency: string;
  title: string;
  description: string;
  features: string;
  submittedAt: string;
}

// Add property submission to Google Sheet
export async function addPropertyToSheet(
  spreadsheetId: string,
  data: PropertySubmission
): Promise<void> {
  const sheets = await getUncachableGoogleSheetClient();

  const values = [
    [
      data.submittedAt,
      data.ownerName,
      data.email,
      data.phone,
      data.whatsapp,
      data.propertyType,
      data.listingType,
      data.country,
      data.city,
      data.address,
      data.area,
      data.bedrooms,
      data.bathrooms,
      data.parking,
      data.price,
      data.currency,
      data.title,
      data.description,
      data.features,
    ]
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Sheet1!A:S',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values,
    },
  });
}

// Initialize sheet with headers if empty
export async function initializeSheetHeaders(spreadsheetId: string): Promise<void> {
  const sheets = await getUncachableGoogleSheetClient();

  const headers = [
    [
      'Submitted At',
      'Owner Name',
      'Email',
      'Phone',
      'WhatsApp',
      'Property Type',
      'Listing Type',
      'Country',
      'City',
      'Address',
      'Area (m²)',
      'Bedrooms',
      'Bathrooms',
      'Parking',
      'Price',
      'Currency',
      'Title',
      'Description',
      'Features',
    ]
  ];

  // Check if sheet has data
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Sheet1!A1:S1',
  });

  // If no data, add headers
  if (!response.data.values || response.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Sheet1!A1:S1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: headers,
      },
    });
  }
}

// Create a new spreadsheet for property listings
export async function createPropertySpreadsheet(): Promise<string> {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

  const response = await sheets.spreadsheets.create({
    requestBody: {
      properties: {
        title: 'Property Listings - ' + new Date().toISOString().split('T')[0],
      },
      sheets: [
        {
          properties: {
            title: 'Sheet1',
          },
        },
      ],
    },
  });

  const spreadsheetId = response.data.spreadsheetId;
  
  if (spreadsheetId) {
    await initializeSheetHeaders(spreadsheetId);
  }

  return spreadsheetId || '';
}
