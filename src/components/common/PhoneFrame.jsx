import React from 'react';

export default function PhoneFrame({ children, header, bottomNav, modals }) {
  return (
    /* Smartphone Device Wrapper:
        - Mobile (< sm): Edge-to-edge, locked precisely to the visible browser viewport via --app-height (window.innerHeight).
        - Desktop (sm:): Exact smartphone frame with dark black bezel, precise 19.5:9 proportions, rounded corners, and shadow.
    */
    <div
      className="phone-viewport-container bg-polar-200 overflow-hidden flex flex-col font-sans selection:bg-deepViolet/20 relative
                 sm:rounded-[48px] sm:border-[10px] sm:border-[#0F1115] sm:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35),0_12px_24px_-8px_rgba(0,0,0,0.25)] sm:mx-auto sm:my-auto"
    >
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
      <footer className="shrink-0 z-40 w-full bg-polar-200 select-none pb-[env(safe-area-inset-bottom,0px)]">
        {/* Tab Navigation */}
        {bottomNav}
      </footer>

      {/* Floating Modals overlay inside phone viewport */}
      {modals}
    </div>
  );
}
