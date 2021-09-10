// Imports
import { ALL_MODELS_URI } from './endpoints.js';
import { GET_ALL_MODELS_WITH_COUNT_URI } from './endpoints.js';

// Variables
// --DOMelements
const modelTable = document.querySelector('#modelSection table');
const modelCountTable = document.querySelector('#modelcountSections table');

// Functions
// Load all tables
const renderTables = () => {
  allModels();
  allModelsWithCount();
};
modelTable.innerHTML = `<thead>
<tr>
  <th scope="col">ID</th>
  <th scope="col">Model</th>
  <th scope="col">Hour Price</th>
</tr>
</thead>`;
// getting all models
const allModels = () => {
  return fetch(ALL_MODELS_URI)
    .then((response) => response.json())
    .then((result) => {
      // console.log(result);
      // let data = result;

      modelTable.innerHTML += result.reduce((total, current) => {
        return (total += `
        <tr>
        <th scope="row">${current._id}</th>
        <td>${current.name}</td>
        <td>${current.hour_price.toFixed(2)} €</td>
      </tr>
        `);
      }, '');
    });
};

// getting all models with count
const allModelsWithCount = () => {
  return fetch(GET_ALL_MODELS_WITH_COUNT_URI)
    .then((response) => response.json())
    .then((result) => {
      let data = result;
      modelCountTable.innerHTML = `<thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Model</th>
        <th scope="col">Hour Price</th>
        <th scope="col">Count</th>
      </tr>
    </thead>`;

      modelCountTable.innerHTML += data.reduce((total, current) => {
        return (total += `
        <tr>
        <th scope="row">${current._id}</th>
        <td>${current.name}</td>
        <td>${current.hour_price.toFixed(2)} €</td>
        <td>${current.count}</td>
      </tr>
        `);
      }, '');
    });
};

// Events
document.addEventListener('DOMContentLoaded', renderTables);
