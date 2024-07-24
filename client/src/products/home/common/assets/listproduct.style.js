/** @format */
import { styled, Card, Box, Button } from "@mui/material";

export const ListProducts = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  gap: "1rem",
  boxSizing: "border-box",
});

export const CardProduct = styled(Card)({
  width: 245,
  cursor: "pointer",
  padding: 5,
  border: "2px solid transparent",
  height: 350,
  transition: "border-color 0.5s ease, transform 0.5s ease",
  "&:hover": {
    borderColor: "orange",
    "& .productImage": {
      transform: "translateY(-10px)",
    },
  },
});

export const styleImageProduct = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 180,
  width: 160,
  transition: "transform 0.5s ease",
};

export const ButtonLearnMore = styled(Button)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  paddingTop: 20,
});

export const Paging = styled(Box)({
  width: "100%",
  padding: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
