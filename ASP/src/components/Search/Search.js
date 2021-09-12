import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Search = (props) => {
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState();
  const placeholder = props.placeholder;
  const serachBoxEntire = props.searchBox;
  const showSearchLeft = props.showSearchLeft;
  const showSearchRight = props.showSearchRight;
  const searchCompleted = props.searchCompleted;

  return (
    <div style={serachBoxEntire}>
      {showSearchLeft && (
        <div className="searchDiv">
          {" "}
          <img
            src={searchCompleted ? "close.png" : "searchIcon1.png"}
            alt="Logo"
            width="20px"
            height="20px"
          />{" "}
        </div>
      )}
      <input
        value={props?.searchValue}
        className="searchInput"
        onChange={(evt) => props?.editSearchTerm(evt)}
        placeholder={placeholder}
      />
      {showSearchRight && (
        <div className="searchDiv">
          {" "}
          <img
            src={searchCompleted ? "close.png" : "searchIcon1.png"}
            alt="Logo"
            width="20px"
            height="20px"
          />{" "}
        </div>
      )}

      <br></br>
      <div>
        {searchResults?.map((name, index) => (
          <div key={index}>{name}</div>
        ))}
      </div>
    </div>
  );
};
export default Search;
