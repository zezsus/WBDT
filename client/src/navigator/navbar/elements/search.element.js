/** @format */

import React from "react";
import {
  InputSearch,
  Search,
  SearchIconWrapper,
} from "../common/assets/search.style";
import SearchIcon from "@mui/icons-material/Search";

const SearchElement = () => {
  return (
    <Search>
      <InputSearch placeholder='Search name...' />
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
    </Search>
  );
};

export default SearchElement;
