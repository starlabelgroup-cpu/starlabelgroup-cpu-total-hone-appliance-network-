# Total Home Appliance Network — Provider Platform

The subcontractor / provider network platform of **Top Speed Appliance**: a working
prototype where independent appliance repair techs and small repair companies apply
to join, get verified, and receive dispatched jobs confirmed by human Service
Setters through Top Speed Service OS.

## Screens
1. **Network Home** — pro-facing hero, how it works (Apply → Verify → Get dispatched → Complete & get paid), why join, requirements preview, coverage teaser.
2. **Join / Apply** — requirements + application form. **Honest model:** the form saves a *local draft only* in `sessionStorage` (stamped "LOCAL DRAFT ONLY — not submitted") and directs the applicant to email service@topspeedappliance.net or call/text 954-931-7997 to complete the application. UTM parameters and `gclid` are captured into the draft. Nothing is transmitted.
3. **Coverage** — Core Broward cities (active, with "Recruiting providers" tags) and expansion zones (Palm Beach, Miami-Dade) labeled **Planned — not yet dispatching**.
4. **Provider Portal (preview)** — demo job board with job detail and Accept / Decline buttons that change local preview state only (declined jobs return to the setter). Earnings and compliance panels are labeled demo.
5. **Network HQ** — demo dispatch board by status, demo provider roster, coverage gaps, network standards.
6. **Standards & FAQ** — the six network standards and provider FAQs, including how disputes are handled (human review by the Service OS team).

## Honesty model
- No payout rates, percentages, payment schedules, provider counts, job volumes, or earnings claims anywhere — demo figures only, always labeled. Pay copy always points to the signed provider agreement.
- Expansion zones are labeled planned; the application never claims submission; the portal is a labeled preview.
- Real dispatch happens in Top Speed Service OS (https://topspeedserviceos.com), coordinated by human Service Setters.

## Run
```bash
npm install
npm run dev     # local dev
npm run build   # production build (tsc + vite)
```
