/** @format */

import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMessage, setSuccessMessage } from "../common/redux/userSlice";
import { ErrorMsg, SuccessMsg } from "../common/assets/styles/message.style";

const MessageComponent = () => {
  const successMessage = useSelector((state) => state.users.successMessage);
  const errorMessage = useSelector((state) => state.users.errorMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(setSuccessMessage(""));
      dispatch(setErrorMessage(""));
    }, 3000);
  }, [successMessage, errorMessage, dispatch]);

  return (
    <Box style={{ boxSizing: "border-box", fontSize: "1rem" }}>
      {errorMessage && <ErrorMsg>{errorMessage}</ErrorMsg>}
      {successMessage && <SuccessMsg>{successMessage}</SuccessMsg>}
    </Box>
  );
};

export default MessageComponent;
