import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBarCustom from "../../components/CustomComponents/NavbarCustom";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import SubNavBarMovieSuggestion from "../../components/MovieComponents/NavBar/SubNavBarMovieSuggestion";
import getHomeList from "../../dataHomeFetch";
import { setError, setLoading } from "../../redux/homeSlice/homeSlice";
import SuggestionMoviePageItem from "./SuggestionMoviePageItem";

const SuggestionMoviePage = () => {
  const [suggestionMovieData, setSuggestionMovieData] = useState([]);
  const loading = useSelector((state) => state.homeData.loading);
  const error = useSelector((state) => state.homeData.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const fetchData = async () => {
      try {
        const result = await getHomeList();

        setSuggestionMovieData(result);

        dispatch(setLoading(false));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="bg-darknet min-h-screen">
      {loading && <Loading />}
      {error && (
        <p className="text-white flex justify-center items-center">{error}</p>
      )}
      <NavBarCustom active="movie" />
      <SubNavBarMovieSuggestion suggestion="movie-suggestion" />
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
