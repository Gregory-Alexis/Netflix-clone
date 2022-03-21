import MovieRowItem from "./MovieRowItem";

const MovieRow = ({ dataFilter }) => {
  // Composant qui affiche les film et série en rangé
  return (
    <div>
      {dataFilter.map((el) => (
        <MovieRowItem title={el.title} url={el.items} key={el.title} />
      ))}
    </div>
  );
};

export default MovieRow;
