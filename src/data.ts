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

/** Cities where the network is actively recruiting providers right now (demo ops data). */
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

export type DemoJob = {
  id: string
  appliance: string
  problem: string
  city: string
  window: string
  status: 'Awaiting acceptance' | 'Assigned' | 'En route' | 'Completed'
  customerNote: string
}

export const DEMO_JOBS: DemoJob[] = [
  { id: 'NET-2201', appliance: 'Refrigerator', problem: 'Not cooling, freezer side warm', city: 'Coral Springs', window: 'Today · 12pm–2pm', status: 'Awaiting acceptance', customerNote: 'Gate code on file with the setter. Two-story home, fridge in kitchen.' },
  { id: 'NET-2202', appliance: 'Washer', problem: 'Won’t drain, standing water in drum', city: 'Margate', window: 'Today · 2pm–4pm', status: 'Awaiting acceptance', customerNote: 'Laundry on first floor. Customer has towels down around the unit.' },
  { id: 'NET-2203', appliance: 'Oven & Range', problem: 'Bake element not heating', city: 'Plantation', window: 'Tomorrow · 9am–11am', status: 'Assigned', customerNote: 'Electric range. Customer confirmed through the setter this morning.' },
  { id: 'NET-2204', appliance: 'Dryer', problem: 'Runs but no heat', city: 'Sunrise', window: 'Tomorrow · 11am–1pm', status: 'En route', customerNote: 'Second visit — thermal fuse replaced last week, still no heat. Bring full heating circuit kit.' },
  { id: 'NET-2205', appliance: 'Dishwasher', problem: 'Leaking from door during cycle', city: 'Fort Lauderdale', window: 'Yesterday · 10am–12pm', status: 'Completed', customerNote: 'Door gasket replaced. Photos and invoice submitted through the platform.' },
]

export type DemoProvider = {
  id: string
  name: string
  company: string
  zone: string
  trades: string
  rating: string
  jobsDone: string
  status: 'Active' | 'On a job' | 'In verification'
}

export const DEMO_PROVIDERS: DemoProvider[] = [
  { id: 'P-101', name: 'Demo Provider A', company: 'Solo tech — refrigeration focus', zone: 'Coral Springs · Coconut Creek', trades: 'Refrigerator, Freezer & Ice Maker', rating: '4.9 (demo)', jobsDone: 'Demo record', status: 'On a job' },
  { id: 'P-102', name: 'Demo Provider B', company: 'Two-tech laundry specialist crew', zone: 'Margate · Tamarac · Sunrise', trades: 'Washer, Dryer', rating: '4.8 (demo)', jobsDone: 'Demo record', status: 'Active' },
  { id: 'P-103', name: 'Demo Provider C', company: 'Solo tech — cooking appliances', zone: 'Plantation · Davie · Weston', trades: 'Oven & Range, Cooktop, Microwave', rating: '5.0 (demo)', jobsDone: 'Demo record', status: 'Active' },
  { id: 'P-104', name: 'Demo Provider D', company: 'Small company — 3 techs, full line', zone: 'Fort Lauderdale · Hollywood', trades: 'All residential appliances', rating: '4.7 (demo)', jobsDone: 'Demo record', status: 'In verification' },
]

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
    a: 'No — this platform is a working prototype and the provider portal here is a preview running on demo data. Real dispatch today happens in Top Speed Service OS, coordinated by the Service Setters.',
  },
]
