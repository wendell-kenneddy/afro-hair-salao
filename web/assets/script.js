const form = document.getElementById('contact-form');
const handleSubmit = (e) => {
  e.preventDefault();

  alert('Feedback recebido!');
};

form.addEventListener('submit', handleSubmit);
