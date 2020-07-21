import React from "react";
import { useNavigate } from "@reach/router";
import Logo from "../assets/img/CatwikiLogo.svg";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="pt-4">
      <img
        className="cursor-pointer"
        src={Logo}
        alt="Logo"
        onClick={() => navigate("/")}
      />
    </header>
  );
};

export default Header;
