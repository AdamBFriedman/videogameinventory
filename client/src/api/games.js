import { getHeadersWithAuth } from '../components/LoginForm';
import { handleErrors } from '../components/LoginForm';

const url = 'http://localhost:8000/games';

const options = (type, title = '', platform = '', id = '') => {
  switch (type) {
    case 'POST':
      return {
        method: 'POST',
        headers: getHeadersWithAuth(),
        body: JSON.stringify({
          title,
          platform,
        }),
      };
      break;

    case 'PUT':
      return {
        method: 'PUT',
        headers: getHeadersWithAuth(),
        body: JSON.stringify({
          title,
          platform,
          id,
        }),
      };
      break;

    default:
      return {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
      };
      break;
  }
};

export const fetchGames = async () => {
  return await fetch(url, options('GET')).then((response) =>
    response.json()
  );
};

export const addGame = async (title, platform) => {
  return await fetch(url, options('POST', title, platform)).then(
    handleErrors
  );
};

export const updateGame = async (title, platform, id) => {
  return await fetch(url, options('PUT', title, platform, id)).then(
    handleErrors
  );
};
