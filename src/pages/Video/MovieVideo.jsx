import { useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setData, setError, setLoading } from "../../redux/appSlice/appSlice";
import { useParams } from "react-router";
import axios from "axios";

const Video = () => {
  const { id } = useParams();
  const movieData = useSelector((state) => state.appData.data);
  const loading = useSelector((state) => state.appData.loading);
  const error = useSelector((state) => state.appData.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    const fetchData = async () => {
      try {
        const result = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_MOVIE_API}&language=fr-Fr`
        );
        dispatch(setData(result.data.results.slice(0, 1)));
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
      {movieData.length === 0 && (
        <p className="text-white  flex justify-center items-center bg-darknet h-screen text-4xl px-6 text-center">
          Désolé, nous n'avons pas encore cette vidéo dans notre catalogue.
        </p>
      )}
      <div className="bg-darknet h-screen max-w-96">
        {movieData.map((el) => (
          <div className="bg-darknet text-white">
            <iframe
              src={`https://www.youtube.com/embed/${el.key}`}
              title="video"
              className="absolute left-0 right-0 top-0 bottom-0 w-full h-96 m-auto lg:h-3/4 xl:h-screen"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </>
  );
};

export default Video;
