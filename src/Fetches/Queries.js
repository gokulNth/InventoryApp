import axios from 'axios';

export const addBill = state => {
  return axios
    .post('http://localhost:3001/bills', {
      [new Date().toDateString().slice(4)]: state
    })
    .then(resp => resp);
};

export const Bills = () => {
  return axios.get('http://localhost:3001/bills').then(req => req.data);
};

// export const addProd = state => {
//   return axios
//     .post('http://localhost:3001/prod', {
//       [generate()]: { ...state }
//     })
//     .then(resp => resp);
// };
