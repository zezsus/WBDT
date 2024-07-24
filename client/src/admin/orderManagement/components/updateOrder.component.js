/** @format */

import { Box, Button, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Body,
  Content,
  Footer,
  Header,
  OrderInfo,
  Orders,
} from "../common/updateOrder.style";
import { setShowUpdateOrder } from "../../../common/redux/orderSlice";
import { style } from "../../userManagerment/common/assets/modal.styles";
import { useForm } from "react-hook-form";
import { useUpdateOrder } from "../../../common/hook/order.hook";

const UpdateOrderComponent = () => {
  const orderData = useSelector((state) => state.orders.updateOrdetItem);
  const { register, handleSubmit } = useForm({
    defaultValues: orderData,
  });
  const [accessToken, setAccessToken] = useState(null);

  const isShowUpdate = useSelector((state) => state.orders.isShowUpdateOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const updateOrder = useUpdateOrder();
  console.log(orderData);

  const handleUpdateOrder = () => {};
  const handleClose = () => {
    dispatch(setShowUpdateOrder(false));
  };
  return (
    <Box>
      <Modal
        open={isShowUpdate}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Orders onSubmit={handleSubmit(handleUpdateOrder)}>
            <Content>
              <Header>Cập nhật thông tin</Header>
              {orderData && (
                <Body>
                  <OrderInfo>
                    <TextField
                      label='Tên sản phẩm'
                      variant='outlined'
                      size='small'
                      {...register("name")}
                      fullWidth
                    />
                    <TextField
                      label='Giá'
                      variant='outlined'
                      size='small'
                      {...register("price")}
                      fullWidth
                    />
                  </OrderInfo>
                </Body>
              )}
              <Footer>
                <Button
                  type='submit'
                  variant='contained'
                  style={{ width: "max-content" }}
                  color='warning'>
                  Cập nhật
                </Button>
                <Button
                  variant='contained'
                  style={{ width: "max-content", backgroundColor: "gray" }}
                  onClick={handleClose}>
                  Đóng
                </Button>
              </Footer>
            </Content>
          </Orders>
        </Box>
      </Modal>
    </Box>
  );
};

export default UpdateOrderComponent;
