import Papa from 'papaparse';
import type { CandidateData } from '../types/candidate';

const getVal = (row: any, ...keys: string[]) => {
  const rowKeys = Object.keys(row);
  for (const key of keys) {
    const lowerTarget = key.toLowerCase();
    const foundKey = rowKeys.find(k => k.toLowerCase() === lowerTarget);
    if (foundKey) return row[foundKey];
  }
  return '';
};

const parseCSVData = (rawData: any[]): CandidateData[] => {
  return rawData.map(row => {
    const marks: { question: string, score: number }[] = [];
    
    // Extract any column that has 'marks', 'grading', or 'task' dynamically
    Object.keys(row).forEach(key => {
      const lowerKey = key.toLowerCase().trim();
      if ((lowerKey.includes('marks') || lowerKey.includes('grading') || lowerKey.includes('task')) && lowerKey !== 'gained marks') {
        const scoreVal = parseFloat(row[key]);
        marks.push({
          question: key.trim(),
          score: isNaN(scoreVal) ? 0 : scoreVal
        });
      }
    });

    return {
      sno: getVal(row, 'sno') || '',
      name: getVal(row, 'name') || '',
      email: getVal(row, 'email') || '',
      assessment: getVal(row, 'assessment') || '',
      marks: marks,
      total: parseFloat(getVal(row, 'total')) || 0,
      gainedMarks: parseFloat(getVal(row, 'gained marks')) || 0,
      raw: row
    };
  }).filter(c => c.name && c.email); // Only keep valid rows
};

export interface Datasets {
  team: CandidateData[];
  general: CandidateData[];
}

export const fetchAllCandidates = async (): Promise<Datasets> => {
  try {
    const basePath = import.meta.env.BASE_URL;
    const [res1, res2] = await Promise.all([
      fetch(`${basePath}dataset/all_team.csv`),
      fetch(`${basePath}dataset/general_team_test.csv`)
    ]);

    const csv1Str = await res1.text();
    const csv2Str = await res2.text();

    const parsed1 = Papa.parse(csv1Str, { header: true, skipEmptyLines: true });
    const parsed2 = Papa.parse(csv2Str, { header: true, skipEmptyLines: true });

    return {
      team: parseCSVData(parsed1.data as any[]),
      general: parseCSVData(parsed2.data as any[])
    };

  } catch (error) {
    console.error("Error fetching or parsing CSV data: ", error);
    return { team: [], general: [] };
  }
};
