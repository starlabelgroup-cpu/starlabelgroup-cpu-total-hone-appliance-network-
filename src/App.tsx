import { useMemo, useState } from 'react'
import { Logo, I } from './icons'
import {
  buildApplicationPayload, submitApplication, validateApplication,
  type ApplicationForm, type Attribution,
} from './submit'
import {
  PHONE, EMAIL, SERVICE_OS, APPLIANCES, CORE_CITIES, RECRUITING_CITIES,
  EXPANSION_ZONES, REQUIREMENTS, STANDARDS, DEMO_JOBS, DEMO_PROVIDERS, FAQS,
  type DemoJob,
} from './data'

type Screen = 'home' | 'join' | 'coverage' | 'portal' | 'hq' | 'standards'

const NAV: { id: Screen; label: string }[] = [
  { id: 'home', label: 'Network' },
  { id: 'join', label: 'Join / Apply' },
  { id: 'coverage', label: 'Coverage' },
  { id: 'portal', label: 'Provider Portal' },
  { id: 'hq', label: 'Network HQ' },
  { id: 'standards', label: 'Standards & FAQ' },
]

/** First-touch landing attribution (UTM + ad-platform click IDs),
 *  passed through to Service OS with the application. */
function useAttribution(): Attribution {
  return useMemo(() => {
    const p = new URLSearchParams(window.location.search)
    const attribution: Attribution = {}
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'gclid', 'fbclid', 'msclkid'] as const) {
      const v = p.get(k)
      if (v) attribution[k] = v
    }
    return attribution
  }, [])
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const go = (s: Screen) => { setScreen(s); window.scrollTo({ top: 0 }) }

  return (
    <div className="app">
      <div className="proto-bar">
        Working prototype — the provider portal and HQ views run on labeled demo data. Real dispatch happens in Top Speed Service OS.
      </div>
      <header className="header">
        <button className="brand" onClick={() => go('home')} aria-label="Total Home Appliance Network home">
          <Logo size={42} />
          <span className="brand-text">
            <strong>TOTAL HOME APPLIANCE</strong>
            <em>NETWORK · BY TOP SPEED APPLIANCE</em>
          </span>
        </button>
        <nav className="nav">
          {NAV.map(n => (
            <button key={n.id} className={screen === n.id ? 'on' : ''} onClick={() => go(n.id)}>{n.label}</button>
          ))}
        </nav>
        <a className="header-call" href={`tel:${PHONE.replace(/-/g, '')}`}><I.phone size={17} /> {PHONE}</a>
      </header>

      <main>
        {screen === 'home' && <Home go={go} />}
        {screen === 'join' && <Join />}
        {screen === 'coverage' && <Coverage go={go} />}
        {screen === 'portal' && <Portal />}
        {screen === 'hq' && <HQ go={go} />}
        {screen === 'standards' && <Standards />}
      </main>

      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="brand foot-brand"><Logo size={36} /><span className="brand-text"><strong>TOTAL HOME APPLIANCE</strong><em>NETWORK</em></span></div>
            <p>The subcontractor provider network of Top Speed Appliance. Independent repair pros, dispatched work, one set of standards.</p>
          </div>
          <div>
            <h4>Network</h4>
            <button onClick={() => go('join')}>Join / Apply</button>
            <button onClick={() => go('coverage')}>Coverage & Zones</button>
            <button onClick={() => go('portal')}>Provider Portal (preview)</button>
            <button onClick={() => go('hq')}>Network HQ</button>
            <button onClick={() => go('standards')}>Standards & FAQ</button>
          </div>
          <div>
            <h4>The ecosystem</h4>
            <a href={SERVICE_OS} target="_blank" rel="noreferrer">Top Speed Service OS ↗</a>
            <a href="https://appliance-connect.vercel.app" target="_blank" rel="noreferrer">Appliance Connect (customers) ↗</a>
            <a href="https://gateway-express-one.vercel.app" target="_blank" rel="noreferrer">Gateway Express ↗</a>
            <a href={`${SERVICE_OS}/book`} target="_blank" rel="noreferrer">Book a repair ↗</a>
            <a href={`${SERVICE_OS}/speedy`} target="_blank" rel="noreferrer">Talk to Speedy ↗</a>
            <a href={`${SERVICE_OS}/track`} target="_blank" rel="noreferrer">Track a job ↗</a>
            <p className="foot-note">Customer looking for a repair? Book it, track it, or ask Speedy — the real AI assistant — in Top Speed Service OS. This network is the provider side.</p>
          </div>
          <div>
            <h4>Talk to the network team</h4>
            <a href={`tel:${PHONE.replace(/-/g, '')}`}>Call / text {PHONE}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <p className="foot-note">Applications submit through this site straight into Top Speed Service OS — the network team reviews every one by hand. Prefer to talk first? Call or email.</p>
          </div>
        </div>
        <p className="disclaimer">Total Home Appliance Network is a working prototype. Portal and HQ figures are demo data. Rates and payment terms for providers are set in the signed provider agreement — nothing on this site quotes them. Dispatch is coordinated by human Service Setters through Top Speed Service OS.</p>
      </footer>
    </div>
  )
}

/* ---------------- HOME ---------------- */

function Home({ go }: { go: (s: Screen) => void }) {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <p className="eyebrow"><I.network size={16} /> THE PROVIDER NETWORK OF TOP SPEED APPLIANCE</p>
          <h1>Your tools. Our customers. <span className="lime">One network.</span></h1>
          <p className="hero-sub">
            Total Home Appliance Network dispatches confirmed appliance repair jobs to independent techs and
            small repair companies across Broward County. You bring the tools, the truck, and the craft —
            the network brings the customers.
          </p>
          <div className="hero-ctas">
            <button className="btn primary" onClick={() => go('join')}>Apply to join <I.arrow size={18} /></button>
            <button className="btn ghost" onClick={() => go('portal')}>See the provider portal</button>
          </div>
          <div className="hero-points">
            <span><I.check size={16} /> Jobs confirmed by a human setter before dispatch</span>
            <span><I.check size={16} /> No marketing cost — work comes to you</span>
            <span><I.check size={16} /> Terms in writing, in your signed agreement</span>
          </div>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow center">HOW IT WORKS</p>
        <h2 className="center">From application to paid work</h2>
        <div className="steps">
          {[
            { n: '1', t: 'Apply', d: 'Tell us who you are, where you’re based, and what you fix — the application lands with the network team in Service OS, and they call you to verify.', icon: I.clipboard },
            { n: '2', t: 'Verify', d: 'Insurance documented, background check completed, experience confirmed. Verification is what lets customers trust a stranger at the door — including you.', icon: I.shield },
            { n: '3', t: 'Get dispatched', d: 'Setters confirm every job with the customer first, then dispatch through Service OS to the provider whose zone and trades match.', icon: I.dispatch },
            { n: '4', t: 'Complete & get paid', d: 'Run the job, document it with photos, invoice through the platform. Rates and payment terms are set in your signed provider agreement.', icon: I.money },
          ].map(s => (
            <div key={s.n} className="step-card">
              <span className="step-n">{s.n}</span>
              <span className="step-ic"><s.icon size={26} /></span>
              <h3>{s.t}</h3><p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section alt">
        <div className="two-col">
          <div>
            <p className="eyebrow">WHY PROS JOIN</p>
            <h2>Steady dispatched work, without the marketing bill</h2>
            <ul className="tick-list">
              <li><I.check size={18} /><span><strong>Confirmed jobs only.</strong> A human setter verifies the appliance, the problem, and the window before a job ever reaches you.</span></li>
              <li><I.check size={18} /><span><strong>No ads, no lead auctions.</strong> You don’t buy leads or bid against other techs. Work is dispatched by zone and trade.</span></li>
              <li><I.check size={18} /><span><strong>One channel for paperwork.</strong> Jobs, photos, and invoices live in one platform instead of scattered texts and paper tickets.</span></li>
              <li><I.check size={18} /><span><strong>Your business stays yours.</strong> You’re an independent provider, not an employee — take the jobs that fit your week.</span></li>
            </ul>
            <button className="btn primary" onClick={() => go('join')}>Start an application <I.arrow size={18} /></button>
          </div>
          <div className="req-card">
            <h3><I.idBadge size={20} /> What the network requires</h3>
            <ul>
              {REQUIREMENTS.map(r => <li key={r.title}><strong>{r.title}</strong><span>{r.text}</span></li>)}
            </ul>
            <button className="btn ghost full" onClick={() => go('standards')}>Read the network standards</button>
          </div>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow center">COVERAGE</p>
        <h2 className="center">Broward County today — growing by plan, not by promise</h2>
        <p className="center sub">Core Broward is actively dispatching and recruiting. Expansion beyond Broward is planned and labeled that way until the first job runs there.</p>
        <div className="chip-row center">
          {CORE_CITIES.slice(0, 8).map(c => <span key={c} className="chip">{c}</span>)}
          <span className="chip more">+ {CORE_CITIES.length - 8} more Broward cities</span>
        </div>
        <div className="center"><button className="btn ghost" onClick={() => go('coverage')}>See zones & recruiting cities</button></div>
      </section>

      <section className="cta-band">
        <h2>Turning wrenches beats chasing leads.</h2>
        <p>Apply once, get verified, and let confirmed work come to you.</p>
        <div className="hero-ctas">
          <button className="btn primary" onClick={() => go('join')}>Apply to join</button>
          <a className="btn ghost light" href={`tel:${PHONE.replace(/-/g, '')}`}><I.phone size={17} /> {PHONE}</a>
        </div>
      </section>
    </>
  )
}

/* ---------------- JOIN / APPLY ---------------- */

type JoinStatus =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'success'; reference: string }
  | { kind: 'error'; message: string }

function Join() {
  const attribution = useAttribution()
  const [form, setForm] = useState<ApplicationForm>({
    name: '', company: '', phone: '', email: '', city: 'Coral Springs',
    trades: [] as string[], years: '', insurance: '', message: '',
  })
  const [status, setStatus] = useState<JoinStatus>({ kind: 'idle' })

  const toggleTrade = (t: string) =>
    setForm(f => ({ ...f, trades: f.trades.includes(t) ? f.trades.filter(x => x !== t) : [...f.trades, t] }))

  const submit = async () => {
    const problem = validateApplication(form)
    if (problem) {
      setStatus({ kind: 'error', message: problem })
      return
    }
    setStatus({ kind: 'sending' })
    try {
      const page = window.location.href.split('#')[0]
      const { reference } = await submitApplication(buildApplicationPayload(form, attribution, page))
      setStatus({ kind: 'success', reference })
    } catch {
      setStatus({
        kind: 'error',
        message: 'That didn’t send — nothing was submitted. Check your connection and try again, or apply by phone or email instead:',
      })
    }
  }

  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent('Provider application — Total Home Appliance Network')}&body=${encodeURIComponent(
    `Name: ${form.name}\nCompany: ${form.company}\nPhone: ${form.phone}\nEmail: ${form.email}\nBase city: ${form.city}\nAppliances serviced: ${form.trades.join(', ') || '—'}\nYears of experience: ${form.years}\nInsurance: ${form.insurance}\n\n${form.message}`,
  )}`

  return (
    <section className="section page">
      <p className="eyebrow">JOIN THE NETWORK</p>
      <h1>Apply as a provider</h1>
      <p className="sub wide">
        Independent techs and small repair companies take dispatched work through the network. Apply here —
        your application goes straight to the network team in Top Speed Service OS. Verification is part of
        the deal, and it's what makes the work steady.
      </p>

      <div className="two-col form-layout">
        <form className="form-card" onSubmit={e => { e.preventDefault(); void submit() }}>
          <h3>Application details</h3>
          <div className="form-grid">
            <label>Your name<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full name" /></label>
            <label>Company (if any)<input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Company or 'solo tech'" /></label>
            <label>Phone<input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Best number for dispatch" /></label>
            <label>Email<input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" /></label>
            <label>Base city
              <select value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}>
                {CORE_CITIES.map(c => <option key={c}>{c}</option>)}
                <option>Outside Broward (expansion interest)</option>
              </select>
            </label>
            <label>Years of experience
              <select value={form.years} onChange={e => setForm({ ...form, years: e.target.value })}>
                <option value="">Select…</option><option>1–2 years</option><option>3–5 years</option><option>6–10 years</option><option>10+ years</option>
              </select>
            </label>
            <label>Business liability insurance
              <select value={form.insurance} onChange={e => setForm({ ...form, insurance: e.target.value })}>
                <option value="">Select…</option><option>Yes — active policy</option><option>Not yet — willing to obtain</option><option>No</option>
              </select>
            </label>
          </div>
          <fieldset className="trades">
            <legend>Appliances you service</legend>
            <div className="chip-row">
              {APPLIANCES.map(a => (
                <button type="button" key={a} className={`chip toggle ${form.trades.includes(a) ? 'on' : ''}`} onClick={() => toggleTrade(a)}>{a}</button>
              ))}
            </div>
          </fieldset>
          <label className="full-label">Anything we should know<textarea rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Crew size, specialties, languages, second-truck plans…" /></label>

          <button className="btn primary full" type="submit" disabled={status.kind === 'sending'}>
            {status.kind === 'sending' ? 'Sending…' : 'Submit application'}
          </button>
          {status.kind === 'success' && (
            <div className="submit-note ok">
              <strong><I.check size={17} /> Application received — Ref {status.reference}</strong>
              <p>The network team reviews every application by hand and will call <strong>{form.phone}</strong> to verify your trade, credentials and coverage areas before activation.</p>
            </div>
          )}
          {status.kind === 'error' && (
            <div className="submit-note err">
              <strong><I.alert size={17} /> {status.message}</strong>
              <div className="note-actions">
                <a className="btn primary" href={`tel:${PHONE.replace(/-/g, '')}`}>Call / text {PHONE}</a>
                <a className="btn ghost" href={mailto}>Email it to {EMAIL}</a>
              </div>
            </div>
          )}
          <p className="fineprint">Submitting sends your application to the network team through Top Speed Service OS. A human reviews every application and calls to verify before activation — submitting never activates an account on its own.</p>
        </form>

        <aside className="req-card sticky">
          <h3><I.shield size={20} /> Requirements, up front</h3>
          <ul>
            {REQUIREMENTS.map(r => <li key={r.title}><strong>{r.title}</strong><span>{r.text}</span></li>)}
          </ul>
          <div className="aside-note">
            <strong>About pay, honestly:</strong> this page does not quote rates, percentages, or payment
            timing. Those are set in your signed provider agreement, in writing, before your first dispatch.
          </div>
        </aside>
      </div>
    </section>
  )
}

/* ---------------- COVERAGE ---------------- */

function Coverage({ go }: { go: (s: Screen) => void }) {
  return (
    <section className="section page">
      <p className="eyebrow">COVERAGE & ZONES</p>
      <h1>Where the network dispatches</h1>
      <p className="sub wide">Dispatch follows zones, not guesswork: jobs go to providers based in the city cluster where the customer lives.</p>

      <h3 className="zone-h"><span className="dot live" /> Core Broward — active & dispatching</h3>
      <div className="city-grid">
        {CORE_CITIES.map(c => (
          <div key={c} className="city-card">
            <I.mapPin size={18} />
            <strong>{c}</strong>
            {RECRUITING_CITIES.includes(c)
              ? <span className="tag recruiting">Recruiting providers</span>
              : <span className="tag covered">Covered</span>}
          </div>
        ))}
      </div>

      <h3 className="zone-h"><span className="dot planned" /> Expansion — planned, not yet dispatching</h3>
      <div className="expansion-grid">
        {EXPANSION_ZONES.map(z => (
          <div key={z.name} className="expansion-card">
            <strong>{z.name}</strong>
            <span className="tag planned">Planned</span>
            <p>{z.note}. Providers there can register interest now — no work is promised until a zone opens.</p>
          </div>
        ))}
      </div>

      <div className="cta-inline">
        <p>Based in a recruiting city? Those zones get first look at new applications.</p>
        <button className="btn primary" onClick={() => go('join')}>Apply to join <I.arrow size={17} /></button>
      </div>
    </section>
  )
}

/* ---------------- PROVIDER PORTAL (PREVIEW) ---------------- */

function Portal() {
  const [jobs, setJobs] = useState<DemoJob[]>(DEMO_JOBS)
  const [selected, setSelected] = useState<DemoJob | null>(null)

  const act = (id: string, action: 'accept' | 'decline') => {
    if (action === 'accept') {
      setJobs(js => js.map(j => (j.id === id ? { ...j, status: 'Assigned' } : j)))
      setSelected(s => (s && s.id === id ? { ...s, status: 'Assigned' } : s))
    } else {
      // Declined: the job leaves your board and goes back to the setter (preview state only).
      setJobs(js => js.filter(j => j.id !== id))
      setSelected(s => (s && s.id === id ? null : s))
    }
  }

  const offered = jobs.filter(j => j.status === 'Awaiting acceptance')

  return (
    <section className="section page">
      <div className="demo-banner"><I.alert size={17} /> <strong>PORTAL PREVIEW — DEMO DATA.</strong> This is what the provider portal will feel like. Every job, figure, and name here is demo data; real dispatch runs in Top Speed Service OS.</div>

      <p className="eyebrow">PROVIDER PORTAL</p>
      <h1>Your dispatched work</h1>

      <div className="portal-grid">
        <div>
          <h3 className="zone-h">Offered to you ({offered.length})</h3>
          <div className="job-list">
            {jobs.map(j => (
              <button key={j.id} className={`job-card ${selected?.id === j.id ? 'on' : ''}`} onClick={() => setSelected(j)}>
                <span className="job-top"><strong>{j.appliance}</strong><span className={`status s-${j.status.replace(/\s/g, '').toLowerCase()}`}>{j.status}</span></span>
                <span className="job-problem">{j.problem}</span>
                <span className="job-meta"><I.mapPin size={14} /> {j.city} · <I.clock size={14} /> {j.window}</span>
                <span className="job-id">{j.id}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          {selected ? (
            <div className="job-detail">
              <p className="eyebrow">JOB {selected.id}</p>
              <h3>{selected.appliance} — {selected.problem}</h3>
              <p className="job-meta big"><I.mapPin size={16} /> {selected.city} · <I.clock size={16} /> {selected.window}</p>
              <p className="note-box">{selected.customerNote}</p>
              <p className="fineprint">Job confirmed by a Service Setter before dispatch. Customer contact details are shared through Service OS once you accept.</p>
              {selected.status === 'Awaiting acceptance' ? (
                <div className="job-actions">
                  <button className="btn accept" onClick={() => act(selected.id, 'accept')}><I.check size={17} /> Accept job</button>
                  <button className="btn decline" onClick={() => act(selected.id, 'decline')}><I.x size={17} /> Decline</button>
                </div>
              ) : (
                <p className="status-line">Status: <strong>{selected.status}</strong> — state changed locally in this preview only. Nothing was sent anywhere.</p>
              )}
            </div>
          ) : (
            <div className="job-detail empty">Select a job to see its detail, then accept or decline it — the buttons change local preview state only.</div>
          )}

          <div className="earnings-card">
            <h3><I.money size={20} /> Earnings (demo)</h3>
            <div className="earn-row"><span>This week (demo)</span><strong>$— demo</strong></div>
            <div className="earn-row"><span>Jobs completed (demo)</span><strong>— demo</strong></div>
            <p className="fineprint">Demo figures only, shown to preview the layout. Your actual rates and payment terms are set in your signed provider agreement — this panel never quotes them.</p>
          </div>

          <div className="compliance-card">
            <h3><I.clipboard size={20} /> Your compliance checklist (demo)</h3>
            {[
              { t: 'Insurance on file', s: 'Demo state: verified' },
              { t: 'Background check', s: 'Demo state: passed' },
              { t: 'Tools & vehicle confirmed', s: 'Demo state: confirmed' },
              { t: 'Provider agreement signed', s: 'Demo state: signed' },
            ].map(c => (
              <div key={c.t} className="comp-row"><I.check size={16} /><span><strong>{c.t}</strong><em>{c.s}</em></span></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- NETWORK HQ ---------------- */

function HQ({ go }: { go: (s: Screen) => void }) {
  const cols: DemoJob['status'][] = ['Awaiting acceptance', 'Assigned', 'En route', 'Completed']
  return (
    <section className="section page">
      <div className="demo-banner"><I.alert size={17} /> <strong>NETWORK HQ — DEMO DATA.</strong> Operations view running on demo jobs and demo providers. Live operations run in Top Speed Service OS with the Service Setters.</div>

      <p className="eyebrow">NETWORK HQ</p>
      <h1>Dispatch board</h1>
      <div className="board">
        {cols.map(c => (
          <div key={c} className="board-col">
            <h4>{c} <span>{DEMO_JOBS.filter(j => j.status === c).length}</span></h4>
            {DEMO_JOBS.filter(j => j.status === c).map(j => (
              <div key={j.id} className="board-card">
                <strong>{j.appliance}</strong>
                <span>{j.problem}</span>
                <em><I.mapPin size={13} /> {j.city} · {j.window}</em>
                <small>{j.id}</small>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="two-col">
        <div>
          <h3 className="zone-h"><I.users size={19} /> Provider roster (demo)</h3>
          <div className="roster">
            {DEMO_PROVIDERS.map(p => (
              <div key={p.id} className="provider-card">
                <div className="prov-top"><strong>{p.name}</strong><span className={`status p-${p.status.replace(/\s/g, '').toLowerCase()}`}>{p.status}</span></div>
                <p>{p.company}</p>
                <p className="prov-meta"><I.mapPin size={14} /> {p.zone}</p>
                <p className="prov-meta"><I.tools size={14} /> {p.trades}</p>
                <p className="prov-meta"><I.star size={14} /> {p.rating} · {p.jobsDone}</p>
              </div>
            ))}
          </div>
          <p className="fineprint">The entire roster above is demo data for layout preview — not real providers, ratings, or counts.</p>
        </div>
        <div>
          <h3 className="zone-h"><I.mapPin size={19} /> Coverage gaps — recruiting now</h3>
          <div className="gap-list">
            {RECRUITING_CITIES.map(c => (
              <div key={c} className="gap-row"><span>{c}</span><span className="tag recruiting">Recruiting</span></div>
            ))}
          </div>
          <button className="btn primary full" onClick={() => go('join')}>Apply for a gap city</button>

          <h3 className="zone-h" style={{ marginTop: 28 }}><I.shield size={19} /> Network standards</h3>
          <div className="standards-mini">
            {STANDARDS.map(s => (
              <div key={s.title} className="std-row"><I.check size={16} /><span><strong>{s.title}.</strong> {s.text}</span></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- STANDARDS & FAQ ---------------- */

function Standards() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section page narrow">
      <p className="eyebrow">STANDARDS & FAQ</p>
      <h1>The rules of the road</h1>
      <p className="sub wide">Every provider agrees to the same standards. They exist so customers trust the network — and so good providers aren't undercut by sloppy ones.</p>

      <div className="std-grid">
        {STANDARDS.map((s, i) => (
          <div key={s.title} className="std-card">
            <span className="step-n">{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>

      <h2 className="faq-h">Provider questions</h2>
      <div className="faq">
        {FAQS.map((f, i) => (
          <div key={f.q} className={`faq-item ${open === i ? 'open' : ''}`}>
            <button onClick={() => setOpen(open === i ? -1 : i)}>{f.q}<span>{open === i ? '–' : '+'}</span></button>
            {open === i && <p>{f.a}</p>}
          </div>
        ))}
      </div>

      <div className="honest-box">
        <h3><I.doc size={19} /> The honest print</h3>
        <p>This platform is a working prototype. The provider portal and Network HQ run on demo data, labeled as such everywhere it appears. Real dispatch today happens in <a href={SERVICE_OS} target="_blank" rel="noreferrer">Top Speed Service OS</a>, coordinated by human Service Setters. Rates and payment terms live in the signed provider agreement — never on a web page.</p>
        <p>Questions the FAQ didn't cover: call or text <a href={`tel:${PHONE.replace(/-/g, '')}`}>{PHONE}</a> or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
      </div>
    </section>
  )
}
