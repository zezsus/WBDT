/** @format */

import React from "react";
import { Box, Container } from "@mui/material";
import SliderComponent from "./slider.component";
import ListProductElement from "../elements/listproduct.element";
import { Product } from "../common/assets/product.style";

const HomeComponent = () => {
  return (
    <Box>
      <Product>
        <Container>
          <SliderComponent />
        </Container>
        <Container>
          <ListProductElement />
        </Container>
      </Product>
    </Box>
  );
};

export default HomeComponent;
