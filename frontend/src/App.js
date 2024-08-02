import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import Films from "./views/Films";
import Home from "./views/Home";
import Navbar from "./components/GeneralWebisteComponents/Navbar";
import Find from "./views/FindFilm";
import Watchlist from "./views/Watchlist";
import Watched from "./views/Watched";
import ReviewFilm from "./views/ReviewFilm";
import Registration from "./views/Registration";
import Login from "./views/Login";
import Logout from "./views/Logout";
import { GlobalProvider } from "./context/GlobalState";
import { AuthProvider } from './context/AuthContext';
import Footer from "./components/GeneralWebisteComponents/Footer";
import './App.css';

function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <Router>
          <div className="page-container">
            <div className="content-wrap">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Films" element={<Films />} />
                <Route path="/FindFilm" element={<Find />} />
                <Route path="/Watchlist" element={<Watchlist />} />
                <Route path="/Watched" element={<Watched />} />
                <Route path="/ReviewFilm" element={<ReviewFilm />} />
                <Route path="/Registration" element={<Registration />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Logout" element={<Logout />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
