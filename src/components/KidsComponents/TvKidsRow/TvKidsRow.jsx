import TvKidsRowItem from "./TvKidsRowItem";

const TvKidsRow = ({ newFeaturedData }) => {
  return newFeaturedData.map((el) => (
    <TvKidsRowItem title={el.title} url={el.items} key={el.title} />
  ));
};

export default TvKidsRow;
