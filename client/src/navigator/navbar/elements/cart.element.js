/** @format */

import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";

const CartElement = ({ accessToken }) => {
  const navigate = useNavigate();
  const handleClickCart = () => {
    if (accessToken) {
      navigate("/cart");
    } else {
      navigate("/sign-in");
    }
  };
  return (
    <IconButton onClick={handleClickCart}>
      <Tooltip title='Giỏ hàng' arrow>
        <AddShoppingCartIcon fontSize='large' sx={{ color: "#ffffff" }} />
      </Tooltip>
    </IconButton>
  );
};

export default CartElement;
