/** @format */

import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useGetAllDetailOrder } from "../../../common/hook/order.hook";
import SpinnerComponent from "../../../components/spinner.component";
import {
  Box,
  Button,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { Item } from "../common/asset/allOrderDetail.style";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrderId,
  setShowDeleteOrder,
} from "../../../common/redux/orderSlice";
import DeleteOrder from "../element/deleteOrder";
import { useNavigate } from "react-router-dom";

const AllOrderDetailComponent = () => {
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [allOrderDetail, setAllOrderDetail] = useState(null);
  const isShowDeleteOrder = useSelector(
    (state) => state.orders.isShowDeleteOrder
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decode = jwtDecode(token);
      token && setUserId(decode.userId);
      token && setAccessToken(token);
    }
  }, []);

  const getAllOrderDetail = useGetAllDetailOrder({ userId, accessToken });
  useEffect(() => {
    getAllOrderDetail.data?.data &&
      setAllOrderDetail(getAllOrderDetail.data?.data);
  }, [getAllOrderDetail.data?.data]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ";
  };

  const handleClickCancel = (orderId) => {
    dispatch(setShowDeleteOrder(true));
    dispatch(setOrderId(orderId));
  };

  const handleClickDetail = (orderId) => {
    navigate("/order-detail", { state: { orderId } });
  };

  if (getAllOrderDetail.isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}>
        <SpinnerComponent />
      </div>
    );
  }

  return (
    <div>
      <Container sx={{ p: 2 }}>
        <Stack spacing={5}>
          {allOrderDetail && allOrderDetail.length > 0 ? (
            allOrderDetail.map((item) => {
              return (
                <Item key={item._id} sx={{ p: 2 }}>
                  <Box sx={{ pb: 2 }}>
                    <Typography fontWeight={"bold"}>Trạng thái</Typography>
                    <Box display={"flex"} gap={10}>
                      <Typography color={"orange"}>
                        {item.isDelivered ? "Đã nhận hàng" : "Chưa nhận hàng"}
                      </Typography>
                      <Typography color={"orange"}>
                        {item.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                      </Typography>
                    </Box>
                  </Box>

                  <hr
                    style={{
                      border: "none",
                      borderTop: "1px solid #C9C9C9",
                    }}
                  />

                  <Box sx={{ py: 2 }}>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      sx={{ pb: 1 }}>
                      <Box display={"flex"}>
                        <CardMedia
                          component={"img"}
                          image={item?.orderItems?.image}
                          alt={item?.orderItems?.name}
                          style={{ width: 80, height: "auto" }}
                        />
                        <Typography fontWeight={"bold"}>
                          {item.orderItems.name}
                        </Typography>
                      </Box>

                      <Typography color={"red"}>
                        {formatPrice(item.itemsPrice)}
                      </Typography>
                    </Box>
                  </Box>

                  <hr
                    style={{ border: "none", borderTop: "1px solid #C9C9C9" }}
                  />

                  <Box
                    sx={{
                      pt: 2,
                      display: "flex",
                      gap: 2,
                      justifyContent: "flex-end",
                    }}>
                    <Button
                      variant='outlined'
                      color='error'
                      onClick={() => handleClickCancel(item._id)}>
                      Hủy đơn hàng
                    </Button>
                    <Button
                      variant='outlined'
                      onClick={() => handleClickDetail(item._id)}>
                      Xem chi tiết
                    </Button>
                  </Box>
                </Item>
              );
            })
          ) : (
            <Typography
              variant='h5'
              style={{ textTransform: "capitalize", textAlign: "center" }}>
              Không có đơn hàng nào nào
            </Typography>
          )}
        </Stack>
      </Container>
      {isShowDeleteOrder && <DeleteOrder />}
    </div>
  );
};

export default AllOrderDetailComponent;
