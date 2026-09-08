import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { DamageAssessmentPage } from './pages/DamageAssessmentPage';
import { KnowledgeHubPage } from './pages/KnowledgeHubPage';
import { ScanCropPage } from './pages/ScanCropPage';
import { DiagnosisPage } from './pages/DiagnosisPage';
import { RiskIntelligencePage } from './pages/RiskIntelligencePage';
import { OutbreakMapPage } from './pages/OutbreakMapPage';
import { OutbreakDetailsPage } from './pages/OutbreakDetailsPage';
import { AlertsPage } from './pages/AlertsPage';
import { MyCropsPage } from './pages/MyCropsPage';
import { CropDetailsPage } from './pages/CropDetailsPage';
import { ActionPlanPage } from './pages/ActionPlanPage';
import { CommunityPage } from './pages/CommunityPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { ExpertVerificationPage } from './pages/ExpertVerificationPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';

// Data & Types
import { INITIAL_CROPS, OUTBREAK_CLUSTERS, ALERTS_DATA } from './data/demoData';
import { CropInfo, OutbreakCluster, AlertItem, DiagnosisResult, Language, PageId } from './types';
import { getSavedLanguage, saveLanguage } from './i18n';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [crops, setCrops] = useState<CropInfo[]>(INITIAL_CROPS);
  const [selectedCrop, setSelectedCrop] = useState<CropInfo>(INITIAL_CROPS[0]);
  const [selectedCluster, setSelectedCluster] = useState<OutbreakCluster>(OUTBREAK_CLUSTERS[0]);
  const [alerts, setAlerts] = useState<AlertItem[]>(ALERTS_DATA);
  const [language, setLanguageState] = useState<Language>(getSavedLanguage());
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);
  const [watchlistedClusterIds, setWatchlistedClusterIds] = useState<string[]>(['c-1']);

  const handleLanguageChange = (newLang: Language) => {
    setLanguageState(newLang);
    saveLanguage(newLang);
  };

  // Latest diagnosis result (for diagnosis screen)
  const [latestDiagnosis, setLatestDiagnosis] = useState<DiagnosisResult>({
    crop: 'Wheat (गेहूं)',
    diseaseOrPest: 'Wheat Rust (Brown Rust)',
    confidence: 94,
    severity: 'Early',
    affectedAreaPct: 12,
    symptoms: [
      'Rust-like visible symptoms on upper and lower foliar epidermis',
      'Early-stage infection pattern clustered along leaf veins',
      'Environmental conditions potentially favourable (High Humidity 76%)',
    ],
    immediateActions: {
      today: 'Inspect nearby plants.',
      next48Hours: 'Monitor affected areas.',
      next7Days: 'Re-scan crop.',
    },
    preventivePractices: [
      'Maintain standard 20cm row spacing for air ventilation.',
      'Avoid flood irrigation before cool damp nights.',
    ],
    ecoFriendlyOptions: [
      'Spray Neem Seed Kernel Extract (NSKE 5%).',
      'Trichoderma harzianum bio-fungicide treatment.',
    ],
    expertRequired: false,
    leafImageUrl:
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
  });

  const unreadAlertCount = alerts.filter((a) => !a.isRead).length;

  const handleMarkAlertAsRead = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isRead: true } : a))
    );
  };

  const handleSelectCrop = (crop: CropInfo) => {
    setSelectedCrop(crop);
    setCurrentPage('crop-details');
  };

  const handleAddCrop = (newCrop: CropInfo) => {
    setCrops((prev) => [newCrop, ...prev]);
    setSelectedCrop(newCrop);
  };

  const handleSelectCluster = (cluster: OutbreakCluster) => {
    setSelectedCluster(cluster);
  };

  const handleToggleWatchlist = (clusterId: string) => {
    if (watchlistedClusterIds.includes(clusterId)) {
      setWatchlistedClusterIds(watchlistedClusterIds.filter((id) => id !== clusterId));
    } else {
      setWatchlistedClusterIds([...watchlistedClusterIds, clusterId]);
    }
  };

  const handleScanCompleted = (result: DiagnosisResult) => {
    setLatestDiagnosis(result);
  };

  // Render current screen
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <DashboardPage
            crops={crops}
            language={language}
            onNavigate={setCurrentPage}
            onSelectCrop={handleSelectCrop}
            onSelectCluster={(cluster) => {
              setSelectedCluster(cluster);
              setCurrentPage('outbreak-details');
            }}
          />
        );

      case 'damage-assessment':
        return (
          <DamageAssessmentPage
            language={language}
            onNavigate={setCurrentPage}
          />
        );

      case 'knowledge-hub':
        return (
          <KnowledgeHubPage
            language={language}
            onNavigate={setCurrentPage}
          />
        );

      case 'scan':
        return (
          <ScanCropPage
            language={language}
            onScanCompleted={handleScanCompleted}
            onNavigate={setCurrentPage}
          />
        );

      case 'diagnosis':
        return (
          <DiagnosisPage
            diagnosis={latestDiagnosis}
            language={language}
            onNavigate={setCurrentPage}
          />
        );

      case 'risk':
        return <RiskIntelligencePage onNavigate={setCurrentPage} />;

      case 'map':
        return (
          <OutbreakMapPage
            onSelectCluster={handleSelectCluster}
            onNavigate={setCurrentPage}
          />
        );

      case 'outbreak-details':
        return (
          <OutbreakDetailsPage
            cluster={selectedCluster}
            onNavigate={setCurrentPage}
            onToggleWatchlist={handleToggleWatchlist}
            isWatchlisted={watchlistedClusterIds.includes(selectedCluster.id)}
          />
        );

      case 'alerts':
        return (
          <AlertsPage
            alerts={alerts}
            language={language}
            onMarkAsRead={handleMarkAlertAsRead}
            onNavigate={setCurrentPage}
          />
        );

      case 'crops':
        return (
          <MyCropsPage
            crops={crops}
            language={language}
            onSelectCrop={handleSelectCrop}
            onAddCrop={handleAddCrop}
          />
        );

      case 'crop-details':
        return (
          <CropDetailsPage
            crop={selectedCrop}
            language={language}
            onNavigate={setCurrentPage}
          />
        );

      case 'action':
        return (
          <ActionPlanPage
            language={language}
            onLanguageChange={handleLanguageChange}
            onNavigate={setCurrentPage}
          />
        );

      case 'community':
        return <CommunityPage language={language} onNavigate={setCurrentPage} />;

      case 'simulator':
        return <SimulatorPage language={language} onNavigate={setCurrentPage} />;

      case 'expert':
        return <ExpertVerificationPage language={language} onNavigate={setCurrentPage} />;

      case 'profile':
        return <ProfilePage language={language} onNavigate={setCurrentPage} />;

      case 'settings':
        return (
          <SettingsPage
            language={language}
            onLanguageChange={handleLanguageChange}
          />
        );

      default:
        return (
          <DashboardPage
            crops={crops}
            language={language}
            onNavigate={setCurrentPage}
            onSelectCrop={handleSelectCrop}
            onSelectCluster={handleSelectCluster}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-slate-900 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-white">
      <div className="flex flex-1">
        {/* Fixed Desktop Sidebar & Drawer */}
        <Sidebar
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          language={language}
          unreadAlertCount={unreadAlertCount}
          isOpenMobile={isOpenMobile}
          onCloseMobile={() => setIsOpenMobile(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-8">
          <Header
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            language={language}
            onLanguageChange={handleLanguageChange}
            unreadAlertCount={unreadAlertCount}
            onToggleMobileMenu={() => setIsOpenMobile(!isOpenMobile)}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {renderCurrentPage()}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        unreadAlertCount={unreadAlertCount}
        language={language}
      />
    </div>
  );
}

export default App;

