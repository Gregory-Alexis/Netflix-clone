import MovieRowItem from "./MovieRowItem";

const MovieRow = ({ dataFilter }) => {
  return (
    <div>
      {dataFilter.map((el) => (
        <MovieRowItem title={el.title} url={el.items} key={el.title} />
      ))}
    </div>
  );
};

export default MovieRow;
