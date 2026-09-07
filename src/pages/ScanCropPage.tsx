import React, { useState, useRef } from 'react';
import {
  Camera,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Image as ImageIcon,
  Zap,
} from 'lucide-react';
import { SAMPLE_SCAN_PRESETS } from '../data/demoData';
import { DiagnosisResult, PageId } from '../types';

interface ScanCropPageProps {
  onScanCompleted: (result: DiagnosisResult) => void;
  onNavigate: (page: PageId) => void;
}

export const ScanCropPage: React.FC<ScanCropPageProps> = ({
  onScanCompleted,
  onNavigate,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    SAMPLE_SCAN_PRESETS[0].imageUrl
  );
  const [activePresetId, setActivePresetId] = useState<string>(SAMPLE_SCAN_PRESETS[0].id);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraActive(true);
      }
    } catch (err) {
      console.warn('Camera error or blocked in iframe:', err);
      setCameraError('Camera access not supported or denied in preview. You can pick a sample leaf or upload an image.');
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setSelectedImage(dataUrl);
        stopCamera();
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
          setActivePresetId('custom');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (preset: typeof SAMPLE_SCAN_PRESETS[0]) => {
    stopCamera();
    setSelectedImage(preset.imageUrl);
    setActivePresetId(preset.id);
  };

  const triggerAnalyze = () => {
    setIsScanning(true);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          setTimeout(() => {
            setIsScanning(false);
            // Selected preset result or default wheat rust
            const activePreset = SAMPLE_SCAN_PRESETS.find((p) => p.id === activePresetId);
            const result: DiagnosisResult = activePreset
              ? { ...activePreset.mockResult, leafImageUrl: selectedImage || activePreset.imageUrl }
              : {
                  crop: 'Wheat (गेहूं)',
                  diseaseOrPest: 'Wheat Rust (Brown Rust)',
                  confidence: 94,
                  severity: 'Early',
                  affectedAreaPct: 12,
                  symptoms: [
                    'Rust-like visible symptoms',
                    'Early-stage infection pattern',
                    'Environmental conditions potentially favourable',
                  ],
                  immediateActions: {
                    today: 'Inspect nearby plants.',
                    next48Hours: 'Monitor affected areas.',
                    next7Days: 'Re-scan crop.',
                  },
                  preventivePractices: [
                    'Maintain row spacing for air ventilation.',
                    'Avoid flood irrigation before cool nights.',
                  ],
                  ecoFriendlyOptions: [
                    'Spray Neem Seed Kernel Extract (NSKE 5%).',
                    'Trichoderma harzianum bio-fungicide treatment.',
                  ],
                  expertRequired: false,
                  leafImageUrl: selectedImage || undefined,
                };

            onScanCompleted(result);
            onNavigate('diagnosis');
          }, 400);
          return 100;
        }
        return prev + 15;
      });
    }, 150);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Title & Subtitle */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-[11px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
          Computer Vision Diagnostics
        </span>
        <h2 className="text-3xl font-black text-slate-900 mt-2">
          SCAN YOUR CROP
        </h2>
        <p className="text-slate-500 text-sm mt-1.5 font-medium">
          “Upload a clear image of an affected leaf or crop.”
        </p>
      </div>

      {/* Main Upload / Camera Box */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Image / Camera Preview */}
          <div className="relative rounded-2xl bg-slate-950 min-h-[300px] flex items-center justify-center overflow-hidden border border-slate-800 shadow-inner group">
            {isCameraActive ? (
              <div className="relative w-full h-full min-h-[300px]">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover min-h-[300px]"
                />
                <button
                  onClick={capturePhoto}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-slate-900 font-bold px-6 py-2.5 rounded-full shadow-xl flex items-center space-x-2 active:scale-95"
                >
                  <Camera size={18} />
                  <span>Snap Photo</span>
                </button>
              </div>
            ) : selectedImage ? (
              <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Crop Leaf Preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 object-cover rounded-xl"
                />
                {/* Overlay Scanning Laser Effect */}
                {isScanning && (
                  <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-full max-w-xs space-y-3">
                      <div className="relative h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-400 transition-all duration-150"
                          style={{ width: `${scanProgress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-emerald-300 font-black text-sm tracking-wider animate-pulse">
                        <RefreshCw size={16} className="animate-spin" />
                        <span>ANALYZING CROP...</span>
                      </div>
                      <p className="text-[11px] text-emerald-100 font-medium">
                        Segmenting lesion pustules & cross-referencing Sonipat micro-outbreak database ({scanProgress}%)
                      </p>
                    </div>

                    {/* Animated Scanning Laser Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#34D399] animate-bounce" />
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500">
                <ImageIcon size={48} className="mx-auto mb-2 text-slate-600" />
                <p className="text-sm font-semibold">No image selected</p>
                <p className="text-xs text-slate-500 mt-1">Upload a leaf photo or pick a sample</p>
              </div>
            )}

            {/* Top Right Clear Button */}
            {selectedImage && !isScanning && !isCameraActive && (
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 bg-slate-900/80 hover:bg-slate-900 text-white text-xs px-2.5 py-1 rounded-lg backdrop-blur-xs font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Right: Actions & Scan Trigger */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-800">
                Upload or Capture Affected Foliage
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                For highest accuracy: capture the leaf in morning daylight, focusing on individual lesions, discolored patches, or whorl funnels.
              </p>
            </div>

            {/* File input / camera actions */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center space-x-2 py-3.5 px-4 rounded-2xl border-2 border-dashed border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                <UploadCloud size={18} className="text-emerald-600" />
                <span>Upload Image</span>
              </button>

              <button
                onClick={startCamera}
                className="flex items-center justify-center space-x-2 py-3.5 px-4 rounded-2xl border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                <Camera size={18} className="text-emerald-600" />
                <span>Use Camera</span>
              </button>
            </div>

            {cameraError && (
              <p className="text-[11px] text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                {cameraError}
              </p>
            )}

            {/* Quick Demo Presets */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Or Select Realistic Field Test Samples:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {SAMPLE_SCAN_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`text-left p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      activePresetId === preset.id
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500'
                        : 'border-gray-200 hover:border-gray-300 text-slate-600'
                    }`}
                  >
                    <p className="font-bold truncate">{preset.title}</p>
                    <p className="text-[10px] text-slate-400 font-medium">Crop: {preset.crop}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Trigger Button */}
            <button
              onClick={triggerAnalyze}
              disabled={isScanning || !selectedImage}
              id="analyze-crop-btn"
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-black py-4 rounded-2xl shadow-lg shadow-emerald-200 active:scale-98 transition-all flex items-center justify-center space-x-2 text-sm cursor-pointer"
            >
              {isScanning ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  <span>ANALYZING CROP...</span>
                </>
              ) : (
                <>
                  <Zap size={18} />
                  <span>Analyze Crop with FasalAI</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-4 flex items-start space-x-3 text-xs text-emerald-900">
        <ShieldAlert size={18} className="text-emerald-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>FasalRakshak Privacy & Agronomic Shield:</strong> Scanned foliage images are processed privately and stripped of metadata before being indexed into the anonymous regional disease spread model.
        </p>
      </div>
    </div>
  );
};
