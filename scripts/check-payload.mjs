/**
 * Drill: the Join / Apply payload builder emits exactly the fields the
 * Service OS public intake (POST /api/v1/connections, flagship
 * apps/api/src/routes/connections.js) accepts — nothing missing,
 * nothing extra — with attribution pass-through, and the validator
 * mirrors the flagship provider-join rules. Creates NO records: this
 * only exercises the pure builder in src/submit.ts.
 *
 * Run: node scripts/check-payload.mjs   (after npm install)
 */
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const root = fileURLToPath(new URL('..', import.meta.url))
const src = readFileSync(`${root}src/submit.ts`, 'utf8')
const js = ts.transpileModule(src, {
  compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
}).outputText
const tmp = `${root}scripts/.submit.drill.mjs`
writeFileSync(tmp, js)
const { buildApplicationPayload, validateApplication } = await import(tmp)
rmSync(tmp)

// The full key set the intake schema accepts (connections.js +
// services/attribution.js attributionFields).
const CONTRACT_KEYS = new Set([
  'name', 'phone', 'email', 'type', 'source', 'message', 'referralCode',
  'page', 'via', 'utmSource', 'utm_source', 'utmMedium', 'utm_medium',
  'utmCampaign', 'utm_campaign', 'gclid', 'fbclid', 'msclkid', 'utm',
])

let failures = 0
const check = (label, cond) => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${label}`)
  if (!cond) failures++
}

const fullForm = {
  name: '  Dana Tech  ', company: 'Dana Repair LLC', phone: ' (954) 555-0134 ',
  email: ' dana@example.com ', city: 'Coral Springs',
  trades: ['Refrigerator', 'Washer'], years: '6–10 years',
  insurance: 'Yes — active policy', message: 'Two-truck crew.',
}
const p = buildApplicationPayload(fullForm, { utm_source: 'google', gclid: 'abc123' }, 'https://example.test/join')

check('payload keys all inside the intake contract', Object.keys(p).every(k => CONTRACT_KEYS.has(k)))
check('name trimmed', p.name === 'Dana Tech')
check('phone trimmed', p.phone === '(954) 555-0134')
check('email included when given', p.email === 'dana@example.com')
check('type is PROVIDER_APPLICATION', p.type === 'PROVIDER_APPLICATION')
check('source identifies this site', p.source === 'total-home-appliance-network')
check('page passed through', p.page === 'https://example.test/join')
check('utm_source passed through', p.utm_source === 'google')
check('gclid passed through', p.gclid === 'abc123')
check('uncaptured click IDs absent', !('fbclid' in p) && !('msclkid' in p) && !('utm_medium' in p))
check('message carries company', p.message.includes('Company: Dana Repair LLC'))
check('message carries base city', p.message.includes('Base city: Coral Springs'))
check('message carries trades', p.message.includes('Appliances serviced: Refrigerator, Washer'))
check('message carries years', p.message.includes('Years of experience: 6–10 years'))
check('message carries insurance', p.message.includes('Business liability insurance: Yes — active policy'))
check('message carries free text', p.message.includes('Two-truck crew.'))

const bare = buildApplicationPayload({ ...fullForm, email: '  ', trades: [], message: '' }, {})
check('blank email omitted', !('email' in bare))
check('no attribution keys when none captured', !('utm_source' in bare) && !('gclid' in bare) && !('page' in bare))
check('empty trades render as —', bare.message.includes('Appliances serviced: —'))

check('valid form passes validation', validateApplication(fullForm) === null)
check('short name rejected', validateApplication({ ...fullForm, name: 'D' }) !== null)
check('short phone rejected', validateApplication({ ...fullForm, phone: '123' }) !== null)
check('malformed email rejected', validateApplication({ ...fullForm, email: 'nope' }) !== null)
check('blank email allowed by validator', validateApplication({ ...fullForm, email: '' }) === null)

console.log(failures ? `\n${failures} FAILURE(S)` : '\nALL CHECKS PASSED')
process.exit(failures ? 1 : 0)
