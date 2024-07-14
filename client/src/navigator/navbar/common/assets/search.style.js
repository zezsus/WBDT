/** @format */

import { styled, IconButton, InputBase } from "@mui/material";

export const Search = styled("form")({
  position: "relative",
  borderRadius: "8px",
  marginLeft: 0,
  display: "flex",
  justifyContent: "center",
  width: "70%",
});

export const InputSearch = styled(InputBase)({
  border: "none",
  borderTopLeftRadius: "8px",
  borderBottomLeftRadius: "8px",
  width: "90%",
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
