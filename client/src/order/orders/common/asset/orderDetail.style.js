/** @format */

import { Box, styled } from "@mui/material";

export const OrderDetail = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 30,
  marginTop: 10,
});

export const OrderHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-around",
});

export const UserInfo = styled(Box)({
  display: "flex",
  flexDirection: "column",
  borderRadius: 10,
  border: "1px solid #CCD1D1",
  padding: "10px",
  minWidth: 250,
});

export const Status = styled(Box)({
  display: "flex",
  flexDirection: "column",
  borderRadius: 10,
  border: "1px solid #CCD1D1",
  padding: "10px",
  minWidth: 250,
});

export const ProductDetail = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 25,
});
