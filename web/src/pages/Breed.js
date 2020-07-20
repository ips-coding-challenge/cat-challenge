import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "@reach/router";
import FadeIn from "react-fade-in";
import Cache from "../helpers/Cache";

function Breed(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const breed = useSelector((state) => state.selectedBreed);
  console.log(`Props`, props.id);

  useEffect(() => {
    if (!breed) {
      // Fetch from cache for now
      const breeds = Cache.get("breeds");
      if (breeds) {
        const selectedBreed = breeds.data.find((b) => b.id === props.id);
        dispatch({ type: "SET_SELECTED_BREED", payload: selectedBreed });
      } else {
        navigate("/");
        console.log(`Breed`, breed);
      }
    }
  }, [breed]);

  return (
    <FadeIn>
      {breed && <div>{breed.name}</div>}
      <div>{props.id}</div>
    </FadeIn>
  );
}

export default Breed;
