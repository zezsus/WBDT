/** @format */

import { Box, styled } from "@mui/material";

export const Products = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "2rem",
  width: "100%",
});

export const Content = styled(Box)({
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  minWidth: "600px",
  minHeight: "350px",
  boxShadow: "1px 1px 25px 0px gray",
});

export const Header = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  textTransform: "capitalize",
  backgroundColor: "#115BF8",
  padding: 20,
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px",
  color: "white",
  fontSize: "1.5rem",
});

export const Body = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "2rem",
  minHeight: "242px",
  paddingLeft: 20,
  paddingRight: 20,
});

export const Footer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  padding: 10,
});

export const ProductInfo = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
});

export const ImageProduct = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: 250,
  justifyContent: "center",
  alignItems: "center",
  gap: 20,
});

export const productImage = {
  widtd: 150,
  minHeight: 100,
};
