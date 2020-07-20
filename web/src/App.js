import React, { useCallback, useEffect } from "react";
import { Router } from "@reach/router";
import Home from "./pages/Home";
import Breed from "./pages/Breed";
import PopularBreeds from "./pages/PopularBreeds";

function App() {
  return (
    <Router>
      <Home path="/" />
      <PopularBreeds path="/breeds/popular" />
      <Breed path="/breeds/:id" />
    </Router>
  );
}

export default App;
