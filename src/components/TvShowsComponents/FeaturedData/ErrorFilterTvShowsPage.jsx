import { useSelector } from "react-redux";

const ErrorFilterTvShowsPage = () => {
  const search = useSelector((state) => state.tvShowsData.search);
  return (
    <div className="bg-darknet text-white flex items-center justify-center pt-48">
      <div>
        <p className="mb-4">
          Votre recherche pour "{search}" ne trouve aucune correspondance.
        </p>
        <p className="mb-4">Suggestions:</p>
        <ul className="list-disc pl-10">
          <li>Essayez différents mots clef</li>
          <li>Recherchez vous un Film ou une Série ?</li>
          <li>
            Essayez avec un film, un titre de série, un acteur ou un réalisateur
          </li>
          <li>Essayez un genre comme, comédie, romance, sports, ou drame</li>
        </ul>
      </div>
    </div>
  );
};

export default ErrorFilterTvShowsPage;
