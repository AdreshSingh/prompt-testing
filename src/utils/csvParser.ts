import Papa from 'papaparse';
import type { CandidateData } from '../types/candidate';

const parseCSVData = (rawData: any[]): CandidateData[] => {
  return rawData.map(row => {
    const marks: { question: string, score: number }[] = [];
    
    // Extract any column that has 'marks' or 'grading' dynamically
    Object.keys(row).forEach(key => {
      const lowerKey = key.toLowerCase().trim();
      if ((lowerKey.includes('marks') || lowerKey.includes('grading')) && lowerKey !== 'gained marks') {
        const scoreVal = parseFloat(row[key]);
        marks.push({
          question: key.trim(),
          score: isNaN(scoreVal) ? 0 : scoreVal
        });
      }
    });

    return {
      sno: row['Sno'] || '',
      name: row['Name'] || '',
      email: row['email'] || '',
      assessment: row['assessment'] || '',
      marks: marks,
      total: parseFloat(row['total']) || 0,
      gainedMarks: parseFloat(row['gained marks']) || 0,
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
