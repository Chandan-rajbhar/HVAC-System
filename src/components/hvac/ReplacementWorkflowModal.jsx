import React, { useState } from 'react';
import { useHVAC } from '../../context/HVACContext';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Wrench, 
  Zap, 
  Check, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function ReplacementWorkflowModal() {
  const { 
    replacementModalCompartment, 
    setReplacementModalCompartment, 
    markReplacementComplete 
  } = useHVAC();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!replacementModalCompartment) return null;

  const comp = replacementModalCompartment;

  const steps = [
    {
      step: 1,
      title: 'Disengage Front Latch',
      action: 'Grasp the recessed handle and tilt the front door outward ~30 degrees.',
      detail: 'The magnetic safety lock disengages gently without tools.',
      visualIcon: Wrench,
    },
    {
      step: 2,
      title: 'Slide Out Old Cassette',
      action: 'Pull the modular cassette straight out along the low-friction guide rails.',
      detail: 'The rear electrical prongs automatically disconnect from the high-amp bus. No loose wiring or wire-nuts required.',
      visualIcon: Zap,
    },
    {
      step: 3,
      title: 'Dock Fresh Replacement Module',
      action: 'Align the replacement cassette and slide it fully into the compartment bay until it clicks.',
      detail: 'Precision prong contacts seat directly into the internal chassis interface.',
      visualIcon: ShieldCheck,
    },
    {
      step: 4,
      title: 'Verify Green LED Status',
      action: 'Observe the indicator light above the handle. It turns solid green within 2 seconds of prong engagement.',
      detail: 'Green confirms automatic synchronization, firmware handshake, and normal operation.',
      visualIcon: CheckCircle2,
    },
  ];

  const handleFinish = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      markReplacementComplete(comp.id);
      setIsSubmitting(false);
      setCurrentStep(1);
    }, 600);
  };

  const handleClose = () => {
    setReplacementModalCompartment(null);
    setCurrentStep(1);
  };

  const activeStepData = steps[currentStep - 1];
  const StepIcon = activeStepData.visualIcon;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-3.5 bg-slate-900/50 backdrop-blur-xs animate-backdrop-in">
      <div 
        className="w-full max-w-[420px] max-h-[88%] bg-polar-100 rounded-t-[32px] sm:rounded-3xl shadow-2xl border border-white/90 flex flex-col overflow-hidden animate-mobile-sheet-enter"
      >
        {/* Mobile Drag Indicator Handle */}
        <div className="w-full pt-2.5 pb-1 flex justify-center bg-polar-200">
          <div className="w-12 h-1 rounded-full bg-slate-300/90" />
        </div>

        {/* Header */}
        <div className="p-3.5 px-5 bg-polar-200 border-b border-polar-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-deepViolet text-white">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-deepViolet">Modular Quick-Swap Guide</h3>
              <p className="text-[10px] text-slate-500 font-mono">
                {comp.name} • Slot #{comp.slot}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Indicators */}
        <div className="px-5 py-3 bg-polar-200/50 border-b border-polar-300 flex items-center justify-between">
          {steps.map((s) => (
            <div key={s.step} className="flex items-center gap-1.5">
              <div 
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                  currentStep === s.step 
                    ? 'bg-deepViolet text-white shadow-glow-violet scale-105' 
                    : currentStep > s.step 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-polar-300 text-slate-500'
                }`}
              >
                {currentStep > s.step ? <Check className="w-3.5 h-3.5" /> : s.step}
              </div>
              {s.step < steps.length && (
                <div className={`w-6 sm:w-8 h-0.5 rounded transition-all ${
                  currentStep > s.step ? 'bg-emerald-500' : 'bg-slate-300'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
          {/* Step Visual Banner */}
          <div className="relative rounded-2xl overflow-hidden p-4 bg-gradient-to-br from-deepViolet-900 to-deepViolet-700 text-white shadow-md flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shrink-0">
              <StepIcon className="w-7 h-7 text-emerald-300" />
            </div>

            <div className="flex-1">
              <span className="text-[9px] font-mono uppercase tracking-widest text-deepViolet-200 font-bold">
                Step {currentStep} of {steps.length}
              </span>
              <h4 className="text-sm font-bold text-white leading-tight mt-0.5">
                {activeStepData.title}
              </h4>
            </div>
          </div>

          {/* Module Photo Reference */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-300 h-36 bg-black shadow-inner">
            <img 
              src={comp.image} 
              alt={comp.name} 
              className="w-full h-full object-cover object-center" 
            />
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/75 text-[9px] font-mono text-emerald-400 border border-emerald-500/40">
              {currentStep === 4 ? 'Status: Synchronized' : 'Prong Bus Interlock'}
            </div>
          </div>

          {/* Action instruction */}
          <div className="p-3.5 rounded-2xl neu-flat space-y-1.5">
            <h5 className="text-xs font-bold text-deepViolet flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-deepViolet" />
              Instruction:
            </h5>
            <p className="text-xs text-slate-800 font-medium leading-relaxed">
              {activeStepData.action}
            </p>
            <p className="text-[11px] text-slate-500 leading-relaxed pt-1 border-t border-slate-200">
              {activeStepData.detail}
            </p>
          </div>

          {/* Video reference callout */}
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-[10px] text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
            <span>
              NO-TECH HVAC Modular design eliminates technicians pulling panels or troubleshooting on-site. Simply swap and sync.
            </span>
          </div>
        </div>

        {/* Footer Navigation Buttons */}
        <div className="p-4 bg-polar-200 border-t border-polar-300 flex items-center justify-between gap-2">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="py-2.5 px-3.5 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-all flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <button
              onClick={handleClose}
              className="py-2.5 px-3.5 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
          )}

          {currentStep < steps.length ? (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="flex-1 py-2.5 px-4 rounded-xl bg-deepViolet text-white text-xs font-bold hover:bg-deepViolet-600 active:scale-98 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-deepViolet/20"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={isSubmitting}
              className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 active:scale-98 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Verifying Bus...' : 'Mark Replacement Complete'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
