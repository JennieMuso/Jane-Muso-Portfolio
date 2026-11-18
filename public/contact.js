window.addEventListener('load', () => {
  const form = document.getElementById('project-form');
  const status = document.getElementById('form-status');
  const customFields = document.getElementById('budget-custom-fields');
  const customBudget = document.getElementById('custom-budget');
  const pageCount = document.getElementById('page-count');

  const syncBudgetFields = () => {
    const isCustom = form?.querySelector('input[name="budget"]:checked')?.value === 'custom';
    customFields.hidden = !isCustom;
    [customBudget, pageCount].forEach((input) => {
      input.disabled = !isCustom;
      input.required = isCustom;
    });
    if (!isCustom) {
      customBudget.value = '';
      pageCount.value = '';
    }
  };
  form?.querySelectorAll('input[name="budget"]').forEach((input) => input.addEventListener('change', syncBudgetFields));
  syncBudgetFields();

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const value = (key) => String(data.get(key) || '').trim();
    const budget = value('budget') === 'custom'
      ? `$${Number(value('customBudget')).toLocaleString('en-US')} USD — ${value('pageCount')} page(s) requested`
      : value('budget');
    const subject = `Project enquiry from ${value('fullName')}`;
    const body = [
      `Full name: ${value('fullName')}`,
      `Email: ${value('email')}`,
      '',
      'About their business:', value('business'),
      '',
      `Service: ${value('service')}`,
      `Budget: ${budget}`,
      `Timing: ${value('timeline') || 'Not specified'}`,
      '',
      'Project goals and details:', value('projectDetails')
    ].join('\n');
    const draft = `mailto:hello@jenniemuso.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const retry = document.createElement('a');
    retry.href = draft;
    retry.target = '_blank';
    retry.rel = 'noopener noreferrer';
    retry.textContent = 'Open the email draft again';
    status.replaceChildren(document.createTextNode('Your email app should open with your enquiry ready to send. Please send the draft to finish. '), retry);
    window.open(draft, '_blank', 'noopener,noreferrer');
  });

});
