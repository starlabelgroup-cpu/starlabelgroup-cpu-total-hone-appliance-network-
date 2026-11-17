/**
 * Real application submission — Top Speed Service OS public intake.
 *
 * The Join / Apply form posts to the same endpoint the flagship
 * provider-join page uses: POST /api/v1/connections with
 * type "PROVIDER_APPLICATION". The record is persisted in Service OS,
 * reference-numbered, and reviewed by hand by the network team, who
 * call the applicant to verify before activation. This module is the
 * pure payload/validation layer so it can be drill-checked in node
 * (see scripts/check-payload.mjs); App.tsx owns the actual fetch.
 */

export const API_BASE = 'https://top-speed-service-os.vercel.app/api/v1'

export type ApplicationForm = {
  name: string
  company: string
  phone: string
  email: string
  city: string
  trades: string[]
  years: string
  insurance: string
  message: string
}

/** Landing-page attribution captured from the URL (first touch). */
export type Attribution = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  gclid?: string
  fbclid?: string
  msclkid?: string
}

export type ApplicationPayload = {
  name: string
  phone: string
  email?: string
  type: 'PROVIDER_APPLICATION'
  source: string
  message: string
  page?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  gclid?: string
  fbclid?: string
  msclkid?: string
}

export const APPLICATION_SOURCE = 'total-home-appliance-network'

/**
 * Client-side validation mirroring the flagship provider-join page:
 * a real name, a callable mobile (verification is by phone), and a
 * well-formed email when one is given. Returns an error string or null.
 */
export function validateApplication(form: ApplicationForm): string | null {
  if (form.name.trim().length < 2) return 'Please add your full name.'
  if (form.phone.replace(/\D/g, '').length < 10) {
    return 'Please add a valid mobile number — verification is by phone.'
  }
  const email = form.email.trim()
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "That email doesn't look right — check it or leave it blank."
  }
  return null
}

/**
 * Build the exact POST /connections body. Structured application
 * details ride in `message` (the intake's free-text field), the same
 * shape the flagship provider-join page sends; attribution fields are
 * attached only when actually captured.
 */
export function buildApplicationPayload(
  form: ApplicationForm,
  attribution: Attribution,
  page?: string,
): ApplicationPayload {
  const message = [
    `Company: ${form.company.trim() || '—'}`,
    `Base city: ${form.city}`,
    `Appliances serviced: ${form.trades.length ? form.trades.join(', ') : '—'}`,
    `Years of experience: ${form.years || '—'}`,
    `Business liability insurance: ${form.insurance || '—'}`,
    ...(form.message.trim() ? ['', form.message.trim()] : []),
  ].join('\n')

  const payload: ApplicationPayload = {
    name: form.name.trim(),
    phone: form.phone.trim(),
    type: 'PROVIDER_APPLICATION',
    source: APPLICATION_SOURCE,
    message,
  }
  const email = form.email.trim()
  if (email) payload.email = email
  if (page) payload.page = page
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'gclid', 'fbclid', 'msclkid'] as const) {
    const v = attribution[key]
    if (v) payload[key] = v
  }
  return payload
}

export type SubmitResult = { reference: string }

/** POST the application to Service OS. Resolves with the record's
 *  reference on a 201; rejects on any other outcome so the UI can
 *  fall back to phone/email honestly. */
export async function submitApplication(payload: ApplicationPayload): Promise<SubmitResult> {
  const res = await fetch(`${API_BASE}/connections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const body = await res.json().catch(() => null)
  if (res.status !== 201 && res.status !== 200) {
    throw new Error(`Intake returned ${res.status}`)
  }
  const reference = body?.data?.reference || body?.data?.id
  if (!reference) throw new Error('Intake response carried no reference')
  return { reference: String(reference) }
}
