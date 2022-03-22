import { useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import axios from "axios";
import {
  setError,
  setFeaturedData,
  setLoading,
} from "../../redux/appSlice/appSlice";

const TvShowsVideo = () => {
  const { id } = useParams();
  const tvShowsData = useSelector((state) => state.appData.data);
  const loading = useSelector((state) => state.appData.loading);
  const error = useSelector((state) => state.appData.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    const fetchData = async () => {
      try {
        const result = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.REACT_APP_MOVIE_API}&language=fr-Fr`
        );
        dispatch(setFeaturedData(result.data.results.slice(0, 1)));
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
      {tvShowsData.length === 0 && (
        <p className="text-white  flex justify-center items-center bg-darknet h-screen text-4xl px-6 text-center">
          Désolé, nous n'avons pas encore cette vidéo dans notre catalogue.
        </p>
      )}
      <div className="bg-darknet min-h-screen">
        {tvShowsData.map((el) => (
          <div className="bg-darknet min-h-screen text-white" key={el.id}>
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

export default TvShowsVideo;
