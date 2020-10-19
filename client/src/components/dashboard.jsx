import React, { useEffect, useState } from "react";
import Axios from "axios";
import Header1 from "./header1";
import Sidebar from "./blogCrud/sidebar";
import Pagination from "./pagination";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function Dashboard() {
  const [Blogs, setBlogs] = useState([]);
  const [name, setName] = useState("");

  //Used for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setName(user.name);
    }

    Axios.get("https://secret-atoll-20638.herokuapp.com/userBlog", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((result) => {
        console.log(result.data.data);
        setBlogs(result.data.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  // Pagination calculation
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Blogs.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (page) => {
    setCurrentPage(page);
  };
  const deleteBlog = (e) => {
    const id = e.target.id;
    fetch("https://secret-atoll-20638.herokuapp.com/deleteBlog", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.data) {
          toast("Deleted successfully", {
            type: "success",
          });
          setBlogs(result.data);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  return (
    <div>
      <Header1 />
      <div className="uploadContainer">
        <Sidebar />
        <section className="landingPage1">
          {Blogs.length ? (
            <>
              <div className="adminDashboard">
                {Blogs.length > 4 ? (
                  <Pagination
                    paginate={paginate}
                    postPerPage={postsPerPage}
                    totalPost={Blogs.length}
                  />
                ) : null}
              </div>
              <div className="blogAll1">
                {currentPosts.map((blog) => {
                  // return <h1 key={blog._id}>{blog.title}</h1>;
                  return (
                    <div key={blog._id} className="perBlog1">
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
                              className="imageBlog1"
                              src={blog.imageUrl}
                              alt="blogImage"
                            />
                          </div>
                        ) : null}
                        {blog.videoUrl ? (
                          <div className="vidDiv">
                            <video width="200" height="200" controls>
                              <source src={blog.videoUrl} type="video/mp4" />
                            </video>
                          </div>
                        ) : null}
                      </div>
                      <Link to={`/editPage/${blog._id}`}>
                        <Button className="editBtn">Edit</Button>
                      </Link>

                      <Button
                        id={blog._id}
                        onClick={deleteBlog}
                        className="editBtn"
                      >
                        Delete
                      </Button>
                    </div>
                  );
                })}
              </div>{" "}
            </>
          ) : (
            <div className="welcomeDash">
              <h1>
                Hello {name}, welcome to your dashboard. Any Blog that you'll
                post will appear here.
              </h1>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
