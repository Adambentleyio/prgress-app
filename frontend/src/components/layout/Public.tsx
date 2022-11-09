import React from "react";
import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section>
      <header>
        <h2>Welcome to PRGRESS</h2>
        <h3>
          Beat your current maximum on <strong>every</strong> lift
        </h3>
      </header>
      <footer>
        <Link to="/login">Login</Link>
      </footer>
    </section>
  );
  return content;
};

export default Public;
