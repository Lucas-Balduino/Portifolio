/**
 * Envio do formulário de contato via EmailJS.
 * Carrega js/config.js sob demanda (arquivo local, não versionado).
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const statusEl = document.getElementById('contact-status');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const hasConfig = await loadEmailConfig();

    if (!hasConfig || !window.EMAILJS_CONFIG) {
      showStatus('Formulário indisponível no momento. Use o email direto acima.', 'error');
      return;
    }

    if (!window.emailjs) {
      showStatus('Serviço de email não carregou. Tente novamente ou use o email direto.', 'error');
      return;
    }

    const { PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID } = window.EMAILJS_CONFIG;
    if ([PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID].some(v => !v || v.includes('SUA_') || v.includes('SEU_'))) {
      showStatus('Configuração de email incompleta. Use o email direto acima.', 'error');
      return;
    }

    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    showStatus('', '');

    try {
      emailjs.init(PUBLIC_KEY);
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: form.name.value.trim(),
        from_email: form.email.value.trim(),
        subject: form.subject.value.trim(),
        message: form.message.value.trim()
      });
      showStatus('Mensagem enviada com sucesso! Retornarei em breve.', 'success');
      form.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      showStatus('Não foi possível enviar. Tente novamente ou use o email direto.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  });

  function showStatus(message, type) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = 'contact-status' + (type ? ` contact-status--${type}` : '');
    statusEl.hidden = !message;
  }
});

function loadEmailConfig() {
  if (window.EMAILJS_CONFIG) return Promise.resolve(true);

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'js/config.js';
    script.onload = () => resolve(!!window.EMAILJS_CONFIG);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
}
