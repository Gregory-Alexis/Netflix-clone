import MovieRowItem from "./MovieRowItem";

const MovieRow = ({ newData }) => {
  return newData.map((el) => (
    <MovieRowItem title={el.title} url={el.items} key={el.title} />
  ));
};

export default MovieRow;
