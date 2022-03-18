import { useDispatch, useSelector } from "react-redux";
import { setError, setLoading } from "../../redux/homeSlice/homeSlice";
import { useParams } from "react-router";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { useEffect, useState } from "react";
import NavBar from "../../components/HomeComponents/NavBar/NavBar";
import { Link } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const loading = useSelector((state) => state.homeData.loading);
  const error = useSelector((state) => state.homeData.error);
  const [movieDetails, setMovieDetails] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    const fetchData = async () => {
      try {
        const result = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_API}&language=fr-FR`
        );

        setMovieDetails(result.data);

        dispatch(setLoading(false));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };

    fetchData();
  }, [dispatch, id]);

  return (
    <>
      {loading && <Loading />}
      {error && (
        <p className="text-white flex justify-center items-center">{error}</p>
      )}
      <NavBar />
      <div className="bg-darknet text-gray-100 min-h-screen pt-24 px-5 xl:pl-24 xl:flex">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.poster_path}
            key={movieDetails.id}
          />
        </div>
        <div className="flex justify-center w-full">
          <h1 className=" text-2xl pt-5">{movieDetails.title}</h1>
        </div>
        <div className="">
          <h2 className="text-center mt-5 text-lg">Synopsis:</h2>
          <p className="py-2 leading-7">{movieDetails.overview}</p>
        </div>
        <Link to={`/movie-video/${id}`} className="flex justify-center">
          <button
            type="button"
            aria-label="link button"
            className="bg-blue-700 px-12 py-2 mb-2 rounded-md text-lg hover:bg-blue-800"
          >
            Watch Trailer
          </button>
        </Link>
      </div>
    </>
  );
};

export default MovieDetails;
