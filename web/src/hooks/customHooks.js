import React, { useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBreeds, fetchPopularBreeds } from "../api/index";
import Cache from "../helpers/Cache";
const EXPIRATION_LONG = 60 * 60 * 1000;
const EXPIRATION_SHORT = 60 * 1000;

export const useFetchBreeds = () => {
  const [breeds, setBreeds] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const fetchAllBreeds = useCallback(async () => {
    const cachedBreeds = Cache.get("breeds");
    console.log(`CachedBreeds`, cachedBreeds);
    if (cachedBreeds && cachedBreeds.expiration > Date.now()) {
      setBreeds(cachedBreeds.data);
      dispatch({ type: "SET_BREEDS", payload: cachedBreeds.data });
      dispatch({ type: "SET_LOADING", payload: false });
    } else {
      try {
        const response = await fetchBreeds();
        console.log(`From server`, response.data);
        Cache.set("breeds", {
          data: response.data,
          expiration: Date.now() + EXPIRATION_LONG,
        });
        setBreeds(cachedBreeds.data);
        dispatch({ type: "SET_BREEDS", payload: response.data });
      } catch (e) {
        console.log("Error", e);
        setError(e.message);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }
  }, []);

  useEffect(() => {
    fetchAllBreeds();
  }, []);

  return { breeds, error };
};

export const useFetchPopularBreeds = () => {
  const [popularBreeds, setPopularBreeds] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    const cachedPopularBreeds = Cache.get("popular_breeds");
    console.log(`cachedPopularBreeds`, cachedPopularBreeds);
    if (cachedPopularBreeds && cachedPopularBreeds.expiration > Date.now()) {
      setPopularBreeds(cachedPopularBreeds.data);
      dispatch({
        type: "SET_POPULAR_BREEDS",
        payload: cachedPopularBreeds.data,
      });
    } else {
      // I check if i have enough data to get the popular breeds
      try {
        const response = await fetchPopularBreeds();
        // console.log(`Response`, response);

        if (response.data.length >= 4) {
          Cache.set("popular_breeds", {
            data: response.data,
            expiration: Date.now() + EXPIRATION_SHORT,
          });
          setPopularBreeds(response.data);
          dispatch({
            type: "SET_POPULAR_BREEDS",
            payload: response.data,
          });
        } else {
          const breeds = Cache.get("breeds") && Cache.get("breeds").data;
          const randomBreeds = breeds.slice(0, 4).map((b) => {
            const newOne = {
              id: b.id,
              name: b.name,
              description: b.description,
              views: 0,
            };
            return newOne;
          });
          // console.log(`RandomBreeds`, randomBreeds);
          setPopularBreeds(randomBreeds);
          dispatch({ type: "SET_POPULAR_BREEDS", payload: randomBreeds });
        }
      } catch (e) {
        console.log(`Error`, e);
        setError(e.message);
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return { popularBreeds, error };
};
