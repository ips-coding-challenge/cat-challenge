import React, { useEffect, useCallback } from "react";
import { fetchPopularBreeds } from "../api/index";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "@reach/router";
import Cache from "../helpers/Cache";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { useFetchPopularBreeds } from "../hooks/customHooks";

function BreedsHome() {
  const URL = "https://api.thecatapi.com/v1/images/search";
  const { popularBreeds, error } = useFetchPopularBreeds();
  const breeds = useSelector((state) => state.breeds);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToBreedPage = (breed) => {
    dispatch({ type: "SET_SELECTED_BREED", payload: breed });
    navigate(`/breeds/${breed.id}`);
  };

  return (
    <section className="mb-12 md:mb-20">
      <div className="flex flex-col rounded-b-base bg-secondary container mx-auto p-6 ">
        <h3 className="font-bold text-text text-search-breeds relative mb-4">
          Most Searched Breeds
        </h3>
        <div className="flex items-end justify-between my-6">
          {breeds && breeds.length > 0 && (
            <span className="text-text text-3xl font-bold leading-tight">
              {breeds.length}+ Breeds For you to discover
            </span>
          )}
          <span
            className="hidden md:block hover:black transition duration-300 cursor-pointer"
            onClick={() => navigate("/breeds/popular")}
          >
            See More &rarr;
          </span>
        </div>
        {/* Images */}
        {popularBreeds && popularBreeds.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {popularBreeds.slice(0, 4).map((b, i) => (
              <figure key={b.id} className="flex flex-col w-full">
                <LazyLoadImage
                  className={`rounded-lg h-32 w-full object-cover cursor-pointer hover:opacity-75 transition-opacity duration-300`}
                  src={`${URL}?breed_id=${b.id}&format=src&limit=1&size=thumb`}
                  alt="cat"
                  effect="opacity"
                  onClick={() => goToBreedPage(b)}
                  wrapperClassName={`${i === 0 ? "image--special" : ""}`}
                ></LazyLoadImage>
                {/* <img
                  className="rounded-lg h-32 w-full object-cover"
                  src={`${URL}?breed_id=${b.id}&format=src&limit=1&size=thumb`}
                  alt="cat"
                /> */}
                <figcaption className="mt-3 font-bold">{b.name}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default BreedsHome;
