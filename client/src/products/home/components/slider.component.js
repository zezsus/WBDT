/** @format */

import React from "react";
import Slider from "react-slick";
import { Box, CardMedia } from "@mui/material";
import { SliderCPN } from "../common/assets/slider.style";

const SliderComponent = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };
  return (
    <div>
      <SliderCPN px={"15%"} py={1}>
        <Slider {...settings}>
          <Box>
            <CardMedia
              component='img'
              alt=''
              image=''
              sx={{ height: 300, width: "100%" }}
            />
          </Box>
          <Box>
            <CardMedia
              component='img'
              alt=''
              image=''
              sx={{ height: 300, width: "100%" }}
            />
          </Box>
          <Box>
            <CardMedia
              component='img'
              alt=''
              image=''
              sx={{ height: 300, width: "100%" }}
            />
          </Box>
          <Box>
            <CardMedia
              component='img'
              alt=''
              image=''
              sx={{ height: 300, width: "100%" }}
            />
          </Box>
          <Box>
            <CardMedia
              component='img'
              alt=''
              image=''
              sx={{ height: 300, width: "100%" }}
            />
          </Box>
        </Slider>
      </SliderCPN>
    </div>
  );
};

export default SliderComponent;
