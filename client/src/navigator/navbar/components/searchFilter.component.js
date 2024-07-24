/** @format */

import { useDispatch } from "react-redux";
import { SearchFilter } from "../common/assets/searchFilter.styles";
import { Button, MenuItem, TextField } from "@mui/material";
import {
  useGetBrandProduct,
  useGetTypeProduct,
} from "../../../common/hook/product.hook";
import { useForm } from "react-hook-form";
import {
  setBrandProduct,
  setIsSearchValue,
  setPriceRange,
  setShowSlider,
  setTypeProduct,
} from "../../../common/redux/productSlice";
import { useEffect } from "react";

const SearchFilterComponent = () => {
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const price = [
    { lable: "All", value: "All" },
    {
      lable: "Dưới 2 triệu",
      value: "0-2000000",
    },
    {
      lable: "Từ 2 - 5 triệu",
      value: "2000000-5000000",
    },
    {
      lable: "Từ 5 - 10 triệu",
      value: "5000000-10000000",
    },
    {
      lable: "Từ 10 - 15 triệu",
      value: "10000000-15000000",
    },
    {
      lable: "Từ 15 - 20 triệu",
      value: "15000000-20000000",
    },
    {
      lable: "Trên 20 triệu",
      value: "20000000-10000000000",
    },
  ];

  const handleFilter = (data) => {
    dispatch(setTypeProduct(data.type));
    dispatch(setBrandProduct(data.brand));
    dispatch(setPriceRange(data.price));
    dispatch(setShowSlider(false));
    dispatch(setIsSearchValue(true));
  };

  const typeProduct = useGetTypeProduct();
  const brandProduct = useGetBrandProduct();

  useEffect(() => {
    if (typeProduct.data) {
      setValue("type", typeProduct.data?.[0]);
    }
    if (brandProduct.data) {
      setValue("brand", brandProduct.data?.[0]);
    }
  }, [typeProduct, brandProduct, setValue]);

  return (
    <SearchFilter
      sx={{ display: "flex" }}
      onSubmit={handleSubmit(handleFilter)}>
      <TextField
        id='outlined-select-currency'
        select
        label='Hệ điều hành'
        sx={{ minWidth: 200 }}
        defaultValue={typeProduct.data?.[0]}
        {...register("type")}>
        {typeProduct.data?.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id='outlined-select-currency'
        select
        label='Hãng sản xuất'
        sx={{ minWidth: 200 }}
        defaultValue={brandProduct.data?.[0]}
        {...register("brand")}>
        {brandProduct.data?.map((brand) => (
          <MenuItem key={brand} value={brand}>
            {brand}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id='outlined-select-currency'
        select
        label='Giá'
        sx={{ minWidth: 200 }}
        {...register("price")}>
        {price.map((price) => (
          <MenuItem key={price.lable} value={price.value}>
            {price.lable}
          </MenuItem>
        ))}
      </TextField>

      <Button
        type='submit'
        variant='contained'
        style={{ width: 150, height: 40 }}>
        Tìm kiếm
      </Button>
    </SearchFilter>
  );
};
export default SearchFilterComponent;
