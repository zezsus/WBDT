/** @format */

import { Box, styled } from "@mui/material";

export const Header = styled(Box)({
  backgroundColor: "#ed6c02",
  color: "white",
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px",
  padding: 20,
  textAlign: "center",
  textTransform: "capitalize",
});

export const Footer = styled(Box)({
  display: "flex",
  justifyContent: "space-evenly",
});
