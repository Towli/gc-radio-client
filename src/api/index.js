import { Query } from '../utils/validation.utils';
import axios from 'axios';
import { config } from '../config';

export function register(username, password, secret) {
  return makeRequest(config.API_URI, 'post', { username, password, secret });
}

export function login(username, password) {
  return makeRequest(config.API_URI, 'post', { username, password });
}

export function search(query, queryType) {
  return new Promise((resolve, reject) => {
    try {
      query = Query.isValid(query);
      makeRequest(config.API_URI, 'get', { q: query, type: queryType })
        .then(results => {
          resolve(results.data);
        })
        .catch(reject);
    } catch (error) {
      reject(error);
    }
  });
}

function makeRequest(url, method, data = null) {
  return axios({
    method: method,
    url: url,
    params: data
  });
}
