import FeaturedDataCustom from "../../CustomComponents/FeaturedDataCustom";

const HomeFeaturedData = ({ featuredData }) => {
  return (
    // Composant qui affiche l'image d'un film ou d'une série de manière aléatoire
    <FeaturedDataCustom props={featuredData} link="tv-video" />
  );
};

export default HomeFeaturedData;
