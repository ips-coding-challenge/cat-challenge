import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "@reach/router";
import { incrementViews } from "../../api/index";

function Results({ id, clazz, results, showModal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const incrementPopularity = async (item) => {
    try {
      await incrementViews(item);
      dispatch({ type: "SET_SELECTED_BREED", payload: item });
      dispatch({ type: "SET_SHOW_MODAL", payload: false });
      navigate(`/breeds/${item.id}`);
    } catch (e) {
      console.log(`Error`, e);
    }
  };

  return (
    <div
      id={id ? id : null}
      className={`z-20 ${clazz} ${showModal ? "h-hero-md" : ""}`}
    >
      {results.length > 0 && (
        <ul
          className={`${
            showModal ? "mt-6 h-full" : "max-h--200 m-4 overflow-y-auto"
          }`}
        >
          {results.slice(0, 10).map((breed, i) => (
            <li
              className="text-lg w-full p-4 rounded-lg cursor-pointer transition hover:bg-gray-300"
              key={i}
              tabIndex="1"
              onClick={() => incrementPopularity(breed)}
            >
              {breed.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Results;
