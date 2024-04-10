/** @format */

import { Box, styled } from "@mui/material";

export const stylePassword = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

export const SignUpFormRight = styled(Box)({
  width: "45%",
  height: "100%",
  backgroundColor: "#0022F7",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 20,
  color: "white",
  borderTopLeftRadius: 80,
  borderBottomLeftRadius: 80,
  borderTopRightRadius: 9,
  borderBottomRightRadius: 9,
  transition: "transform 1s ease-in-out",
});

export const SignUpFormLeft = styled(Box)({
  width: "55%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 25,
  transition: "transform 1s ease-in-out",
});
