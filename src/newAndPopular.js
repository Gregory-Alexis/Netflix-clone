import axios from "axios";

const API = "https://api.themoviedb.org/3";

const fetch = async (endpoint) => {
  const result = await axios.get(`${API}${endpoint}`);
  return result;
};

const getTopRatedList = async () => {
  return [
    {
      from: "toprated",
      title: "Top 10 en France Today",
      items: await fetch(
        `/movie/top_rated?&language=fr-FR&api_key=${process.env.REACT_APP_MOVIE_API}`
      ),
    },
    {
      from: "New on Netflix",
      title: "New on Netflix",
      items: await fetch(
        `/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&with_genres=28`
      ),
    },
    {
      from: "Coming This Week",
      title: "Coming This Week",
      items: await fetch(
        `/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&with_genres=35`
      ),
    },
    {
      from: "Coming Next Week",
      title: "Coming Next Week",
      items: await fetch(
        `/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&with_genres=27`
      ),
    },
    {
      from: "Worth the Wait",
      title: "Worth the Wait",
      items: await fetch(
        `/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&with_genres=10749`
      ),
    },
  ];
};
export default getTopRatedList;

export const getMovieInfo = async (movieId, type) => {
  let info = {};

  if (movieId) {
    switch (type) {
      case "movie":
        info = await fetch(
          `/movie/${movieId}?language=fr-FR&api_key=${process.env.REACT_APP_MOVIE_API}`
        );
        break;
      case "tv":
        info = await fetch(
          `/tv/${movieId}?language=fr-FR&api_key=${process.env.REACT_APP_MOVIE_API}`
        );
        break;
      default:
        info = null;
    }

    return info;
  }
};
