/** @format */

import { useDispatch, useSelector } from "react-redux";
import {
  setErrorMessage,
  setShowMessage,
  setSuccessMessage,
} from "../../../common/redux/userSlice";
import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import { style } from "../../userManagerment/common/assets/modal.styles";
import {
  Footer,
  Header,
} from "../../userManagerment/common/assets/delete.styles";
import { useDeleteProduct } from "../common/hook";
import { setShowDelete } from "../../../common/redux/productSlice";

const DeleteProductComponent = ({ id, accessToken }) => {
  const dispatch = useDispatch();
  const isShowDelete = useSelector((state) => state.products.isShowDelete);

  const deleteProduct = useDeleteProduct();

  const handleDeleteProduct = () => {
    deleteProduct.mutate(
      { id, accessToken },
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
    dispatch(setShowDelete(false));
    dispatch(setErrorMessage(""));
  };

  return (
    <div>
      <Modal
        open={isShowDelete}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Header>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Xóa người dùng
            </Typography>
          </Header>

          <Typography id='modal-modal-description' sx={{ m: 3 }}>
            Bạn có chắc chắn muốn xóa sản phẩm này không?
          </Typography>
          <Divider />
          <Footer sx={{ py: 2 }}>
            <Button
              variant='contained'
              color='error'
              onClick={handleDeleteProduct}>
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
export default DeleteProductComponent;
