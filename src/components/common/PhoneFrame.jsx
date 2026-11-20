import React from 'react';

export default function PhoneFrame({ children, header, bottomNav, modals }) {
  return (
    // Responsive outer container:
    // - Mobile (< sm): Locks directly to 100% of the viewport (100dvh) without unnecessary outer padding.
    // - Tablet / Desktop (>= sm): Centers the realistic mobile device frame with ambient backdrop.
    <div className="h-[100dvh] sm:min-h-screen sm:h-auto w-full bg-slate-200/90 flex flex-col items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8 font-sans selection:bg-deepViolet/20 overflow-hidden sm:overflow-y-auto">

      {/* Mobile Device Wrapper:
          - Mobile (< sm): Edge-to-edge native mobile app view (100% width & height).
          - Desktop (sm:): Realistic mobile simulator with refined bezel, drop shadows, and hardware accents.
      */}
      <div
        className="relative w-full h-full sm:w-[412px] sm:max-w-[420px] sm:h-[min(860px,calc(100dvh-2rem))] sm:rounded-[48px] sm:shadow-phone-frame sm:border-[10px] sm:border-[#1E232B] sm:ring-1 sm:ring-white/10 bg-polar-200 overflow-hidden flex flex-col [transform:translateZ(0)]"
      >
        {/* Hardware Side Buttons (visible only on desktop device frame) */}
        <div className="hidden sm:block absolute -left-[14px] top-28 w-[4px] h-12 bg-slate-500 rounded-l-md opacity-80 pointer-events-none" />
        <div className="hidden sm:block absolute -left-[14px] top-44 w-[4px] h-12 bg-slate-500 rounded-l-md opacity-80 pointer-events-none" />
        <div className="hidden sm:block absolute -right-[14px] top-32 w-[4px] h-16 bg-slate-500 rounded-r-md opacity-80 pointer-events-none" />

        {/* ============================================================== */}
        {/* 1. FIXED TOP HEADER BAR (App Header)                           */}
        {/* Pinned firmly at the top with shrink-0 and z-40.               */}
        {/* Completely stationary: NEVER moves or scrolls away.            */}
        {/* ============================================================== */}
        <header className="shrink-0 z-40 w-full select-none">
          {header}
        </header>

        {/* ============================================================== */}
        {/* 2. SCROLLABLE SCREEN CONTENT AREA                              */}
        {/* Strictly isolated scroll container bounded between header &   */}
        {/* footer. min-h-0 ensures flex child scrolls rather than         */}
        {/* expanding parent.                                              */}
        {/* ============================================================== */}
        <main className="flex-1 min-h-0 w-full overflow-y-auto overflow-x-hidden no-scrollbar overscroll-contain bg-polar-200 flex flex-col relative">
          {children}
        </main>

        {/* ============================================================== */}
        {/* 3. FIXED BOTTOM FOOTER BAR (Floating BottomNav)                */}
        {/* Pinned firmly at the bottom with shrink-0 and z-40.            */}
        {/* Completely stationary: NEVER moves or scrolls away.            */}
        {/* ============================================================== */}
        <footer className="shrink-0 z-40 w-full bg-polar-200 select-none">
          {/* Tab Navigation */}
          {bottomNav}
        </footer>

        {/* Floating Modals overlay inside phone viewport */}
        {modals}
      </div>
    </div>
  );
}
