const url = "http://localhost:8000/games";
const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
};

export const fetchGames = async () => {
    return await fetch(url, options).then((response) => response.json())
}