/**
 * Envio do formulário de contato via EmailJS.
 * Requer js/config.js (copie de config.example.js) e script EmailJS no HTML.
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const statusEl = document.getElementById('contact-status');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!window.EMAILJS_CONFIG || !window.emailjs) {
      showStatus('Configuração de email ausente. Copie js/config.example.js para js/config.js.', 'error');
      return;
    }

    const { PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID } = window.EMAILJS_CONFIG;
    if ([PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID].some(v => !v || v.includes('SUA_') || v.includes('SEU_'))) {
      showStatus('Preencha js/config.js com suas credenciais EmailJS.', 'error');
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
