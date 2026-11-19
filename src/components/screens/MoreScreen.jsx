import React, { useState } from 'react';
import { useHVAC } from '../../context/HVACContext';
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
  ChevronDown
} from 'lucide-react';

export default function MoreScreen() {
  const { 
    setCurrentScreen, 
    previousScreen, 
    unreadCount, 
    specs, 
    compartments, 
    setSelectedCompartment 
  } = useHVAC();

  const [activeModal, setActiveModal] = useState(null); // 'components' | 'specs' | 'support' | null
  const [expandedFaq, setExpandedFaq] = useState(null);

  const menuItems = [
    {
      id: 'components',
      title: 'Components',
      description: 'View status of all components',
      icon: Layers,
      action: () => setActiveModal('components'),
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
      action: () => setActiveModal('specs'),
      badge: 'VIVID-400'
    },
    {
      id: 'support',
      title: 'Support',
      description: 'FAQs & help',
      icon: HelpCircle,
      action: () => setActiveModal('support'),
      badge: '24/7'
    },
  ];

  const faqs = [
    {
      q: 'How does the modular filtration compartment work?',
      a: 'The filtration module stores continuous filter media internally. A precision micro-stepper motor automatically indexes and dispenses fresh media across seasonal cycles, maintaining peak airflow without manual filter swaps.'
    },
    {
      q: 'How do I swap a modular compartment?',
      a: 'Grasp the recessed handle, tilt the front latch forward ~30°, and pull the cassette straight out. The rear electrical prongs disengage automatically without loose wires.'
    },
    {
      q: 'What warranty is included?',
      a: 'The VIVID-400 In-Wall Series includes a 10-Year Modular Quick-Swap Guarantee backed by Local Industries and certified contractors.'
    }
  ];

  return (
    <div className="flex-1 px-4 sm:px-5 py-3.5 space-y-3.5 pb-10 animate-in fade-in duration-300">
      {/* 1. Header Bar with Back Button & Title */}
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

      {/* 2. Modern Rounded Navigation List Cards */}
      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              onClick={item.action}
              className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between cursor-pointer hover:border-deepViolet/40 hover:shadow-sm active:scale-99 transition-all group"
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
                  <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-bold ${
                    item.id === 'notifications' && unreadCount > 0
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

      {/* 3. Hardware / Feature Promo Banner Card */}
      <div 
        onClick={() => setActiveModal('specs')}
        className="p-4 rounded-3xl bg-gradient-to-r from-deepViolet via-deepViolet-800 to-indigo-900 text-white shadow-lg cursor-pointer hover:opacity-95 transition-all relative overflow-hidden flex items-center justify-between gap-3 group"
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

        {/* Product Thumbnail Graphic */}
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

      {/* ============================================================== */}
      {/* MODALS: Components / Product Specs / Support                   */}
      {/* ============================================================== */}

      {/* 1. Components Overview Modal */}
      {activeModal === 'components' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-3.5 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-[350px] max-h-[82%] bg-polar-100 rounded-3xl shadow-2xl border border-white/90 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 px-5 bg-polar-200 border-b border-polar-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-deepViolet text-white">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-deepViolet">Modular Components</h3>
                  <p className="text-[10px] text-slate-500">4 In-Wall Quick-Swap Modules</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2.5 no-scrollbar">
              {compartments.map((comp) => (
                <div
                  key={comp.id}
                  onClick={() => {
                    setActiveModal(null);
                    setSelectedCompartment(comp);
                  }}
                  className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between cursor-pointer hover:border-deepViolet/40 transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{comp.name}</h4>
                      <p className="text-[10px] text-slate-500">{comp.spec}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. Product Specifications Modal */}
      {activeModal === 'specs' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-3.5 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-[350px] max-h-[82%] bg-polar-100 rounded-3xl shadow-2xl border border-white/90 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 px-5 bg-polar-200 border-b border-polar-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-deepViolet text-white">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-deepViolet">Product Specifications</h3>
                  <p className="text-[10px] text-slate-500">Local Industries NO-TECH VIVID-400</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar text-xs">
              <div className="p-3 rounded-2xl bg-white border border-slate-200 space-y-1.5">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Model</span>
                  <span className="font-bold text-slate-800">{specs.model}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Serial No.</span>
                  <span className="font-mono font-bold text-deepViolet">{specs.serialNumber}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Capacity</span>
                  <span className="font-bold text-slate-800">{specs.nominalTonnage}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Max Airflow</span>
                  <span className="font-bold text-slate-800">{specs.totalBlowerAirflow}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Dimensions</span>
                  <span className="font-bold text-slate-800">{specs.dimensions}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Warranty</span>
                  <span className="font-bold text-emerald-600">{specs.warranty}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Support & FAQs Modal */}
      {activeModal === 'support' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-3.5 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-[350px] max-h-[82%] bg-polar-100 rounded-3xl shadow-2xl border border-white/90 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 px-5 bg-polar-200 border-b border-polar-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-deepViolet text-white">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-deepViolet">Help & Support</h3>
                  <p className="text-[10px] text-slate-500">Local Industries Certified Assistance</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
              {/* Emergency / Hotline Card */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Support Hotline</h4>
                    <p className="text-[10.5px] font-mono text-deepViolet font-semibold">{specs.contractor.phone}</p>
                  </div>
                </div>
                <a
                  href={`tel:${specs.contractor.phone}`}
                  className="px-3 py-1.5 rounded-xl bg-deepViolet text-white text-[10.5px] font-bold"
                >
                  Call
                </a>
              </div>

              {/* FAQs Accordion */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 px-1">Frequently Asked Questions</h4>
                {faqs.map((f, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 rounded-2xl bg-white border border-slate-200 cursor-pointer"
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-800 pr-2">{f.q}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`} />
                    </div>
                    {expandedFaq === idx && (
                      <p className="text-[10.5px] text-slate-600 mt-2 pt-2 border-t border-slate-100 leading-relaxed animate-in fade-in">
                        {f.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
