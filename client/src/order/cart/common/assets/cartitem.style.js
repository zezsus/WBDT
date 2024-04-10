/** @format */

import { Box, Card, InputBase, styled } from "@mui/material";

export const CartItem = styled(Card)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px",
  gap: "1rem",
  border: "1px solid transparent",
  transition: "border-color 0.3s ease",
  "&:hover": {
    borderColor: "orange",
  },
});

export const CartItemImage = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  width: 200,
});

export const Counter = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: 0,
  margin: 0,
});

export const CounterInput = styled(InputBase)({
  width: 50,
  border: "1px solid gray",
  paddingLeft: "10px",
  borderRadius: "5px",
});
