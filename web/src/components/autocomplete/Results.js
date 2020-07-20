import React from "react";

function Results({ clazz, results, showModal }) {
  return (
    <div className={clazz}>
      {results.length > 0 && (
        <ul
          className={`${showModal ? "mt-6" : "max-h--200 m-4 overflow-y-auto"}`}
        >
          {results.slice(0, 10).map((name, i) => (
            <li
              className="text-lg w-full p-4 rounded-lg cursor-pointer transition hover:bg-gray-300"
              key={i}
              tabIndex="1"
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Results;
