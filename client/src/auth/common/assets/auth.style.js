/** @format */

import { Box, Typography, styled } from "@mui/material";

export const Div = styled(Box)({
  backgroundColor: "gray",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

export const AuthForm = styled("form")({
  width: 700,
  minHeight: 400,
  borderRadius: 10,
  boxShadow: "1px 1px 5px",
  display: "flex",
  backgroundColor: "white",
});

export const AuthHeader = styled(Typography)({
  textTransform: "uppercase",
  color: "white",
  fontWeight: "bold",
});

export const AuthBody = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "80%",
});

export const AuthFooter = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "0.8rem",
});
