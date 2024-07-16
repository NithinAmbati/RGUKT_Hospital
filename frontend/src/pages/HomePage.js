import React from "react";
import Header from "../components/Header";
import { MainPageHeaderContent } from "../store/data";
import HomeBody from "../components/HomeBody";

function HomePage() {
  return (
    <>
      <Header headerContent={MainPageHeaderContent} />
      <HomeBody />
    </>
  );
}

export default HomePage;
