import { Query } from '../utils/validation.utils';

export function search(query) {
  return new Promise((resolve, reject) => {
    try {
      query = Query.isValid(query);
    } catch (error) {
      reject(error);
    }

    console.log('perform api search with query: ', query);
    resolve('query success');
  });
}
