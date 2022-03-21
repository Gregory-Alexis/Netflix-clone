import TvShowsRowItem from "./TvShowsRowItem";

const TvShowsRow = ({ dataFilter }) => {
  // Composant qui affiche les film et série en rangé
  return (
    <div>
      {dataFilter.map((el) => (
        <TvShowsRowItem title={el.title} url={el.items} key={el.title} />
      ))}
    </div>
  );
};

export default TvShowsRow;
