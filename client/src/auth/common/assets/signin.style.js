/** @format */

import { Box, styled } from "@mui/material";

export const FormLoginLeft = styled(Box)({
  width: "45%",
  height: "100%",
  backgroundColor: "#0022F7",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 20,
  color: "white",
  borderTopRightRadius: 80,
  borderBottomRightRadius: 80,
  borderTopLeftRadius: 9,
  borderBottomLeftRadius: 9,
  transition: "transform 1s ease-in-out",
});

export const FormLoginRight = styled(Box)({
  width: "55%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 25,
  transition: "transform 1s ease-in-out",
});
