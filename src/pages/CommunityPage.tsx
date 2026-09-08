import React, { useState } from 'react';
import {
  Users,
  MapPin,
  ShieldCheck,
  AlertTriangle,
  Plus,
  Send,
  X,
  CheckCircle2,
  Clock,
  Filter,
} from 'lucide-react';
import { PageId, Language } from '../types';
import { getSavedLanguage } from '../i18n';

interface CommunityReport {
  id: string;
  crop: string;
  cropHi?: string;
  threat: string;
  threatHi?: string;
  location: string;
  locationHi?: string;
  distanceKm: number;
  timeAgo: string;
  timeAgoHi?: string;
  status: 'Verified' | 'Under Review' | 'Unverified';
  severity: 'High' | 'Medium' | 'Low';
  description: string;
  descriptionHi?: string;
  farmerName: string;
  farmerNameHi?: string;
}

const INITIAL_REPORTS: CommunityReport[] = [
  {
    id: 'rep-1',
    crop: 'Wheat (गेहूं)',
    cropHi: 'गेहूं',
    threat: 'Brown Rust (Puccinia triticina)',
    threatHi: 'भूरा रतुआ (पक्सीनिया ट्रिटिसिना)',
    location: 'Murthal North, Sonipat',
    locationHi: 'मुरथल उत्तर, सोनीपत',
    distanceKm: 2.1,
    timeAgo: '2 hours ago',
    timeAgoHi: '2 घंटे पहले',
    status: 'Verified',
    severity: 'High',
    description: 'Noticed bright orange powder on lower flag leaves in a 2-acre plot. Verified by KVK staff.',
    descriptionHi: '2 एकड़ के खेत में निचली ध्वज पत्तियों पर चमकीला नारंगी पाउडर देखा गया। KVK कर्मचारियों द्वारा सत्यापित।',
    farmerName: 'Kisan R.S. (Anonymous)',
    farmerNameHi: 'किसान आर.एस. (गुमनाम)',
  },
  {
    id: 'rep-2',
    crop: 'Wheat (गेहूं)',
    cropHi: 'गेहूं',
    threat: 'Yellow Rust suspect',
    threatHi: 'पीला रतुआ (संदिग्ध)',
    location: 'Ganaur, Sonipat',
    locationHi: 'गनौर, सोनीपत',
    distanceKm: 4.8,
    timeAgo: '5 hours ago',
    timeAgoHi: '5 घंटे पहले',
    status: 'Under Review',
    severity: 'Medium',
    description: 'Stripe-like yellow streaks seen on leaves. Sample submitted for lab microscopic test.',
    descriptionHi: 'पत्तियों पर धारीदार पीली धारियां देखी गईं। प्रयोगशाला सूक्ष्मदर्शी परीक्षण के लिए नमूना भेजा गया।',
    farmerName: 'Kisan V.P. (Anonymous)',
    farmerNameHi: 'किसान वी.पी. (गुमनाम)',
  },
  {
    id: 'rep-3',
    crop: 'Maize (मक्का)',
    cropHi: 'मक्का',
    threat: 'Fall Armyworm (Spodoptera frugiperda)',
    threatHi: 'फॉल आर्मीवर्म (सैनिक कीट)',
    location: 'Rai Industrial Belt, Sonipat',
    locationHi: 'राई औद्योगिक क्षेत्र, सोनीपत',
    distanceKm: 7.2,
    timeAgo: '1 day ago',
    timeAgoHi: '1 दिन पहले',
    status: 'Verified',
    severity: 'High',
    description: 'Pin-hole shot holes in whorls of young vegetative corn plants.',
    descriptionHi: 'मक्के के युवा पौधों की पत्तियों के बीच बारीक छेद और लार्वा के नुकसान के निशान मिले।',
    farmerName: 'Kisan S.K. (Anonymous)',
    farmerNameHi: 'किसान एस.के. (गुमनाम)',
  },
  {
    id: 'rep-4',
    crop: 'Mustard (सरसों)',
    cropHi: 'सरसों',
    threat: 'White Rust (Albugo candida)',
    threatHi: 'सफेद रतुआ (एल्बुगो कैंडिडा)',
    location: 'Kundli, Haryana Border',
    locationHi: 'कुंडली, हरियाणा सीमा',
    distanceKm: 9.5,
    timeAgo: '2 days ago',
    timeAgoHi: '2 दिन पहले',
    status: 'Verified',
    severity: 'Low',
    description: 'White creamy pustules on the lower leaf surface, minor isolated spot.',
    descriptionHi: 'निचली पत्ती की सतह पर सफेद मलाईदार उभार, छोटा अलग-थलग धब्बा।',
    farmerName: 'Kisan H.C. (Anonymous)',
    farmerNameHi: 'किसान एच.सी. (गुमनाम)',
  },
];

interface CommunityPageProps {
  language?: Language;
  onNavigate: (page: PageId) => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({
  language = getSavedLanguage(),
  onNavigate,
}) => {
  const [reports, setReports] = useState<CommunityReport[]>(INITIAL_REPORTS);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [filter, setFilter] = useState<'All' | 'Verified' | 'Under Review'>('All');

  // Form states
  const [crop, setCrop] = useState('Wheat');
  const [threat, setThreat] = useState('');
  const [location, setLocation] = useState('');
  const [severity, setSeverity] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [description, setDescription] = useState('');

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReport: CommunityReport = {
      id: `rep-${Date.now()}`,
      crop: crop === 'Wheat' ? 'Wheat (गेहूं)' : crop === 'Rice' ? 'Rice (धान)' : crop === 'Maize' ? 'Maize (मक्का)' : crop === 'Mustard' ? 'Mustard (सरसों)' : 'Sugarcane (गन्ना)',
      cropHi: crop === 'Wheat' ? 'गेहूं' : crop === 'Rice' ? 'धान' : crop === 'Maize' ? 'मक्का' : crop === 'Mustard' ? 'सरसों' : 'गन्ना',
      threat: threat || 'Wheat Rust suspect',
      threatHi: threat || 'गेहूं रतुआ संदिग्ध',
      location: location || 'Sonipat Field',
      locationHi: location || 'सोनीपत क्षेत्र',
      distanceKm: 1.8,
      timeAgo: 'Just now',
      timeAgoHi: 'अभी-अभी',
      status: 'Under Review',
      severity,
      description: description || (language === 'hi' ? 'सुबह के निरीक्षण के दौरान पत्तियों पर असामान्यता देखी गई।' : 'Visual foliar discoloration noticed during morning inspection.'),
      descriptionHi: description || 'सुबह के निरीक्षण के दौरान पत्तियों पर असामान्यता देखी गई।',
      farmerName: 'You (Anonymous Kisan)',
      farmerNameHi: 'आप (गुमनाम किसान)',
    };
    setReports([newReport, ...reports]);
    setShowReportModal(false);
    setDescription('');
    setThreat('');
    setLocation('');
  };

  const filteredReports = reports.filter((r) => {
    if (filter === 'All') return true;
    return r.status === filter;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            {language === 'hi' ? 'किसान-से-किसान सुरक्षा संजाल' : 'Farmer-to-Farmer Sentinel Mesh'}
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-2">
            {language === 'hi' ? 'सामुदायिक खुफिया जानकारी' : 'COMMUNITY INTELLIGENCE'}
          </h2>
          <p className="text-slate-500 text-xs font-medium mt-1">
            {language === 'hi'
              ? 'हरियाणा और पश्चिमी उत्तर प्रदेश के 2,400+ स्थानीय किसानों की अज्ञात, जियोटैग्ड प्रकोप रिपोर्ट।'
              : 'Anonymous, geotagged outbreak reports from 2,400+ local farmers across Haryana & Western UP.'}
          </p>
        </div>

        <button
          onClick={() => setShowReportModal(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-2xl text-xs flex items-center space-x-2 shadow-md shadow-emerald-200 transition-all cursor-pointer"
          id="report-case-btn"
        >
          <Plus size={16} />
          <span>{language === 'hi' ? 'नया मामला दर्ज करें' : 'REPORT A NEW CASE'}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 bg-white p-1 rounded-2xl border border-gray-200 w-fit">
        {(['All', 'Verified', 'Under Review'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              filter === tab
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab === 'All'
              ? language === 'hi' ? 'सभी रिपोर्ट' : 'All Reports'
              : tab === 'Verified'
              ? language === 'hi' ? 'सत्यापित (KVK द्वारा जांचा)' : 'Verified (KVK Checked)'
              : language === 'hi' ? 'समीक्षाधीन' : 'Under Review'}
          </button>
        ))}
      </div>

      {/* Reports Feed */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col md:flex-row items-start justify-between gap-4"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-lg">
                  {language === 'hi' ? report.cropHi || report.crop : report.crop}
                </span>

                <span
                  className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center space-x-1 ${
                    report.status === 'Verified'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}
                >
                  {report.status === 'Verified' ? (
                    <>
                      <ShieldCheck size={12} className="mr-1 text-emerald-600" />
                      <span>{language === 'hi' ? 'KVK द्वारा सत्यापित' : 'KVK Verified'}</span>
                    </>
                  ) : (
                    <>
                      <Clock size={12} className="mr-1 text-amber-600" />
                      <span>{language === 'hi' ? 'समीक्षाधीन' : 'Under Review'}</span>
                    </>
                  )}
                </span>

                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                    report.severity === 'High'
                      ? 'bg-red-100 text-red-700'
                      : report.severity === 'Medium'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {language === 'hi'
                    ? report.severity === 'High'
                      ? 'गंभीर स्तर'
                      : report.severity === 'Medium'
                      ? 'मध्यम स्तर'
                      : 'कम स्तर'
                    : `${report.severity} Severity`}
                </span>
              </div>

              <h3 className="text-base font-black text-slate-900">
                {language === 'hi' ? report.threatHi || report.threat : report.threat}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                "{language === 'hi' ? report.descriptionHi || report.description : report.description}"
              </p>

              <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 font-medium pt-1">
                <span className="flex items-center text-slate-600">
                  <MapPin size={12} className="text-emerald-600 mr-1" />
                  {language === 'hi' ? report.locationHi || report.location : report.location} ({report.distanceKm} {language === 'hi' ? 'किमी दूर' : 'km from you'})
                </span>
                <span>•</span>
                <span>{language === 'hi' ? report.timeAgoHi || report.timeAgo : report.timeAgo}</span>
                <span>•</span>
                <span>
                  {language === 'hi'
                    ? `रिपोर्ट कर्ता: ${report.farmerNameHi || report.farmerName}`
                    : `Reported by ${report.farmerName}`}
                </span>
              </div>
            </div>

            <div className="shrink-0 self-end md:self-center">
              <button
                onClick={() => onNavigate('map')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              >
                {language === 'hi' ? 'GIS मानचित्र पर देखें →' : 'Locate on GIS Map →'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 lg:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  {language === 'hi' ? 'जियोटैग्ड फील्ड रिपोर्ट सबमिट करें' : 'Submit Geotagged Field Report'}
                </h3>
                <p className="text-xs text-slate-400">
                  {language === 'hi'
                    ? 'आपकी पहचान पूरी तरह गोपनीय और सुरक्षित रखी जाती है।'
                    : 'Your identity is kept completely private and anonymous.'}
                </p>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">
                    {language === 'hi' ? 'फसल' : 'Crop'}
                  </label>
                  <select
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-emerald-500 font-medium bg-white"
                  >
                    <option value="Wheat">{language === 'hi' ? 'गेहूं' : 'Wheat (गेहूं)'}</option>
                    <option value="Rice">{language === 'hi' ? 'धान' : 'Rice (धान)'}</option>
                    <option value="Maize">{language === 'hi' ? 'मक्का' : 'Maize (मक्का)'}</option>
                    <option value="Mustard">{language === 'hi' ? 'सरसों' : 'Mustard (सरसों)'}</option>
                    <option value="Sugarcane">{language === 'hi' ? 'गन्ना' : 'Sugarcane (गन्ना)'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">
                    {language === 'hi' ? 'संभावित रोग / कीट' : 'Suspected Threat'}
                  </label>
                  <input
                    type="text"
                    value={threat}
                    onChange={(e) => setThreat(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-emerald-500 font-medium"
                    placeholder={language === 'hi' ? 'उदा. पीला रतुआ / सैनिक कीट' : 'e.g. Yellow Rust / Armyworm'}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">
                    {language === 'hi' ? 'गांव / तहसील' : 'Village / Tehsil'}
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-emerald-500 font-medium"
                    placeholder={language === 'hi' ? 'उदा. मुरथल, सोनीपत' : 'e.g. Murthal, Sonipat'}
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">
                    {language === 'hi' ? 'गंभीरता' : 'Severity'}
                  </label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-emerald-500 font-medium bg-white"
                  >
                    <option value="Low">
                      {language === 'hi' ? 'कम (शुरुआती लक्षण)' : 'Low (Initial spots)'}
                    </option>
                    <option value="Medium">
                      {language === 'hi' ? 'मध्यम (फैले हुए धब्बे)' : 'Medium (Scattered patches)'}
                    </option>
                    <option value="High">
                      {language === 'hi' ? 'गंभीर (तेजी से प्रसार)' : 'High (Rapidly spreading)'}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">
                  {language === 'hi' ? 'लक्षणों का विवरण' : 'Symptoms Description'}
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-emerald-500 font-medium"
                  placeholder={
                    language === 'hi'
                      ? 'पत्तियों के रंग, पाउडर की बनावट या नुकसान का विवरण दें...'
                      : 'Describe leaf colors, powder texture, or feeding holes...'
                  }
                />
              </div>

              <div className="pt-3 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 font-bold hover:bg-slate-100 cursor-pointer"
                >
                  {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black shadow-md shadow-emerald-200 flex items-center space-x-1.5 cursor-pointer"
                >
                  <Send size={14} />
                  <span>{language === 'hi' ? 'गुमनाम रिपोर्ट सबमिट करें' : 'Submit Anonymous Report'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

