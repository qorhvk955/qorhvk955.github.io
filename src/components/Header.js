import React from "react";
import "./Header.scss";
import Logo from "../assets/images/logo_black.svg";

const Header = ({ navRef, logoRef, scrollToSection }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <img
          src={Logo}
          alt="Logo"
          ref={logoRef}
          onClick={() => scrollToSection("home")}
        />
      </div>
      <nav className="header__nav" ref={navRef}>
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <a onClick={() => scrollToSection("home")}>Home</a>
          </li>
          <li className="header__nav-item">
            <a onClick={() => scrollToSection("skill")}>Skill</a>
          </li>
          <li className="header__nav-item">
            <a onClick={() => scrollToSection("project")}>Psroject</a>
          </li>
          <li className="header__nav-item">
            <a onClick={() => scrollToSection("timeline")}>Timeline</a>
          </li>
          <li className="header__nav-item">
            <a onClick={() => scrollToSection("contact")}>Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
