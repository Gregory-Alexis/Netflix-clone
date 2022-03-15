import axios from "axios";

const API = "https://api.themoviedb.org/3";

const fetch = async (endpoint) => {
  const result = await axios.get(`${API}${endpoint}`);
  return result;
};

const getMovieList = async () => {
  return [
    {
      genre: "action & adventure",
      title: "Action & Adventure",
      items: await fetch(
        `/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&with_genres=28`
      ),
    },
    {
      genre: "animation",
      title: "Animation",
      items: await fetch(
        `/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&with_genres=16`
      ),
    },
    {
      genre: "comedy",
      title: "Comédie",
      items: await fetch(
        `/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&with_genres=35`
      ),
    },
    {
      genre: "crime",
      title: "Crime",
      items: await fetch(
        `/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&with_genres=80`
      ),
    },
    {
      genre: "drama",
      title: "Drama",
      items: await fetch(
        `/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&with_genres=18`
      ),
    },
    {
      genre: "family",
      title: "Family",
      items: await fetch(
        `/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&with_genres=10751`
      ),
    },
    {
      genre: "fantasy",
      title: "Fantasie",
      items: await fetch(
        `/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&with_genres=9648`
      ),
    },
    {
      genre: "news",
      title: "News",
      items: await fetch(
        `/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&with_genres=14`
      ),
    },
  ];
};
export default getMovieList;

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
