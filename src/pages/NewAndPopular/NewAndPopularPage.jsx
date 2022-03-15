import { useEffect, useState } from "react";

import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/HomeComponents/NavBar/NavBar";
import Loading from "../../components/Loading/Loading";
import ErrorFilterMoviePage from "../../components/MovieComponents/FeaturedData/ErrorMovieFilterPage";
import NapRow from "../../components/NewAndPoPularComponents/NapRow/NapRow";
import getTopRatedList from "../../newAndPopular";

const NewAndPopularPage = () => {
  const [active, setActive] = useState(false);
  const [filter, setFilter] = useState("all");
  const [NaPdata, setNaPdata] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const activeHandler = () => {
    setActive(!active);
  };

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
    setLoading(true);

    const fetchData = async () => {
      try {
        const result = await getTopRatedList();

        setNaPdata(result);

        setLoading(false);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const filterMovie = newFeaturedData.toString().toLocaleLowerCase();

  return (
    <div className="bg-darknet min-h-screen">
      {loading && <Loading />}
      {error && <p>{error}</p>}
      <NavBar
        activeHandler={activeHandler}
        active={active}
        setActive={setActive}
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
      />
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
