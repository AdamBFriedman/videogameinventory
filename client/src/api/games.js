import { getHeadersWithAuth } from '../components/LoginForm';
import { handleErrors } from '../components/LoginForm';

const url = 'http://localhost:8000/games';
const getOptions = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  },
};

const postOptions = (title, platform) => {
  return {
    method: 'POST',
    headers: getHeadersWithAuth(),
    body: JSON.stringify({
      title,
      platform,
    }),
  };
};

export const fetchGames = async () => {
  return await fetch(url, getOptions).then((response) =>
    response.json()
  );
};

export const addGame = async (title, platform) => {
  return await fetch(url, postOptions(title, platform)).then(
    handleErrors
  );
};
