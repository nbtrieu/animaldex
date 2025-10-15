// In your AnimalDexLogo.tsx file
export const AnimalDexLogo = ({ width = 40, height = 40 }: { width?: number; height?: number }) => (
  <svg width={width} height={height} viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0d9488" stopOpacity="1" />
        <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
      </linearGradient>
    </defs>
    <path 
      d="M 90 10 L 160 50 L 160 130 L 90 170 L 20 130 L 20 50 Z"
      fill="url(#hexGrad)"
      stroke="#065f46"
      strokeWidth="3"
    />
    <g transform="translate(90, 90)">
      <ellipse cx="0" cy="0" rx="25" ry="30" fill="#fff" opacity="0.95"/>
      <path d="M -18 -25 L -25 -50 L -8 -28 Z" fill="#fff" opacity="0.95"/>
      <path d="M 18 -25 L 25 -50 L 8 -28 Z" fill="#fff" opacity="0.95"/>
      <ellipse cx="0" cy="10" rx="15" ry="12" fill="#fff" opacity="0.95"/>
      <circle cx="-8" cy="-5" r="3" fill="#065f46"/>
      <circle cx="8" cy="-5" r="3" fill="#065f46"/>
      <circle cx="0" cy="8" r="2.5" fill="#065f46"/>
      <ellipse cx="0" cy="35" rx="20" ry="15" fill="#fff" opacity="0.95"/>
      <path d="M 18 30 Q 35 25 40 35 Q 35 45 25 40" fill="#fff" opacity="0.95"/>
    </g>
    <line x1="90" y1="10" x2="90" y2="170" stroke="#065f46" strokeWidth="1" opacity="0.3"/>
    <line x1="20" y1="90" x2="160" y2="90" stroke="#065f46" strokeWidth="1" opacity="0.3"/>
  </svg>
);