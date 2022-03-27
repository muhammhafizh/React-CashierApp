import React, { Component } from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Sukses from './pages/Sukses';

export default class App extends Component {
  render() {
    return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sukses" element={<Sukses />} />
        </Routes>
    )
  }
}
