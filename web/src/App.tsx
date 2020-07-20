import React, { useState } from "react";
import logo from "./assets/img/CatwikiLogo.svg";
import HeroImage from "./assets/img/HeroImagelg.png";

function App() {
  return (
    <div className="container mx-auto p-4">
      <header>
        <img src={logo} alt="Logo" />
      </header>
      {/* Hero section */}
      <section
        className="rounded-t-base pl-5 py-4 bg-black h-hero-sm md:h-hero-md lg:h-hero-lg bg-cover bg-no-repeat mt-6"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        <div className="flex flex-col md:justify-center h-full w-1/2 md:w-1/3 lg:w-1/4 md:ml-10">
          <h1 className="font-logo text-lg md:text-4xl lg:text-6xl text-white pb-2">
            Catwiki
          </h1>
          <h3 className="text-white text-xs md:text-2xl pb-4">
            Get to know more about your cat breed
          </h3>
          <div className="flex bg-white items-center rounded-base px-4 py-2 md:mt-4 lg:mt-8">
            <input
              className="color-text text-sm outline-none w-full md:text-2xl md:h-12"
              type="text"
              placeholder="Search"
            />
            <i className="material-icons md-48">search</i>
          </div>
        </div>
      </section>
      {/* Most Searched Section */}
    </div>
  );
}

export default App;
