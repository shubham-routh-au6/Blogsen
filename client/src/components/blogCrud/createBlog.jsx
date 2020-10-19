import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

import Loader from "../loader";
import Header1 from "../header1";
import Sidebar from "./sidebar";

import { Form, Label, Button, Input, Icon, Container } from "semantic-ui-react";

class Upload extends Component {
  state = {
    title: "",
    body: "",
    msg: "",
    selectedFile: null,
    selectedFile1: null,
    errorMsg: "",
    loading: false,
    name: "",
  };

  onChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleDrop1 = (acceptedFiles1) => {
    console.log(acceptedFiles1);
    this.setState({
      selectedFile1: acceptedFiles1[0],
    });
  };

  handleDrop = (acceptedFiles) => {
    console.log(acceptedFiles[0]);
    this.setState({
      selectedFile: acceptedFiles[0],
    });
  };
  onSubmit = async () => {
    this.setState({ loading: true });
    this.setState({ errorMsg: "" });
    const { title, body } = this.state;
    const file = this.state.selectedFile;
    if (file) {
      const checkVideo = file.name.split(".");
      if (checkVideo[1] !== "mp4") {
        this.setState({ loading: false });
        return this.setState({
          errorMsg: "Please select a video with extension .mp4",
        });
      }
    }
    const file2 = this.state.selectedFile1;
    if (file2) {
      const checkImage = file2.name.split(".");
      if (checkImage[1] !== "jpg") {
        this.setState({ loading: false });
        return this.setState({
          errorMsg: "Please select an image with extension .jpg",
        });
      }
    }

    if (this.state.title === "" || this.state.body === "") {
      this.setState({ loading: false });
      return this.setState({
        errorMsg: "Please add title and body before submitting",
      });
    }

    if (this.state.selectedFile1 && this.state.selectedFile) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", "gnghcsiu");
      formData.append("api_key", "867364492574882");
      formData.append("timestamp", (Date.now() / 1000) | 0);

      return axios
        .post("https://api.cloudinary.com/v1_1/dlqxvzqrh/upload", formData, {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        })
        .then((response) => {
          const data = response.data;
          const videoUrl = data.secure_url;

          const formData = new FormData();
          formData.append("file", file2);
          formData.append("tags", `codeinfuse, medium, gist`);
          formData.append("upload_preset", "gnghcsiu");
          formData.append("api_key", "867364492574882");
          formData.append("timestamp", (Date.now() / 1000) | 0);
          return axios
            .post(
              "https://api.cloudinary.com/v1_1/dlqxvzqrh/image/upload",
              formData,
              {
                headers: { "X-Requested-With": "XMLHttpRequest" },
              }
            )
            .then((response) => {
              const data = response.data;
              const imageUrl = data.secure_url;
              fetch("https://secret-atoll-20638.herokuapp.com/postBlog", {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify({
                  title,
                  body,
                  videoUrl,
                  imageUrl,
                }),
              })
                .then((res) => {
                  console.log(res);
                  this.setState({ loading: false });
                  if (res.statusText === "OK") {
                    return this.setState({
                      msg:
                        "Blog posted successfully and it will appear on your dashboard",
                    });
                  }
                })
                .catch((e) => {
                  console.log(e.message);
                });
            })
            .catch((e) => {
              console.log(e.message);
            });
        })
        .catch((e) => {
          console.log(e.message);
        });
    } else if (this.state.selectedFile) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", "gnghcsiu");
      formData.append("api_key", "867364492574882");
      formData.append("timestamp", (Date.now() / 1000) | 0);

      return axios
        .post("https://api.cloudinary.com/v1_1/dlqxvzqrh/upload", formData, {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        })
        .then((response) => {
          const data = response.data;
          const videoUrl = data.secure_url;
          console.log(videoUrl);
          fetch("https://secret-atoll-20638.herokuapp.com/postBlog", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({
              title,
              body,
              videoUrl,
            }),
          })
            .then((res) => {
              this.setState({ loading: false });
              console.log(res);
              if (res.statusText === "OK") {
                return this.setState({
                  msg:
                    "Blog posted successfully and it will appear on your dashboard",
                });
              }
            })
            .catch((e) => {
              console.log(e.message);
            });
        })
        .catch((e) => {
          console.log(e.message);
        });
    } else if (this.state.selectedFile1) {
      const formData = new FormData();
      formData.append("file", file2);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", "gnghcsiu");
      formData.append("api_key", "867364492574882");
      formData.append("timestamp", (Date.now() / 1000) | 0);
      return axios
        .post(
          "https://api.cloudinary.com/v1_1/dlqxvzqrh/image/upload",
          formData,
          {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }
        )
        .then((response) => {
          const data = response.data;
          const imageUrl = data.secure_url;

          fetch("https://secret-atoll-20638.herokuapp.com/postBlog", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({
              title,
              body,
              imageUrl,
            }),
          })
            .then((res) => {
              this.setState({ loading: false });
              console.log(res);
              if (res.statusText === "OK") {
                return this.setState({
                  msg:
                    "Blog posted successfully and it will appear on your dashboard",
                });
              }
            })
            .catch((e) => {
              console.log(e.message);
            });
        })
        .catch((e) => {
          console.log(e.message);
          this.setState({ loading: false });
          return this.setState({
            errorMsg: "Something went wrong, please try again",
          });
        });
    } else {
      fetch("https://secret-atoll-20638.herokuapp.com/postBlog", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title,
          body,
        }),
      })
        .then((res) => {
          console.log(res);
          this.setState({ loading: false });
          if (res.statusText === "OK") {
            return this.setState({
              msg:
                "Blog posted successfully and it will appear on your dashboard",
            });
          }
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  };

  render() {
    return (
      <>
        <Header1 />
        <div className="uploadContainer">
          <Sidebar />
          <section className="uploadContainerAndPagination1">
            <Container text>
              <h2 className="text_Msg1">{this.state.errorMsg}</h2>
              <h2 className="text_Msg">{this.state.msg}</h2>
              {this.state.loading ? <Loader /> : null}
              <Form>
                <Form.Field>
                  <Input
                    className="registerInput"
                    name="title"
                    onChange={this.onChange}
                    value={this.title}
                    placeholder="Entter Blog Title"
                    fluid
                  />
                </Form.Field>
                <Form.Field>
                  <textarea
                    className="registerInput"
                    name="body"
                    onChange={this.onChange}
                    value={this.body}
                    placeholder="Type your Blog here.."
                  ></textarea>
                </Form.Field>

                <Form.Field>
                  <Label className="videoLabel">
                    Add an image for your Blog ?
                  </Label>

                  <Dropzone onDrop={this.handleDrop1}>
                    {({
                      getRootProps,
                      getInputProps,
                      isDragActive,
                      isDragReject,
                    }) => (
                      <Button icon {...getRootProps()}>
                        <Icon name="plus" />

                        <input {...getInputProps()} />

                        {!isDragActive}
                        {isDragActive &&
                          !isDragReject &&
                          "Drop it like it's hot!"}
                        {isDragReject && "File type not accepted, sorry!"}
                      </Button>
                    )}
                  </Dropzone>
                </Form.Field>

                <Label className="videoLabel">Add video for your Blog ?</Label>
                <Dropzone onDrop={this.handleDrop}>
                  {({
                    getRootProps,
                    getInputProps,
                    isDragActive,
                    isDragReject,
                  }) => (
                    <Button icon {...getRootProps()}>
                      <Icon name="plus" />

                      <input {...getInputProps()} />

                      {!isDragActive}
                      {isDragActive &&
                        !isDragReject &&
                        "Drop it like it's hot!"}
                      {isDragReject && "File type not accepted, sorry!"}
                    </Button>
                  )}
                </Dropzone>
                <Button className="uploadButton" onClick={this.onSubmit}>
                  Submit
                </Button>
              </Form>

              {/* {this.state.msg ? (
                <Link to="/Admin">
                  <Button className="goBack">Go Back</Button>
                </Link>
              ) : null} */}
            </Container>
          </section>
        </div>
      </>
    );
  }
}

export default Upload;
