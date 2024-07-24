/** @format */

import { Box, styled } from "@mui/material";

export const ProductDetail = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  maxHeight: "88vh",
  overflowX: "hidden",
  overflowY: "auto",
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

export const ProductDetailContent = styled(Box)({
  display: "flex",
  gap: "2rem",
});

export const styleImage = {
  minHeight: 250,
  maxWidth: 500,
  borderRadius: "50px",
  padding: "2rem",
  boxSizing: "border-box",
};

export const ProductDescription = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  padding: "2rem",
  boxSizing: "border-box",
});

export const ListButton = styled(Box)({
  display: "flex",
  justifyContent: "space-evenly",
  gap: "1rem",
  padding: "2rem",
  boxSizing: "border-box",
});
