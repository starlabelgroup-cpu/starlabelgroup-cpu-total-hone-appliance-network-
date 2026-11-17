# Total Home Appliance Network — Provider Platform

The subcontractor / provider network platform of **Top Speed Appliance**: a working
prototype where independent appliance repair techs and small repair companies apply
to join, get verified, and receive dispatched jobs confirmed by human Service
Setters through Top Speed Service OS.

## Screens
1. **Network Home** — pro-facing hero, how it works (Apply → Verify → Get dispatched → Complete & get paid), why join, requirements preview, coverage teaser.
2. **Join / Apply** — requirements + application form. The form **really submits**: it POSTs to the Top Speed Service OS public intake (`POST /api/v1/connections`, type `PROVIDER_APPLICATION` — the same endpoint the flagship provider-join page uses) and shows the applicant the reference Service OS returns. The network team reviews every application by hand and calls the applicant to verify trade, credentials, and coverage areas before activation. UTM parameters and ad-platform click IDs (`gclid` / `fbclid` / `msclkid`) captured on landing are passed through with the submission. If a submission fails, the form says so plainly — it never claims an application was received without a Service OS reference — and offers the fallback paths: call/text 954-931-7997 or email service@topspeedappliance.net.
3. **Coverage** — Core Broward cities (active, with "Recruiting providers" tags) and expansion zones (Palm Beach, Miami-Dade) labeled **Planned — not yet dispatching**.
4. **Provider Portal (preview)** — demo job board with job detail and Accept / Decline buttons that change local preview state only (declined jobs return to the setter). Earnings and compliance panels are labeled demo.
5. **Network HQ** — demo dispatch board by status, demo provider roster, coverage gaps, network standards.
6. **Standards & FAQ** — the six network standards and provider FAQs, including how disputes are handled (human review by the Service OS team).

## Honesty model
- No payout rates, percentages, payment schedules, provider counts, job volumes, or earnings claims anywhere — demo figures only, always labeled. Pay copy always points to the signed provider agreement.
- Expansion zones are labeled planned; the portal is a labeled preview.
- The application really submits (see above) and only claims success with a real Service OS reference; submitting never activates an account — activation follows human verification.
- Real dispatch happens in Top Speed Service OS (https://topspeedserviceos.com), coordinated by human Service Setters.

## Service OS integration
- **Applications:** `src/submit.ts` builds the intake payload (drill: `node scripts/check-payload.mjs`).
- **Speedy (the real AI assistant) is not embedded on this site.** The Service OS API only answers browser calls from allowlisted origins (its `CORS_ORIGIN`), and this site's origin is not on that list yet — an embedded widget or form post from an unlisted origin is blocked by the browser. Until this site's origin is added to the API's `CORS_ORIGIN`, the footer carries real doors to Speedy, booking, and job tracking inside Service OS (https://topspeedserviceos.com/speedy · /book · /track), and the application form reports any blocked submission honestly with phone/email fallbacks. Adding the origin is the single step that turns the form (and later the Speedy widget) fully live.

## Run
```bash
npm install
npm run dev     # local dev
npm run build   # production build (tsc + vite)
```
