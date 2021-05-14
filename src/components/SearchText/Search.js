import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
const SearchText = (props) => {
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState();
  const placeholder = props.placeholder;
  const serachBoxEntire = props.searchBox;
  const showSearchLeft = props.showSearchLeft;
  const showSearchRight = props.showSearchRight;
  const searchCompleted = props.searchCompleted;

  return (

    <div class="search">

      <InputBase
        placeholder={placeholder}
        variant="outlined"
        value={props?.searchValue}
        maxlength="18"
        class="searchInput"
        fullWidth
        onChange={(evt) => props?.editSearchTerm(evt)}
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
      <IconButton type="submit" aria-label="search">
        <CloseIcon />
      </IconButton>

      <br></br>
      <div>
        {searchResults?.map(name => <div>
          {name}
        </div>)}
      </div>
    </div>
  );



}
export default SearchText;