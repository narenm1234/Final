import React, { useState } from 'react';
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
      {showSearchLeft && <div class="searchDiv" > <img src={searchCompleted ? 'close.png' : 'searchIcon1.png'} alt="Logo" width="20px" height="20px" /> </div>}
      <input value={props?.searchValue} class="searchInput" onChange={(evt) => props?.editSearchTerm(evt)} placeholder={placeholder} />
      {showSearchRight && <div class="searchDiv"> <img src={searchCompleted ? 'close.png' : 'searchIcon1.png'} alt="Logo" width="20px" height="20px" /> </div>}

      <br></br>
      <div>
        {searchResults?.map(name => <div>
          {name}
        </div>)}
      </div>
    </div>
  );



}
export default Search;