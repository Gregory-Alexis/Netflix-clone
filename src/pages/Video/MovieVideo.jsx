import { useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setData, setError, setLoading } from "../../redux/homeSlice/homeSlice";
import { useParams } from "react-router";
import axios from "axios";

const Video = () => {
  const { id } = useParams();
  const movieData = useSelector((state) => state.homeData.data);
  const loading = useSelector((state) => state.homeData.loading);
  const error = useSelector((state) => state.homeData.error);
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
      <div className="bg-darknet min-h-screen">
        {movieData.map((el) => (
          <div className="bg-darknet min-h-screen text-white">
            <iframe
              src={`https://www.youtube.com/embed/${el.key}`}
              title="video"
              className="w-full h-screen"
            ></iframe>
          </div>
        ))}
      </div>
    </>
  );
};

export default Video;
