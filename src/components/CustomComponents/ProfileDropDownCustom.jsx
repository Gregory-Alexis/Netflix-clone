import { ArrowDropUp } from "@mui/icons-material";

const ProfileDropDownCustom = () => {
  // Composant qui affiche les options utilisateur
  return (
    <div
      className="ProfiledropdownContainer"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex="-1"
    >
      <svg className="ArrowUpProfile">
        <ArrowDropUp />
      </svg>

      <ul method="POST" role="none">
        <li className="dropdownLinkProfile border-b border-b-gray-500">
          <a href="#top">Manage Profiles</a>
        </li>

        <li className="dropdownLinkProfile">
          <a href="#top">Account</a>
        </li>

        <li className="dropdownLinkProfile">
          <a href="#top">Help Center</a>
        </li>

        <li className="dropdownLinkProfile">
          <a href="#top">Sign out of Netflix</a>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropDownCustom;
