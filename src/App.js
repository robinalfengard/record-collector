import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./Components/Login";
import Navbar from "./Layout/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterUser from "./Components/Signup";
import WelcomeUser from "./Components/WelcomeUser";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<RegisterUser />} />
          <Route exact path="/welcome" element={<WelcomeUser />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
