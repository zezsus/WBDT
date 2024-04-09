/** @format */
import { styled, Stack } from "@mui/material";

export const Product = styled(Stack)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  maxHeight: "88vh",
  overflow: "auto",
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
