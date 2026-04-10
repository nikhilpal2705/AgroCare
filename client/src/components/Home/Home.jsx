import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ }) => {

  return (
    <>
      <div className="text-center my-2">
        <img src={logo} alt="logo" width="50%" />
      </div>
      <Link to="/register" className="text-dark">Register</Link>
      <Link to="/login" className="text-dark">Login</Link>
    </>

  );
};

export default Home;
