import React from "react";
import { useSelector } from "react-redux";
import { useFetchPopularBreeds } from "../hooks/customHooks";
import FadeIn from "react-fade-in";

const PopularBreeds = () => {
  const { popularBreeds, error } = useFetchPopularBreeds();

  return (
    <FadeIn>
      {popularBreeds && (
        <ul>
          {popularBreeds.map(({ id, name }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
      )}
    </FadeIn>
  );
};

export default PopularBreeds;
