import { VisibleLeafSeverity, PossibleCause, ChemicalAppliedOption } from '../types';

export interface DamagePreset {
  id: string;
  name: string;
  crop: string;
  imageUrl: string;
  likelyProblem: string;
  aiConfidence: number;
  visibleLeafSeverity: VisibleLeafSeverity;
  visibleDamageDescription: string;
  possibleCauses: PossibleCause[];
  suggestedChemicalCategory?:
    | 'Fertilizer injury'
    | 'Herbicide exposure'
    | 'Pesticide injury'
    | 'Excess application'
    | 'Spray drift'
    | 'Chemical burn';
  recentEvent:
    | 'Drought'
    | 'Heavy rainfall'
    | 'Flooding'
    | 'Pest attack'
    | 'Disease outbreak'
    | 'Hailstorm'
    | 'Strong wind / storm'
    | 'Other';
  suggestedPmfbyLossEvent:
    | 'Drought / dry spell'
    | 'Pest attack'
    | 'Disease'
    | 'Flood / inundation'
    | 'Hailstorm'
    | 'Storm / cyclone'
    | 'Other eligible loss event';
  recoveryPlan: {
    immediateAction: string[];
    next24Hours: string[];
    next3Days: string[];
    whatToMonitor: string[];
    whatNotToDo: string[];
  };
}

export const DAMAGE_PRESETS: DamagePreset[] = [
  {
    id: 'preset-wheat-rust',
    name: 'Wheat Foliar Rust Lesions',
    crop: 'Wheat',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    likelyProblem: 'Leaf Rust (Puccinia triticina) / Foliar Fungal Infection',
    aiConfidence: 91,
    visibleLeafSeverity: 'Moderate',
    visibleDamageDescription: 'Distinctive powdery orange-brown pustules scattered along the upper surface of the leaf blade with surrounding chlorotic yellow halos. Pustule eruptions disrupt epidermal cuticle.',
    possibleCauses: [
      {
        cause: 'Disease (Puccinia Rust Spores)',
        likelihood: 'Likely',
        explanation: 'AI vision detected circular-to-oval uredinial pustules typical of cereal rust fungal sporulation.',
      },
      {
        cause: 'Excess Moisture / High Humidity Microclimate',
        likelihood: 'Likely',
        explanation: 'Local micro-station telemetry reports 76% relative humidity and overnight dew duration exceeding 8 hours.',
      },
      {
        cause: 'Nutrient Deficiency (Nitrogen/Potassium)',
        likelihood: 'Possible',
        explanation: 'Marginal chlorosis may indicate secondary foliar nutrient drain induced by fungal hyphae.',
      },
      {
        cause: 'Pesticide / Spray Injury',
        likelihood: 'Unlikely',
        explanation: 'Lesions are uniform fungal bodies rather than erratic droplet burn patterns.',
      },
    ],
    recentEvent: 'Disease outbreak',
    suggestedPmfbyLossEvent: 'Disease',
    recoveryPlan: {
      immediateAction: [
        'Halt flood irrigation immediately to reduce microclimatic canopy humidity.',
        'Isolate symptomatic plants and avoid walking across damp plots during morning dew.',
      ],
      next24Hours: [
        'Scout 20 random points across the field in a diagonal W-pattern to check how many plants show spots.',
        'Consult nearest KVK (Krishi Vigyan Kendra) extension agronomist for ICAR-approved bio-fungicide options.',
      ],
      next3Days: [
        'Prepare foliar spray with fermented sour buttermilk (chaas 1:10) or certified bio-fungicide (Trichoderma harzianum).',
        'Record survey coordinates and capture clean timestamped photos for PMFBY claim intimation if required.',
      ],
      whatToMonitor: [
        'Appearance of new yellow stripes or pustule clusters on young flag leaves.',
        'Spore dust shedding onto clothing or fingers when brushing across canopy.',
      ],
      whatNotToDo: [
        'Do NOT spray unauthorized multi-chemical cocktails or excessive synthetic nitrogen (Urea).',
        'Do NOT discard infected leaf clippings directly into field irrigation channels.',
      ],
    },
  },
  {
    id: 'preset-rice-blight',
    name: 'Rice Water-Soaked Margin Blight',
    crop: 'Rice',
    imageUrl: 'https://images.unsplash.com/photo-1536939459926-301728717817?auto=format&fit=crop&w=800&q=80',
    likelyProblem: 'Bacterial Leaf Blight (Xanthomonas oryzae) / Marginal Necrosis',
    aiConfidence: 84,
    visibleLeafSeverity: 'Severe',
    visibleDamageDescription: 'Water-soaked translucent stripes progressing along both leaf margins into wavy bleached straw-colored necrotic tissue with curling edges.',
    possibleCauses: [
      {
        cause: 'Disease (Bacterial Pathogen)',
        likelihood: 'Likely',
        explanation: 'Marginal wavy lesion pattern and tip dieback correlate with Xanthomonas bacterial infection.',
      },
      {
        cause: 'Excess Moisture / Standing Field Water',
        likelihood: 'Likely',
        explanation: 'Prolonged waterlogging enables bacterial entry through natural hydathodes and leaf wounds.',
      },
      {
        cause: 'Environmental Stress (Strong Winds / Hail)',
        likelihood: 'Possible',
        explanation: 'Foliar micro-wounds from recent gusty winds facilitate bacterial invasion.',
      },
      {
        cause: 'Herbicide Drift',
        likelihood: 'Unlikely',
        explanation: 'Symptom progression starts from edges inward along veins rather than generalized bleaching.',
      },
    ],
    recentEvent: 'Flooding',
    suggestedPmfbyLossEvent: 'Flood / inundation',
    recoveryPlan: {
      immediateAction: [
        'Drain stagnant standing water from the field plot immediately.',
        'Do not allow drainage runoff to flow from infected to adjacent healthy fields.',
      ],
      next24Hours: [
        'Suspend top dressing of Urea or any high-nitrogen chemical fertilizer.',
        'Inspect plant collar and tillers for bacterial milky exudate in early morning dew.',
      ],
      next3Days: [
        'Apply bio-agent (Pseudomonas fluorescens 2.5 kg/ha) or ICAR-prescribed formulation.',
        'Document water inundation levels and take geotagged photos for claim documentation.',
      ],
      whatToMonitor: [
        'Spread of bleached dry stripes toward the boot leaf and emerging panicles.',
        'Yellowing of lower leaves and foul stagnant smell around root zones.',
      ],
      whatNotToDo: [
        'Do NOT add urea or nitrogen fertilizer while active blight lesions are expanding.',
        'Do NOT irrigate using overhead sprayers that splash bacteria across leaves.',
      ],
    },
  },
  {
    id: 'preset-maize-armyworm',
    name: 'Maize Whorl Pinhole & Chewing Damage',
    crop: 'Maize',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
    likelyProblem: 'Fall Armyworm (Spodoptera frugiperda) / Chewing Insect Pest',
    aiConfidence: 89,
    visibleLeafSeverity: 'Moderate',
    visibleDamageDescription: 'Irregular "window pane" feeding holes and chewed ragged margins on central leaves with coarse sawdust-like yellowish frass visible in whorl.',
    possibleCauses: [
      {
        cause: 'Pest Attack (Noctuid Larvae)',
        likelihood: 'Likely',
        explanation: 'Characteristic windowing and whorl defoliation indicate early to mid-instar armyworm feeding.',
      },
      {
        cause: 'Weather / Physical Wind Abrasion',
        likelihood: 'Possible',
        explanation: 'Strong gusts can cause tearing, but frass deposits confirm active larval presence.',
      },
      {
        cause: 'Nutrient Deficiency',
        likelihood: 'Unlikely',
        explanation: 'Structural tissue loss and holes are purely mechanical insect damage.',
      },
      {
        cause: 'Chemical Burn',
        likelihood: 'Unlikely',
        explanation: 'No localized chemical scorching marks; edges show clear chewing patterns.',
      },
    ],
    recentEvent: 'Pest attack',
    suggestedPmfbyLossEvent: 'Pest attack',
    recoveryPlan: {
      immediateAction: [
        'Hand-pick visible caterpillars from the central leaf whorls in early morning or evening.',
        'Drop a handful of dry sieved river sand mixed with neem seed powder into central leaf funnels.',
      ],
      next24Hours: [
        'Install 4 to 5 pheromone delta traps per acre for mass moth trapping and monitoring.',
        'Check neighboring maize and sorghum plots for egg masses on lower leaf surfaces.',
      ],
      next3Days: [
        'Spray Beauveria bassiana (bio-pesticide) or Neem seed kernel extract (NSKE 5%).',
        'If crop damage crosses 10% threshold, prepare evidence dossier for localized calamity review.',
      ],
      whatToMonitor: [
        'Fresh larval frass accumulation in central whorls after morning dew.',
        'Egg masses covered in buff-colored scales on underside of leaves.',
      ],
      whatNotToDo: [
        'Do NOT spray during hot mid-day sun when larvae are burrowed deep into whorls.',
        'Do NOT broadcast broad-spectrum synthetic pesticides that kill beneficial natural predators.',
      ],
    },
  },
  {
    id: 'preset-chemical-scorch',
    name: 'Leaf Edge Chemical Scorch / Spray Drift',
    crop: 'Wheat',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    likelyProblem: 'Foliar Chemical Burn / Fertilizer Salt Injury or Herbicide Drift',
    aiConfidence: 82,
    visibleLeafSeverity: 'Moderate',
    visibleDamageDescription: 'Abrupt necrosis along outer leaf margins and tips with sharply delineated bleached scorch marks. Leaf blade tissue feels brittle and crisp without fungal spores.',
    possibleCauses: [
      {
        cause: 'Possible Chemical Injury (Herbicide / Fertilizer Scorch)',
        likelihood: 'Likely',
        explanation: 'Sharply defined peripheral scorch lines and absence of fungal spores strongly suggest chemical contact stress.',
      },
      {
        cause: 'Drought / Water Stress Combined with Heat',
        likelihood: 'Possible',
        explanation: 'Extreme evaporative demand during high temperatures can trigger peripheral tip burn.',
      },
      {
        cause: 'Nutrient Toxicity / Excess Fertilizer',
        likelihood: 'Possible',
        explanation: 'High salt concentration in root zone or unbuffered foliar spray burns leaf margins.',
      },
      {
        cause: 'Fungal or Bacterial Disease',
        likelihood: 'Unlikely',
        explanation: 'No fungal pustules, concentric rings, or bacterial water soaking observed.',
      },
    ],
    suggestedChemicalCategory: 'Herbicide exposure',
    recentEvent: 'Other',
    suggestedPmfbyLossEvent: 'Other eligible loss event',
    recoveryPlan: {
      immediateAction: [
        'Flush root zone with fresh irrigation water if salt or chemical accumulation is suspected in soil.',
        'Discontinue all chemical, herbicide, and foliar spray applications immediately.',
      ],
      next24Hours: [
        'Check equipment: ensure spray nozzles and tank were thoroughly decontaminated before prior use.',
        'Observe whether damage is uniform across the whole field or confined to spray pass tracks.',
      ],
      next3Days: [
        'Allow 3 to 5 days for crop canopy to initiate new unblemished crown growth before taking radical measures.',
        'Apply mild organic seaweed extract or bio-stimulant foliar spray once new leaves emerge.',
      ],
      whatToMonitor: [
        'Whether emerging new center leaves are healthy or continuing to show distortion.',
        'Soil moisture and root tip health (white roots indicate active recovery).',
      ],
      whatNotToDo: [
        'Do NOT apply emergency heavy fertilizer doses; this will worsen root osmotic burn.',
        'Do NOT pull out plants prematurely if crown buds remain green and pliable.',
      ],
    },
  },
];
