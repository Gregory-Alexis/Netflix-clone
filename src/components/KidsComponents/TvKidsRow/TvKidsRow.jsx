import TvKidsRowItem from "./TvKidsRowItem";

// Composant qui affiche les film et série en rangé
const TvKidsRow = ({ newFeaturedData }) => {
  return newFeaturedData.map((el) => (
    <TvKidsRowItem title={el.title} url={el.items} key={el.title} />
  ));
};

export default TvKidsRow;
