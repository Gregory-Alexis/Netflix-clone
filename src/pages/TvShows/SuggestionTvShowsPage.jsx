import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import NavBarTvShowsSuggestion from "../../components/TvShowsComponents/NavBar/NavBarTvShowsSuggestion";
import getTvShowsList from "../../dataTvShowsFetch";
import {
  setError,
  setLoading,
  setSuggestionTvShowsData,
} from "../../redux/tvShowsSlice/suggestionTvShowsSlice";
import SuggestionTvShowsPageItem from "./SuggestionTvShowsPageItem";

const SuggestionTvShowsPage = () => {
  const suggestionTvShowsData = useSelector(
    (state) => state.suggestionTvShowsData.suggestionTvShowsData
  );

  const loading = useSelector((state) => state.suggestionTvShowsData.loading);
  const error = useSelector((state) => state.suggestionTvShowsData.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const fetchData = async () => {
      try {
        const result = await getTvShowsList();

        dispatch(setSuggestionTvShowsData(result));
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="bg-darknet min-h-screen">
      {loading && <Loading />}
      {error && <p>{error}</p>}
      <NavBarTvShowsSuggestion />
      <div className="pt-20">
        {suggestionTvShowsData.map((el) => (
          <SuggestionTvShowsPageItem
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

export default SuggestionTvShowsPage;
