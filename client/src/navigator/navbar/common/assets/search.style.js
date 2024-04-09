/** @format */

import { styled, IconButton, InputBase } from "@mui/material";

export const Search = styled("div")({
  position: "relative",
  borderRadius: "8px",
  backgroundColor: "transparent",
  marginLeft: 0,
  display: "flex",
  justifyContent: "center",
  width: "100%",
});

export const InputSearch = styled(InputBase)({
  border: "none",
  borderTopLeftRadius: "8px",
  borderBottomLeftRadius: "8px",
  width: "70%",
  maxHeight: "max-content",
  paddingLeft: "10px",
  backgroundColor: "#DDDDDD",
});

export const SearchIconWrapper = styled(IconButton)({
  border: "none",
  borderRadius: 0,
  borderTopRightRadius: "8px",
  borderBottomRightRadius: "8px",
  backgroundColor: "#DDDDDD",

  "&:hover": {
    backgroundColor: "#DDDDDD",
  },
});
