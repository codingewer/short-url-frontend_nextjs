import dynamic from "next/dynamic";
import React from "react";
//const Home = dynamic(() => import('../src/Pages/Home'), { ssr: false })
import Home from "../src/Pages/Home";
function index() {
  return (
    <div>
      <Home />
    </div>
  );
}

export default index;
