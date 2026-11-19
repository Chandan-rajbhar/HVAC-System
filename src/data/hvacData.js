export const INITIAL_HVAC_STATE = {
  power: true,
  currentTemp: 72,      // in Fahrenheit
  targetTemp: 70,       // in Fahrenheit
  tempUnit: 'F',        // 'F' or 'C'
  mode: 'cooling',      // 'cooling', 'heating', 'auto', 'eco'
  fanSpeed: 'auto',     // 'low', 'med', 'high', 'auto', 'turbo'
  faceplateColor: 'white', // 'white', 'tan', 'red', 'blue'
  filterLife: 78,       // percentage
  daysUntilAdvance: 21,
  seasonsRemaining: 3,
  systemHealth: 96,
  lastSync: 'Just now',
  syncStatus: 'connected', // 'connected', 'syncing', 'offline'
  roomHumidity: 46,     // %
  outdoorTemp: 79,      // F
  airQuality: 'Excellent', // 'Excellent', 'Good', 'Moderate'
  ecoModeActive: false,
};

export const COMPARTMENTS = [
  {
    id: 'heating',
    name: 'Modular Heating Element',
    shortName: 'Heating',
    slot: 1,
    position: 'Upper Module 1',
    description: 'Enables fast compartment swaps, reducing downtime and avoiding high service costs.',
    lifeMonths: 60,
    usedMonths: 9,
    status: 'operational', // 'operational' (green), 'attention' (red), 'neutral'
    ledStatus: 'green',
    spec: 'PTC Ceramic 3.8 kW',
    image: '/assets/crop_heating.jpg',
    replacementCycle: 'Scheduled 5-year swap',
    electricalProngs: 'Triple-prong 240V high-amp bus connector',
    lastService: 'Installed Oct 14, 2024',
    nextDue: 'Oct 2029',
  },
  {
    id: 'evaporator',
    name: 'Evaporator Coil Cassette',
    shortName: 'Evaporator',
    slot: 2,
    position: 'Module 2',
    description: 'Designed to be easily removed and swapped to reduce downtime and eliminate on-site troubleshooting.',
    lifeMonths: 48,
    usedMonths: 9,
    status: 'operational',
    ledStatus: 'green',
    spec: 'Micro-Channel R-454B Eco Coil',
    image: '/assets/crop_evaporator.jpg',
    replacementCycle: 'Scheduled 4-year swap',
    electricalProngs: 'Dual-sensor bus & sealed refrigerant self-sealing couplers',
    lastService: 'Inspected Oct 14, 2024',
    nextDue: 'Oct 2028',
  },
  {
    id: 'blower',
    name: 'Modular Blower Array',
    shortName: 'Quad Blower',
    slot: 3,
    position: 'Module 3',
    description: 'Allows for quick swaps, maintaining consistent airflow with quad brushless DC blower fans.',
    lifeMonths: 36,
    usedMonths: 18,
    status: 'operational',
    ledStatus: 'green',
    spec: '4x Brushless DC Blower Motors (480 CFM)',
    image: '/assets/crop_blower.jpg',
    replacementCycle: 'Scheduled 3-year swap',
    electricalProngs: 'Rear electrical prongs deliver instant power upon docking without wiring',
    lastService: 'Routine cycle check',
    nextDue: 'Oct 2027',
  },
  {
    id: 'filtration',
    name: 'Modular Filtration Compartment',
    shortName: 'Smart Filter',
    slot: 4,
    position: 'Lower Module 4',
    description: 'Seasons of internally stored filter material are automatically dispensed on a scheduled cycle.',
    lifeMonths: 3, // 90 days
    usedDays: 69,
    daysRemaining: 21,
    status: 'operational',
    ledStatus: 'green',
    spec: '4-Season Continuous Media Dispenser (MERV 14)',
    image: '/assets/crop_filtration.jpg',
    replacementCycle: 'Scheduled 90-day media cycle / Annual multi-season cassette swap',
    electricalProngs: 'Drive stepper motor prongs & static pressure monitor bus',
    lastService: 'Auto-advance completed 9 days ago',
    nextDue: 'In 21 days',
  },
];

export const FACEPLATE_COLORS = [
  {
    id: 'white',
    name: 'Polar White',
    hex: '#F8FAFC',
    borderHex: '#E2E8F0',
    textDark: true,
    image: '/assets/unit_white_isolated.jpg',
    bgPreview: 'bg-white',
    badge: 'Factory Standard',
  },
  {
    id: 'tan',
    name: 'Architectural Tan',
    hex: '#C8B69E',
    borderHex: '#B5A28A',
    textDark: true,
    image: '/assets/unit_tan_isolated.jpg',
    bgPreview: 'bg-[#C8B69E]',
    badge: 'Warm Interior',
  },
  {
    id: 'red',
    name: 'Heritage Red',
    hex: '#C83228',
    borderHex: '#A3241C',
    textDark: false,
    image: '/assets/unit_red_isolated.jpg',
    bgPreview: 'bg-[#C83228]',
    badge: 'Statement Accent',
  },
  {
    id: 'blue',
    name: 'Deep Navy Blue',
    hex: '#1E3A8A',
    borderHex: '#172554',
    textDark: false,
    image: '/assets/unit_blue_isolated.jpg',
    bgPreview: 'bg-[#1E3A8A]',
    badge: 'Contemporary Cool',
  },
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'filter',
    severity: 'info',
    title: 'Filtration Auto-Advance Scheduled',
    message: 'Continuous filter roll will advance to fresh media section in 21 days. Internally stored roll has 3 seasons remaining.',
    time: '2 hours ago',
    read: false,
    badge: 'Filter Care',
  },
  {
    id: 'notif-2',
    type: 'sync',
    severity: 'success',
    title: 'Prong Bus Synchronized',
    message: 'All 4 modular compartments (Heating, Evaporator, Blower, Filtration) are fully seated and communicating over the high-speed bus.',
    time: 'Yesterday at 9:15 AM',
    read: false,
    badge: 'System Sync',
  },
  {
    id: 'notif-3',
    type: 'energy',
    severity: 'info',
    title: 'Peak Energy Efficiency Reached',
    message: 'Your NO-TECH system achieved a 98.4% efficiency rating during afternoon cooling cycle.',
    time: '2 days ago',
    read: true,
    badge: 'Energy',
  },
  {
    id: 'notif-4',
    type: 'maintenance',
    severity: 'warning',
    title: 'Seasonal swap reminder',
    message: 'Quad Blower motor array has reached 18 months of its 36-month swap lifecycle. Operational status remains optimal (Green).',
    time: '5 days ago',
    read: true,
    badge: 'Maintenance',
  },
];

export const ENERGY_DATA = {
  daily: [
    { label: '12 AM', kwh: 0.6, cost: 0.08 },
    { label: '3 AM', kwh: 0.4, cost: 0.06 },
    { label: '6 AM', kwh: 0.9, cost: 0.13 },
    { label: '9 AM', kwh: 1.4, cost: 0.20 },
    { label: '12 PM', kwh: 2.1, cost: 0.29 },
    { label: '3 PM', kwh: 2.6, cost: 0.36 },
    { label: '6 PM', kwh: 2.2, cost: 0.31 },
    { label: '9 PM', kwh: 1.2, cost: 0.17 },
  ],
  weekly: [
    { label: 'Mon', kwh: 11.4, cost: 1.60 },
    { label: 'Tue', kwh: 10.2, cost: 1.43 },
    { label: 'Wed', kwh: 12.8, cost: 1.79 },
    { label: 'Thu', kwh: 11.9, cost: 1.67 },
    { label: 'Fri', kwh: 13.5, cost: 1.89 },
    { label: 'Sat', kwh: 14.2, cost: 1.99 },
    { label: 'Sun', kwh: 12.1, cost: 1.69 },
  ],
  monthly: [
    { label: 'W1', kwh: 82, cost: 11.48 },
    { label: 'W2', kwh: 79, cost: 11.06 },
    { label: 'W3', kwh: 86, cost: 12.04 },
    { label: 'W4', kwh: 74, cost: 10.36 },
  ],
  rates: {
    costPerKwh: 0.14,
    monthlyEstimated: 44.94,
    co2OffsetLbs: 142,
    efficiencyScore: '98.2%',
  },
  tips: [
    {
      id: 'tip-1',
      title: 'Auto Eco Night Setback',
      desc: 'Let temperature rise 2°F during deep sleep hours (1 AM - 5 AM).',
      saving: 'Save ~8% ($3.60/mo)',
    },
    {
      id: 'tip-2',
      title: 'Smart Pre-Cooling Cycle',
      desc: 'Pre-cool living spaces 30 minutes before 2 PM peak tariff window.',
      saving: 'Save ~14% ($6.20/mo)',
    },
    {
      id: 'tip-3',
      title: 'Dispenser Media Optimization',
      desc: 'Automatic media advance maintains lowest airflow resistance, saving 42W blower draw.',
      saving: 'Active & Optimizing',
    },
  ]
};

export const SYSTEM_SPECS = {
  model: 'NO-TECH VIVID-400 In-Wall HVAC',
  serialNumber: 'NT-8492-2026-X',
  formFactor: 'Flush In-Wall Modular Vertical Cassette',
  dimensions: '14.5" W × 48.0" H × 4.0" D (Fits standard 16" stud bay)',
  powerSupply: '208/240 VAC, Single Phase, 60 Hz',
  totalBlowerAirflow: '480 CFM Maximum',
  nominalTonnage: '2.5 Ton Dynamic Inverter',
  busArchitecture: 'NO-TECH Instant-Dock Quick Prong Interlock',
  certification: 'UL 1995 / CSA C22.2 / AHRI Certified',
  warranty: '10-Year Modular Replacement Guarantee',
  contractor: {
    company: 'Apex Climate Solutions Inc.',
    technician: 'Marcus Vance (Cert #88219)',
    phone: '1-800-555-NOTECH',
    installedDate: 'October 14, 2024',
  }
};
