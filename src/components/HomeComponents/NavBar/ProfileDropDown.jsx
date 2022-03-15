import { ArrowDropUp } from "@mui/icons-material";

const ProfileDropDown = () => {
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
          <a href="!#">Manage Profiles</a>
        </li>

        <li className="dropdownLinkProfile">
          <a href="!#">Account</a>
        </li>

        <li className="dropdownLinkProfile">
          <a href="!#">Help Center</a>
        </li>

        <li className="dropdownLinkProfile">
          <a href="!#">Sign out of Netflix</a>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropDown;
