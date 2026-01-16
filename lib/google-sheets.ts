import { google } from 'googleapis';

// Interface for the data we expect from the sheet
export interface SheetData {
  marketing: {
    headerVariant: 'A' | 'B';
    copy: string;
  };
  stock: Record<string, number>; // SKU -> Quantity
  batches: Record<string, any>; // BatchID -> Details
}

export async function getSheetData(): Promise<SheetData> {
  try {
    if (!process.env.GOOGLE_SHEETS_CREDENTIALS || !process.env.GOOGLE_SHEET_ID) {
      console.warn("Missing Google Sheets Credentials. Returning mock data.");
      return getMockData();
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Example: Fetching ranges for Marketing, Stock, and Batches
    // Adjust ranges based on actual sheet layout
    const response = await sheets.spreadsheets.values.batchGet({
      spreadsheetId,
      ranges: ['Marketing!A2:B2', 'Stock!A2:B20', 'Batches!A2:D20'],
    });

    const valueRanges = response.data.valueRanges;
    if (!valueRanges) return getMockData();

    // Parse Marketing
    const marketingRow = valueRanges[0].values?.[0] || ['A', 'Default Header'];
    const marketing = {
      headerVariant: (marketingRow[0] as 'A' | 'B') || 'A',
      copy: marketingRow[1] as string,
    };

    // Parse Stock
    const stockRows = valueRanges[1].values || [];
    const stock: Record<string, number> = {};
    stockRows.forEach(row => {
      if (row[0] && row[1]) {
        stock[row[0]] = parseInt(row[1], 10);
      }
    });

    // Parse Batches
    const batchRows = valueRanges[2].values || [];
    const batches: Record<string, any> = {};
    batchRows.forEach(row => {
      if (row[0]) {
        batches[row[0]] = {
          date: row[1],
          profile: row[2],
          notes: row[3]
        };
      }
    });

    return { marketing, stock, batches };

  } catch (error) {
    console.error("Error fetching sheet data:", error);
    return getMockData();
  }
}

function getMockData(): SheetData {
  return {
    marketing: {
      headerVariant: 'A', // Default to A
      copy: "Freshly Roasted in Dublin",
    },
    stock: {
      'ETH-YIRG': 5, // Low stock example
      'BRA-SAN': 50,
    },
    batches: {
      'A17': { date: '2026-01-15', profile: 'Light', notes: 'Fruity' }
    }
  };
}
