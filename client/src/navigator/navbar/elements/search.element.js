/** @format */

import React from "react";
import { useForm } from "react-hook-form";
import {
  InputSearch,
  Search,
  SearchIconWrapper,
} from "../common/assets/search.style";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { setNameProduct } from "../../../common/redux/productSlice";

const SearchElement = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const handleSearch = (data) => {
    dispatch(setNameProduct(data.search));
  };
  return (
    <Search onSubmit={handleSubmit(handleSearch)}>
      <InputSearch placeholder='Nhập tên sản phẩm' {...register("search")} />
      <SearchIconWrapper type='submit'>
        <SearchIcon />
      </SearchIconWrapper>
    </Search>
  );
};

export default SearchElement;
