import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import ErrorFilterMoviePage from "../../components/MovieComponents/FeaturedData/ErrorMovieFilterPage";
import NapRow from "../../components/NewAndPoPularComponents/NapRow/NapRow";
import NavBarNaP from "../../components/NewAndPoPularComponents/NavBarNaP/NavBarNaP";
import getTopRatedList from "../../newAndPopular";
import { setError, setLoading } from "../../redux/homeSlice/homeSlice";

const NewAndPopularPage = () => {
  const search = useSelector((state) => state.homeData.search);
  const loading = useSelector((state) => state.homeData.loading);
  const error = useSelector((state) => state.homeData.error);
  const dispatch = useDispatch();

  const [NaPdata, setNaPdata] = useState([]);

  const newFeaturedData = NaPdata.filter((item) => {
    const filteredMovie = [];

    for (let i = 0; i < NaPdata.length; i++) {
      filteredMovie.push(item.items.data.results[i].title);
      filteredMovie.push(item.title);
    }

    return filteredMovie
      .toString()
      .toLowerCase()
      .includes(search.toString().toLowerCase());
  });

  useEffect(() => {
    dispatch(setLoading(true));

    const fetchData = async () => {
      try {
        const result = await getTopRatedList();

        setNaPdata(result);

        dispatch(setLoading(false));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };

    fetchData();
  }, [dispatch]);

  const filterMovie = newFeaturedData.toString().toLocaleLowerCase();

  return (
    <div className="bg-darknet min-h-screen">
      {loading && <Loading />}
      {error && <p>{error}</p>}
      <NavBarNaP />
      {!filterMovie ? (
        <ErrorFilterMoviePage search={search} />
      ) : (
        <>
          <NapRow newFeaturedData={newFeaturedData} />
        </>
      )}
      <Footer />
    </div>
  );
};

export default NewAndPopularPage;
