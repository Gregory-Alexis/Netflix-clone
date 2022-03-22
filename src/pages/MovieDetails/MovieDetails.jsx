import { useDispatch, useSelector } from "react-redux";
import { setError, setLoading } from "../../redux/appSlice/appSlice";
import { useParams } from "react-router";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addToList, removeToList } from "../../redux/myListSlice/myListSlice";
import NavBarCustom from "../../components/CustomComponents/NavbarCustom";

const MovieDetails = () => {
  const { id } = useParams();
  const loading = useSelector((state) => state.appData.loading);
  const error = useSelector((state) => state.appData.error);
  const myList = useSelector((state) => state.myListData.myList);
  const [movieDetails, setMovieDetails] = useState([]);
  const dispatch = useDispatch();

  const newList = myList.map((element) => {
    return element.id;
  });

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
      {error && (
        <p className="text-white flex justify-center items-center">{error}</p>
      )}
      {loading ? (
        <Loading />
      ) : (
        <>
          <NavBarCustom />
          <div className="bg-darknet text-gray-100 min-h-screen flex flex-col items-center pt-24 px-5 xl:pl-24">
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
            <div className="flex flex-col items-center w-full">
              <h2 className="text-center mt-5 text-lg">Synopsis:</h2>
              <p className="py-2 leading-7 lg:w-3/4 xl:w-2/4 xl:text-lg">
                {movieDetails.overview}
              </p>
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
            {newList.includes(movieDetails.id) ? (
              <button
                className="border hover:bg-gray-500 text-gray-100 px-11 py-2 mb-2 rounded-md text-lg "
                onClick={() => dispatch(removeToList(movieDetails.id))}
              >
                Remove to my List
              </button>
            ) : (
              <button
                className="border hover:bg-gray-500 text-gray-100 px-11 py-2 mb-2 rounded-md text-lg"
                onClick={() =>
                  dispatch(
                    addToList({
                      poster: movieDetails.poster_path,
                      name: movieDetails.original_name,
                      id: movieDetails.id,
                    })
                  )
                }
              >
                Add to my List
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default MovieDetails;
