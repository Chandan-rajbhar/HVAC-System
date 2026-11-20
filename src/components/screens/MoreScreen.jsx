import React, { useState } from 'react';
import { useHVAC } from '../../context/HVACContext';
import { SYSTEM_SPECS as specs } from '../../data/hvacData';
import {
  Layers,
  Wrench,
  Activity,
  Bell,
  FileText,
  HelpCircle,
  ChevronRight,
  ArrowLeft,
  X,
  Phone,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  Flame,
  Snowflake,
  Wind,
  Info
} from 'lucide-react';

const faqs = [
  {
    q: 'How do I replace a modular compartment cassette?',
    a: 'Tilt the front recessed handle forward ~30° to disengage the magnetic lock, then pull straight out. The rear high-amp electrical prongs disconnect automatically with zero loose wires.'
  },
  {
    q: 'How does the automatic filtration roll work?',
    a: 'A motorized micro-stepper indexes fresh media across seasonal cycles based on airflow pressure differentials, maintaining clean air without manual replacement.'
  },
  {
    q: 'What is the warranty coverage?',
    a: 'All VIVID-400 series modules are protected by our 10-Year Modular Quick-Swap Guarantee backed by certified Local Industries contractors.'
  },
  {
    q: 'How often should the system be serviced?',
    a: 'The system self-monitors 24/7. Filter media auto-advances every 90 days. Professional inspection is recommended annually or when indicated by system diagnostics.'
  }
];

export default function MoreScreen() {
  const {
    setCurrentScreen,
    previousScreen,
    unreadCount,
    compartments,
    setSelectedCompartment
  } = useHVAC();

  const [activeModal, setActiveModal] = useState(null); // 'components' | 'specs' | 'support' | null
  const [isClosing, setIsClosing] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleOpenModal = (modalId) => {
    setIsClosing(false);
    setActiveModal(modalId);
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveModal(null);
      setIsClosing(false);
    }, 220);
  };

  const menuItems = [
    {
      id: 'components',
      title: 'Components',
      description: 'View status of all components',
      icon: Layers,
      action: () => handleOpenModal('components'),
      badge: `${compartments.length} Active`
    },
    {
      id: 'maintenance',
      title: 'Maintenance',
      description: 'Filter & service alerts',
      icon: Wrench,
      action: () => setCurrentScreen('care'),
      badge: 'Smart Care'
    },
    {
      id: 'diagnostics',
      title: 'Diagnostics',
      description: 'Check system health',
      icon: Activity,
      action: () => setCurrentScreen('system'),
      badge: '96% Health'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Alerts & updates',
      icon: Bell,
      action: () => setCurrentScreen('notifications'),
      badge: unreadCount > 0 ? `${unreadCount} New` : null
    },
    {
      id: 'product-info',
      title: 'Product Information',
      description: 'Specifications & guides',
      icon: FileText,
      action: () => handleOpenModal('specs'),
      badge: 'VIVID-400'
    },
    {
      id: 'support',
      title: 'Support',
      description: 'FAQs & help',
      icon: HelpCircle,
      action: () => handleOpenModal('support'),
      badge: '24/7'
    },
  ];

  return (
    <div className="flex-1 w-full min-h-full flex flex-col relative overflow-hidden bg-polar-200">
      {/* 1. Main More Screen View */}
      <div className="flex-1 px-4 sm:px-5 py-3.5 space-y-3.5 pb-10 overflow-y-auto no-scrollbar animate-in fade-in duration-300">
        {/* Header Bar with Back Button & Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentScreen(previousScreen && previousScreen !== 'more' ? previousScreen : 'home')}
              className="p-1.5 rounded-xl neu-button text-deepViolet hover:text-deepViolet-800 active:scale-95 transition-all"
              title="Go back"
              aria-label="Back"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
            <div>
              <h2 className="text-lg font-extrabold text-deepViolet tracking-tight leading-tight">
                More
              </h2>
              <p className="text-[10px] text-slate-500 font-medium">
                System hub & product options
              </p>
            </div>
          </div>

          <div className="px-2.5 py-1 rounded-full bg-deepViolet/10 text-deepViolet text-[10.5px] font-bold">
            Local Industries
          </div>
        </div>

        {/* Navigation List Cards */}
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onClick={item.action}
                className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between cursor-pointer hover:border-deepViolet/40 hover:shadow-sm active:scale-[0.99] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-deepViolet/10 text-deepViolet flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-deepViolet transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[10.5px] text-slate-500 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-bold ${item.id === 'notifications' && unreadCount > 0
                        ? 'bg-status-attention text-white'
                        : 'bg-polar-300 text-deepViolet'
                      }`}>
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:text-deepViolet transition-all" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Hardware / Feature Promo Banner Card */}
        <div
          onClick={() => handleOpenModal('specs')}
          className="p-4 rounded-3xl bg-gradient-to-r from-deepViolet via-[#2F2285] to-[#4335BE] text-white shadow-lg cursor-pointer hover:opacity-95 transition-all relative overflow-hidden flex items-center justify-between gap-3 group"
        >
          <div className="z-10 flex-1">
            <span className="text-[9.5px] font-bold tracking-widest uppercase text-sky-300 font-mono">
              VIVID-400 IN-WALL
            </span>
            <h3 className="text-sm font-extrabold text-white mt-0.5">
              No-Tech HVAC System
            </h3>
            <p className="text-[10.5px] text-slate-200 mt-0.5">
              Smart • Efficient • Reliable
            </p>
            <button className="mt-2.5 px-3 py-1 rounded-xl bg-white/20 hover:bg-white/30 text-white text-[10.5px] font-bold flex items-center gap-1 backdrop-blur-xs transition-colors">
              <span>Learn More</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="w-20 h-20 rounded-2xl bg-white/10 p-1 flex items-center justify-center shrink-0 border border-white/20 overflow-hidden shadow-inner">
            <img
              src="/assets/unit_white_isolated.jpg"
              alt="NO-TECH HVAC"
              className="w-full h-full object-contain filter drop-shadow-md"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SUBPAGE 1: MODULAR COMPONENTS (Smooth Mobile Push Screen)      */}
      {/* ============================================================== */}
      {activeModal === 'components' && (
        <div className={`absolute inset-0 z-30 bg-polar-200 flex flex-col ${isClosing ? 'animate-mobile-page-exit' : 'animate-mobile-page-enter'}`}>
          <div className="shrink-0 px-4 sm:px-5 py-3.5 bg-polar-200/95 backdrop-blur-md border-b border-polar-300 flex items-center justify-between z-10 select-none">
            <button
              onClick={handleCloseModal}
              className="flex items-center gap-1.5 py-1 px-2 -ml-1 rounded-xl text-deepViolet hover:bg-deepViolet/10 active:scale-95 transition-all group"
              title="Return to More"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5] group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-xs font-bold">More</span>
            </button>

            <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
              Modular Components
            </h2>

            <div className="p-1.5 rounded-lg bg-deepViolet/10 text-deepViolet">
              <Layers className="w-4 h-4" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-3.5 space-y-2.5 no-scrollbar">
            <p className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase px-1">
              Active In-Wall Modules ({compartments.length})
            </p>

            {compartments.map((comp) => {
              const CompIcon = comp.id === 'heating' ? Flame : comp.id === 'evaporator' ? Snowflake : comp.id === 'blower' ? Wind : ShieldCheck;

              return (
                <div
                  key={comp.id}
                  onClick={() => {
                    handleCloseModal();
                    setSelectedCompartment(comp);
                  }}
                  className="p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between cursor-pointer hover:border-deepViolet/40 hover:shadow-sm active:scale-[0.99] transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Modular Product Hardware Thumbnail */}
                    <div className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-xl bg-slate-100 border border-slate-200/80 overflow-hidden shrink-0 shadow-xs">
                      <img
                        src={comp.image}
                        alt={comp.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <span className="absolute bottom-0 inset-x-0 bg-slate-900/80 text-[7.5px] font-bold text-white text-center font-mono py-0.5">
                        #{comp.slot}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <CompIcon className="w-3.5 h-3.5 text-deepViolet shrink-0" />
                        <h4 className="text-xs font-bold text-slate-800 group-hover:text-deepViolet transition-colors truncate">
                          {comp.name}
                        </h4>
                      </div>
                      <p className="text-[10px] sm:text-[10.5px] text-slate-500 truncate mt-0.5">
                        {comp.spec}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70 text-[9.5px] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Active</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:text-deepViolet transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SUBPAGE 2: PRODUCT SPECIFICATIONS (Smooth Mobile Push Screen)   */}
      {/* ============================================================== */}
      {activeModal === 'specs' && (
        <div className={`absolute inset-0 z-30 bg-polar-200 flex flex-col ${isClosing ? 'animate-mobile-page-exit' : 'animate-mobile-page-enter'}`}>
          <div className="shrink-0 px-4 sm:px-5 py-3.5 bg-polar-200/95 backdrop-blur-md border-b border-polar-300 flex items-center justify-between z-10 select-none">
            <button
              onClick={handleCloseModal}
              className="flex items-center gap-1.5 py-1 px-2 -ml-1 rounded-xl text-deepViolet hover:bg-deepViolet/10 active:scale-95 transition-all group"
              title="Return to More"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5] group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-xs font-bold">More</span>
            </button>

            <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
              Product Specifications
            </h2>

            <div className="p-1.5 rounded-lg bg-deepViolet/10 text-deepViolet">
              <FileText className="w-4 h-4" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-3.5 space-y-3.5 no-scrollbar">
            {/* Hardware Showcase Card */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-polar-100 p-1 flex items-center justify-center shrink-0 border border-slate-200 overflow-hidden shadow-inner">
                <img
                  src="/assets/unit_white_isolated.jpg"
                  alt="VIVID-400"
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>
              <div>
                <span className="text-[9px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100 uppercase tracking-wider font-mono">
                  In-Wall Architecture
                </span>
                <h3 className="text-sm font-extrabold text-deepViolet mt-1">
                  {specs.model}
                </h3>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                  S/N: {specs.serialNumber}
                </p>
              </div>
            </div>

            {/* Technical Specifications Table */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2 text-xs">
              <p className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase mb-2">
                Engineering Specifications
              </p>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Hardware Model:</span>
                <span className="font-bold text-slate-800">{specs.model}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Form Factor:</span>
                <span className="font-bold text-slate-800 text-right">{specs.formFactor}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Nominal Tonnage:</span>
                <span className="font-bold text-slate-800">{specs.nominalTonnage}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Max Blower Airflow:</span>
                <span className="font-bold text-slate-800">{specs.totalBlowerAirflow}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Cabinet Dimensions:</span>
                <span className="font-bold text-slate-800 text-right">{specs.dimensions}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Power Supply:</span>
                <span className="font-bold text-slate-800 text-right">{specs.powerSupply}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Warranty Coverage:</span>
                <span className="font-bold text-emerald-600">{specs.warranty}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Safety Standards:</span>
                <span className="font-bold text-slate-800">{specs.certification}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SUBPAGE 3: SUPPORT & FAQS (Smooth Mobile Push Screen)           */}
      {/* ============================================================== */}
      {activeModal === 'support' && (
        <div className={`absolute inset-0 z-30 bg-polar-200 flex flex-col ${isClosing ? 'animate-mobile-page-exit' : 'animate-mobile-page-enter'}`}>
          <div className="shrink-0 px-4 sm:px-5 py-3.5 bg-polar-200/95 backdrop-blur-md border-b border-polar-300 flex items-center justify-between z-10 select-none">
            <button
              onClick={handleCloseModal}
              className="flex items-center gap-1.5 py-1 px-2 -ml-1 rounded-xl text-deepViolet hover:bg-deepViolet/10 active:scale-95 transition-all group"
              title="Return to More"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5] group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-xs font-bold">More</span>
            </button>

            <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
              Support & Hotline
            </h2>

            <div className="p-1.5 rounded-lg bg-deepViolet/10 text-deepViolet">
              <HelpCircle className="w-4 h-4" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-3.5 space-y-3.5 no-scrollbar">
            {/* Direct Contractor Card */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900">Certified Contractor</h3>
                    <p className="text-[11px] text-slate-500">{specs.contractor.company}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9.5px] font-bold">
                  24/7 Available
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-polar-200/70 border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-500">Toll-Free Direct</p>
                  <p className="font-mono text-sm font-extrabold text-deepViolet">{specs.contractor.phone}</p>
                </div>
                <a
                  href={`tel:${specs.contractor.phone}`}
                  className="px-4 py-2 rounded-xl bg-deepViolet text-white font-bold text-xs shadow-md hover:bg-deepViolet-800 active:scale-95 transition-all"
                >
                  Call Now
                </a>
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="space-y-2">
              <p className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase px-1 mb-1">
                Frequently Asked Questions
              </p>
              {faqs.map((f, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs cursor-pointer active:scale-[0.99] transition-all"
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 pr-2">{f.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${expandedFaq === idx ? 'rotate-180 text-deepViolet' : ''}`} />
                  </div>
                  {expandedFaq === idx && (
                    <p className="text-[11px] text-slate-600 mt-2.5 pt-2.5 border-t border-slate-100 leading-relaxed animate-in fade-in">
                      {f.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
