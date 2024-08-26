/** @format */

import React from "react";
import { Snackbar } from "@mui/material";
import { useSelector } from "react-redux";

const MessageComponent = () => {
  const { successMessage, errorMessage, isShowMessage } = useSelector(
    (state) => state.users
  );

  const message = errorMessage || successMessage;
  const backgroundColor = errorMessage ? "red" : "green";

  return message ? (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={isShowMessage}
      message={message}
      ContentProps={{ sx: { backgroundColor, width: "auto" } }}
    />
  ) : null;
};
export default MessageComponent;
