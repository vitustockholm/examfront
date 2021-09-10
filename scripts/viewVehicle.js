// Imports
import { GET_ALL_VEHICLES_URI } from './endpoints';

// Variables
const filterBtns = document.querySelectorAll('#viewWithFilterSection button');
const vehicleTable = document.querySelector('#viewWithFilterSection table');

// Functions
const fetchData = (table, dataset) => {
  fetch(GET_ALL_VEHICLES_URI + dataset)
    .then((response) => response.json())
    .then((result) => {
      let data = result;

      table.innerHTML = `<thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Model</th>
          <th scope="col">Hour Price (+VAT)</th>
          <th scope="col">Number Plate</th>
        </tr>
      </thead>`;

      table.innerHTML += data.reduce((total, current) => {
        return (total += `
          <tr>
          <th scope="row">${current._id}</th>
          <td>${current.model_id}</td>
          <td>${current.hour_price} €</td>
          <td>${current.number_plate}</td>
  
        </tr>
          `);
      }, '');
    });
};

const loadTable = () => {
  fetchData(vehicleTable, '');
};

const filterTable = (e) => {
  const dataset = e.target.dataset.id;
  fetchData(vehicleTable, dataset);
};

// Events
document.addEventListener('DOMContentLoaded', loadTable);
filterBtns.forEach((item) => {
  item.addEventListener('click', filterTable);
});
