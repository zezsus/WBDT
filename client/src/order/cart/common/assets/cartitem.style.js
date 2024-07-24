/** @format */

import { Box, Card, InputBase, styled } from "@mui/material";

export const ListCart = styled(Box)({
  height: "70vh",
  overflow: "auto",
  "&::-webkit-scrollbar": {
    width: "8px",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
    borderRadius: "4px",
  },
});

export const CartItem = styled(Card)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px",
  border: "1px solid transparent",
  transition: "border-color 0.3s ease",
  boxShadow: "1px 1px 5px",
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
  borderRadius: "5px",
  height: "35px",
  "& input": {
    textAlign: "center",
    padding: "0",
    margin: "0",
  },
});
