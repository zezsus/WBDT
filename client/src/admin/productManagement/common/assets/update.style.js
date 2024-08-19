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
  backgroundColor: "#ed6c02",
  padding: 20,
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px",
  color: "white",
  fontSize: "1.5rem",
});

export const Body = styled(Box)({
  display: "flex",
  justifyContent: "center",
  gap: "2rem",
  height: "420px",
  paddingLeft: 20,
  paddingRight: 20,
  overflow: "auto",
  "&::-webkit-scrollbar": {
    width: "4px",
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
  paddingTop: 10,
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

export const ConfigInfo = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "60%",
  gap: "1rem",
  paddingTop: 10,
});
