import connectDB from "../config/db.config";
import { createExp, ExpDocument, seedExp } from "./exp.model";

const fs = require('fs/promises');
const path = require('path');
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTA2YjM4OWQzMTJiNmQ0NDI2NTJlYmYiLCJmdWxsbmFtZSI6IlN1c2hpbCBLYXJraSIsImVtYWlsIjoic3VzaGlsa2Fya2lAZ21haWwuY29tIiwiaWF0IjoxNzYyNzM4NjY1LCJleHAiOjE3NjI3NDIyNjV9.BrWavqRighJi-ML7TmE5aWm9zcj7_fsEBYjA_fFEYUU`;
const API_URL = 'http://localhost:3000/api/exp';

async function loadExpenses() {
    try {

        await connectDB();
        const filePath = path.join(__dirname, 'expenses_100_no_id.json');

        // Read file as text
        const fileContent = await fs.readFile(filePath, 'utf8');

        // Parse JSON
        const expenses = JSON.parse(fileContent) as ExpDocument[];

        for(let exp of expenses) {
            createExpense(API_URL, token, exp)
        }

    } catch (err) {
        console.error('Error loading JSON file:', err);
    }
}

async function createExpense(API_URL: string, TOKEN: string, expenseData: ExpDocument) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(expenseData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ Error:", response.status, errorData);
      return;
    }

    const data = await response.json();
    console.log("✅ Expense created successfully:");
    console.log(data);
  } catch (error) {
    console.error("❌ Request failed:", error);
  }
}

loadExpenses();
