import Papa from "papaparse";
import type { CEBOrderCSVRow } from "../types/types";

export function parseCSVText(csvText: string): CEBOrderCSVRow[] {
  const parsed = Papa.parse<string[]>(csvText, {});

  const headers = parsed.data.shift();

  if (!headers) {
    throw new Error("CSV is missing headers");
  }

  return parsed.data.map((row) =>
    headers.reduce((acc, header, index) => {
      acc[header as keyof CEBOrderCSVRow] = row[index] || "";

      return acc;
    }, {} as CEBOrderCSVRow)
  );
}
