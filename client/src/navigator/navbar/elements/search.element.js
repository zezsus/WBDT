/** @format */

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  InputSearch,
  Search,
  SearchIconWrapper,
} from "../common/assets/search.style";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsSearchValue,
  setNameProduct,
  setShowSlider,
} from "../../../common/redux/productSlice";

const SearchElement = () => {
  const { register, handleSubmit, reset } = useForm();
  const isSearchValue = useSelector((state) => state.products.isSearchValue);
  const dispatch = useDispatch();
  const handleSearch = (data) => {
    dispatch(setNameProduct(data.search));
    dispatch(setShowSlider(false));
    dispatch(setIsSearchValue(true));
  };
  useEffect(() => {
    if (!isSearchValue) {
      dispatch(setNameProduct(""));
      reset();
    }
  }, [isSearchValue, dispatch, reset]);

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
