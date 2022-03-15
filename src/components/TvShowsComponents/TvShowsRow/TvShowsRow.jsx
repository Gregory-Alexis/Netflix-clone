import TvShowsRowItem from "./TvShowsRowItem";

const TvShowsRow = ({ dataFilter }) => {
  return (
    <div>
      {dataFilter.map((el) => (
        <TvShowsRowItem title={el.title} url={el.items} key={el.title} />
      ))}
    </div>
  );
};

export default TvShowsRow;
