/** @format */
import { styled, Box, Button } from "@mui/material";

export const NavBody = styled(Box)({
  width: "80%",
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  justifyContent: "space-evenly",
});

export const NavFooter = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "5px",
});

export const ButtonSignin = styled(Button)({
  backgroundColor: "#237812",
  width: "max-content",
  "&:hover": {
    backgroundColor: "#237812",
  },
});
