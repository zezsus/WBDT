/** @format */

import React from "react";
import Slider from "react-slick";
import { CardMedia } from "@mui/material";
import { SliderCPN } from "../common/assets/slider.style";
import Slider1 from "../../../common/assets/images/pngtree-website-for-mobile-store-rendered-in-3d-image_3602122.jpg";
import Slider2 from "../../../common/assets/images/banner-01-768x324.jpg";
import Slider3 from "../../../common/assets/images/slider3.jpg";
import Slider4 from "../../../common/assets/images/slider4.webp";
import Slider5 from "../../../common/assets/images/slider5.webp";
import Slider6 from "../../../common/assets/images/slider6.webp";

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
        <Slider {...settings} style={{ border: "none" }}>
          <CardMedia
            component='img'
            alt='Slider1'
            image={Slider1}
            sx={{ height: 300, width: "auto" }}
          />
          <CardMedia
            component='img'
            alt='Slider2'
            image={Slider2}
            sx={{ height: 300, width: "auto" }}
          />
          <CardMedia
            component='img'
            alt='Slider3'
            image={Slider3}
            sx={{ height: 300, width: "auto" }}
          />
          <CardMedia
            component='img'
            alt='Slider4'
            image={Slider4}
            sx={{ height: 300, width: "100%" }}
          />
          <CardMedia
            component='img'
            alt='Slider5'
            image={Slider5}
            sx={{ height: 300, width: "100%" }}
          />
          <CardMedia
            component='img'
            alt='Slider6'
            image={Slider6}
            sx={{ height: 300, width: "100%" }}
          />
        </Slider>
      </SliderCPN>
    </div>
  );
};

export default SliderComponent;
