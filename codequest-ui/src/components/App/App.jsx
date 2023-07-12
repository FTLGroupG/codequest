import { useState } from "react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import Footer from "../Footer/Footer";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Home />
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
