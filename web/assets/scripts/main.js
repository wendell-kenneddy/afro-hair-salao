(async () => {
  const form = document.getElementById('contact-form');
  const validateForm = () => {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    if (
      !nameInput.value ||
      !emailInput.value ||
      !phoneInput.value ||
      !messageInput.value
    )
      throw new Error('Por favor, preencha todos os campos.');
  };

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      try {
        validateForm();
        alert('Feedback recebido!');
        form.reset();
      } catch (error) {
        alert(error.message);
      }
    });
  }

  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/sw.js');
    } catch (error) {
      console.log(error.message);
    }
  }
})();
