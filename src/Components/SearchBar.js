import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = (props) => {
  const [search, setSearch] = useState([]);

  const onChange = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios.get("");
  };

  return (
    <form>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-9 searchBardiv">
          <input
            type="search"
            className="form-control"
            id="searchBarLandingPage"
            aria-describedby="searchBarLandingPage"
            placeholder="Search"
            onChange={onChange}
          />
        </div>
        <div className="col-1 searchButtondiv">
          <button type="submit" className="btn btn-primary" onSubmit={onSubmit}>
            Search
          </button>
        </div>
        <div className="col-1"></div>
      </div>
    </form>
  );
};

export default SearchBar;
