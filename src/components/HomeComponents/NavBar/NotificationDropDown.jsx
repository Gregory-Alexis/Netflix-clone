import { ArrowDropUp } from "@mui/icons-material";
import { notifData } from "../../../notifData";

const NotificationDropDown = () => {
  // Composant qui affiche les notifications utilisateur
  return (
    <>
      <div className="NotificationDropdownContainer">
        <div
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <ul className="overflow-auto h-70 cursor-pointer">
            {notifData.map((el) => (
              <li className="dropdownLinkNotif" key={el.subtitle}>
                <img src={el.img} alt="notifications" width="100" />
                <div className="ml-5 hover:text-white w-full h-full">
                  <h1>{el.title}</h1>
                  <p>{el.subtitle}</p>
                  <p className="text-gray-500 text-xs">{el.when}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <svg className="ArrowUpNotification">
        <ArrowDropUp />
      </svg>
    </>
  );
};

export default NotificationDropDown;
