import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FadeIn from "react-fade-in";

const Layout = ({ children }) => {
  return (
    <FadeIn>
      <div className="container mx-auto px-4 md:px-20">
        <Header />
        {children}
        <Footer />
      </div>
    </FadeIn>
  );
};

export default Layout;
