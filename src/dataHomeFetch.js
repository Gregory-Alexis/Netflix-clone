import axios from "axios";

const API = "https://api.themoviedb.org/3";

const fetch = async (endpoint) => {
  const result = await axios.get(`${API}${endpoint}`);
  return result;
};

const getHomeList = async () => {
  return [
    {
      from: "original",
      title: "Original Netflix",
      items: await fetch(
        `/discover/tv?&language=fr-FR&api_key=${process.env.REACT_APP_MOVIE_API}`
      ),
    },
    {
      from: "trending",
      title: "Recommandé pour vous",
      items: await fetch(
        `/trending/all/week?&language=fr-FR&api_key=${process.env.REACT_APP_MOVIE_API}`
      ),
    },
    {
      from: "toprated",
      title: "Les mieux noté",
      items: await fetch(
        `/movie/top_rated?&language=fr-FR&api_key=${process.env.REACT_APP_MOVIE_API}`
      ),
    },
    {
      from: "action",
      title: "Action",
      items: await fetch(
        `/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&with_genres=28`
      ),
    },
    {
      from: "comedy",
      title: "Comédie",
      items: await fetch(
        `/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&with_genres=35`
      ),
    },
    {
      from: "horror",
      title: "Horreur",
      items: await fetch(
        `/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&with_genres=27`
      ),
    },
    {
      from: "romance",
      title: "Romance",
      items: await fetch(
        `/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&with_genres=10749`
      ),
    },
    {
      from: "documentary",
      title: "Documentaire",
      items: await fetch(
        `/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&with_genres=99`
      ),
    },
  ];
};
export default getHomeList;

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
