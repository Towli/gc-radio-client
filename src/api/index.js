import { Query } from '../utils/validation.utils';
import axios from 'axios';
import { config } from '../config';

export function search(query) {
  return new Promise((resolve, reject) => {
    try {
      query = Query.isValid(query);
      makeRequest(config.API_URL, 'get', { q: query })
        .then(resolve)
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
