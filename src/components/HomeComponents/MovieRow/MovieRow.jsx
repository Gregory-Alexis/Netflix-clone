import MovieRowItem from "./MovieRowItem";

// Composant qui affiche les film et série en ligne

const MovieRow = ({ newData }) => {
  return newData.map((el) => (
    <MovieRowItem title={el.title} url={el.items} key={el.title} />
  ));
};

export default MovieRow;
