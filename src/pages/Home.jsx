import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>CREATORVERSE</h1>
        <nav className="home-nav">
          <Link to="/">
            <button>VIEW ALL CREATORS</button>
          </Link>
          <Link to="/add">
            <button>ADD A CREATOR</button>
          </Link>
        </nav>
      </header>
      
      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
};

export default Home;