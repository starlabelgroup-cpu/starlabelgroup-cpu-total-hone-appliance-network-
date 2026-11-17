type P = { size?: number; className?: string }

const S = ({ size = 22, className, children, vb = '0 0 24 24' }: P & { children: React.ReactNode; vb?: string }) => (
  <svg width={size} height={size} viewBox={vb} fill="none" className={className} aria-hidden="true">{children}</svg>
)

export const Logo = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="than-lg" x1="0" y1="0" x2="48" y2="48">
        <stop offset="0%" stopColor="#2E7CF6" />
        <stop offset="100%" stopColor="#1663D9" />
      </linearGradient>
    </defs>
    <rect x="1.5" y="1.5" width="45" height="45" rx="12" fill="#10151D" stroke="url(#than-lg)" strokeWidth="2.5" />
    {/* house outline formed by network links */}
    <path d="M10 22 L24 10 L38 22" stroke="#2E7CF6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 20 V36 H34 V20" stroke="#2E7CF6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    {/* wrench formed by nodes */}
    <circle cx="24" cy="26" r="3.2" fill="#A3E635" />
    <path d="M26.4 28.6 L31 33.2" stroke="#A3E635" strokeWidth="2.6" strokeLinecap="round" />
    {/* network nodes on the roof line */}
    <circle cx="10" cy="22" r="2.4" fill="#2E7CF6" />
    <circle cx="24" cy="10" r="2.4" fill="#A3E635" />
    <circle cx="38" cy="22" r="2.4" fill="#2E7CF6" />
    <circle cx="17" cy="16" r="1.6" fill="#2E7CF6" />
    <circle cx="31" cy="16" r="1.6" fill="#2E7CF6" />
  </svg>
)

export const I = {
  network: (p: P) => (<S {...p}><circle cx="5" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.8" /><circle cx="19" cy="5.5" r="2.4" stroke="currentColor" strokeWidth="1.8" /><circle cx="19" cy="18.5" r="2.4" stroke="currentColor" strokeWidth="1.8" /><path d="M7.2 10.8 L16.8 6.6 M7.2 13.2 L16.8 17.4 M19 7.9 V16.1" stroke="currentColor" strokeWidth="1.8" /></S>),
  wrench: (p: P) => (<S {...p}><path d="M14.5 6.5a4.2 4.2 0 0 1 5.6-4L17.7 5l1.6 1.6 2.4-2.4a4.2 4.2 0 0 1-5.5 5.3L8 17.7a2 2 0 0 1-2.8-2.8l8.2-8.2c-.3-.1-.6-.2-.9-.2z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" transform="translate(-3.4 1.4) scale(0.92)" /></S>),
  dispatch: (p: P) => (<S {...p}><path d="M12 3v3 M12 18v3 M3 12h3 M18 12h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.8" /><path d="M12 8.6v3.4l2.4 1.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></S>),
  shield: (p: P) => (<S {...p}><path d="M12 3l7 2.6v5.2c0 4.6-3 8.4-7 10.2-4-1.8-7-5.6-7-10.2V5.6L12 3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M9 11.6l2.2 2.2 3.8-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></S>),
  clipboard: (p: P) => (<S {...p}><rect x="5.5" y="4.5" width="13" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" /><path d="M9.5 4.5a2.5 2.5 0 0 1 5 0 M8.8 11h6.4 M8.8 14.6h6.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></S>),
  mapPin: (p: P) => (<S {...p}><path d="M12 21s-6.5-5.4-6.5-10.4A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.6C18.5 15.6 12 21 12 21z" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="10.4" r="2.3" stroke="currentColor" strokeWidth="1.8" /></S>),
  phone: (p: P) => (<S {...p}><path d="M5 4h4l1.5 4.5L8 10a12.5 12.5 0 0 0 6 6l1.5-2.5L20 15v4a1.8 1.8 0 0 1-2 1.8C10.5 20.3 3.7 13.5 3.2 6A1.8 1.8 0 0 1 5 4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></S>),
  mail: (p: P) => (<S {...p}><rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" /><path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></S>),
  briefcase: (p: P) => (<S {...p}><rect x="3.5" y="8" width="17" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" /><path d="M9 8V6.5A1.8 1.8 0 0 1 10.8 4.7h2.4A1.8 1.8 0 0 1 15 6.5V8 M3.5 13h17" stroke="currentColor" strokeWidth="1.8" /></S>),
  money: (p: P) => (<S {...p}><rect x="3" y="6.5" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.8" /><path d="M6.2 9.4h.01 M17.8 14.6h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></S>),
  check: (p: P) => (<S {...p}><path d="M4.5 12.5l5 5 10-11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></S>),
  x: (p: P) => (<S {...p}><path d="M6 6l12 12 M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></S>),
  clock: (p: P) => (<S {...p}><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" /><path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></S>),
  truck: (p: P) => (<S {...p}><path d="M3 7h11v9H3z M14 10h4l3 3v3h-7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><circle cx="7" cy="18" r="1.8" stroke="currentColor" strokeWidth="1.6" /><circle cx="17" cy="18" r="1.8" stroke="currentColor" strokeWidth="1.6" /></S>),
  tools: (p: P) => (<S {...p}><path d="M11 4.5a3.4 3.4 0 0 1 4.4 4.4L8 16.3a1.9 1.9 0 0 1-2.7-2.7l7.4-7.4" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" transform="rotate(8 12 12)" /><path d="M15.5 15.5l4.7 4.7 M18 13l3 3-1.8 1.8-3-3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></S>),
  idBadge: (p: P) => (<S {...p}><rect x="5" y="3.5" width="14" height="17" rx="2" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.7" /><path d="M8.4 17c.7-1.8 2-2.7 3.6-2.7s2.9.9 3.6 2.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></S>),
  camera: (p: P) => (<S {...p}><rect x="3.5" y="7.5" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" /><path d="M9 7.5L10.2 5h3.6L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><circle cx="12" cy="13.4" r="3" stroke="currentColor" strokeWidth="1.8" /></S>),
  star: (p: P) => (<S {...p}><path d="M12 4l2.3 4.9 5.4.7-3.9 3.8 1 5.3L12 16.2l-4.8 2.5 1-5.3L4.3 9.6l5.4-.7L12 4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></S>),
  users: (p: P) => (<S {...p}><circle cx="9" cy="8.5" r="3.2" stroke="currentColor" strokeWidth="1.8" /><path d="M3.5 19c.8-3 2.9-4.5 5.5-4.5s4.7 1.5 5.5 4.5 M16 5.7a3.2 3.2 0 0 1 0 5.9 M17.8 14.9c1.5.7 2.4 2 2.8 4.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></S>),
  arrow: (p: P) => (<S {...p}><path d="M4 12h15 M13.5 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></S>),
  alert: (p: P) => (<S {...p}><path d="M12 4L2.8 19.5h18.4L12 4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M12 10v4.2 M12 16.8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></S>),
  fridge: (p: P) => (<S {...p}><rect x="6.5" y="3.5" width="11" height="17" rx="1.6" stroke="currentColor" strokeWidth="1.8" /><path d="M6.5 9.5h11 M9.3 6.2v1.6 M9.3 12.4v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></S>),
  washer: (p: P) => (<S {...p}><rect x="5" y="3.5" width="14" height="17" rx="1.8" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.8" /><path d="M8 13c1.2 1.4 2.6-1.4 4 0s2.8-1.4 4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M8 6.4h.01 M11 6.4h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></S>),
  oven: (p: P) => (<S {...p}><rect x="4.5" y="5" width="15" height="15" rx="1.8" stroke="currentColor" strokeWidth="1.8" /><path d="M4.5 10h15 M7 13.4h10v3.4H7z" stroke="currentColor" strokeWidth="1.7" /><path d="M7.5 7.6h.01 M12 7.6h.01 M16.5 7.6h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></S>),
  board: (p: P) => (<S {...p}><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" /><path d="M4 9.3h16 M9.3 9.3V20" stroke="currentColor" strokeWidth="1.6" /></S>),
  doc: (p: P) => (<S {...p}><path d="M7 3.5h7L18.5 8v12.5h-11.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M13.8 3.8V8.2h4.4 M9.5 12.5h5 M9.5 16h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></S>),
}
