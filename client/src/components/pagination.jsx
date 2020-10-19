import React from "react";

const Pagination = ({ totalPost, paginate, postPerPage }) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pages.push(i);
  }
  return (
    <nav>
      <ul className="pagination pagiStyle">
        {pages.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
