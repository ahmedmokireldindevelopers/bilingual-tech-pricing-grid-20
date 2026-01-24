import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { addPropertyToSheet, initializeSheetHeaders, type PropertySubmission } from './googleSheets.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Create uploads directory if it doesn't exist
import fs from 'fs';
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads', { recursive: true });
}

// Google Sheets Spreadsheet ID - can be set via environment variable
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID || '';

// Property submission endpoint
app.post('/api/property-submit', 
  upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'documents', maxCount: 5 }
  ]),
  async (req, res) => {
    try {
      const {
        ownerName,
        email,
        phone,
        whatsapp,
        propertyType,
        listingType,
        country,
        city,
        address,
        area,
        bedrooms,
        bathrooms,
        parking,
        price,
        currency,
        title,
        description,
        features,
      } = req.body;

      const submissionData: PropertySubmission = {
        ownerName: ownerName || '',
        email: email || '',
        phone: phone || '',
        whatsapp: whatsapp || '',
        propertyType: propertyType || '',
        listingType: listingType || '',
        country: country || '',
        city: city || '',
        address: address || '',
        area: area || '',
        bedrooms: bedrooms || '',
        bathrooms: bathrooms || '',
        parking: parking || '',
        price: price || '',
        currency: currency || 'EGP',
        title: title || '',
        description: description || '',
        features: features || '',
        submittedAt: new Date().toISOString(),
      };

      // If Google Sheets is configured, add the data
      if (SPREADSHEET_ID) {
        try {
          await initializeSheetHeaders(SPREADSHEET_ID);
          await addPropertyToSheet(SPREADSHEET_ID, submissionData);
          console.log('Property added to Google Sheet');
        } catch (sheetError) {
          console.error('Google Sheets error:', sheetError);
          // Continue even if Google Sheets fails - don't block the submission
        }
      } else {
        console.log('Google Spreadsheet ID not configured, skipping sheet update');
        console.log('Received property submission:', submissionData);
      }

      // Log uploaded files info
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      if (files) {
        if (files.images) {
          console.log(`Uploaded ${files.images.length} images`);
        }
        if (files.documents) {
          console.log(`Uploaded ${files.documents.length} documents`);
        }
      }

      res.status(200).json({ 
        success: true, 
        message: 'Property submitted successfully',
        submissionId: Date.now().toString()
      });
    } catch (error) {
      console.error('Property submission error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to submit property' 
      });
    }
  }
);

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  if (!SPREADSHEET_ID) {
    console.log('Note: GOOGLE_SPREADSHEET_ID not set. Property submissions will be logged but not saved to Google Sheets.');
  }
});
