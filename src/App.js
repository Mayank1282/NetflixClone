import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeScreen from "./pages/HomeScreen";
import Details from "./components/Details";
import Browse from "./pages/Browse";
import BrowseByGenre from "./pages/BrowseByGenre";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeScreen />}></Route>
        <Route path="/browse/:platform" element={<Browse />}></Route>
        <Route path='/browsebygenre/:platform/:genreid' element={<BrowseByGenre />}></Route>
        <Route path="/search" element={<Search />}></Route>
      </Routes>
      <Details />
    </BrowserRouter>
  );
}

export default App;
