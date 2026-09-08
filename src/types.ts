export type PageId =
  | 'dashboard'
  | 'damage-assessment'
  | 'knowledge-hub'
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

export type Language =
  | 'en' // English
  | 'hi' // हिन्दी (Hindi)
  | 'pa' // ਪੰਜਾਬੀ (Punjabi)
  | 'bn' // বাংলা (Bengali)
  | 'mr' // मराठी (Marathi)
  | 'gu' // ગુજરાતી (Gujarati)
  | 'ta' // தமிழ் (Tamil)
  | 'te' // తెలుగు (Telugu)
  | 'kn' // ಕನ್ನಡ (Kannada)
  | 'ml' // മലയാളം (Malayalam)
  | 'or'; // ଓଡ଼ିଆ (Odia)

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  region: string;
}

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

// ---------------------------------------------------------------------------
// NEW DAMAGE ASSESSMENT & PMFBY CLAIM ASSISTANT TYPES
// ---------------------------------------------------------------------------

export type VisibleLeafSeverity = 'Low' | 'Moderate' | 'Severe';

export interface PossibleCause {
  cause: string;
  likelihood: 'Likely' | 'Possible' | 'Unlikely';
  explanation: string;
}

export type ChemicalAppliedOption =
  | 'Fertilizer'
  | 'Pesticide'
  | 'Herbicide'
  | 'Fungicide'
  | 'No'
  | "Don't know";

export interface ChemicalInvestigation {
  suspectedCategory?:
    | 'Fertilizer injury'
    | 'Herbicide exposure'
    | 'Pesticide injury'
    | 'Excess application'
    | 'Spray drift'
    | 'Chemical burn';
  appliedChemical: ChemicalAppliedOption;
  appliedWhen: string;
  note: string;
}

export type AffectedPlantsOption =
  | 'Less than 10%'
  | '10–25%'
  | '25–50%'
  | 'More than 50%'
  | "Don't know";

export type RecentEventOption =
  | 'Drought'
  | 'Heavy rainfall'
  | 'Flooding'
  | 'Pest attack'
  | 'Disease outbreak'
  | 'Hailstorm'
  | 'Strong wind / storm'
  | 'Other'
  | "Don't know";

export interface FieldContextData {
  crop: string;
  fieldSize: string;
  affectedPlantsPct: AffectedPlantsOption;
  noticedWhen: string;
  recentEvent: RecentEventOption;
  state: string;
  district: string;
  village: string;
  surveyNumber?: string;
}

export type FieldRiskLevel = 'Low' | 'Moderate' | 'High' | 'Very High';

export interface EstimatedFieldRisk {
  level: FieldRiskLevel;
  reasoning: string;
  recommendedNextStep: string;
}

export interface DamageRecoveryPlan {
  immediateAction: string[];
  next24Hours: string[];
  next3Days: string[];
  whatToMonitor: string[];
  whatNotToDo: string[];
}

export type PmfbyLossEventOption =
  | 'Drought / dry spell'
  | 'Pest attack'
  | 'Disease'
  | 'Flood / inundation'
  | 'Hailstorm'
  | 'Storm / cyclone'
  | 'Other eligible loss event';

export interface EvidenceChecklistState {
  cropPhoto: boolean;
  dateTime: boolean;
  location: boolean;
  cropName: boolean;
  affectedArea: boolean;
  dateOfLoss: boolean;
  damageDescription: boolean;
  policyNumber: boolean;
}

export interface DamageAssessmentSession {
  id: string;
  leafImageUrl: string;
  leafImageName?: string;
  crop: string;
  likelyProblem: string;
  aiConfidence: number;
  visibleLeafSeverity: VisibleLeafSeverity;
  visibleDamageDescription: string;
  possibleCauses: PossibleCause[];
  chemicalInvestigation: ChemicalInvestigation;
  fieldContext: FieldContextData;
  fieldRisk: EstimatedFieldRisk;
  recoveryPlan: DamageRecoveryPlan;
  lossEvent: PmfbyLossEventOption;
  lossDateTime: string;
  policyNumber?: string;
  farmerName: string;
  farmerPhone: string;
  evidenceChecklist: EvidenceChecklistState;
}

// ---------------------------------------------------------------------------
// KNOWLEDGE HUB / BLOG TYPES
// ---------------------------------------------------------------------------

export type BlogCategory =
  | 'Crop Health'
  | 'Pest Management'
  | 'Disease Management'
  | 'Weather'
  | 'Irrigation'
  | 'Soil'
  | 'Technology'
  | 'Government Schemes'
  | 'Crop Insurance'
  | 'Sustainable Farming';

export interface BlogPost {
  id: string;
  category: BlogCategory;
  imageUrl: string;
  readTime: string;
  date: string;
  titleKey: string;
  descKey: string;
  contentKey: string;
  // Fallbacks for languages
  titles: Partial<Record<Language, string>>;
  descriptions: Partial<Record<Language, string>>;
  sections: Array<{
    heading: Partial<Record<Language, string>>;
    paragraphs: Partial<Record<Language, string[]>>;
    tips?: Partial<Record<Language, string[]>>;
    doList?: Partial<Record<Language, string[]>>;
    dontList?: Partial<Record<Language, string[]>>;
  }>;
}
