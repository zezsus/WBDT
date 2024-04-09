/** @format */

import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const CartElement = () => {
  return (
    <IconButton>
      <Tooltip title='Cart' arrow>
        <AddShoppingCartIcon fontSize='large' sx={{ color: "#ffffff" }} />
      </Tooltip>
    </IconButton>
  );
};

export default CartElement;
