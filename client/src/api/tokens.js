import { lowLevelApiClient } from './client';
import { camelizeKeys } from 'humps';

export default {

  createToken(email, password) {
    const results = lowLevelApiClient('/api/v1/tokens', 'POST', {params: {email, password}})
      .then(response => {
        if (!response.ok) {
          return Promise.reject(response);
        }
        return response.json().then(json => {
          return { json, response };
        }, () => {
          return { response };
        });
      }
    ).then(({ json }) => {
      return camelizeKeys(json);
    });
    return results;
  }


};

