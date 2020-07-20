import React from "react";
import { incrementViews } from "../../api/index";

function Results({ clazz, results, showModal }) {
  const incrementPopularity = async (item) => {
    try {
      await incrementViews(item);
    } catch (e) {
      console.log(`Error`, e);
    } finally {
      // Go to the breed page
    }
  };

  return (
    <div className={`z-20 ${clazz} ${showModal ? "h-hero-md" : ""}`}>
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
