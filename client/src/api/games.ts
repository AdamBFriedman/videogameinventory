import { getHeadersWithAuth } from '../components/LoginForm';
import { handleErrors } from '../components/LoginForm';

const url = 'http://localhost:8000/games';

const options = (
  type: string,
  title = '',
  platform = '',
  cib = false,
  id = ''
) => {
  switch (type) {
    case 'POST':
      return {
        method: 'POST',
        headers: getHeadersWithAuth(),
        body: JSON.stringify({
          title,
          platform,
          cib,
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

    case 'DELETE':
      return {
        method: 'DELETE',
        headers: getHeadersWithAuth(),
        body: JSON.stringify({
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

export const addGame = async (
  title: string,
  platform: string,
  cib: boolean
) => {
  return await fetch(url, options('POST', title, platform, cib)).then(
    handleErrors
  );
};

export const updateGame = async (
  title: string,
  platform: string,
  cib: boolean,
  id: string
) => {
  return await fetch(
    url,
    options('PUT', title, platform, cib, id)
  ).then(handleErrors);
};

export const deleteGame = async (id: string) => {
  return await fetch(url, options('DELETE', '', '', false, id)).then(
    handleErrors
  );
};
