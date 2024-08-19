/** @format */

import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Footer } from "../../../admin/userManagerment/common/assets/delete.styles";
import { style } from "../../../admin/userManagerment/common/assets/modal.styles";
import { useDispatch, useSelector } from "react-redux";
import { setShowDeleteOrder } from "../../../common/redux/orderSlice";
import { useDeleteOrder } from "../../../common/hook/order.hook";
import { jwtDecode } from "jwt-decode";

export const DeleteOrder = () => {
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const isShowDelete = useSelector((state) => state.orders.isShowDeleteOrder);
  const orderId = useSelector((state) => state.orders.orderId);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decode = jwtDecode(token);
      if (decode) {
        setUserId(decode.userId);
        setAccessToken(token);
      }
    }
  }, []);

  const deleteOrder = useDeleteOrder();

  const handleDeleteOrder = () => {
    deleteOrder.mutate(
      { userId, orderId, accessToken },
      {
        onSuccess: (data) => {
          handleClose();
        },
      }
    );
  };

  const handleClose = () => {
    dispatch(setShowDeleteOrder(false));
  };

  return (
    <div>
      <Modal
        open={isShowDelete}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-description' sx={{ mx: 3, my: 5 }}>
            Bạn có chắc chắn muốn xóa đơn hàng này không?
          </Typography>
          <Divider />
          <Footer sx={{ py: 2 }}>
            <Button
              variant='contained'
              color='error'
              onClick={handleDeleteOrder}>
              Xóa
            </Button>
            <Button
              variant='contained'
              style={{
                backgroundColor: "gray",
              }}
              onClick={handleClose}>
              Không
            </Button>
          </Footer>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteOrder;
