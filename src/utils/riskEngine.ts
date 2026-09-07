import { RiskWeights } from '../types';

export const DEFAULT_RISK_WEIGHTS: RiskWeights = {
  diseaseDetection: 0.25, // 25%
  weather: 0.20,          // 20%
  cropStage: 0.15,        // 15%
  nearbyReports: 0.20,    // 20%
  historicalPattern: 0.10,// 10%
  spreadConditions: 0.10, // 10%
};

export interface RiskInputValues {
  diseaseScore: number;    // 0-100 (e.g. 68)
  weatherScore: number;    // 0-100 (e.g. 81)
  cropStageScore: number;  // 0-100 (e.g. 75 - tillering is susceptible)
  nearbyReportsScore: number; // 0-100 (e.g. 78 - 7 nearby reports)
  historicalScore: number; // 0-100 (e.g. 60)
  spreadScore: number;     // 0-100 (e.g. 76)
}

export const DEFAULT_INPUT_VALUES: RiskInputValues = {
  diseaseScore: 68,
  weatherScore: 81,
  cropStageScore: 75,
  nearbyReportsScore: 78,
  historicalScore: 60,
  spreadScore: 76,
};

export function calculateCompositeRisk(
  inputs: RiskInputValues = DEFAULT_INPUT_VALUES,
  weights: RiskWeights = DEFAULT_RISK_WEIGHTS
): {
  overallScore: number;
  level: 'Low' | 'Medium' | 'High' | 'Critical';
  contributions: {
    factor: string;
    rawScore: number;
    weightPct: number;
    contribution: number;
    level: 'LOW' | 'MEDIUM' | 'HIGH';
  }[];
} {
  const contributions = [
    {
      factor: 'Disease Detection',
      rawScore: inputs.diseaseScore,
      weightPct: Math.round(weights.diseaseDetection * 100),
      contribution: inputs.diseaseScore * weights.diseaseDetection,
      level: (inputs.diseaseScore > 65 ? 'HIGH' : inputs.diseaseScore > 35 ? 'MEDIUM' : 'LOW') as 'LOW' | 'MEDIUM' | 'HIGH',
    },
    {
      factor: 'Weather Suitability',
      rawScore: inputs.weatherScore,
      weightPct: Math.round(weights.weather * 100),
      contribution: inputs.weatherScore * weights.weather,
      level: (inputs.weatherScore > 65 ? 'HIGH' : inputs.weatherScore > 35 ? 'MEDIUM' : 'LOW') as 'LOW' | 'MEDIUM' | 'HIGH',
    },
    {
      factor: 'Nearby Outbreak Reports',
      rawScore: inputs.nearbyReportsScore,
      weightPct: Math.round(weights.nearbyReports * 100),
      contribution: inputs.nearbyReportsScore * weights.nearbyReports,
      level: (inputs.nearbyReportsScore > 65 ? 'HIGH' : inputs.nearbyReportsScore > 35 ? 'MEDIUM' : 'LOW') as 'LOW' | 'MEDIUM' | 'HIGH',
    },
    {
      factor: 'Susceptible Crop Stage',
      rawScore: inputs.cropStageScore,
      weightPct: Math.round(weights.cropStage * 100),
      contribution: inputs.cropStageScore * weights.cropStage,
      level: (inputs.cropStageScore > 65 ? 'HIGH' : inputs.cropStageScore > 35 ? 'MEDIUM' : 'LOW') as 'LOW' | 'MEDIUM' | 'HIGH',
    },
    {
      factor: 'Historical Outbreak Pattern',
      rawScore: inputs.historicalScore,
      weightPct: Math.round(weights.historicalPattern * 100),
      contribution: inputs.historicalScore * weights.historicalPattern,
      level: (inputs.historicalScore > 65 ? 'HIGH' : inputs.historicalScore > 35 ? 'MEDIUM' : 'LOW') as 'LOW' | 'MEDIUM' | 'HIGH',
    },
    {
      factor: 'Microclimate Spread Conditions',
      rawScore: inputs.spreadScore,
      weightPct: Math.round(weights.spreadConditions * 100),
      contribution: inputs.spreadScore * weights.spreadConditions,
      level: (inputs.spreadScore > 65 ? 'HIGH' : inputs.spreadScore > 35 ? 'MEDIUM' : 'LOW') as 'LOW' | 'MEDIUM' | 'HIGH',
    },
  ];

  const totalRaw = contributions.reduce((acc, c) => acc + c.contribution, 0);
  const overallScore = Math.min(100, Math.max(0, Math.round(totalRaw)));

  let level: 'Low' | 'Medium' | 'High' | 'Critical' = 'Low';
  if (overallScore > 80) level = 'Critical';
  else if (overallScore > 60) level = 'High';
  else if (overallScore > 30) level = 'Medium';
  else level = 'Low';

  return { overallScore, level, contributions };
}

export function getRiskColorClass(level: string): { text: string; bg: string; border: string; hex: string } {
  switch (level?.toLowerCase()) {
    case 'critical':
      return { text: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', hex: '#DC2626' };
    case 'high':
      return { text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', hex: '#EF4444' };
    case 'medium':
      return { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', hex: '#F59E0B' };
    default:
      return { text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', hex: '#16A34A' };
  }
}
