/** @format */

import { Card, CardContent, styled } from "@mui/material";

export const CartHeader = styled(Card)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px",
  gap: "1rem",
});

export const CartContent = styled(CardContent)({
  width: "50%",
  display: "flex",
  gap: "2rem",
  alignItems: "center",
  justifyContent: "space-between",
});
