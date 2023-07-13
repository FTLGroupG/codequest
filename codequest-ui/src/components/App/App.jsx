import { useState } from "react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Modules from "../Modules/Modules";
import Curriculum from "../Curriculum/Curriculum";
import Finished from "../Finished/Finished"
import Quiz from "../Quiz/Quiz"

function App() {
  

  return (
    <>
      <div className="App">
        <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/curriculum" element={<Curriculum />}  />
            <Route path="/finished" element={<Finished />}  />
            <Route path="/quiz" element={<Quiz />}  />
          </Routes>
          <Footer />
        </BrowserRouter>
        </div>
    </>
  );
}

export default App;
