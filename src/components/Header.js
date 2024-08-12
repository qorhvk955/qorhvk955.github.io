import React from "react";
import "./Header.scss";
import Logo from "../assets/images/logo_black.svg";

const Header = ({ navRef, logoRef }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={Logo} alt="Logo" ref={logoRef} />
      </div>
      <nav className="header__nav" ref={navRef}>
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <a href="/">Home</a>
          </li>
          <li className="header__nav-item">
            <a href="/about">Skill</a>
          </li>
          <li className="header__nav-item">
            <a href="/services">Project</a>
          </li>
          <li className="header__nav-item">
            <a href="/contact">Timeline</a>
          </li>
          <li className="header__nav-item">
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
