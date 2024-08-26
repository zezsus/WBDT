/** @format */

import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import { style } from "../common/assets/modal.styles";
import { useDispatch, useSelector } from "react-redux";
import {
  setAdminDelete,
  setErrorMessage,
  setShowMessage,
  setSuccessMessage,
} from "../../../common/redux/userSlice";
import { Footer, Header } from "../common/assets/delete.styles";
import { useDeleteUser } from "../../common/hook/user.hook";

const AdimDeleteUser = ({ userId, accessToken }) => {
  const isAdminDelete = useSelector((state) => state.users.isAdminDelete);
  const dispatch = useDispatch();

  const deleteUser = useDeleteUser();
  const handleDeleteUser = () => {
    deleteUser.mutate(
      { userId, accessToken },
      {
        onSuccess: (data) => {
          dispatch(setSuccessMessage(""));
          dispatch(setErrorMessage(""));
          dispatch(setSuccessMessage(data?.message));
          dispatch(setShowMessage(true));
          setTimeout(() => {
            dispatch(setSuccessMessage(""));
          }, 3000);
          handleClose();
        },
      },
      {
        onError: (error) => {
          dispatch(setSuccessMessage(""));
          dispatch(setErrorMessage(""));
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            dispatch(setErrorMessage(error?.response?.data?.message));
            dispatch(setShowMessage(true));
            setTimeout(() => {
              dispatch(setErrorMessage(""));
            }, 3000);
          }
        },
      }
    );
  };
  const handleClose = () => {
    dispatch(setAdminDelete(false));
    dispatch(setErrorMessage(""));
  };

  return (
    <div>
      <Modal
        open={isAdminDelete}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Header>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Xóa người dùng
            </Typography>
          </Header>

          <Typography id='modal-modal-description' sx={{ m: 3 }}>
            Bạn có chắc chắn muốn xóa thông tin người dùng này không?
          </Typography>
          <Divider />
          <Footer sx={{ py: 2 }}>
            <Button
              variant='contained'
              color='error'
              onClick={handleDeleteUser}>
              Xóa
            </Button>
            <Button
              variant='contained'
              style={{
                backgroundColor: "gray",
              }}
              onClick={handleClose}>
              Đóng
            </Button>
          </Footer>
        </Box>
      </Modal>
    </div>
  );
};
export default AdimDeleteUser;
