import React from "react";
import { useSelector } from "react-redux";
import LogoWhite from "../assets/img/CatwikiLogo_white.svg";
import HeroImage from "../assets/img/HeroImagelg.png";
import Autocomplete from "../components/autocomplete/Autocomplete";
import BreedsHome from "../components/BreedsHome";
import WhySection from "../components/WhySection";
import { useFetchBreeds } from "../hooks/customHooks";
import Layout from "../layouts/Layout";

function Home() {
  const { breeds, error } = useFetchBreeds();

  if (error) console.log(`Error from useFetchBreeds ?`, error);

  return (
    <Layout>
      {/* Hero section */}
      <section
        className="rounded-t-base pl-5 py-4 bg-black h-hero-sm md:h-hero-md lg:h-hero-lg bg-cover bg-no-repeat mt-6"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        <div className="flex flex-col md:justify-center h-full w-1/2 md:w-1/3 lg:w-1/4 md:ml-10">
          <h1 className="font-logo md:hidden text-lg md:text-4xl lg:text-6xl text-white pb-2">
            Catwiki
          </h1>
          <img
            className="hidden md:block h-24"
            src={LogoWhite}
            alt="Cat Logo"
          />
          <h3 className="text-white text-xs md:text-xl pb-4">
            Get to know more about your cat breed
          </h3>
          <Autocomplete />
        </div>
      </section>
      {/* Most Searched Section */}

      <BreedsHome />

      {/* Why Section */}
      <WhySection />
    </Layout>
  );
}

export default Home;
