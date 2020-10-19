import React, { useEffect, useState } from "react";
import Axios from "axios";
import Header from "./header";
import Header1 from "./header1";
import Footer from "./footer";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

function Landing() {
  const [Blogs, setBlogs] = useState([]);
  const [Token, setToken] = useState("");

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      setToken(jwt);
    }
    Axios.get("https://secret-atoll-20638.herokuapp.com/allBlog")
      .then((result) => {
        console.log(result.data.data);
        setBlogs(result.data.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);
  return (
    <div>
      {Token ? <Header1 /> : <Header />}
      <section className="landingPage">
        <div className="blogAll">
          {Token ? (
            <Button className="linkDiv">
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <h1>Sign in to post your Blog</h1>
          )}
          {Blogs.map((blog) => {
            // return <h1 key={blog._id}>{blog.title}</h1>;
            return (
              <div key={blog._id} className="perBlog">
                <div className="titleBlog">
                  <p>Blog Owner: {blog.name}</p>
                </div>
                <div className="titleBlog">
                  <p>Blog Title: {blog.title}</p>
                </div>
                <div className="titleBlog">
                  <p>Blog Body: {blog.body}</p>
                </div>
                <div className="imgVideo">
                  {blog.imageUrl ? (
                    <div className="imgDiv">
                      <img
                        className="imageBlog"
                        src={blog.imageUrl}
                        alt="blogImage"
                      />
                    </div>
                  ) : null}
                  {blog.videoUrl ? (
                    <div className="vidDiv">
                      <video width="400" height="400" controls>
                        <source src={blog.videoUrl} type="video/mp4" />
                      </video>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Landing;
