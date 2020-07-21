import React from "react";
import { useNavigate } from "@reach/router";
import { useSelector } from "react-redux";
import { useFetchPopularBreeds } from "../hooks/customHooks";
import Layout from "../layouts/Layout";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const PopularBreeds = () => {
  const URL = "https://api.thecatapi.com/v1/images/search";
  const navigate = useNavigate();
  const { popularBreeds, error } = useFetchPopularBreeds();

  const BreedMedia = (b, i) => (
    <div
      onClick={() => navigate(`/breeds/${b.id}`)}
      key={b.id}
      className="flex h-auto mb-12 p-2 hover:shadow-lg transition-shadow duration-300 cursor-pointer rounded-base"
    >
      <LazyLoadImage
        className="h-20 w-20 md:h-64 md:w-64 md:mr-16 object-cover rounded-base mr-4"
        effect="opacity"
        src={`${URL}?breed_id=${b.id}&format=src&limit=1&size=md`}
      ></LazyLoadImage>
      <div className="w-2/3">
        <h3 className="font-bold text-lg">
          {i + 1}. {b.name}
        </h3>
        <p className="text-sm mt-2 md:mt-6 md:text-lg">{b.description}</p>
      </div>
    </div>
  );

  return (
    <Layout>
      <h1 className="text-2xl font-bold mt-20 mb-10">
        Top 10 most searched Breeds
      </h1>

      {popularBreeds &&
        popularBreeds.length > 0 &&
        popularBreeds.map((b, i) => BreedMedia(b, i))}
    </Layout>
  );
};

export default PopularBreeds;
