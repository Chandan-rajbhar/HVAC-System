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
    ChevronDown,
    ShieldCheck,
    CheckCircle2
  } from 'lucide-react';

export default function MoreScreen() {
  const {
    navigate,
    setCurrentScreen,
    previousScreen,
    unreadCount,
    compartments
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
      action: () => navigate('care'),
      badge: 'Smart Care'
    },
    {
      id: 'diagnostics',
      title: 'Diagnostics',
      description: 'Check system health',
      icon: Activity,
      action: () => navigate('system'),
      badge: '96% Health'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Alerts & updates',
      icon: Bell,
      action: () => navigate('notifications'),
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
            <div className="flex-1 w-full min-h-full flex flex-col relative overflow-hidden">
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
                          className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between cursor-pointer hover:border-deepViolet/40 hover:shadow-sm active:scale-98 transition-all group"
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

                    {/* ============================================================== */ }
                    {/* SUBPAGE 1: COMPONENTS (Smooth Mobile Push Screen)               */ }
                    {/* ============================================================== */ }
                    {
                      activeModal === 'components' && (
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

                                  {compartments.map((comp) => (
                                    <div
                                      key={comp.id}
                                      onClick={() => {
                                        handleCloseModal();
                                        setSelectedCompartment(comp);
                                      }}
                                      className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between cursor-pointer hover:border-deepViolet/40 hover:shadow-sm active:scale-98 transition-all group"
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-deepViolet/10 text-deepViolet flex items-center justify-center font-bold text-xs shrink-0">
                                          #{comp.slot}
                                        </div>
                                        <div>
                                          <h4 className="text-xs font-bold text-slate-800 group-hover:text-deepViolet transition-colors">
                                            {comp.name}
                                          </h4>
                                          <p className="text-[10.5px] text-slate-500 mt-0.5">
                                            {comp.spec}
                                          </p>
                                        </div>
                                      </div>

                                        <div className="flex items-center gap-2">
                                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                            Active
                                          </span>
                                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:text-deepViolet transition-all" />
                                        </div>
                                      </div>
            ))}
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
                                        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2 text-xs">
                                          <div className="flex justify-between py-1.5 border-b border-slate-100">
                                            <span className="text-slate-500">Hardware Model:</span>
                                            <span className="font-bold text-slate-800">{specs.model}</span>
                                          </div>
                                          <div className="flex justify-between py-1.5 border-b border-slate-100">
                                            <span className="text-slate-500">Serial Identification:</span>
                                            <span className="font-mono font-bold text-deepViolet">{specs.serialNumber}</span>
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
                                            <span className="font-bold text-slate-800">{specs.dimensions}</span>
                                          </div>
                                          <div className="flex justify-between py-1.5 border-b border-slate-100">
                                            <span className="text-slate-500">Warranty Coverage:</span>
                                            <span className="font-bold text-emerald-600">{specs.warranty}</span>
                                          </div>
                                          <div className="flex justify-between py-1.5">
                                            <span className="text-slate-500">Safety Standard:</span>
                                            <span className="font-bold text-slate-800">UL 1995 / AHRI Certified</span>
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
                                              {/* Direct Support Card */}
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
                                                    className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs cursor-pointer active:scale-99 transition-all"
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
