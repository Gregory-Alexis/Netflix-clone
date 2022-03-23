import { useDispatch, useSelector } from "react-redux";
import { setError, setLoading } from "../../redux/appSlice/appSlice";
import { useParams } from "react-router";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addToList, removeToList } from "../../redux/myListSlice/myListSlice";
import NavBarCustom from "../../components/CustomComponents/NavbarCustom";

const TvDetails = () => {
  const { id } = useParams();
  const loading = useSelector((state) => state.appData.loading);
  const error = useSelector((state) => state.appData.error);
  const [tvDetails, setTvDetails] = useState([]);
  const dispatch = useDispatch();
  const myList = useSelector((state) => state.myListData.myList);

  const newList = myList.map((element) => {
    return element.id;
  });

  useEffect(() => {
    dispatch(setLoading(true));

    const fetchData = async () => {
      try {
        const result = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_MOVIE_API}&language=fr-FR`
        );

        setTvDetails(result.data);

        dispatch(setLoading(false));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };

    fetchData();
  }, [dispatch, id]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {error && (
            <p className="text-white flex justify-center items-center">
              {error}
            </p>
          )}
          <NavBarCustom />
          <div className="bg-darknet text-gray-100 min-h-screen flex flex-col items-center pt-24 px-5 xl:pl-24">
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500${tvDetails.poster_path}`}
                alt={tvDetails.poster_path}
                key={tvDetails.id}
              />
            </div>
            <div className="flex justify-center w-full">
              <h1 className=" text-2xl pt-5">{tvDetails.title}</h1>
            </div>
            <div className="flex flex-col items-center w-full xl:text-lg">
              <h2 className="text-center mt-5 text-lg">Synopsis:</h2>
              <p className="py-2 leading-7 lg:w-3/4 xl:w-2/4">
                {tvDetails.overview}
              </p>
            </div>
            <Link to={`/tv-video/${id}`} className="flex justify-center">
              <button
                type="button"
                aria-label="link button"
                className="bg-blue-700 px-12 py-2 mb-2 rounded-md text-lg hover:bg-blue-800"
              >
                Watch Trailer
              </button>
            </Link>
            {newList.includes(tvDetails.id) ? (
              <button
                className="border hover:bg-gray-500 text-gray-100 px-11 py-2 mb-2 rounded-md text-lg "
                onClick={() => dispatch(removeToList(tvDetails.id))}
              >
                Remove to my List
              </button>
            ) : (
              <button
                className="border hover:bg-gray-500 text-gray-100 px-11 py-2 mb-2 rounded-md text-lg"
                onClick={() =>
                  dispatch(
                    addToList({
                      poster: tvDetails.poster_path,
                      name: tvDetails.original_name,
                      id: tvDetails.id,
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

export default TvDetails;
