import axios from 'axios';
import { generate } from 'shortid';

export const addBill = state => {
  return axios
    .post('http://localhost:3001/bills', {
      [generate()]: { ...state }
    })
    .then(resp => resp);
};

export const addProd = state => {
  return axios
    .post('http://localhost:3001/prod', {
      [generate()]: { ...state }
    })
    .then(resp => resp);
};
