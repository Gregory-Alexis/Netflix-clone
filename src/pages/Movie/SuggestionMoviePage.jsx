import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import NavBarMovieSuggestion from "../../components/MovieComponents/NavBar/NavBarMovieSuggestion";
import getHomeList from "../../dataHomeFetch";
import {
  setError,
  setLoading,
  setSuggestionMovieData,
} from "../../redux/movieSlice/suggestionMovieSlice";
import SuggestionMoviePageItem from "./SuggestionMoviePageItem";

const SuggestionMoviePage = () => {
  const suggestionMovieData = useSelector(
    (state) => state.suggestionMovieData.suggestionMovieData
  );
  const loading = useSelector((state) => state.suggestionMovieData.loading);
  const error = useSelector((state) => state.suggestionMovieData.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const fetchData = async () => {
      try {
        const result = await getHomeList();

        dispatch(setSuggestionMovieData(result));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="bg-darknet min-h-screen">
      {loading && <Loading />}
      {error && <p>{error}</p>}
      <NavBarMovieSuggestion dispatch={dispatch} />
      <div className="pt-20">
        {suggestionMovieData.map((el) => (
          <SuggestionMoviePageItem
            title={el.title}
            url={el.items}
            key={el.title}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default SuggestionMoviePage;
