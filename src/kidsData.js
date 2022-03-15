import axios from "axios";

const API = "https://api.themoviedb.org/3";

const fetch = async (endpoint) => {
  const result = await axios.get(`${API}${endpoint}`);
  return result;
};

const getTvKidsList = async () => {
  return [
    {
      genre: "Kids",
      title: "Kids",
      items: await fetch(
        `/discover/tv?api_key=${process.env.REACT_APP_MOVIE_API}&with_genres=10762`
      ),
    },
    {
      genre: "Family",
      title: "Family",
      items: await fetch(
        `/discover/tv?api_key=${process.env.REACT_APP_MOVIE_API}&with_genres=10751`
      ),
    },
  ];
};
export default getTvKidsList;
