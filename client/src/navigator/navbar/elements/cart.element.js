/** @format */

import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";

const CartElement = () => {
  const navigate = useNavigate();
  return (
    <IconButton onClick={() => navigate("/cart")}>
      <Tooltip title='Giỏ hàng' arrow>
        <AddShoppingCartIcon fontSize='large' sx={{ color: "#ffffff" }} />
      </Tooltip>
    </IconButton>
  );
};

export default CartElement;
