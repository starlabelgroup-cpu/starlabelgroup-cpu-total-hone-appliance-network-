export const PHONE = '954-931-7997'
export const EMAIL = 'service@topspeedappliance.net'
export const SERVICE_OS = 'https://topspeedserviceos.com'

export const APPLIANCES = [
  'Refrigerator', 'Washer', 'Dryer', 'Oven & Range', 'Dishwasher',
  'Freezer & Ice Maker', 'Microwave', 'Cooktop', 'Garbage Disposal', 'Wine Cooler',
]

export const CORE_CITIES = [
  'Coral Springs', 'Sunrise', 'Plantation', 'Fort Lauderdale',
  'Coconut Creek', 'Pompano Beach', 'Deerfield Beach', 'Margate',
  'Tamarac', 'Davie', 'Weston', 'Parkland', 'Lauderhill',
  'Hollywood', 'Pembroke Pines', 'Miramar',
]

/** Cities where the network is actively recruiting providers right now. */
export const RECRUITING_CITIES = ['Margate', 'Tamarac', 'Lauderhill', 'Deerfield Beach', 'Weston', 'Parkland']

export const EXPANSION_ZONES = [
  { name: 'Palm Beach County', note: 'Planned expansion — not yet dispatching' },
  { name: 'Miami-Dade County', note: 'Planned expansion — not yet dispatching' },
  { name: 'Northern Broward / South Palm Beach corridor', note: 'Planned expansion — coverage being mapped' },
]

export const REQUIREMENTS = [
  { title: 'Appliance repair experience', text: 'Hands-on experience diagnosing and repairing residential appliances — your own work history, verifiable at interview.' },
  { title: 'Your own tools & vehicle', text: 'A stocked service vehicle and the standard diagnostic and repair tools for the appliances you service.' },
  { title: 'Insurance', text: 'Active business liability insurance, documented before your first dispatch.' },
  { title: 'Background check', text: 'Every network provider passes a background check before entering customer homes.' },
  { title: 'Smartphone for dispatch', text: 'Jobs arrive, get accepted, and get documented through the dispatch app — a smartphone is required on every job.' },
  { title: 'Based in the coverage area', text: 'You live and work inside the Broward coverage area so windows you accept are windows you can keep.' },
]

export const STANDARDS = [
  { title: 'Confirm through the setter', text: 'Every job is confirmed by a human Service Setter before dispatch. The setter confirmation is the job — not a text, not a voicemail.' },
  { title: 'Arrive inside the window', text: 'The window on the dispatch is the promise the customer was given. Running late? Call the setter before the window closes.' },
  { title: 'Document with photos', text: 'Before, during, and after photos on every job, uploaded through the app. Photos protect you, the customer, and the network.' },
  { title: 'Invoice through the platform', text: 'All network work is invoiced through the platform under your provider agreement. No off-platform billing for network jobs.' },
  { title: 'No side deals', text: 'Network customers are network customers. Taking a network customer off-platform ends the provider relationship.' },
  { title: 'Leave it cleaner than you found it', text: 'Panels back on, area wiped down, old parts offered to the customer. The next provider visit starts with your reputation.' },
]

export type NetworkJob = {
  id: string
  appliance: string
  problem: string
  city: string
  window: string
  status: 'Awaiting acceptance' | 'Assigned' | 'En route' | 'Completed'
  customerNote: string
}

// Production: the dispatch board starts empty (reset to zero at the
// production launch on November 17, 2026). Jobs are dispatched by human
// Service Setters through Top Speed Service OS and appear here as they flow.
export const NETWORK_JOBS: NetworkJob[] = []

export type NetworkProvider = {
  id: string
  name: string
  company: string
  zone: string
  trades: string
  rating: string
  jobsDone: string
  status: 'Active' | 'On a job' | 'In verification'
}

// Production: the roster starts empty and fills as providers complete
// verification and sign the provider agreement.
export const NETWORK_PROVIDERS: NetworkProvider[] = []

export const FAQS = [
  {
    q: 'How does dispatch actually work?',
    a: 'A customer books through a Top Speed channel. A human Service Setter confirms the job — appliance, problem, address, and window — and only then is it dispatched through Top Speed Service OS to a network provider whose zone and trades match. You see the confirmed job in the portal and accept or decline it.',
  },
  {
    q: 'What happens when I decline a job?',
    a: 'Nothing punitive. Declining is information: the job goes back to the setter, who dispatches the next matching provider. Decline early rather than late — a fast decline keeps the customer’s window intact and your standing in good shape.',
  },
  {
    q: 'How and when do I get paid?',
    a: 'Rates and payment terms are set in your signed provider agreement — they are agreed in writing before your first dispatch, and all network work is invoiced through the platform. This page deliberately does not quote rates or schedules, because yours are the ones in your agreement.',
  },
  {
    q: 'What quality checks does the network run?',
    a: 'Photo documentation on every job, customer follow-up after completion, and setter review of flagged jobs. Repeat issues on the same appliance are reviewed with the provider — the goal is a fix, not a gotcha, but standards are enforced.',
  },
  {
    q: 'How are disputes handled?',
    a: 'By humans. Billing, workmanship, and customer disputes are reviewed by the Service OS team with the job record — setter notes, photos, and invoices — in front of them. You get to tell your side with the documentation to back it.',
  },
  {
    q: 'Can I take network customers as my own clients?',
    a: 'No. Network customers stay network customers — that is the deal that keeps work flowing to every provider in the network, including you. Side deals end the provider relationship.',
  },
  {
    q: 'Is this portal the real dispatch system?',
    a: 'Dispatch runs in Top Speed Service OS, coordinated by the Service Setters — that is where jobs are confirmed and assigned today. This portal is the provider front door: where you apply, see the standards, and where your dispatched work and compliance status are surfaced.',
  },
]
