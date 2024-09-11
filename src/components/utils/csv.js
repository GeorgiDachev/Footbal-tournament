// src/utils/csvParser.js
export const parseCSV = (csvText) => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    const rows = lines.slice(1).map(line => {
      const values = line.split(',');
      let row = {};
      headers.forEach((header, index) => {
        row[header.trim()] = values[index]?.trim(); // Handle missing values
      });
      return row;
    });
    return rows;
  };
  