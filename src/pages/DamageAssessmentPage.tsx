import React, { useState, useRef } from 'react';
import {
  Camera,
  Upload,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  FileText,
  Printer,
  Copy,
  Share2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Info,
  HelpCircle,
  X,
  AlertCircle,
  MapPin,
  Calendar,
  Layers,
  Leaf,
  FlaskConical,
  ExternalLink,
} from 'lucide-react';
import {
  Language,
  PageId,
  VisibleLeafSeverity,
  PossibleCause,
  ChemicalAppliedOption,
  ChemicalInvestigation,
  FieldContextData,
  FieldRiskLevel,
  EstimatedFieldRisk,
  DamageRecoveryPlan,
  PmfbyLossEventOption,
  EvidenceChecklistState,
  AffectedPlantsOption,
  RecentEventOption,
} from '../types';
import { DAMAGE_PRESETS, DamagePreset } from '../data/damagePresets';
import { FARMER_PROFILE, LIVE_WEATHER } from '../data/demoData';
import { t } from '../i18n';

interface DamageAssessmentPageProps {
  language: Language;
  onNavigate: (page: PageId) => void;
}

export const DamageAssessmentPage: React.FC<DamageAssessmentPageProps> = ({
  language,
  onNavigate,
}) => {
  // Active workflow step: 1 (Upload) -> 2 (Assessment & Causes & Chemical) -> 3 (Field Context & Risk) -> 4 (Recovery Plan) -> 5 (PMFBY Assistant & Evidence & Report Draft)
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('preset-wheat-rust');
  const [leafImage, setLeafImage] = useState<string>(DAMAGE_PRESETS[0].imageUrl);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // Core analysis state initialized with preset 0
  const [currentCrop, setCurrentCrop] = useState<string>(DAMAGE_PRESETS[0].crop);
  const [likelyProblem, setLikelyProblem] = useState<string>(DAMAGE_PRESETS[0].likelyProblem);
  const [aiConfidence, setAiConfidence] = useState<number>(DAMAGE_PRESETS[0].aiConfidence);
  const [visibleLeafSeverity, setVisibleLeafSeverity] = useState<VisibleLeafSeverity>(DAMAGE_PRESETS[0].visibleLeafSeverity);
  const [damageDescription, setDamageDescription] = useState<string>(DAMAGE_PRESETS[0].visibleDamageDescription);
  const [possibleCauses, setPossibleCauses] = useState<PossibleCause[]>(DAMAGE_PRESETS[0].possibleCauses);

  // Chemical Investigation state
  const [chemicalCategory, setChemicalCategory] = useState<string>(
    DAMAGE_PRESETS[0].suggestedChemicalCategory || 'Fertilizer injury'
  );
  const [appliedChemical, setAppliedChemical] = useState<ChemicalAppliedOption>('No');
  const [appliedWhen, setAppliedWhen] = useState<string>('');

  // Field Context state
  const [fieldSize, setFieldSize] = useState<string>('2.5');
  const [affectedPlantsPct, setAffectedPlantsPct] = useState<AffectedPlantsOption>('10–25%');
  const [noticedWhen, setNoticedWhen] = useState<string>('Yesterday morning');
  const [recentEvent, setRecentEvent] = useState<RecentEventOption>(DAMAGE_PRESETS[0].recentEvent);
  const [stateName, setStateName] = useState<string>(FARMER_PROFILE.state);
  const [districtName, setDistrictName] = useState<string>(FARMER_PROFILE.tehsil);
  const [villageName, setVillageName] = useState<string>(FARMER_PROFILE.village);
  const [surveyNumber, setSurveyNumber] = useState<string>('Khasra 142/3');

  // Recovery Plan state
  const [recoveryPlan, setRecoveryPlan] = useState<DamageRecoveryPlan>(DAMAGE_PRESETS[0].recoveryPlan);

  // PMFBY Claim state
  const [lossEvent, setLossEvent] = useState<PmfbyLossEventOption>(DAMAGE_PRESETS[0].suggestedPmfbyLossEvent);
  // Default loss time: 28 hours ago for realistic 72-hour timeline calculation
  const defaultLossTime = new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString().slice(0, 16);
  const [lossDateTime, setLossDateTime] = useState<string>(defaultLossTime);
  const [policyNumber, setPolicyNumber] = useState<string>('PMFBY-2025-HR-99824');
  const [farmerName, setFarmerName] = useState<string>(FARMER_PROFILE.name);
  const [farmerPhone, setFarmerPhone] = useState<string>(FARMER_PROFILE.phone);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Calculate hours since loss for 72-hour timeline
  const calculateTimeline = () => {
    try {
      const lossTime = new Date(lossDateTime).getTime();
      const now = Date.now();
      const diffMs = now - lossTime;
      const hoursSince = Math.max(0, Math.round(diffMs / (1000 * 60 * 60)));
      const hoursRemaining = Math.max(0, 72 - hoursSince);
      const isUrgent = hoursRemaining <= 24 && hoursRemaining > 0;
      const isExpired = hoursSince > 72;

      return { hoursSince, hoursRemaining, isUrgent, isExpired };
    } catch {
      return { hoursSince: 28, hoursRemaining: 44, isUrgent: false, isExpired: false };
    }
  };

  const timelineInfo = calculateTimeline();

  // Calculate dynamic field risk estimate based on leaf severity + farmer affected percentage + weather
  const getFieldRiskEstimate = (): EstimatedFieldRisk => {
    if (visibleLeafSeverity === 'Severe' || affectedPlantsPct === 'More than 50%') {
      return {
        level: 'High',
        reasoning: `Elevated foliar lesion severity combined with ${affectedPlantsPct} affected canopy in the field, coupled with ${LIVE_WEATHER.humidity}% atmospheric humidity promoting secondary infection cycles.`,
        recommendedNextStep:
          'Isolate affected plots, initiate recommended biological barrier spray, and prepare PMFBY loss intimation within the 72-hour reporting window.',
      };
    } else if (visibleLeafSeverity === 'Moderate' || affectedPlantsPct === '25–50%' || affectedPlantsPct === '10–25%') {
      return {
        level: 'Moderate',
        reasoning: `Moderate localized foliar damage with ${affectedPlantsPct} visible field symptoms. Weather models indicate active spore incubation period in Sonipat corridor.`,
        recommendedNextStep:
          'Scout field in a diagonal W-pattern, withhold excessive nitrogen fertilizer, and document timestamped photographs for safety.',
      };
    } else {
      return {
        level: 'Low',
        reasoning:
          'Isolated leaf lesion marks with under 10% affected plants across the registered acreage.',
        recommendedNextStep:
          'Maintain regular scouting during morning dew and practice preventive organic spray.',
      };
    }
  };

  const currentFieldRisk = getFieldRiskEstimate();

  // Load a preset
  const handleSelectPreset = (preset: DamagePreset) => {
    setSelectedPresetId(preset.id);
    setLeafImage(preset.imageUrl);
    setCurrentCrop(preset.crop);
    setLikelyProblem(preset.likelyProblem);
    setAiConfidence(preset.aiConfidence);
    setVisibleLeafSeverity(preset.visibleLeafSeverity);
    setDamageDescription(preset.visibleDamageDescription);
    setPossibleCauses(preset.possibleCauses);
    setRecoveryPlan(preset.recoveryPlan);
    setRecentEvent(preset.recentEvent);
    setLossEvent(preset.suggestedPmfbyLossEvent);
    if (preset.suggestedChemicalCategory) {
      setChemicalCategory(preset.suggestedChemicalCategory);
    }
  };

  // Handle custom image upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setLeafImage(event.target.result as string);
          setSelectedPresetId('custom-upload');
          simulateAiAnalysis();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAiAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 900);
  };

  // Copy draft report to clipboard
  const handleCopyReport = () => {
    const reportText =
      language === 'hi'
        ? `
========================================
प्रधानमंत्री फसल बीमा योजना (PMFBY) फसल क्षति सूचना (AI-सहायित प्रारूप)
========================================
सूचना: यह फसलरक्षक (FasalRakshak) द्वारा तैयार गैर-आधिकारिक प्रारूप है।
यह PMFBY पात्रता या मुआवजे की गारंटी नहीं देता है।

1. किसान का विवरण
- नाम: ${farmerName || 'उपलब्ध नहीं'}
- मोबाइल: ${farmerPhone || 'उपलब्ध नहीं'}
- किसान आईडी: ${FARMER_PROFILE.kisanId}

2. खेत का विवरण
- राज्य: ${stateName || 'हरियाणा'}
- जिला / तहसील: ${districtName || 'सोनीपत'}
- गांव: ${villageName || 'राई'}
- खसरा / सर्वे नंबर: ${surveyNumber || 'उपलब्ध नहीं'}
- बीमित फसल: ${currentCrop}
- कुल खेत का क्षेत्रफल: ${fieldSize} एकड़

3. नुकसान का विवरण
- आपदा की तिथि व समय: ${lossDateTime} (${timelineInfo.hoursSince} घंटे बीत चुके हैं)
- नुकसान का प्रकार: ${lossEvent}
- प्रभावित पौधों का अनुमान: ${affectedPlantsPct}
- हाल की प्रतिकूल घटना: ${recentEvent}
- 72 घंटे की समय-सीमा स्थिति: ${
            timelineInfo.hoursRemaining > 0
              ? `72 घंटे में से ${timelineInfo.hoursRemaining} घंटे शेष`
              : '72 घंटे की समय सीमा समाप्त'
          }

4. AI-सहायित क्षति मूल्यांकन
- जांची गई पत्ती: एकल अपलोड की गई पत्ती
- संभावित समस्या: ${likelyProblem}
- AI विश्वास स्कोर: ${aiConfidence}%
- पत्ती क्षति गंभीरता: ${visibleLeafSeverity}
- AI-सहायित खेत जोखिम: ${currentFieldRisk.level} जोखिम
- रासायनिक जांच: प्रयुक्त: ${appliedChemical} (${appliedWhen || 'लागू नहीं'})

5. साक्ष्य अभिलेख
- जियोटैग्ड पत्ती की तस्वीर: संलग्न
- दिनांक / समय मुहर: सत्यापित (${new Date().toLocaleString('hi-IN')})
- बीमा पॉलिसी / आवेदन संख्या: ${policyNumber || 'उपलब्ध नहीं'}
========================================
    `.trim()
        : `
========================================
PMFBY CROP LOSS INTIMATION (AI-ASSISTED DRAFT)
========================================
Notice: This is an AI-assisted draft prepared via FasalRakshak.
It is NOT an official assessment and does not guarantee PMFBY eligibility or compensation.

1. FARMER DETAILS
- Name: ${farmerName || 'Not provided'}
- Mobile: ${farmerPhone || 'Not provided'}
- Kisan ID: ${FARMER_PROFILE.kisanId}

2. FARM DETAILS
- State: ${stateName || 'Not provided'}
- District / Tehsil: ${districtName || 'Not provided'}
- Village: ${villageName || 'Not provided'}
- Survey / Khasra No: ${surveyNumber || 'Not provided'}
- Insured Crop: ${currentCrop}
- Total Field Size: ${fieldSize} Acres

3. LOSS DETAILS
- Date & Time of Calamity: ${lossDateTime} (${timelineInfo.hoursSince} hours elapsed)
- Selected Loss Category: ${lossEvent}
- Farmer-Reported Affected Plants: ${affectedPlantsPct}
- Recent Adverse Event: ${recentEvent}
- 72-Hour Notification Status: ${
            timelineInfo.hoursRemaining > 0
              ? `${timelineInfo.hoursRemaining} hours remaining in 72h window`
              : 'Exceeded 72h window'
          }

4. AI-ASSISTED DAMAGE ASSESSMENT
- Uploaded Leaf Condition: Visible damage on single uploaded leaf
- Likely Problem: ${likelyProblem}
- AI Confidence: ${aiConfidence}%
- Visible Leaf Severity: ${visibleLeafSeverity}
- AI-Assisted Field Risk Estimate: ${currentFieldRisk.level} Risk
- Chemical Check: Applied: ${appliedChemical} (${appliedWhen || 'N/A'})

5. EVIDENCE RECORD
- Geotagged Leaf Photograph: Documented
- Date/Time Stamp: Verified (${new Date().toLocaleString()})
- Insurance Policy / Application No: ${policyNumber || 'Not provided'}
========================================
    `.trim();

    navigator.clipboard.writeText(reportText);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  // WhatsApp share
  const handleShareWhatsapp = () => {
    const message = encodeURIComponent(
      language === 'hi'
        ? `*फसलरक्षक PMFBY फसल नुकसान प्रारूप*\nकिसान: ${farmerName}\nफसल: ${currentCrop}\nआपदा: ${lossEvent}\nतिथि: ${lossDateTime}\nअनुमानित जोखिम: ${currentFieldRisk.level}\nपॉलिसी क्रमांक: ${policyNumber || 'उपलब्ध नहीं'}`
        : `*FasalRakshak PMFBY Loss Draft*\nFarmer: ${farmerName}\nCrop: ${currentCrop}\nLoss Event: ${lossEvent}\nDate: ${lossDateTime}\nEstimated Risk: ${currentFieldRisk.level}\nPolicy No: ${policyNumber || 'Not provided'}`
    );
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">
      {/* Top Breadcrumb & Page Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#DCFCE7 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/40 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-3">
              <Leaf size={14} className="text-emerald-300" />
              <span>{t('uspClaim', language)}</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
              {t('damageTitle', language)}
            </h1>
            <p className="text-emerald-100/90 text-sm mt-2 leading-relaxed">
              {t('damageSubtitle', language)}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onNavigate('dashboard')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors border border-white/20 flex items-center"
            >
              <ChevronLeft size={16} className="mr-1" />
              {t('navDashboard', language)}
            </button>
          </div>
        </div>

        {/* Step Navigation Pill Bar */}
        <div className="relative z-10 mt-6 pt-5 border-t border-emerald-700/50 flex items-center overflow-x-auto no-scrollbar space-x-2 text-xs">
          {[
            { step: 1, label: t('stepLeafUpload', language) },
            { step: 2, label: t('stepAiAssessment', language) },
            { step: 3, label: t('stepFieldContext', language) },
            { step: 4, label: t('stepRecovery', language) },
            { step: 5, label: t('stepReport', language) },
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => setActiveStep(item.step)}
              className={`px-4 py-2 rounded-xl font-bold transition-all shrink-0 flex items-center space-x-1.5 ${
                activeStep === item.step
                  ? 'bg-white text-emerald-900 shadow-md font-black'
                  : 'bg-emerald-800/60 hover:bg-emerald-700/60 text-emerald-100'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-black">
                {item.step}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ====================================================================
          STEP 1: UPLOAD ONE DAMAGED LEAF PHOTOGRAPH
          ==================================================================== */}
      {activeStep === 1 && (
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold mb-2">
              <Info size={14} />
              <span>{language === 'hi' ? 'एकल पत्ती विश्लेषण नियम' : 'Single Leaf Analysis Mandate'}</span>
            </div>
            <h2 className="text-xl font-black text-slate-800">
              {t('uploadLeafHeading', language)}
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              {t('uploadLeafSub', language)}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Preview & Upload Controls (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 bg-slate-50 h-80 flex flex-col items-center justify-center group hover:border-emerald-500 transition-all">
                {leafImage ? (
                  <div className="relative w-full h-full">
                    <img
                      src={leafImage}
                      alt="Uploaded Damaged Leaf"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-xs">
                      <div>
                        <span className="bg-emerald-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                          {language === 'hi' ? 'एकल पत्ती नमूना' : 'Single Leaf Specimen'}
                        </span>
                        <p className="font-semibold mt-1">
                          {currentCrop} {language === 'hi' ? 'पत्ती की जांच जारी' : 'Leaf Under Inspection'}
                        </p>
                      </div>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold border border-white/40 cursor-pointer"
                      >
                        {language === 'hi' ? 'तस्वीर बदलें' : 'Change Photo'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6 space-y-3">
                    <Camera size={44} className="mx-auto text-slate-400" />
                    <p className="text-sm font-bold text-slate-700">
                      {language === 'hi' ? 'एक क्षतिग्रस्त पत्ती की तस्वीर लें या अपलोड करें' : 'Capture or Upload ONE Damaged Leaf'}
                    </p>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">
                      {language === 'hi' ? 'स्पष्ट विश्लेषण के लिए पत्ती को सीधी धूप से बचाकर समतल रखें।' : 'Hold the leaf flat in indirect sunlight for clear visible lesion analysis.'}
                    </p>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-xs flex flex-col items-center justify-center text-white space-y-3">
                    <div className="w-10 h-10 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm font-bold">{t('analyzingText', language)}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="leaf-upload-file-input"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-5 py-2.5 rounded-xl text-xs transition-colors flex items-center shadow-sm cursor-pointer"
                  id="btn-choose-leaf-file"
                >
                  <Upload size={15} className="mr-2" />
                  {t('chooseFile', language)}
                </button>

                <button
                  onClick={() => {
                    fileInputRef.current?.click();
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors flex items-center"
                >
                  <Camera size={15} className="mr-2 text-slate-500" />
                  {t('snapPhoto', language)}
                </button>
              </div>
            </div>

            {/* Right: Realistic Field Samples (5 Cols) */}
            <div className="lg:col-span-5 space-y-3">
              <p className="text-xs font-black uppercase tracking-wider text-slate-500">
                {t('selectSamplePrompt', language)}
              </p>
              <div className="space-y-2.5">
                {DAMAGE_PRESETS.map((preset) => {
                  const isSelected = selectedPresetId === preset.id;
                  return (
                    <div
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`flex items-center space-x-3 p-3 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-xs'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <img
                        src={preset.imageUrl}
                        alt={preset.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 border border-gray-200"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                            {preset.crop}
                          </span>
                          <span
                            className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${
                              preset.visibleLeafSeverity === 'Severe'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-amber-100 text-amber-700'
                            }`}
                          >
                            {preset.visibleLeafSeverity}
                          </span>
                        </div>
                        <h4 className="text-xs font-black text-slate-800 truncate mt-1">
                          {preset.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {preset.likelyProblem}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button
              onClick={() => setActiveStep(2)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3 rounded-2xl text-sm transition-all shadow-md flex items-center cursor-pointer"
              id="btn-goto-step-2"
            >
              <span>{t('continueBtn', language)}: {t('stepAiAssessment', language)}</span>
              <ChevronRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      )}

      {/* ====================================================================
          STEP 2: VISIBLE DAMAGE + WHY DID THIS HAPPEN + CHEMICAL CHECK
          ==================================================================== */}
      {activeStep === 2 && (
        <div className="space-y-8">
          {/* 1. VISIBLE DAMAGE ON UPLOADED LEAF CARD */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-5 border-b border-gray-100">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                  {language === 'hi' ? 'पत्ती का दृश्य विश्लेषण' : 'Leaf Visual Telemetry'}
                </span>
                <h3 className="text-xl font-black text-slate-800 mt-1">
                  {t('visibleDamageHeading', language)}
                </h3>
              </div>

              {/* Explicit Single-Leaf Scope Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 max-w-md text-xs text-amber-900 flex items-start space-x-2">
                <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-medium">
                  {t('visibleDamageNotice', language)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
              <div className="md:col-span-4 rounded-2xl overflow-hidden border border-gray-200 relative h-56">
                <img
                  src={leafImage}
                  alt="Damaged Leaf"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {language === 'hi' ? 'जांची गई पत्ती' : 'Inspected Leaf'}
                </div>
              </div>

              <div className="md:col-span-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">
                      {t('fieldCrop', language)}
                    </span>
                    <span className="text-sm font-black text-slate-800">{currentCrop}</span>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">
                      {t('aiConfidence', language)}
                    </span>
                    <span className="text-sm font-black text-emerald-700">
                      {aiConfidence}% {language === 'hi' ? 'सटीकता' : 'Match'}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">
                      {t('visibleSeverity', language)}
                    </span>
                    <span
                      className={`text-sm font-black ${
                        visibleLeafSeverity === 'Severe'
                          ? 'text-red-600'
                          : visibleLeafSeverity === 'Moderate'
                          ? 'text-amber-600'
                          : 'text-emerald-600'
                      }`}
                    >
                      {visibleLeafSeverity === 'Severe'
                        ? language === 'hi'
                          ? 'गंभीर'
                          : 'Severe'
                        : visibleLeafSeverity === 'Moderate'
                        ? language === 'hi'
                          ? 'मध्यम'
                          : 'Moderate'
                        : language === 'hi'
                        ? 'हल्का'
                        : 'Mild'}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                    {t('likelyProblem', language)}
                  </span>
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl text-xs font-bold text-emerald-950">
                    {likelyProblem}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                    {language === 'hi' ? 'ऊतक व धब्बे परीक्षण निष्कर्ष' : 'Tissue & Lesion Findings'}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed bg-[#F7FAF7] p-3.5 rounded-2xl border border-emerald-100/60">
                    {damageDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. WHY DID THIS HAPPEN? (POSSIBLE CAUSES) */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-black text-slate-800">
                  {t('whyDidThisHappen', language)}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t('whySubtitle', language)}
                </p>
              </div>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start">
                {language === 'hi' ? 'बहु-कारक विश्लेषण' : 'Multi-Factor Evaluation'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              {possibleCauses.map((causeItem, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-gray-100 bg-slate-50/60 hover:bg-white hover:border-emerald-200 transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-800">{causeItem.cause}</span>
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                        causeItem.likelihood === 'Likely'
                          ? 'bg-red-100 text-red-700'
                          : causeItem.likelihood === 'Possible'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {causeItem.likelihood === 'Likely'
                        ? language === 'hi'
                          ? 'अत्यधिक संभावित'
                          : 'Likely'
                        : causeItem.likelihood === 'Possible'
                        ? language === 'hi'
                          ? 'संभावित'
                          : 'Possible'
                        : language === 'hi'
                        ? 'कम संभावित'
                        : 'Unlikely'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {causeItem.explanation}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-slate-100/80 rounded-2xl text-[11px] text-slate-500 flex items-center space-x-2">
              <Info size={14} className="shrink-0 text-slate-400" />
              <span>{t('uncertaintyNote', language)}</span>
            </div>
          </div>

          {/* 3. COULD CHEMICALS HAVE CAUSED THIS? */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 space-y-5">
            <div className="border-b border-gray-100 pb-4">
              <div className="flex items-center space-x-2">
                <FlaskConical size={20} className="text-purple-600" />
                <h3 className="text-xl font-black text-slate-800">
                  {t('chemicalsHeading', language)}
                </h3>
              </div>
              <p className="text-xs text-amber-700 font-bold mt-1 bg-amber-50 p-2.5 rounded-xl border border-amber-200 inline-block">
                ⚠️ {t('chemicalDisclaimer', language)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Question 1: Have you recently applied any chemical? */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  {t('chemicalQuestion1', language)}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      'Fertilizer',
                      'Pesticide',
                      'Herbicide',
                      'Fungicide',
                      'No',
                      "Don't know",
                    ] as ChemicalAppliedOption[]
                  ).map((opt) => {
                    const optLabel =
                      language === 'hi'
                        ? opt === 'Fertilizer'
                          ? 'उर्वरक'
                          : opt === 'Pesticide'
                          ? 'कीटनाशक'
                          : opt === 'Herbicide'
                          ? 'खरपतवारनाशक'
                          : opt === 'Fungicide'
                          ? 'फफूंदनाशक'
                          : opt === 'No'
                          ? 'नहीं'
                          : 'पता नहीं'
                        : opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setAppliedChemical(opt)}
                        className={`p-2.5 rounded-xl text-xs font-bold transition-all border text-center cursor-pointer ${
                          appliedChemical === opt
                            ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {optLabel}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 2: When was it applied? */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  {t('chemicalQuestion2', language)}
                </label>
                <input
                  type="text"
                  value={appliedWhen}
                  onChange={(e) => setAppliedWhen(e.target.value)}
                  placeholder={t('chemicalWhenPrompt', language)}
                  className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <div className="mt-3">
                  <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                    {language === 'hi' ? 'संभावित रासायनिक प्रभाव' : 'Suspected Exposure Type'}
                  </label>
                  <select
                    value={chemicalCategory}
                    onChange={(e) => setChemicalCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700"
                  >
                    <option value="Fertilizer injury">
                      {language === 'hi' ? 'उर्वरक क्षति (Fertilizer injury)' : 'Fertilizer injury (उर्वरक क्षति)'}
                    </option>
                    <option value="Herbicide exposure">
                      {language === 'hi' ? 'खरपतवारनाशक प्रभाव (Herbicide exposure)' : 'Herbicide exposure (खरपतवारनाशक प्रभाव)'}
                    </option>
                    <option value="Pesticide injury">
                      {language === 'hi' ? 'कीटनाशक जलन (Pesticide injury)' : 'Pesticide injury (कीटनाशक जलन)'}
                    </option>
                    <option value="Excess application">
                      {language === 'hi' ? 'अत्यधिक मात्रा (Excess application)' : 'Excess application (अत्यधिक मात्रा)'}
                    </option>
                    <option value="Spray drift">
                      {language === 'hi' ? 'पड़ोसी खेत से हवा में बहाव (Spray drift)' : 'Spray drift (पड़ोसी खेत से हवा में बहाव)'}
                    </option>
                    <option value="Chemical burn">
                      {language === 'hi' ? 'रासायनिक झुलसा (Chemical burn)' : 'Chemical burn (रासायनिक झुलसा)'}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-4">
            <button
              onClick={() => setActiveStep(1)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors flex items-center cursor-pointer"
            >
              <ChevronLeft size={16} className="mr-1" />
              {t('backBtn', language)}
            </button>

            <button
              onClick={() => setActiveStep(3)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3 rounded-2xl text-sm transition-all shadow-md flex items-center cursor-pointer"
              id="btn-goto-step-3"
            >
              <span>{t('continueBtn', language)}: {t('stepFieldContext', language)}</span>
              <ChevronRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      )}

      {/* ====================================================================
          STEP 3: TELL US ABOUT YOUR FIELD & ESTIMATED FIELD RISK
          ==================================================================== */}
      {activeStep === 3 && (
        <div className="space-y-8">
          {/* FIELD CONTEXT FORM */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                {language === 'hi' ? 'खेत समग्र स्थिति' : 'Field Aggregation'}
              </span>
              <h2 className="text-xl font-black text-slate-800 mt-1">
                {t('fieldContextHeading', language)}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {t('fieldContextSub', language)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Crop */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {t('fieldCrop', language)}
                </label>
                <input
                  type="text"
                  value={currentCrop}
                  onChange={(e) => setCurrentCrop(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                />
              </div>

              {/* Field Size */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {t('fieldSize', language)}
                </label>
                <input
                  type="text"
                  value={fieldSize}
                  onChange={(e) => setFieldSize(e.target.value)}
                  placeholder={language === 'hi' ? 'उदा. 2.5' : 'e.g. 2.5'}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                />
              </div>

              {/* Affected Plants */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {t('affectedPlantsQuestion', language)}
                </label>
                <select
                  value={affectedPlantsPct}
                  onChange={(e) => setAffectedPlantsPct(e.target.value as AffectedPlantsOption)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                >
                  <option value="Less than 10%">{language === 'hi' ? '10% से कम' : 'Less than 10%'}</option>
                  <option value="10–25%">{language === 'hi' ? '10–25% (प्रारंभिक फैलाव)' : '10–25%'}</option>
                  <option value="25–50%">{language === 'hi' ? '25–50% (व्यापक फैलाव)' : '25–50%'}</option>
                  <option value="More than 50%">{language === 'hi' ? '50% से अधिक (गंभीर नुकसान)' : 'More than 50%'}</option>
                  <option value="Don't know">{language === 'hi' ? 'पता नहीं' : "Don't know"}</option>
                </select>
              </div>

              {/* Noticed When */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {t('noticedWhenQuestion', language)}
                </label>
                <input
                  type="text"
                  value={noticedWhen}
                  onChange={(e) => setNoticedWhen(e.target.value)}
                  placeholder={language === 'hi' ? 'उदा. कल सुबह' : 'e.g. Yesterday morning'}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                />
              </div>

              {/* Recent Event */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {t('recentEventQuestion', language)}
                </label>
                <select
                  value={recentEvent}
                  onChange={(e) => setRecentEvent(e.target.value as RecentEventOption)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                >
                  <option value="Disease outbreak">{language === 'hi' ? 'रोग का प्रकोप' : 'Disease outbreak'}</option>
                  <option value="Pest attack">{language === 'hi' ? 'कीट हमला' : 'Pest attack'}</option>
                  <option value="Flooding">{language === 'hi' ? 'जलभराव / बाढ़' : 'Flooding'}</option>
                  <option value="Heavy rainfall">{language === 'hi' ? 'अत्यधिक वर्षा' : 'Heavy rainfall'}</option>
                  <option value="Hailstorm">{language === 'hi' ? 'ओलावृष्टि' : 'Hailstorm'}</option>
                  <option value="Drought">{language === 'hi' ? 'सूखा / पानी की कमी' : 'Drought'}</option>
                  <option value="Strong wind / storm">{language === 'hi' ? 'आंधी-तूफान' : 'Strong wind / storm'}</option>
                  <option value="Other">{language === 'hi' ? 'अन्य' : 'Other'}</option>
                  <option value="Don't know">{language === 'hi' ? 'पता नहीं' : "Don't know"}</option>
                </select>
              </div>

              {/* Survey / Khasra No */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {t('surveyLabel', language)}
                </label>
                <input
                  type="text"
                  value={surveyNumber}
                  onChange={(e) => setSurveyNumber(e.target.value)}
                  placeholder={language === 'hi' ? 'खसरा / मुरब्बा नंबर' : 'Khasra / Murabba Number'}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                />
              </div>
            </div>

            {/* Location Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-gray-100">
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                  {t('stateLabel', language)}
                </label>
                <input
                  type="text"
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                  {t('districtLabel', language)}
                </label>
                <input
                  type="text"
                  value={districtName}
                  onChange={(e) => setDistrictName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                  {t('villageLabel', language)}
                </label>
                <input
                  type="text"
                  value={villageName}
                  onChange={(e) => setVillageName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* ESTIMATED FIELD RISK CARD */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-black uppercase tracking-wider">
                  {t('fieldRiskLabel', language)}
                </span>
                <h3 className="text-xl font-black text-slate-800 mt-1">
                  {t('fieldRiskHeading', language)}
                </h3>
              </div>
              <div className="text-right">
                <span
                  className={`text-sm font-black px-4 py-1 rounded-full uppercase border ${
                    currentFieldRisk.level === 'High' || currentFieldRisk.level === 'Very High'
                      ? 'bg-red-500 text-white border-red-600'
                      : currentFieldRisk.level === 'Moderate'
                      ? 'bg-amber-500 text-white border-amber-600'
                      : 'bg-emerald-600 text-white border-emerald-700'
                  }`}
                >
                  {currentFieldRisk.level === 'High' || currentFieldRisk.level === 'Very High'
                    ? language === 'hi'
                      ? 'उच्च जोखिम स्तर'
                      : 'High Threat Level'
                    : currentFieldRisk.level === 'Moderate'
                    ? language === 'hi'
                      ? 'मध्यम जोखिम स्तर'
                      : 'Moderate Threat Level'
                    : language === 'hi'
                    ? 'कम जोखिम स्तर'
                    : 'Low Threat Level'}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
              <p className="text-xs font-black uppercase text-slate-700 tracking-wider">
                {language === 'hi' ? 'यह जोखिम स्तर क्यों निर्धारित किया गया?' : 'Why was this risk level assigned?'}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {currentFieldRisk.reasoning}
              </p>
            </div>

            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 text-xs space-y-1">
              <span className="text-[11px] font-black uppercase text-emerald-800 block">
                {t('recommendedNextStep', language)}
              </span>
              <p className="text-emerald-950 font-semibold leading-relaxed">
                {currentFieldRisk.recommendedNextStep}
              </p>
            </div>

            {/* Mandatory Safety Notice */}
            <div className="p-3 bg-amber-50 rounded-2xl text-[11px] text-amber-900 border border-amber-200 flex items-start space-x-2">
              <Info size={14} className="shrink-0 mt-0.5 text-amber-600" />
              <span>{t('fieldRiskNotice', language)}</span>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-4">
            <button
              onClick={() => setActiveStep(2)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors flex items-center cursor-pointer"
            >
              <ChevronLeft size={16} className="mr-1" />
              {t('backBtn', language)}
            </button>

            <button
              onClick={() => setActiveStep(4)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3 rounded-2xl text-sm transition-all shadow-md flex items-center cursor-pointer"
              id="btn-goto-step-4"
            >
              <span>{t('continueBtn', language)}: {t('stepRecovery', language)}</span>
              <ChevronRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      )}

      {/* ====================================================================
          STEP 4: RECOVERY PLAN
          ==================================================================== */}
      {activeStep === 4 && (
        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <div className="flex items-center space-x-2">
                <Leaf size={20} className="text-emerald-600" />
                <h2 className="text-xl font-black text-slate-800">
                  {t('recoveryHeading', language)}
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {t('recoverySub', language)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Immediate Action */}
              <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200/80 space-y-3">
                <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-200/60 px-2 py-0.5 rounded">
                  {t('immediateAction', language)}
                </span>
                <ul className="space-y-2 text-xs text-emerald-950 font-medium">
                  {recoveryPlan.immediateAction.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 size={13} className="text-emerald-700 mr-2 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next 24 Hours */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-[10px] font-black uppercase text-slate-800 bg-slate-200 px-2 py-0.5 rounded">
                  {t('next24Hours', language)}
                </span>
                <ul className="space-y-2 text-xs text-slate-700 font-medium">
                  {recoveryPlan.next24Hours.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Clock size={13} className="text-slate-500 mr-2 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next 3 Days */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-[10px] font-black uppercase text-slate-800 bg-slate-200 px-2 py-0.5 rounded">
                  {t('next3Days', language)}
                </span>
                <ul className="space-y-2 text-xs text-slate-700 font-medium">
                  {recoveryPlan.next3Days.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Calendar size={13} className="text-slate-500 mr-2 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* What to Monitor & What NOT to do */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-[#F7FAF7] p-5 rounded-2xl border border-emerald-100 space-y-2.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center">
                  <Sparkles size={14} className="text-emerald-600 mr-1.5" />
                  {t('whatToMonitor', language)}
                </h4>
                <ul className="space-y-2 text-xs text-slate-600 font-medium">
                  {recoveryPlan.whatToMonitor.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-2 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-50/60 p-5 rounded-2xl border border-red-200/80 space-y-2.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-red-800 flex items-center">
                  <AlertCircle size={14} className="text-red-600 mr-1.5" />
                  {t('whatNotToDo', language)}
                </h4>
                <ul className="space-y-2 text-xs text-red-900 font-medium">
                  {recoveryPlan.whatNotToDo.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <X size={13} className="text-red-600 mr-1.5 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-2xl text-[11px] text-amber-900 border border-amber-200 flex items-center space-x-2">
              <Info size={14} className="text-amber-600 shrink-0" />
              <span>{t('safetyWarning', language)}</span>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-4">
            <button
              onClick={() => setActiveStep(3)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors flex items-center cursor-pointer"
            >
              <ChevronLeft size={16} className="mr-1" />
              {t('backBtn', language)}
            </button>

            <button
              onClick={() => setActiveStep(5)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3 rounded-2xl text-sm transition-all shadow-md flex items-center cursor-pointer"
              id="btn-goto-step-5"
            >
              <span>{t('continueBtn', language)}: {t('stepPmfby', language)}</span>
              <ChevronRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      )}

      {/* ====================================================================
          STEP 5: PMFBY CLAIM ASSISTANT, 72-HOUR ALERT & EVIDENCE DRAFT
          ==================================================================== */}
      {activeStep === 5 && (
        <div className="space-y-8">
          {/* PMFBY Loss Config Card */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <div className="flex items-center space-x-2">
                <ShieldCheck size={22} className="text-emerald-700" />
                <h2 className="text-xl font-black text-slate-800">
                  {t('pmfbyHeading', language)}
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {t('pmfbySub', language)}
              </p>
              <div className="mt-2.5 p-3 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] text-slate-600 leading-relaxed">
                {t('pmfbyNotice', language)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Eligible Loss Event */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {t('lossEventLabel', language)}
                </label>
                <select
                  value={lossEvent}
                  onChange={(e) => setLossEvent(e.target.value as PmfbyLossEventOption)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                >
                  <option value="Disease">{language === 'hi' ? 'रोग का प्रकोप / व्याधि' : 'Disease (रोग का प्रकोप / व्याधि)'}</option>
                  <option value="Pest attack">{language === 'hi' ? 'कीट आक्रमण' : 'Pest attack (कीट आक्रमण)'}</option>
                  <option value="Flood / inundation">{language === 'hi' ? 'बाढ़ / जलभराव' : 'Flood / inundation (बाढ़ / जलभराव)'}</option>
                  <option value="Hailstorm">{language === 'hi' ? 'ओलावृष्टि' : 'Hailstorm (ओलावृष्टि)'}</option>
                  <option value="Drought / dry spell">{language === 'hi' ? 'सूखा / वर्षा की कमी' : 'Drought / dry spell (सूखा / वर्षा की कमी)'}</option>
                  <option value="Storm / cyclone">{language === 'hi' ? 'आंधी / तूफान' : 'Storm / cyclone (आंधी / तूफान)'}</option>
                  <option value="Other eligible loss event">{language === 'hi' ? 'अन्य अधिसूचित आपदा' : 'Other eligible loss event (अन्य अधिसूचित आपदा)'}</option>
                </select>
              </div>

              {/* Loss Date & Time */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {t('whenLossOccurred', language)}
                </label>
                <input
                  type="datetime-local"
                  value={lossDateTime}
                  onChange={(e) => setLossDateTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                />
              </div>

              {/* Policy Number */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'hi' ? 'बीमा पॉलिसी / केसीसी आवेदन क्रमांक (वैकल्पिक)' : 'Insurance Policy / KCC Application Number (Optional)'}
                </label>
                <input
                  type="text"
                  value={policyNumber}
                  onChange={(e) => setPolicyNumber(e.target.value)}
                  placeholder={language === 'hi' ? 'उदा. PMFBY-2025-HR-99824' : 'e.g. PMFBY-2025-HR-99824'}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                />
              </div>

              {/* Farmer Contact Info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {language === 'hi' ? 'किसान का नाम' : 'Farmer Name'}
                  </label>
                  <input
                    type="text"
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {language === 'hi' ? 'मोबाइल नंबर' : 'Mobile Phone'}
                  </label>
                  <input
                    type="text"
                    value={farmerPhone}
                    onChange={(e) => setFarmerPhone(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* REPORTING TIMELINE / 72-HOUR ALERT */}
            <div
              className={`p-5 rounded-2xl border transition-all ${
                timelineInfo.isExpired
                  ? 'bg-red-50 border-red-200 text-red-900'
                  : timelineInfo.isUrgent
                  ? 'bg-amber-50 border-amber-300 text-amber-950'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-950'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <Clock
                    size={20}
                    className={
                      timelineInfo.isExpired
                        ? 'text-red-600'
                        : timelineInfo.isUrgent
                        ? 'text-amber-600'
                        : 'text-emerald-700'
                    }
                  />
                  <div>
                    <h4 className="text-sm font-black">
                      {t('timelineAlertTitle', language)}
                    </h4>
                    <p className="text-[11px] opacity-80 mt-0.5">
                      {t('timelineGenericNotice', language)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-xs font-black">
                  <div>
                    <span className="opacity-70 uppercase text-[10px] block">
                      {t('timeSinceLoss', language)}
                    </span>
                    <span>{timelineInfo.hoursSince} {language === 'hi' ? 'घंटे बीत चुके' : 'Hours'}</span>
                  </div>

                  <div className="border-l border-current pl-4">
                    <span className="opacity-70 uppercase text-[10px] block">
                      {t('remainingTime', language)}
                    </span>
                    <span className="text-sm">
                      {timelineInfo.hoursRemaining > 0
                        ? language === 'hi'
                          ? `${timelineInfo.hoursRemaining} घंटे शेष`
                          : `${timelineInfo.hoursRemaining} Hours Left`
                        : language === 'hi'
                        ? 'समय-सीमा समाप्त'
                        : 'Window Passed'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EVIDENCE CHECKLIST */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h3 className="text-base font-black text-slate-800">
                {t('evidenceHeading', language)}
              </h3>
              <p className="text-xs text-slate-500">
                {t('evidenceSub', language)}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: t('itemCropPhoto', language), isPresent: !!leafImage },
                { label: t('itemDateTime', language), isPresent: !!lossDateTime },
                { label: t('itemLocation', language), isPresent: !!(stateName && districtName && villageName) },
                { label: t('itemCropName', language), isPresent: !!currentCrop },
                { label: t('itemAffectedArea', language), isPresent: !!fieldSize },
                { label: t('itemDateOfLoss', language), isPresent: !!lossDateTime },
                { label: t('itemDamageDesc', language), isPresent: !!likelyProblem },
                { label: t('itemPolicyNumber', language), isPresent: !!policyNumber },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border flex items-center justify-between text-xs font-semibold ${
                    item.isPresent
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}
                >
                  <span className="truncate pr-2">{item.label}</span>
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full shrink-0 ${
                      item.isPresent
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-200 text-amber-800'
                    }`}
                  >
                    {item.isPresent ? t('statusComplete', language) : t('statusMissing', language)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* PREPARE PMFBY LOSS REPORT (DRAFT VIEW) */}
          <div
            id="pmfby-report-draft-container"
            className="bg-white rounded-3xl p-6 lg:p-8 shadow-md border-2 border-emerald-200 space-y-6"
          >
            {/* Report Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-100 pb-5">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-700 text-white text-[11px] font-black uppercase tracking-wider">
                    {t('reportDraftBadge', language)}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    Ref: FR-SNP-{new Date().getFullYear()}-CLAIM
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-800 mt-2">
                  {t('reportHeading', language)}
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyReport}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3.5 py-2 rounded-xl text-xs transition-colors flex items-center cursor-pointer"
                >
                  <Copy size={14} className="mr-1.5" />
                  {copiedNotification ? t('copiedText', language) : t('copyReportBtn', language)}
                </button>
                <button
                  onClick={handleShareWhatsapp}
                  className="bg-green-600 hover:bg-green-500 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition-colors flex items-center cursor-pointer"
                >
                  <Share2 size={14} className="mr-1.5" />
                  {t('shareWhatsapp', language)}
                </button>
                <button
                  onClick={() => window.print()}
                  className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition-colors flex items-center cursor-pointer"
                >
                  <Printer size={14} className="mr-1.5" />
                  {t('printReportBtn', language)}
                </button>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 leading-relaxed">
              ⚠️ <strong>{language === 'hi' ? 'सूचना:' : 'Notice:'}</strong> {t('reportDisclaimer', language)}
            </div>

            {/* Structured Report Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
              {/* 1. FARMER DETAILS */}
              <div className="bg-[#F8FAF8] p-4 rounded-2xl border border-gray-100 space-y-2">
                <h4 className="font-black uppercase tracking-wider text-slate-800 pb-1 border-b border-gray-200">
                  {t('secFarmerDetails', language)}
                </h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-semibold">{language === 'hi' ? 'किसान का नाम:' : 'Farmer Name:'}</span>
                    <span className="font-bold">{farmerName || t('notProvided', language)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-semibold">{language === 'hi' ? 'मोबाइल:' : 'Mobile:'}</span>
                    <span className="font-bold">{farmerPhone || t('notProvided', language)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-semibold">{language === 'hi' ? 'किसान आईडी:' : 'Kisan ID:'}</span>
                    <span className="font-bold">{FARMER_PROFILE.kisanId}</span>
                  </div>
                </div>
              </div>

              {/* 2. FARM DETAILS */}
              <div className="bg-[#F8FAF8] p-4 rounded-2xl border border-gray-100 space-y-2">
                <h4 className="font-black uppercase tracking-wider text-slate-800 pb-1 border-b border-gray-200">
                  {t('secFarmDetails', language)}
                </h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-semibold">{language === 'hi' ? 'स्थान:' : 'Location:'}</span>
                    <span className="font-bold">
                      {villageName}, {districtName}, {stateName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-semibold">{language === 'hi' ? 'खसरा / सर्वे:' : 'Survey / Khasra:'}</span>
                    <span className="font-bold">{surveyNumber || t('notProvided', language)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-semibold">{language === 'hi' ? 'बीमित फसल:' : 'Insured Crop:'}</span>
                    <span className="font-bold">{currentCrop} ({fieldSize} {language === 'hi' ? 'एकड़' : 'Acres'})</span>
                  </div>
                </div>
              </div>

              {/* 3. LOSS DETAILS */}
              <div className="bg-[#F8FAF8] p-4 rounded-2xl border border-gray-100 space-y-2">
                <h4 className="font-black uppercase tracking-wider text-slate-800 pb-1 border-b border-gray-200">
                  {t('secLossDetails', language)}
                </h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-semibold">{language === 'hi' ? 'आपदा का प्रकार:' : 'Loss Event:'}</span>
                    <span className="font-bold text-red-600">{lossEvent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-semibold">{language === 'hi' ? 'नुकसान की तिथि व समय:' : 'Date & Time of Loss:'}</span>
                    <span className="font-bold">{new Date(lossDateTime).toLocaleString(language === 'hi' ? 'hi-IN' : undefined)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-semibold">{language === 'hi' ? 'प्रभावित पौधे:' : 'Reported Affected Plants:'}</span>
                    <span className="font-bold">{affectedPlantsPct}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-semibold">{language === 'hi' ? '72-घंटे की स्थिति:' : '72-Hour Window Status:'}</span>
                    <span className="font-bold text-emerald-700">
                      {timelineInfo.hoursRemaining > 0
                        ? language === 'hi'
                          ? `${timelineInfo.hoursRemaining} घंटे शेष`
                          : `${timelineInfo.hoursRemaining} Hours Remaining`
                        : language === 'hi'
                        ? 'समय सीमा समाप्त'
                        : 'Exceeded'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 4. AI ASSESSMENT RECORD */}
              <div className="bg-[#F8FAF8] p-4 rounded-2xl border border-gray-100 space-y-2">
                <h4 className="font-black uppercase tracking-wider text-slate-800 pb-1 border-b border-gray-200">
                  {t('secAiAssessment', language)}
                </h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-semibold">{language === 'hi' ? 'पत्ती पर दृश्य क्षति:' : 'Visible Leaf Damage:'}</span>
                    <span className="font-bold">{likelyProblem}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-semibold">{language === 'hi' ? 'AI विश्वास स्कोर:' : 'AI Confidence:'}</span>
                    <span className="font-bold">{aiConfidence}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-semibold">{language === 'hi' ? 'पत्ती क्षति गंभीरता:' : 'Visible Leaf Severity:'}</span>
                    <span className="font-bold">
                      {visibleLeafSeverity === 'Severe'
                        ? language === 'hi'
                          ? 'गंभीर'
                          : 'Severe'
                        : visibleLeafSeverity === 'Moderate'
                        ? language === 'hi'
                          ? 'मध्यम'
                          : 'Moderate'
                        : language === 'hi'
                        ? 'हल्का'
                        : 'Mild'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-semibold">{language === 'hi' ? 'खेत जोखिम अनुमान:' : 'Field Risk Estimate:'}</span>
                    <span className="font-bold text-red-600">
                      {currentFieldRisk.level === 'High' || currentFieldRisk.level === 'Very High'
                        ? language === 'hi'
                          ? 'उच्च जोखिम'
                          : `${currentFieldRisk.level} Risk`
                        : currentFieldRisk.level === 'Moderate'
                        ? language === 'hi'
                          ? 'मध्यम जोखिम'
                          : `${currentFieldRisk.level} Risk`
                        : language === 'hi'
                        ? 'कम जोखिम'
                        : `${currentFieldRisk.level} Risk`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Photographic Evidence Attachment */}
            <div className="pt-4 border-t border-gray-100 flex items-center space-x-4">
              <img
                src={leafImage}
                alt="Evidence Photograph"
                className="w-20 h-20 rounded-2xl object-cover border border-gray-200 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="text-xs text-slate-600">
                <span className="font-bold text-slate-800 block">
                  {language === 'hi' ? 'संलग्न फसल पत्ती साक्ष्य' : 'Attached Crop Leaf Evidence'}
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {language === 'hi'
                    ? `तस्वीर ली गई: ${new Date().toLocaleString('hi-IN')} • माइक्रो-स्टेशन: सोनीपत उत्तर`
                    : `Captured at: ${new Date().toLocaleString()} • Micro-Station: Sonipat North`}
                </p>
                <p className="text-[11px] text-slate-400">
                  {language === 'hi'
                    ? 'स्थिति: PMFBY पोर्टल / बीमा सूचना हेतु तैयार'
                    : 'File Status: Ready for PMFBY Portal / Insurance Intimation'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-4">
            <button
              onClick={() => setActiveStep(4)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors flex items-center cursor-pointer"
            >
              <ChevronLeft size={16} className="mr-1" />
              {t('backBtn', language)}
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3 rounded-2xl text-sm transition-all shadow-md flex items-center cursor-pointer"
            >
              <span>{t('navDashboard', language)}</span>
              <ChevronRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
