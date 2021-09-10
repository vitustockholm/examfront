// Imports
import { ALL_MODELS_URI } from './endpoints.js';

// Variables
const addModelForm = document.querySelector('#formSection form');
const successMessage = document.querySelector('.alert-success');
const failureMessage = document.querySelector('.alert-danger');

// Functions
const addModel = (e) => {
  e.preventDefault();

  const model = {
    name: e.target.modelName.value,
    hour_price: +e.target.modelPrice.value,
  };

  return fetch(ALL_MODELS_URI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(model),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === 'Model already exist') {
        failureMessage.style.display = 'block';
        failureMessage.innerText = data.message;
      } else {
        successMessage.style.display = 'block';
        successMessage.innerText = data.message;
      }

      setTimeout(() => {
        successMessage.style.display = 'none';
        failureMessage.style.display = 'none';
      }, 5000);

      addModelForm.reset();
    });
};

// Events
addModelForm.addEventListener('submit', addModel);
