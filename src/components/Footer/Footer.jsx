import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import { useState } from "react";
import { footerData } from "../../footerData";

const Footer = () => {
  const [active, setActive] = useState(false);
  return (
    <div className="mx-5">
      <div className="pt-24 flex flex-col md:mx-8 xl:mx-96 xl:pt-48">
        <div className="text-white pb-4">
          <a href="https://www.facebook.com/netflixfrance" className="mr-6">
            <Facebook />
          </a>

          <a href="https://www.instagram.com/NetflixFR/" className="mr-6">
            <Instagram />
          </a>

          <a href="https://twitter.com/NetflixFR" className="mr-6">
            <Twitter />
          </a>

          <a href="https://www.youtube.com/user/netflixfrance" className="mr-6">
            <YouTube />
          </a>
        </div>
        <div className="flex-1 text-sm text-gray-400">
          <ul className="flex flex-wrap">
            {footerData.map((item) => (
              <li className="w-2/4 md:w-1/4 my-2" key={item.id}>
                <a href="!#" className="hover:underline">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        type="button"
        aria-label="service code"
        className="text-gray-400 border border-gray-400 text-sm px-2 py-1 mt-5 md:ml-8 xl:ml-96"
        onClick={() => setActive(!active)}
      >
        {active ? "XXXX-XX" : "Service Code"}
      </button>
      <p className="py-4 text-xs text-gray-400 md:mx-8 xl:ml-96">
        Netflix Clone Réalisé par Grégory Alexis
      </p>
    </div>
  );
};

export default Footer;
