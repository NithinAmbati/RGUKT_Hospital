import React from "react";
import Header from "../components/Header";
import { MainPageHeaderContent } from "../store/data";

function HomePage() {
  return (
    <div>
      <Header headerContent={MainPageHeaderContent} />
      <h1>Home Page</h1>
    </div>
  );
}

export default HomePage;
