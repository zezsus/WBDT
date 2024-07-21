/** @format */

import { Box, styled } from "@mui/material";

export const SystemManagement = styled(Box)({
  display: "flex",
});
export const SystemManagementLeft = styled(Box)({
  minWidth: "200px",
  minHeight: "90vh",
  boxShadow: "1px 1px 10px 1px",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});
export const SystemManagementRight = styled(Box)({
  width: "calc(100% - 200px)",
  padding: "1rem",
  boxSizing: "border-box",
});
