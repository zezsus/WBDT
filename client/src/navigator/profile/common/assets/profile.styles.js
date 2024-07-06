/** @format */

import { Box, styled } from "@mui/material";

export const Profile = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "90vh",
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
  backgroundColor: "#0A71F3",
  padding: 20,
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px",
  color: "white",
  fontSize: "1.5rem",
});

export const Body = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "3rem",
  minHeight: "242px",
  paddingLeft: 20,
  paddingRight: 20,
});

export const UserAvatar = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const avata = {
  width: 150,
  height: 150,
};

export const UserInfo = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const Footer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 10,
});
