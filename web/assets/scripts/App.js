import { validateForm } from './validateForm.js';

export class App {
  static init() {
    const form = document.getElementById('contact-form');

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
}
