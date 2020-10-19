import React from "react";

function Footer() {
  return (
    <div className="check">
      <div className="row check">
        <div className="col-md-12">
          <div className="footer p-5  text-center bg-dark text-light">
            Developed By:{" "}
            <span className="text-warning font-weight-normal">
              Shubham Routh
            </span>
            , Using <i className="fab fa-react" /> React JS, integrated with
            MongoDB &amp; Powered by Express.Js
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
