/** @format */
import { Box, styled } from "@mui/material";

export const Address = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

export const Hr = styled(Box)({
  backgroundImage:
    "repeating-linear-gradient(45deg,#6fa6d6,#6fa6d6 33px,transparent 0,transparent 41px,#f18d9b 0,#f18d9b 74px,transparent 0,transparent 82px)",
  backgroundPositionX: "-30px",
  backgroundSize: "116px 3px",
  height: "3px",
  width: "100%",
});

export const styleAddress = {
  display: "flex",
  alignItems: "center",
  fontSize: "20px",
  color: "#F54115",
  gap: "8px",
  textTransform: "capitalize",
};

export const styleButtonChangeAddress = {
  color: "#1526F5",
  cursor: "pointer",
  "&:active": {
    color: "#3188F1",
  },
};
