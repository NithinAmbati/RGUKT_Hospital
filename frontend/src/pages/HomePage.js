import React from "react";
import Header from "../components/Header";
import { MainPageHeaderContent } from "../store/data";

function HomePage() {
  return (
    <>
      <Header headerContent={MainPageHeaderContent} />
      <h1>Home Page</h1>
    </>
  );
}

export default HomePage;
