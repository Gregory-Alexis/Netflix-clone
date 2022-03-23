import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import getTvShowsList from "../../dataTvShowsFetch";
import SuggestionTvShowsPageItem from "./SuggestionTvShowsPageItem";
import { setError, setLoading } from "../../redux/appSlice/appSlice";
import SubNavBarTvShowsSuggestion from "../../components/TvShowsComponents/NavBar/SubNavBarTvShowsSuggestion";
import NavbarTvMovieCustom from "../../components/CustomComponents/NavbarTvMovieCustom";

const SuggestionTvShowsPage = () => {
  const [suggestionTvShowsData, setSuggestionTvShowsData] = useState([]);
  const loading = useSelector((state) => state.appData.loading);
  const error = useSelector((state) => state.appData.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const fetchData = async () => {
      try {
        const result = await getTvShowsList();

        setSuggestionTvShowsData(result);

        dispatch(setLoading(false));
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
      <NavbarTvMovieCustom active="tv" />
      <SubNavBarTvShowsSuggestion />
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
