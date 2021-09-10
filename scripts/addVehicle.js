// Imports
import { ALL_MODELS_URI } from './endpoints.js';
import { ALL_VEHICLES_URI } from './endpoints.js';

// Variables
const vehicleModelSelect = document.querySelector('#vehicleModel');
const addVehicleForm = document.querySelector('#addVehicleForm form');
const successMessage = document.querySelector('.alert-success');
const failureMessage = document.querySelector('.alert-danger');

// Functions
const loadSelect = () => {
  fetch(ALL_MODELS_URI)
    .then((response) => response.json())
    .then((result) => {
      let data = result;

      vehicleModelSelect.innerHTML =
        ' <option selected disabled hidden>Model</option>';
      vehicleModelSelect.innerHTML += data.reduce((total, current) => {
        total += `
            <option value='${current._id}'>${current.name}</option>
          `;
        return total;
      }, '');
    });
};

const addVehicle = (e) => {
  e.preventDefault();

  console.log(e.target.vehicleCountry.value.toUpperCase());
  if (
    e.target.vehicleCountry.value.toUpperCase() !== 'LT' &&
    e.target.vehicleCountry.value.toUpperCase() !== 'LV' &&
    e.target.vehicleCountry.value.toUpperCase() !== 'EE'
  ) {
    failureMessage.style.display = 'block';
    failureMessage.innerText = 'Plese enter valid country code';
    setTimeout(() => {
      failureMessage.style.display = 'none';
    }, 5000);
    return;
  }

  const vehicle = {
    model_id: e.target.vehicleModel.value,
    number_plate: e.target.vehiclePlate.value,
    country_location: e.target.vehicleCountry.value.toUpperCase(),
  };

  return fetch(ALL_VEHICLES_URI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vehicle),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === 'Vehicle with THIS number plate already exist') {
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

      addVehicleForm.reset();
    });
};

// Events
document.addEventListener('DOMContentLoaded', loadSelect);
addVehicleForm.addEventListener('submit', addVehicle);
