import React from "react";
import Header from "../components/Header";
import { MainPageHeaderContent } from "../store/data";

function HomePage() {
  return (
    <>
      <Header headerContent={MainPageHeaderContent} />
      <main className="text-5xl text-center pt-10">Home Page</main>
    </>
  );
}

export default HomePage;
