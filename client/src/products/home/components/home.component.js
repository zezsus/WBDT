/** @format */

import React from "react";
import { Box, Container } from "@mui/material";
import SliderComponent from "./slider.component";
import ListProductElement from "../elements/listproduct.element";
import { Product } from "../common/assets/product.style";
import SearchFilterComponent from "../../../navigator/navbar/components/searchFilter.component";
import { useSelector } from "react-redux";
import MessageComponent from "../../../components/message.component";

const HomeComponent = () => {
  const isShowFilter = useSelector((state) => state.products.isShowFilter);
  const isShowSlider = useSelector((state) => state.products.isShowSlider);

  return (
    <Box>
      <MessageComponent />
      <Product>
        <Container>
          {isShowFilter && <SearchFilterComponent />}
          {isShowSlider && <SliderComponent />}
        </Container>
        <Container>
          <ListProductElement />
        </Container>
      </Product>
    </Box>
  );
};

export default HomeComponent;
