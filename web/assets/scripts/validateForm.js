export const validateForm = () => {
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
