import React, { useState, useEffect } from "react";
import "./Navbar.css";
import trflag from "../../common/SvgIcon/turkey-flag.svg";
import enflag from "../../common/SvgIcon/united-kingdom-flag.svg";
import { translate } from "../Translation/Translation";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("tr");

  const handleNavLinkClick = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleLanguageChange = (lang) => {
    setSelectedLang(lang);
    const currentUrl = window.location.href;
    const url = currentUrl.includes("lang=")
      ? currentUrl.replace(/lang=[a-z]{2}/, `lang=${lang}`)
      : currentUrl.includes("?")
      ? `${currentUrl}&lang=${lang}`
      : `${currentUrl}?lang=${lang}`;
    window.location.href = url;
  };

  const virtusarge = translate("virtus_arge");
  const about = translate("about");
  const products = translate("products");
  const contact = translate("contact");

  useEffect(() => {
    const handleLanguageChangeFromUrl = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const lang = urlParams.get("lang");
      if (lang) {
        setSelectedLang(lang);
      }
    };

    handleLanguageChangeFromUrl();

  }, []);

  return (
    <nav>
      <a href={`/?lang=${selectedLang}`} className="title">
        {virtusarge}
      </a>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <img src="/menu.svg" alt="Menu Icon" width="24" height="24" />
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li onClick={() => handleNavLinkClick("about")}>
          <span className="nav-link">{about}</span>
        </li>
        <li onClick={() => handleNavLinkClick("testpage")}>
          <span>{products}</span>
        </li>
        <li onClick={() => handleNavLinkClick("contact")}>
          <span>{contact}</span>
        </li>
        <li className="language-toggle">
          {selectedLang === "tr" ? (
            <img src={enflag} alt="English Flag" onClick={() => handleLanguageChange("en")} />
          ) : (
            <img src={trflag} alt="Turkish Flag" onClick={() => handleLanguageChange("tr")} />
          )}
          
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
