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
import { setSuccessMessage } from "../../../common/redux/userSlice";

const DeleteCartModalComponent = ({ accessToken }) => {
  const isShowDelete = useSelector((state) => state.carts.isShowDelete);
  const cartId = useSelector((state) => state.carts.cartId);
  const dispatch = useDispatch();

  const deleteCart = useDeleteCart();

  const handleDelete = () => {
    deleteCart.mutate(
      { cartId, accessToken },
      {
        onSuccess: (data) => {
          dispatch(setSuccessMessage(data.message));
          handleClose();
        },
      }
    );
  };

  const handleClose = () => {
    dispatch(setShowDelete(false));
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
