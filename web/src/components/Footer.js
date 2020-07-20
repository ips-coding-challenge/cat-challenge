import React from "react";
import Logo from "../assets/img/CatwikiLogo_white.svg";

function Footer() {
  return (
    <div className="h-20 bg-black rounded-t-base">
      <div className="flex flex-col md:flex-row md:justify-between md:px-4 items-center h-full p-2">
        <img src={Logo} alt="Cat logo" />
        <span className="text-white text-sm">
          CodingChallenge - devchallenges.io 2020
        </span>
      </div>
    </div>
  );
}

export default Footer;
