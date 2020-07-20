import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Logo from "./assets/img/CatwikiLogo.svg";
import LogoWhite from "./assets/img/CatwikiLogo_white.svg";
import HeroImage from "./assets/img/HeroImagelg.png";
import { fetchBreeds, fetchPopularBreeds } from "./api";
import Cache from "./helpers/Cache";
import Autocomplete from "./components/autocomplete/Autocomplete";
const EXPIRATION = 60 * 60 * 1000;

function App() {
  const dispatch = useDispatch();
  const fetchAllBreeds = useCallback(async () => {
    const cachedBreeds = Cache.get("breeds");
    console.log(`CachedBreeds`, cachedBreeds);
    console.log(`Date now`, Date.now());
    if (cachedBreeds && cachedBreeds.expiration > Date.now()) {
      console.log(`From cache`, cachedBreeds);
      dispatch({ type: "SET_BREEDS", payload: cachedBreeds.data });
    } else {
      try {
        const response = await fetchBreeds();
        console.log(`From server`, response.data);
        Cache.set("breeds", {
          data: response.data,
          expiration: Date.now() + EXPIRATION,
        });
        dispatch({ type: "SET_BREEDS", payload: response.data });
      } catch (e) {
        console.log("Error", e);
      }
    }
  }, []);
  useEffect(() => {
    fetchAllBreeds();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <header>
        <img src={Logo} alt="Logo" />
      </header>
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
    </div>
  );
}

export default App;
