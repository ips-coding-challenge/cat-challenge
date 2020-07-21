import React from "react";

const Skill = ({ name, value }) => {
  let items = [];
  for (let i = 1; i <= 5; i++) {
    items.push(
      <div className="flex items-center justify-center" key={i}>
        <span
          className={`h-2  ${
            value >= i ? "bg-gray-700" : "bg-gray-200"
          } w-11/12 rounded-base`}
        ></span>
      </div>
    );
  }
  return (
    <li className="flex flex-col md:flex-row mb-6 md:items-center md:justify-between">
      <span className="font-bold mb-2">{name}:</span>
      <div className="grid grid-cols-5 gap-1 sm:w-1/2">{items}</div>
    </li>
  );
};

export default Skill;
