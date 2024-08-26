/** @format */

import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { style } from "../../../admin/userManagerment/common/assets/modal.styles";
import {
  Footer,
  Header,
} from "../../../admin/userManagerment/common/assets/delete.styles";
import { setShowDelete } from "../../../common/redux/cartSlice";
import { useDeleteCart } from "../../../common/hook/cart.hook";
import {
  setErrorMessage,
  setShowMessage,
  setSuccessMessage,
} from "../../../common/redux/userSlice";

const DeleteCartModalComponent = ({ userId, accessToken }) => {
  const isShowDelete = useSelector((state) => state.carts.isShowDelete);
  const productId = useSelector((state) => state.carts.productId);
  const dispatch = useDispatch();

  const deleteCart = useDeleteCart();

  const handleDelete = () => {
    deleteCart.mutate(
      { userId, productId, accessToken },
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
    dispatch(setShowDelete(false));
    dispatch(setErrorMessage(""));
  };

  return (
    <Modal
      open={isShowDelete}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <Box sx={style}>
        <Header>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Xóa sản phẩm
          </Typography>
        </Header>

        <Typography id='modal-modal-description' sx={{ m: 3 }}>
          Bạn có chắc chắn muốn xóa sản phẩm này không?
        </Typography>
        <Divider />
        <Footer sx={{ py: 2 }}>
          <Button variant='contained' color='error' onClick={handleDelete}>
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
  );
};

export default DeleteCartModalComponent;
