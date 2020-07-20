import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Results from "./Results";

function Autocomplete() {
  const breeds = useSelector((state) => state.breeds);
  const showModal = useSelector((state) => state.showModal);
  const dispatch = useDispatch();
  const [results, setResults] = useState([]);
  const mobileInputRef = useRef(null);

  const autocomplete = (e) => {
    if (e.target.value === "") {
      setResults([]);
      return;
    }
    const filtered = breeds.filter(({ name }) =>
      name.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    console.log(
      `Filtered`,
      filtered.slice(0, 10).flatMap((f) => f.name)
    );
    const final = filtered.map((f) => {
      return {
        id: f.id,
        name: f.name,
        description: f.description,
      };
    });
    setResults(final);
  };

  const handleClick = () => {
    console.log(`Show Modal`, showModal);
    if (!showModal) {
      dispatch({ type: "SET_SHOW_MODAL", payload: true });
      if (mobileInputRef.current) {
        console.log(`Mobile input ref`, mobileInputRef);
        mobileInputRef.current.focus();
      }
    }
  };

  const close = () => {
    setResults([]);
    dispatch({ type: "SET_SHOW_MODAL", payload: false });
  };

  useEffect(() => {
    if (mobileInputRef.current && showModal) {
      console.log(`Mobile input ref`, mobileInputRef);
      mobileInputRef.current.focus();
    }
  }, [showModal]);

  if (!showModal) {
    return (
      <div className="flex relative bg-white items-center rounded-base px-4 py-2 md:mt-4 lg:mt-8">
        {/* Input for md screen but without clickHandler which open modal for sm screen */}
        <input
          className="hidden md:block color-text text-sm outline-none w-full md:text-2xl md:h-12"
          type="text"
          placeholder="Search"
          onChange={autocomplete}
          tabIndex="0"
        />

        <input
          className="md:hidden color-text text-sm outline-none w-full cursor-pointer"
          type="text"
          placeholder="Search"
          // onChange={autocomplete}
          onClick={handleClick}
        />
        <i className="material-icons md-48">search</i>

        <Results
          clazz="hidden md:block absolute rounded-base mt-20 bg-white left-0 top-0 w-full"
          results={results}
          showModal={showModal}
        />
      </div>
    );
  }

  return (
    <div
      className={`fixed flex flex-col bg-white z-10 inset-0 p-4 scale-0 opacity-0 transition-all duration-500 ${
        showModal ? "modal-open" : ""
      }`}
    >
      <button
        onClick={close}
        className="flex self-end mb-5 justify-center items-center rounded bg-gray-200 px-2 py-2"
      >
        <i className="material-icons ">close</i>
      </button>

      <div className="flex bg-white items-center rounded-base px-4 py-2 md:mt-4 lg:mt-8 border border-gray-700">
        <input
          ref={mobileInputRef}
          className="color-text text-sm outline-none w-full"
          type="text"
          placeholder="Search"
          onChange={autocomplete}
          tabIndex="0"
        />
        <i className="material-icons md-48">search</i>
      </div>

      <Results
        clazz="mt-6 overflow-y-auto"
        results={results}
        showModal={showModal}
      />
    </div>
  );
}

export default Autocomplete;
