import axios from 'axios';

export default axios.create({
  baseURL: 'https://localhost:44351',
  withCredentials: false,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
  },
});
export const url = 'https://localhost:44351';
