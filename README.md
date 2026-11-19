# NO-TECH Smart HVAC Product Companion

A premium, mobile-first Smart HVAC Product Companion Application designed specifically for the **NO-TECH HVAC SYSTEMS VIVID-400 In-Wall Modular Series**.

Unlike conventional business management or utility dashboards, this application is crafted as a calm, consumer-facing smart-home product companion. It provides homeowners with an intuitive, tactile interface to monitor, control, inspect, and maintain their modular in-wall HVAC system.

---

## 🎨 Strict Brand Design System

Built strictly according to the **NO-TECH 60-30-10 Brand Color Distribution**:

- **Polar White (`#F1F3F4` – 60%)**: Dominant background, card surfaces, and primary interface structure. Keeps the visual tone calm, light, clean, and spacious.
- **Deep Violet (`#241A6E` – 30%)**: Primary brand color used for navigation, active indicators, important controls, typography accents, and interactive surfaces.
- **Supporting Accents (10%)**: Restrained functional status colors:
  - **Operational Green (`#10B981`)**: Confirms optimal component health, rear prong electrical bus engagement, and normal operation.
  - **Attention Red (`#EF4444`)**: Indicates overdue modular replacement cycles or maintenance required.
  - **Subtle Cool Greys / Slates**: Provide structure, dividers, and secondary telemetry metadata.

---

## 🔩 Hardware Reference & Engineering Architecture

The application is modeled directly from the physical **NO-TECH VIVID-400** product architecture:

1. **In-Wall Architectural Cabinet**: A flush-mount vertical chassis (14.5" W × 48" H × 4" D) engineered to fit seamlessly between standard 16" on-center wall studs.
2. **Rear Electrical Quick-Prong Bus**: Each modular compartment cassette features self-aligning rear electrical prongs that slide directly into a 240V high-amp backplane. Eliminates loose wiring, wire-nuts, and complex on-site electrical troubleshooting.
3. **Four Integrated Modular Compartments**:
   - **Slot #1 – Modular Heating Element**: PTC Ceramic heating cassette.
   - **Slot #2 – Evaporator Coil Cassette**: Micro-channel eco coil with quick-seal refrigerant couplers.
   - **Slot #3 – Modular Blower Array**: Quad brushless DC blower motors providing up to 480 CFM airflow.
   - **Slot #4 – Continuous Filtration Roll**: Automated continuous media roll internally stored that automatically indexes and dispenses clean filter media across seasonal cycles.
4. **Status LEDs**: Located above each compartment handle (Green = docked & synchronized; Red = cycle overdue).
5. **Precision Faceplates**: Magnetic snap-on exterior panels available in Polar White, Architectural Tan, Heritage Red, and Deep Blue.

---

## 📱 Mobile-First & Responsive Presentation

The application delivers an authentic smart-home companion app experience on any device:

- **Mobile Viewports (`< 640px` / Phones)**:
  - Renders edge-to-edge with `100dvh` viewport locking.
  - Fixed top brand header with notifications.
  - Fixed bottom 5-tab navigation bar with safe-area insets.
  - Isolated smooth momentum scrolling between the stationary header and footer.
  - Zero browser rubber-band pull-down effects (`overscroll-behavior-y: none`).
- **Desktop & Tablet Viewports (`≥ 640px`)**:
  - Displays inside a realistic centered mobile device simulator frame (`w-[412px]`, `h-[min(860px,calc(100dvh-2rem))]`).
  - Realistic rounded bezel corners (`rounded-[48px]`), side hardware buttons, and drop shadows.
  - Header and footer remain completely stationary inside the frame during content scrolling.

---

## 🚀 Key Screens & Features

### 1. Home Dashboard
- **Personalized Welcome & Status**: Greets the homeowner and displays live synchronization state.
- **Interactive HVAC 3D Unit**: Architectural centerpiece showing the 4 docked modular cassettes with live operational LEDs and handles. Tapping any cassette opens instant diagnostics.
- **Refined Climate Control**:
  - Prominent indoor temperature reading (`72°F`) and room humidity (`46%`).
  - Direct ON / OFF toggle on the card header.
  - Touch-friendly `+` and `-` target temperature steppers.
  - Quick mode selectors (`Cool`, `Heat`, `Auto`).
  - Quick-switch link to `Full Controls →` positioned cleanly at the bottom-left.
- **Modular Filter Life**: Real-time progress bar tracking the auto-dispensing media roll with seasonal advance countdown.
- **System Health Status**: High-level operational badge linking directly to diagnostics.

### 2. Climate Control Screen
- Comprehensive thermal control with interactive temperature slider.
- Operating modes: **Cooling**, **Heating**, **Auto**, and **Eco**.
- Multi-stage fan speed selection: **Quiet**, **Medium**, **High**, **Auto**, and **Boost**.
- Real-time °F / °C unit conversion support.

### 3. System Monitoring Screen
- High-level overall system health indicator (96% Optimal) and 4/4 bus sync status.
- Real-time 240V quick-prong electrical backplane telemetry.
- **Clean Modular Compartment Cards**: Light, uncluttered module status cards with tactile icons, clear status badges (`● Optimal`), and smooth tap-to-inspect interaction.
- Cabinet architectural specifications (stud dimensions, flush mounting details).

### 4. Smart Care Screen
- Continuous auto-dispensing filtration media tracker (remaining percentage, days until auto-advance, and seasonal media rolls remaining).
- Filter life consumption statistics and health analysis.
- **Interactive 4-Step Modular Replacement Workflow**:
  1. *Disengage Front Latch* (tilt door 30° without tools)
  2. *Slide Out Old Cassette* (automatic prong disconnect without loose wires)
  3. *Dock Fresh Replacement Module* (align and slide into chassis)
  4. *Verify Green LED Status* (bus handshake confirmation)
  - Completing a replacement triggers celebration confetti, resets counters, and logs the service history!

### 5. Profile & Settings Screen
- Homeowner account details and verified master unit badge.
- Registered hardware information (Model, Serial Number, Installation Date, Certified Contractor).
- System preferences: °F / °C temperature unit toggle and alert notification preferences.
- Built-in FAQ knowledge base explaining modular maintenance, LED codes, and contractor support hotline.

---

## 🛠️ Technology Stack

- **Frontend**: [React 18+](https://react.dev/)
- **Build Tool**: [Vite 6+](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Celebration Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Design Techniques**: Neumorphism (`neu-flat`, `neu-button`, `neu-inset`), Glassmorphism (`glass-card`, `glass-nav`), and mobile viewport locking.

---

## 📦 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm`, `pnpm`, or `yarn`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/no-tech-smart-hvac-companion.git
   cd no-tech-smart-hvac-companion
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

---

## 📂 Project Directory Structure

```
├── public/
│   ├── assets/              # Authentic video frame captures & cropped module assets
│   ├── favicon.svg          # App favicon
│   └── logo-icon.svg        # Vector circular NT monogram
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── BottomNav.jsx              # Stationary 5-tab glassmorphic navigation
│   │   │   ├── EnergyModal.jsx            # Power telemetry & efficiency modal
│   │   │   ├── Header.jsx                 # Stationary brand header & notifications
│   │   │   ├── LogoNT.jsx                 # Authentic circular NT brand monogram
│   │   │   ├── NotificationModal.jsx      # Alert center modal
│   │   │   └── PhoneFrame.jsx             # Mobile-first responsive device wrapper
│   │   ├── hvac/
│   │   │   ├── CompartmentDetailModal.jsx # Deep inspection modal with specs & photos
│   │   │   ├── HVACUnitVisual.jsx         # 3D interactive in-wall unit visualizer
│   │   │   └── ReplacementWorkflowModal.jsx # Interactive 4-step quick-swap wizard
│   │   └── screens/
│   │       ├── ClimateControlScreen.jsx   # Dedicated climate & fan controller
│   │       ├── HomeScreen.jsx             # Home dashboard with modular visualizer
│   │       ├── ProfileSettingsScreen.jsx  # Account, preferences & knowledge base
│   │       ├── SmartMaintenanceScreen.jsx # Filter roll tracker & service workflows
│   │       └── SystemMonitoringScreen.jsx # Hardware bus telemetry & module status
│   ├── context/
│   │   └── HVACContext.jsx                # Reactive state management across the app
│   ├── data/
│   │   └── hvacData.js                    # Specs, mock telemetry, and replacement cycles
│   ├── App.jsx                            # Root application component & screen router
│   ├── index.css                          # Neumorphic classes & viewport styles
│   └── main.jsx                           # Application entry point
├── index.html                             # Mobile-first HTML5 template with fonts
├── package.json                           # Dependencies & project scripts
├── tailwind.config.js                     # Custom brand colors & box shadows
└── vite.config.js                         # Vite configuration
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
#   H V A C - S y s t e m  
 