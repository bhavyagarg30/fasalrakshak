export type PageId =
  | 'dashboard'
  | 'scan'
  | 'diagnosis'
  | 'risk'
  | 'map'
  | 'outbreak-details'
  | 'alerts'
  | 'crops'
  | 'crop-details'
  | 'action'
  | 'community'
  | 'simulator'
  | 'expert'
  | 'profile'
  | 'settings';

export type Language = 'en' | 'hi' | 'pa' | 'mr' | 'ta';

export interface CropInfo {
  id: string;
  name: string;
  localName: string;
  area: string;
  plantingDate?: string;
  sowingDate?: string;
  growthStage: string;
  healthScore: number;
  diseaseRisk: 'Low' | 'Medium' | 'High' | 'Critical';
  pestRisk: 'Low' | 'Medium' | 'High' | 'Critical';
  lastScan: string;
  riskTrend?: 'increasing' | 'stable' | 'decreasing';
  soilMoisture?: string;
  soilType?: string;
  variety: string;
  expectedHarvest?: string;
  history?: { day: string; health: number; risk: number }[];
  scansHistory?: {
    id: string;
    date: string;
    image: string;
    diagnosis: string;
    severity: string;
  }[];
}

export interface OutbreakCluster {
  id: string;
  name: string;
  crop: 'Wheat' | 'Rice' | 'Maize';
  threatName: string;
  threatType: 'Disease' | 'Pest';
  region: string;
  lat: number;
  lng: number;
  reportsCount: number;
  currentRisk: 'Low' | 'Medium' | 'High' | 'Critical';
  predictedSpreadKm: number;
  spreadDirection: string;
  humidity: number;
  temperature: number;
  windSpeed: string;
  windCondition: 'Favourable' | 'Moderate' | 'Unfavourable';
  cropStage: string;
  severity: 'Early' | 'Moderate' | 'Severe';
  detectedTimeAgo: string;
  firstReported?: string;
  status: 'Confirmed' | 'Predicted Spread' | 'At Risk' | 'Low Risk';
  description: string;
  recommendations: string[];
}

export interface AlertItem {
  id: string;
  type:
    | 'disease'
    | 'weather'
    | 'community'
    | 'scan-reminder'
    | 'expert'
    | 'risk-reduced'
    | 'Urgent'
    | 'Weather'
    | 'Advisory';
  title: string;
  locationDist: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  timestamp: string;
  reason: string;
  actionRequired: string;
  crop: string;
  isRead: boolean;
  time?: string;
  description?: string;
  actionPage?: string;
}

export interface RiskWeights {
  diseaseDetection: number;
  weather: number;
  cropStage: number;
  nearbyReports: number;
  historicalPattern: number;
  spreadConditions: number;
}

export interface DiagnosisResult {
  crop: string;
  diseaseOrPest: string;
  confidence: number;
  severity: 'Early' | 'Moderate' | 'Severe';
  affectedAreaPct: number;
  symptoms: string[];
  immediateActions: {
    today: string;
    next48Hours: string;
    next7Days: string;
  };
  preventivePractices: string[];
  ecoFriendlyOptions: string[];
  expertRequired: boolean;
  leafImageUrl?: string;
}
