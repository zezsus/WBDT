/** @format */

import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { style } from "../../../admin/userManagerment/common/assets/modal.styles";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateOrder } from "../../../common/hook/order.hook";
import { jwtDecode } from "jwt-decode";
import CloseIcon from "@mui/icons-material/Close";
import { setShowUpdateOrder } from "../../../common/redux/orderSlice";
import { useForm } from "react-hook-form";
import {
  Body,
  Content,
  Footer,
  Header,
  Orders,
} from "../common/updateOrder.style";
import {
  setErrorMessage,
  setShowMessage,
  setSuccessMessage,
} from "../../../common/redux/userSlice";

export const UpdateOrder = () => {
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const isShowUpdate = useSelector((state) => state.orders.isShowUpdate);

  const updateItem = useSelector((state) => state.orders.updateItem);

  const { register, handleSubmit } = useForm({
    defaultValues: updateItem,
  });
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

  const updateOrder = useUpdateOrder();

  const handleUpdate = (data) => {
    const updateData = {
      ...updateItem,
      isDelivered: data.isDelivered === "true",
    };
    updateOrder.mutate(
      { userId, updateData, accessToken },
      {
        onSuccess: () => {
          dispatch(setSuccessMessage(""));
          dispatch(setErrorMessage(""));
          dispatch(
            setSuccessMessage("Cập nhật trạng thái giao hàng thành công")
          );
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
    dispatch(setShowUpdateOrder(false));
    dispatch(setErrorMessage(""));
  };

  return (
    <Modal
      open={isShowUpdate}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <Box sx={style}>
        <IconButton
          onClick={handleClose}
          style={{ position: "absolute", top: 10, right: 10 }}>
          <CloseIcon />
        </IconButton>
        <Orders onSubmit={handleSubmit(handleUpdate)}>
          <Content>
            <Header>Cập nhật thông tin</Header>
            <Body>
              <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                defaultValue={updateItem.isDelivered ? "true" : "false"}
                name='radio-buttons-group'>
                <FormControlLabel
                  value='true'
                  control={<Radio {...register("isDelivered")} />}
                  label='Đã giao hàng'
                />
                <FormControlLabel
                  value='false'
                  control={<Radio {...register("isDelivered")} />}
                  label='Chưa giao hàng'
                />
              </RadioGroup>
            </Body>
            <Footer>
              <Button type='submit' variant='contained' color='warning'>
                Cập nhật
              </Button>
            </Footer>
          </Content>
        </Orders>
      </Box>
    </Modal>
  );
};

export default UpdateOrder;
