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
  const selectedPackage = [...form.querySelectorAll('input[name="package"]')]
    .find((input) => input.value === requestedPackage || input.dataset.packageName === requestedPackage);
  if (selectedPackage) {
    selectedPackage.checked = true;
    const referral = document.getElementById('package-referral');
    referral.textContent = `Interested in ${selectedPackage.dataset.packageName}? Tell me about your idea below.`;
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

  form.addEventListener('submit', async (event) => {
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
    const submit = form.querySelector('button[type="submit"]');
    submit.disabled = true;
    status.textContent = 'Sending your enquiry…';
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data))
      });
      if (!response.ok) throw new Error('Unable to send');
      form.reset();
      updateCurrency();
      syncBudgetFields();
      status.textContent = 'Thanks for reaching out. Your enquiry has been sent. I’ll be in touch soon.';
      showStep(0, false);
      status.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch {
      status.textContent = 'Sorry, your enquiry could not be sent. Please try again, or email me directly at jane.framer.expert@gmail.com.';
    } finally {
      submit.disabled = false;
    }
  });

  updateCurrency();
  syncBudgetFields();
  showStep(0, false);
});
