window.addEventListener('load', () => {
  const form = document.getElementById('project-form');
  if (!form) return;

  const steps = [...form.querySelectorAll('[data-step]')];
  const count = document.getElementById('step-count');
  const progress = form.querySelector('[role="progressbar"]');
  const progressBar = form.querySelector('[data-progress-bar]');
  const status = document.getElementById('form-status');
  const customFields = document.getElementById('budget-custom-fields');
  const customBudget = document.getElementById('custom-budget');
  const pageCount = document.getElementById('page-count');
  let currentStep = 0;

  const requestedPackage = new URLSearchParams(window.location.search).get('package');
  const packageByName = { 'Muso Launch': 'launch', 'Muso Signature': 'signature', 'Muso Experience': 'experience' };
  const selectedPackage = packageByName[requestedPackage];
  if (selectedPackage) {
    form.querySelector(`input[name="package"][value="${selectedPackage}"]`).checked = true;
    const referral = document.getElementById('package-referral');
    referral.textContent = `Interested in ${requestedPackage}? Tell me about your idea below.`;
    referral.hidden = false;
  }

  function currency() {
    return form.querySelector('input[name="currency"]:checked')?.value || 'USD';
  }

  function updateCurrency() {
    const key = currency().toLowerCase();
    form.querySelectorAll('[data-price], [data-budget-label]').forEach((label) => {
      label.textContent = label.dataset[key];
    });
    form.querySelectorAll('[data-currency-code]').forEach((label) => { label.textContent = currency(); });
  }

  function syncBudgetFields() {
    const custom = form.querySelector('input[name="budgetBand"]:checked')?.value === 'custom';
    customFields.hidden = !custom;
    [customBudget, pageCount].forEach((input) => {
      input.disabled = !custom;
      input.required = custom;
      if (!custom) input.value = '';
    });
  }

  function showStep(index, moveFocus = true) {
    currentStep = index;
    steps.forEach((step, position) => { step.hidden = position !== index; });
    count.textContent = `Step ${index + 1} of ${steps.length}`;
    progress.setAttribute('aria-valuenow', String(index + 1));
    progressBar.style.width = `${(index + 1) / steps.length * 100}%`;
    if (moveFocus) {
      form.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      steps[index].querySelector('h3')?.focus({ preventScroll: true });
    }
  }

  function firstInvalid(step) {
    return [...step.querySelectorAll('input, textarea, select')].find((input) => !input.disabled && !input.checkValidity());
  }

  form.querySelectorAll('input[name="currency"]').forEach((input) => input.addEventListener('change', updateCurrency));
  form.querySelectorAll('input[name="budgetBand"]').forEach((input) => input.addEventListener('change', syncBudgetFields));
  form.querySelectorAll('[data-next]').forEach((button) => button.addEventListener('click', () => {
    const invalid = firstInvalid(steps[currentStep]);
    if (invalid) { invalid.reportValidity(); return; }
    status.replaceChildren();
    showStep(currentStep + 1);
  }));
  form.querySelectorAll('[data-back]').forEach((button) => button.addEventListener('click', () => {
    status.replaceChildren();
    showStep(currentStep - 1);
  }));

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (currentStep < steps.length - 1) {
      form.querySelector('[data-step]:not([hidden]) [data-next]')?.click();
      return;
    }
    for (let index = 0; index < steps.length; index += 1) {
      const invalid = firstInvalid(steps[index]);
      if (invalid) {
        showStep(index);
        requestAnimationFrame(() => invalid.reportValidity());
        return;
      }
    }

    const data = new FormData(form);
    const value = (key) => String(data.get(key) || '').trim();
    const projectTypes = { new: 'A brand-new website', redesign: 'Redesigning an existing website', development: 'Development of an existing design', other: 'Something else' };
    const packageNames = { launch: 'Muso Launch', signature: 'Muso Signature', experience: 'Muso Experience', unsure: 'Not sure yet' };
    const timelines = { 'as-soon-as-possible': 'As soon as possible', 'within-one-month': 'Within 1 month', 'two-to-three-months': 'In 2–3 months', flexible: 'I’m flexible' };
    const band = value('budgetBand');
    const budgetLabel = band === 'custom'
      ? `${currency()} ${Number(value('customBudget')).toLocaleString('en-US')} for approximately ${value('pageCount')} pages`
      : band === 'guidance' ? 'I’d like your guidance'
        : form.querySelector('input[name="budgetBand"]:checked')?.closest('label')?.querySelector('[data-budget-label]')?.textContent || '';

    const body = [
      'Muso website enquiry',
      `Currency: ${value('currency')}`,
      `Project type: ${value('projectType')} — ${projectTypes[value('projectType')]}`,
      `Package: ${value('package')} — ${packageNames[value('package')]}`,
      `Budget band: ${band} — ${budgetLabel}`,
      `Timeline: ${value('timeline')} — ${timelines[value('timeline')]}`,
      '',
      `Name: ${value('fullName')}`,
      `Email: ${value('email')}`,
      `Business: ${value('business') || 'Not provided'}`,
      `Existing website: ${value('website') || 'Not provided'}`,
      '',
      'Project details:', value('projectDetails')
    ].join('\n');
    const subject = `Muso website enquiry from ${value('fullName')}`;
    const draft = `mailto:hello@jenniemuso.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const retry = document.createElement('a');
    retry.href = draft;
    retry.target = '_blank';
    retry.rel = 'noopener noreferrer';
    retry.textContent = 'Open the email draft again';
    status.replaceChildren(document.createTextNode('Your email app should open with your enquiry ready to send. Please send the draft to finish. '), retry);
    window.open(draft, '_blank', 'noopener,noreferrer');
  });

  updateCurrency();
  syncBudgetFields();
  showStep(0, false);
});
