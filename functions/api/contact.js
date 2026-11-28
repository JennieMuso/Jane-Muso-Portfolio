const RECIPIENT = 'jane.framer.expert@gmail.com';
const SENDER = 'Muso Design Studio <enquiries@musodesign.com>';
const MAX_BODY_BYTES = 16_384;

const choices = {
  currency: ['AED', 'USD'],
  projectType: ['new', 'redesign', 'development', 'other'],
  budgetBand: ['first', 'second', 'third', 'fourth', 'guidance', 'custom'],
  timeline: ['as-soon-as-possible', 'within-one-month', 'two-to-three-months', 'flexible']
};

function reply(message, status) {
  return Response.json({ message }, { status, headers: { 'Cache-Control': 'no-store' } });
}

function field(data, name, maxLength) {
  const value = data[name];
  return typeof value === 'string' && value.length <= maxLength ? value.trim() : null;
}

async function readBody(request) {
  const reader = request.body?.getReader();
  if (!reader) return null;
  const chunks = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BODY_BYTES) return null;
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try { return JSON.parse(new TextDecoder().decode(bytes)); } catch { return null; }
}

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) return reply('Invalid origin', 403);
  if (!request.headers.get('Content-Type')?.startsWith('application/json')) return reply('Invalid content type', 415);
  if (Number(request.headers.get('Content-Length')) > MAX_BODY_BYTES) return reply('Enquiry too long', 413);
  const data = await readBody(request);
  if (!data || typeof data !== 'object' || Array.isArray(data)) return reply('Invalid enquiry', 400);
  if (data.companyUrl) return reply('Enquiry received', 200);

  const currency = field(data, 'currency', 3);
  const projectType = field(data, 'projectType', 24);
  const packageId = field(data, 'package', 100);
  const budgetBand = field(data, 'budgetBand', 10);
  const timeline = field(data, 'timeline', 32);
  const name = field(data, 'fullName', 120);
  const email = field(data, 'email', 254);
  const business = field(data, 'business', 180);
  const website = field(data, 'website', 500);
  const details = field(data, 'projectDetails', 4000);
  const customBudget = field(data, 'customBudget', 12);
  const pageCount = field(data, 'pageCount', 6);
  if (!choices.currency.includes(currency) || !choices.projectType.includes(projectType) ||
      !packageId || !/^[a-zA-Z0-9_-]+$/.test(packageId) ||
      !choices.budgetBand.includes(budgetBand) || !choices.timeline.includes(timeline) ||
      !name || !email || !details || business === null || website === null) {
    return reply('Please complete the required fields', 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /[\r\n]/.test(email) ||
      (website && !/^https?:\/\/[^\s]+$/i.test(website))) return reply('Please check your email or website', 400);
  if (budgetBand === 'custom' && (!customBudget || !pageCount ||
      !/^[1-9]\d*$/.test(customBudget) || !/^[1-9]\d*$/.test(pageCount))) {
    return reply('Please complete your budget and page count', 400);
  }
  if (!env.RESEND_API_KEY) return reply('Email service unavailable', 503);

  const lines = [
    'New Muso Design Studio website enquiry', '',
    `Name: ${name}`, `Email: ${email}`,
    `Business: ${business || 'Not provided'}`,
    `Existing website: ${website || 'Not provided'}`, '',
    `Currency: ${currency}`, `Project type: ${projectType}`,
    `Package: ${packageId}`, `Budget band: ${budgetBand}`,
    ...(budgetBand === 'custom' ? [`Custom budget: ${currency} ${customBudget}`, `Estimated pages: ${pageCount}`] : []),
    `Timeline: ${timeline}`, '', 'Project details:', details
  ];
  try {
    const sent = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: SENDER, to: [RECIPIENT], reply_to: email,
        subject: 'New Muso Design Studio website enquiry', text: lines.join('\n') })
    });
    if (!sent.ok) {
      console.error(JSON.stringify({ event: 'contact_email_failed', status: sent.status }));
      return reply('Unable to send enquiry', 502);
    }
    return reply('Enquiry sent', 200);
  } catch (error) {
    console.error(JSON.stringify({ event: 'contact_email_error', message: String(error) }));
    return reply('Unable to send enquiry', 502);
  }
}
