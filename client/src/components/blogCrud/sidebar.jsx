import React from "react";
import { Link } from "react-router-dom";

function sidebar() {
  return (
    <section className="adminSidebar">
      <div>
        <ul className="listItems">
          <li>
            <Link className="buttonLink" to="/createBlog">
              Post a new blog
            </Link>
          </li>
          <li>
            <Link
              //   onClick={() => console.log("ola")}
              className="buttonLink"
              to="/"
            >
              Go to all blogs
            </Link>
          </li>
          <li>
            <Link
              //   onClick={() => console.log("ola")}
              className="buttonLink"
              to="/dashboard"
            >
              See all your blogs
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default sidebar;
