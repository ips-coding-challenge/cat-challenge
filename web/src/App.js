import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Logo from "./assets/img/CatwikiLogo.svg";
import LogoWhite from "./assets/img/CatwikiLogo_white.svg";
import HeroImage from "./assets/img/HeroImagelg.png";
import { fetchBreeds, fetchPopularBreeds } from "./api";
import Cache from "./helpers/Cache";
import FadeIn from "react-fade-in";
import Splash from "./components/Splash";
import Autocomplete from "./components/autocomplete/Autocomplete";
import BreedsHome from "./components/BreedsHome";
import WhySection from "./components/WhySection";
import Footer from "./components/Footer";

const EXPIRATION = 60 * 60 * 1000;

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  const fetchAllBreeds = useCallback(async () => {
    const cachedBreeds = Cache.get("breeds");
    console.log(`CachedBreeds`, cachedBreeds);
    if (cachedBreeds && cachedBreeds.expiration > Date.now()) {
      dispatch({ type: "SET_BREEDS", payload: cachedBreeds.data });
      setTimeout(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      }, 500);
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
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }
  }, []);

  useEffect(() => {
    fetchAllBreeds();
  }, []);

  // if (loading) return <Splash />;

  return (
    <FadeIn duration="500" delay="100">
      <div className="container mx-auto px-4 md:px-20">
        <header className="mt-4">
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

        <BreedsHome />

        {/* Why Section */}
        <WhySection />

        {/* Footer */}
        <Footer />
      </div>
    </FadeIn>
  );
}

export default App;
