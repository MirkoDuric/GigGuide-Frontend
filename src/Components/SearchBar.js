import React, { useState, useEffect } from "react";

const SearchBar = (props) => {
  const [search, setSearch] = useState([]);

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
          />
        </div>
        <div className="col-1 searchButtondiv">
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
        <div className="col-1"></div>
      </div>
    </form>
  );
};

export default SearchBar;
