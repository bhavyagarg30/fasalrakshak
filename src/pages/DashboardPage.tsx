import React from 'react';
import {
  Sprout,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  TrendingUp,
  Droplets,
  Wind,
  Layers,
  Sparkles,
  Compass,
  FileText,
  Activity,
  Calendar,
  CheckCircle2,
  FileCheck,
  BookOpen,
  ShieldCheck,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { RiskGauge } from '../components/RiskGauge';
import { SpreadMap } from '../components/SpreadMap';
import { CropInfo, OutbreakCluster, PageId, Language } from '../types';
import { t } from '../i18n';

interface DashboardPageProps {
  crops: CropInfo[];
  language: Language;
  onNavigate: (page: PageId) => void;
  onSelectCrop: (crop: CropInfo) => void;
  onSelectCluster: (cluster: OutbreakCluster) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  crops,
  language,
  onNavigate,
  onSelectCrop,
  onSelectCluster,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome Banner & Tagline */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gradient-to-r from-emerald-800 to-green-950 rounded-3xl p-6 lg:p-8 text-white shadow-lg relative overflow-hidden">
        {/* Subtle decorative background lines */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#DCFCE7 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/40 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={13} className="text-emerald-300" />
            <span>{t('uspTagline', language)}</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black tracking-tight leading-snug">
            {t('uspDetect', language)}
          </h2>
          <p className="text-emerald-100/90 text-sm mt-2 leading-relaxed font-normal">
            {language === 'hi'
              ? 'फसलरक्षक उपग्रह इमेजरी, मौसम पूर्वानुमान और सामुदायिक प्रकोप निगरानी को जोड़कर आपके सोनीपत स्थित 5.0 एकड़ खेत को रोग आने से पहले सुरक्षित करता है।'
              : 'FasalRakshak correlates micro-satellite imagery, weather forecasts, and community outbreak telemetry to safeguard your 5.0-acre farm in Sonipat before pathogen arrival.'}
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap lg:flex-col items-start lg:items-end gap-3">
          <button
            onClick={() => onNavigate('damage-assessment')}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-6 py-3 rounded-2xl text-sm transition-all shadow-md active:scale-95 flex items-center cursor-pointer border-2 border-amber-300"
            id="dash-damage-action"
          >
            <FileCheck size={18} className="mr-2 text-slate-950" />
            {t('navDamageAssessment', language)} <ArrowRight size={16} className="ml-2" />
          </button>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onNavigate('scan')}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2.5 rounded-2xl text-xs transition-all shadow-md active:scale-95 flex items-center cursor-pointer"
              id="dash-scan-action"
            >
              {t('navScanCrop', language)} <ChevronRight size={14} className="ml-1" />
            </button>
            <button
              onClick={() => onNavigate('knowledge-hub')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2.5 rounded-2xl text-xs transition-colors border border-white/20 flex items-center cursor-pointer"
            >
              <BookOpen size={14} className="mr-1 text-emerald-300" />
              {t('navKnowledgeHub', language)}
            </button>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------
          NEW PROMINENT CORE WORKFLOW: ANALYZE CROP DAMAGE
          "FROM DAMAGED LEAF TO CLAIM-READY EVIDENCE"
          -------------------------------------------------- */}
      <div className="bg-gradient-to-br from-white via-emerald-50/40 to-green-50/70 rounded-3xl p-6 lg:p-8 border-2 border-emerald-300/70 shadow-sm relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-black uppercase tracking-wider">
              <ShieldCheck size={14} className="text-emerald-700" />
              <span>{t('uspClaim', language)}</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              {t('damageTitle', language)}
            </h3>
            <p className="text-xs lg:text-sm text-slate-600 leading-relaxed font-medium max-w-2xl">
              {t('damageSubtitle', language)}{' '}
              {language === 'hi'
                ? 'इसमें 72-घंटे की PMFBY रिपोर्टिंग समय-सीमा, साक्ष्य चेकलिस्ट, क्षति कारण विश्लेषण और क्लेम-तैयार नुकसान रिपोर्ट ड्राफ्ट शामिल है।'
                : 'Includes 72-hour PMFBY reporting timeline countdown, evidence checklist, cause differential analysis, and claim-ready loss report draft.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('damage-assessment')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3 rounded-2xl text-sm transition-all shadow-md flex items-center cursor-pointer"
                id="btn-hero-start-damage"
              >
                <span>{t('startDamageAssessmentBtn', language)}</span>
                <ArrowRight size={16} className="ml-2" />
              </button>

              <button
                onClick={() => onNavigate('knowledge-hub')}
                className="bg-white hover:bg-slate-50 text-slate-700 font-bold px-4 py-3 rounded-2xl text-xs transition-colors border border-gray-200 flex items-center cursor-pointer shadow-xs"
              >
                <BookOpen size={15} className="mr-1.5 text-emerald-600" />
                <span>{t('viewPmfbyGuide', language)}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white/90 backdrop-blur-xs p-5 rounded-2xl border border-emerald-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 pb-2 border-b border-gray-100">
              <span className="flex items-center text-emerald-800">
                <Clock size={14} className="mr-1.5 text-emerald-600" />
                {language === 'hi' ? '72-घंटे की रिपोर्टिंग समय-सीमा' : '72-Hour Loss Timeline'}
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-black">
                {language === 'hi' ? 'सक्रिय सहायता' : 'ACTIVE ASSIST'}
              </span>
            </div>

            <div className="text-xs text-slate-600 space-y-1.5">
              <p className="flex items-center">
                <span className="text-emerald-600 font-bold mr-1.5">✓</span>
                {language === 'hi' ? 'पत्ती धब्बे की गंभीरता का AI विश्लेषण' : 'Single-leaf lesion severity analysis'}
              </p>
              <p className="flex items-center">
                <span className="text-emerald-600 font-bold mr-1.5">✓</span>
                {language === 'hi' ? 'दवा का दुष्प्रभाव व खरपतवारनाशक बहाव जांच' : 'Chemical burn & herbicide drift check'}
              </p>
              <p className="flex items-center">
                <span className="text-emerald-600 font-bold mr-1.5">✓</span>
                {language === 'hi' ? 'खेत स्तर पर AI जोखिम मूल्यांकन' : 'AI-assisted field risk calculation'}
              </p>
              <p className="flex items-center">
                <span className="text-emerald-600 font-bold mr-1.5">✓</span>
                {language === 'hi' ? 'एक क्लिक में व्हाट्सएप और प्रिंट योग्य रिपोर्ट ड्राफ्ट' : 'One-click WhatsApp & Print Evidence Draft'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Farm Risk + What Could Happen Next */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* --------------------------------------------------
            FARM RISK CARD (4 Cols)
            -------------------------------------------------- */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-7 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <ShieldAlert size={20} className="text-red-600" />
                <h3 className="font-black text-slate-800 text-base tracking-tight">
                  {language === 'hi' ? 'आपके खेत का कुल जोखिम' : 'YOUR FARM RISK'}
                </h3>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
                {language === 'hi' ? 'स्कोर: 72 / 100' : 'Score: 72 / 100'}
              </span>
            </div>

            {/* Circular Gauge */}
            <div className="py-6 flex justify-center">
              <RiskGauge
                score={72}
                label={language === 'hi' ? 'उच्च जोखिम' : 'HIGH RISK'}
                sublabel={language === 'hi' ? 'समग्र खतरा' : 'COMPOSITE THREAT'}
                confidence={91}
                size="lg"
              />
            </div>

            {/* WHY IS THE RISK HIGH? */}
            <div className="bg-[#F7FAF7] rounded-2xl p-4 border border-emerald-100/80 mt-2">
              <p className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2.5 flex items-center">
                <AlertTriangle size={14} className="text-amber-600 mr-1.5" />
                {language === 'hi' ? 'जोखिम उच्च क्यों है?' : 'WHY IS THE RISK HIGH?'}
              </p>
              <ul className="space-y-2 text-xs text-slate-600 font-medium">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 mr-2 mt-1.5 shrink-0" />
                  <span>
                    {language === 'hi' ? (
                      <><strong>7 नजदीकी रोग प्रकोप</strong> 3.2 किमी के दायरे में पाए गए (सोनीपत उत्तर)।</>
                    ) : (
                      <><strong>7 nearby disease reports</strong> clustered within 3.2 km (Sonipat North).</>
                    )}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 mr-2 mt-1.5 shrink-0" />
                  <span>
                    {language === 'hi' ? (
                      <><strong>अधिक नमी (76%)</strong> बीजाणुओं के अंकुरण और फैलाव को बढ़ावा दे रही है।</>
                    ) : (
                      <><strong>High humidity (76%)</strong> sustains spore germination incubation window.</>
                    )}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2 mt-1.5 shrink-0" />
                  <span>
                    {language === 'hi' ? (
                      <><strong>अनुकूल तापमान (29°C)</strong> कवक और फंगस की वृद्धि के लिए आदर्श है।</>
                    ) : (
                      <><strong>Suitable temperature (29°C)</strong> ideal for fungal mycelium proliferation.</>
                    )}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2 mt-1.5 shrink-0" />
                  <span>
                    {language === 'hi' ? (
                      <><strong>फसल की संवेदनशील अवस्था:</strong> कल्ले फूटने (टिलरिंग) की अवस्था में गेहूं की पत्तियां अधिक कोमल व संवेदनशील होती हैं।</>
                    ) : (
                      <><strong>Susceptible crop growth stage:</strong> Wheat at Tillering stage has tender foliar tissue.</>
                    )}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-2 mt-1.5 shrink-0" />
                  <span>
                    {language === 'hi' ? (
                      <><strong>अनुकूल हवा की दिशा (14 किमी/घंटा पूर्व-उत्तर-पूर्व):</strong> हवा बीजाणुओं को सीधे आपके खेतों की ओर ला रही है।</>
                    ) : (
                      <><strong>Favourable wind conditions (14 km/h ENE):</strong> Wind vectors carrying spores toward your plots.</>
                    )}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => onNavigate('risk')}
              className="text-emerald-700 hover:text-emerald-800 text-xs font-bold flex items-center cursor-pointer"
            >
              {language === 'hi' ? 'संपूर्ण जोखिम विश्लेषण देखें' : 'Explore Full Risk Intelligence'} <ChevronRight size={14} className="ml-1" />
            </button>
          </div>
        </div>

        {/* --------------------------------------------------
            MOST IMPORTANT USP: WHAT COULD HAPPEN NEXT? (8 Cols)
            -------------------------------------------------- */}
        <div className="lg:col-span-8 bg-slate-950 text-white rounded-3xl p-7 shadow-xl border border-slate-800 flex flex-col justify-between relative overflow-hidden">
          {/* Ambient background glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                    {language === 'hi' ? 'मुख्य पूर्वानुमानात्मक क्षमता' : 'MAIN PREDICTIVE USP'}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    {language === 'hi' ? 'स्थानिक व कालिक प्रकोप पूर्वानुमान' : 'Spatial-Temporal Epidemic Forecasting'}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white mt-1">
                  {language === 'hi' ? 'आगे क्या हो सकता है?' : 'WHAT COULD HAPPEN NEXT?'}
                </h2>
                <p className="text-xs text-slate-300">
                  {language === 'hi'
                    ? '“रोगजनकों के आपके खेत में प्रवेश करने से पहले AI द्वारा प्रकोप की पूर्व चेतावनी।”'
                    : '“AI-powered outbreak prediction before pathogens enter your perimeter.”'}
                </p>
              </div>

              <div className="text-right">
                <span className="inline-block text-[10px] font-bold text-amber-400 bg-amber-950/60 border border-amber-800/80 px-2.5 py-1 rounded-lg">
                  {language === 'hi' ? 'सजीव पूर्वानुमान मॉडल' : 'ILLUSTRATIVE DEMO PREDICTION'}
                </span>
              </div>
            </div>

            {/* Timeline: TODAY -> 48 HOURS -> 7 DAYS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              {/* Today */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4.5 relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black tracking-widest text-emerald-400 uppercase bg-emerald-950/80 px-2 py-0.5 rounded">
                    {language === 'hi' ? 'आज' : 'TODAY'}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <h4 className="text-sm font-black text-white">
                  {language === 'hi' ? 'आसपास 3 संदिग्ध मामले दर्ज' : '3 Suspected Cases Detected Nearby'}
                </h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {language === 'hi'
                    ? 'गनौर व मुरथल उत्तर के खेतों (3.2 किमी दूर) में रतुआ बीजाणुओं की पुष्टि।'
                    : 'Early orange urediniospore sightings confirmed in Ganaur & Murthal North border plots (3.2 km upwind).'}
                </p>
                <div className="mt-3 pt-2.5 border-t border-slate-800 text-[11px] text-emerald-400 font-bold flex items-center">
                  <CheckCircle2 size={12} className="mr-1" /> {language === 'hi' ? 'प्रारंभिक आधार रेखा स्थापित' : 'Initial Baseline Established'}
                </div>
              </div>

              {/* 48 Hours */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4.5 relative overflow-hidden group hover:border-orange-500/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black tracking-widest text-orange-400 uppercase bg-orange-950/80 px-2 py-0.5 rounded">
                    {language === 'hi' ? '48 घंटे में' : '48 HOURS'}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                </div>
                <h4 className="text-sm font-black text-white">
                  {language === 'hi' ? 'प्रकोप क्षेत्र में विस्तार की संभावना' : 'Predicted Spread Zone Expanding'}
                </h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {language === 'hi'
                    ? '14 किमी/घंटा की पूर्वा हवा बीजाणुओं के फैलाव को तेज करेगी। उच्च नमी से प्रभाव क्षेत्र +2.1 किमी बढ़ेगा।'
                    : 'Incoming 14 km/h ENE breeze accelerates spore dispersal corridor. High humidity will expand plume radius by +2.1 km.'}
                </p>
                <div className="mt-3 pt-2.5 border-t border-slate-800 text-[11px] text-orange-400 font-bold flex items-center">
                  <Activity size={12} className="mr-1" /> {language === 'hi' ? 'बफर क्षेत्र में खतरे की वृद्धि' : 'Buffer Threat Escalation'}
                </div>
              </div>

              {/* 7 Days */}
              <div className="bg-slate-900/90 border border-red-900/80 rounded-2xl p-4.5 relative overflow-hidden ring-1 ring-red-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black tracking-widest text-red-400 uppercase bg-red-950/80 px-2 py-0.5 rounded">
                    {language === 'hi' ? '7 दिनों में' : '7 DAYS'}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                </div>
                <h4 className="text-sm font-black text-white">
                  {language === 'hi' ? 'गंभीर प्रकोप की उच्च आशंका' : 'Potential High-Risk Outbreak'}
                </h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {language === 'hi'
                    ? 'निवारक सुरक्षा के बिना, 78% संभावना है कि द्वितीयक चक्र आपके 2.5 एकड़ गेहूं की फसल को प्रभावित कर देगा।'
                    : 'Without preventive bio-shielding, secondary spore cycles will penetrate your 2.5-acre Wheat canopy with 78% certainty.'}
                </p>
                <div className="mt-3 pt-2.5 border-t border-slate-800 text-[11px] text-red-400 font-bold flex items-center">
                  <AlertTriangle size={12} className="mr-1" /> {language === 'hi' ? 'महत्वपूर्ण निवारक अवधि' : 'Critical Preventive Window'}
                </div>
              </div>
            </div>

            {/* Small GIS Map Visualization for the USP */}
            <div className="mt-4">
              <SpreadMap isCompact={true} onSelectCluster={onSelectCluster} />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>
                {language === 'hi'
                  ? 'सोनीपत क्षेत्र में 124 किसान पहले ही सतर्क किए जा चुके हैं'
                  : '124 local farmers already warned in Sonipat corridor'}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onNavigate('action')}
                className="bg-white text-slate-950 hover:bg-slate-100 font-black px-4 py-2 rounded-xl transition-colors text-xs cursor-pointer"
              >
                {language === 'hi' ? '3-चरणीय कार्ययोजना देखें' : 'View 3-Step Action Plan'}
              </button>
              <button
                onClick={() => onNavigate('map')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-4 py-2 rounded-xl transition-colors text-xs flex items-center cursor-pointer"
              >
                {language === 'hi' ? 'पूरा जीआईएस नक्शा खोलें' : 'Open Full GIS Map'} <ChevronRight size={14} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------
          CROP HEALTH SECTION
          -------------------------------------------------- */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-black text-slate-800 flex items-center">
              <Sprout className="mr-2 text-emerald-600" /> {t('cropHealthHeading', language)}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'hi'
                ? 'खेत निगरानी, स्वास्थ्य चार्ट और अनुकूलित कार्ययोजना देखने के लिए किसी भी फसल पर क्लिक करें।'
                : 'Click any registered crop to open dedicated field telemetry, health charts & custom action plans.'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('crops')}
            className="text-emerald-700 hover:text-emerald-800 text-xs font-bold flex items-center cursor-pointer"
          >
            {t('manageCropsBtn', language)} <ChevronRight size={14} className="ml-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {crops.map((crop) => {
            const isWheat = crop.name.toLowerCase().includes('wheat');
            const isMaize = crop.name.toLowerCase().includes('maize');

            return (
              <div
                key={crop.id}
                onClick={() => onSelectCrop(crop)}
                id={`crop-card-${crop.id}`}
                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-lg font-black text-slate-800 group-hover:text-emerald-700 transition-colors">
                          {language === 'hi' ? (crop.localName || crop.name) : crop.name}
                        </h4>
                        <span className="text-[11px] text-slate-400 font-medium">
                          ({crop.localName.split(' ')[0]})
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {crop.area} • {crop.growthStage.split('(')[0]}
                      </p>
                    </div>

                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${
                        crop.diseaseRisk === 'High'
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : crop.diseaseRisk === 'Medium'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {crop.diseaseRisk === 'High'
                        ? (language === 'hi' ? 'उच्च जोखिम' : 'High Risk')
                        : crop.diseaseRisk === 'Medium'
                        ? (language === 'hi' ? 'मध्यम जोखिम' : 'Medium Risk')
                        : (language === 'hi' ? 'कम जोखिम' : 'Low Risk')}
                    </span>
                  </div>

                  {/* Health Bar */}
                  <div className="space-y-1.5 my-4">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-500">{language === 'hi' ? 'फसल स्वास्थ्य सूचकांक' : 'Crop Health Index'}</span>
                      <span className="text-slate-800 font-black">{crop.healthScore} / 100</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          crop.healthScore > 80
                            ? 'bg-emerald-600'
                            : crop.healthScore > 70
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${crop.healthScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Risk Breakdown grid */}
                  <div className="grid grid-cols-2 gap-2 bg-[#F7FAF7] p-3 rounded-2xl text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">
                        {language === 'hi' ? 'रोग जोखिम' : 'Disease Risk'}
                      </span>
                      <span
                        className={`font-black ${
                          crop.diseaseRisk === 'High'
                            ? 'text-red-600'
                            : crop.diseaseRisk === 'Medium'
                            ? 'text-amber-600'
                            : 'text-emerald-600'
                        }`}
                      >
                        {crop.diseaseRisk === 'High'
                          ? (language === 'hi' ? 'उच्च' : 'High')
                          : crop.diseaseRisk === 'Medium'
                          ? (language === 'hi' ? 'मध्यम' : 'Medium')
                          : (language === 'hi' ? 'कम' : 'Low')}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">
                        {language === 'hi' ? 'कीट जोखिम' : 'Pest Risk'}
                      </span>
                      <span
                        className={`font-black ${
                          crop.pestRisk === 'High'
                            ? 'text-red-600'
                            : crop.pestRisk === 'Medium'
                            ? 'text-amber-600'
                            : 'text-emerald-600'
                        }`}
                      >
                        {crop.pestRisk === 'High'
                          ? (language === 'hi' ? 'उच्च' : 'High')
                          : crop.pestRisk === 'Medium'
                          ? (language === 'hi' ? 'मध्यम' : 'Medium')
                          : (language === 'hi' ? 'कम' : 'Low')}
                      </span>
                    </div>
                  </div>

                  {isWheat && (
                    <p className="text-[11px] text-red-600 font-semibold mt-2.5 flex items-center">
                      <AlertTriangle size={12} className="mr-1 shrink-0" />
                      {language === 'hi'
                        ? 'आसपास भूरा रतुआ का सक्रिय खतरा। पत्तियों की जांच करें।'
                        : 'Active Brown Rust threat nearby. Inspect leaves.'}
                    </p>
                  )}

                  {isMaize && (
                    <p className="text-[11px] text-amber-700 font-semibold mt-2.5 flex items-center">
                      <AlertTriangle size={12} className="mr-1 shrink-0" />
                      {language === 'hi'
                        ? 'पड़ोसी मेरठ क्षेत्र में फॉल आर्मीवर्म की सूचना।'
                        : 'Fall Armyworm reported in neighboring Meerut belt.'}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-slate-400">
                  <span>{language === 'hi' ? `अंतिम जांच: ${crop.lastScan}` : `Last Scan: ${crop.lastScan}`}</span>
                  <span className="text-emerald-700 font-bold group-hover:translate-x-1 transition-transform flex items-center">
                    {language === 'hi' ? 'विवरण देखें' : 'Open Details'} <ChevronRight size={14} className="ml-0.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

