/** @format */

import React, { useEffect, useState } from "react";
import { useGetDetailOrder } from "../../../common/hook/order.hook";
import { useLocation, useNavigate } from "react-router-dom";
import SpinnerComponent from "../../../components/spinner.component";
import { Box, Button, CardMedia, Container, Typography } from "@mui/material";
import {
  OrderDetail,
  OrderHeader,
  ProductDetail,
  Status,
  UserInfo,
} from "../common/asset/orderDetail.style";
import { useDispatch, useSelector } from "react-redux";
import DeleteOrder from "../element/deleteOrder";
import {
  setOrderId,
  setShowDeleteOrder,
} from "../../../common/redux/orderSlice";
import MessageComponent from "../../../components/message.component";

const OrderDetailComponent = () => {
  const [orderDetail, setOrderDetail] = useState(null);
  const location = useLocation();
  const orderId = location.state?.orderId;
  const getOrderDetail = useGetDetailOrder(orderId);
  const isShowDeleteOrder = useSelector(
    (state) => state.orders.isShowDeleteOrder
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getOrderDetail.data?.data && setOrderDetail(getOrderDetail.data?.data);
  }, [getOrderDetail.data?.data]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ";
  };

  const handleClickCancel = (orderId) => {
    dispatch(setShowDeleteOrder(true));
    dispatch(setOrderId(orderId));
  };

  const handleBack = () => {
    navigate("/all-order-detail");
  };

  if (getOrderDetail.isLoading) {
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
      <MessageComponent />
      {orderDetail && (
        <Container>
          <OrderDetail>
            <OrderHeader>
              <UserInfo>
                <Typography
                  style={{ textTransform: "capitalize", fontWeight: "bold" }}>
                  Thông tin khách hàng
                </Typography>
                <Box>
                  <Typography
                    fontSize={"14px"}
                    style={{ textTransform: "capitalize" }}>
                    {orderDetail?.shippingAddress.name}
                  </Typography>
                  <Typography color={"gray"} fontSize={"14px"}>
                    {orderDetail?.shippingAddress.phone}
                  </Typography>
                  <Typography color={"gray"} fontSize={"14px"}>
                    {orderDetail?.shippingAddress.address}
                  </Typography>
                </Box>
              </UserInfo>
              <Status>
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "bold",
                  }}>
                  Trạng thái
                </Typography>

                {!orderDetail.isDelivered ? (
                  <Typography color={"red"}>Chưa giao hàng</Typography>
                ) : (
                  <Typography color={"orange"}>Đã giao hàng</Typography>
                )}

                {!orderDetail.isReceived ? (
                  <Typography color={"red"}>Chưa nhận hàng</Typography>
                ) : (
                  <Typography color={"orange"}>Đã nhận hàng</Typography>
                )}

                {!orderDetail.isPaid ? (
                  <Typography color={"red"}>Chưa thanh toán</Typography>
                ) : (
                  <Typography color={"orange"}>Đã thanh toán</Typography>
                )}
              </Status>
            </OrderHeader>

            <hr style={{ border: "none", borderTop: "1px solid #C9C9C9" }} />

            <ProductDetail>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Box display={"flex"} gap={2}>
                  <CardMedia
                    component='img'
                    image={orderDetail?.orderItems?.image}
                    alt={orderDetail?.orderItems?.name}
                    style={{ width: 120, height: "auto" }}
                  />
                  <Typography fontWeight={"bold"} fontSize={20}>
                    {orderDetail.orderItems.name}
                  </Typography>
                </Box>

                <Typography color={"red"}>
                  {formatPrice(orderDetail.itemsPrice)}
                </Typography>
              </Box>
              <Box>
                <Typography fontWeight={"bold"} sx={{ pb: 1 }}>
                  Số lượng sản phẩm:
                  <Typography component={"span"} style={{ paddingLeft: "5px" }}>
                    {orderDetail.orderItems.quantity}
                  </Typography>
                </Typography>
                <Typography fontWeight={"bold"}>
                  Tổng hóa đơn:
                  <Typography
                    component={"span"}
                    color={"red"}
                    style={{ paddingLeft: "5px" }}>
                    {formatPrice(
                      orderDetail.itemsPrice * orderDetail.orderItems.quantity
                    )}
                  </Typography>
                </Typography>
              </Box>
            </ProductDetail>
            <hr style={{ border: "none", borderTop: "1px solid #C9C9C9" }} />
            <Box display={"flex"} justifyContent={"flex-end"} gap={1}>
              {!orderDetail.isDelivered ? (
                <Box>
                  <Button
                    variant='outlined'
                    color='error'
                    onClick={() => handleClickCancel(orderDetail._id)}>
                    Hủy đơn hàng
                  </Button>
                </Box>
              ) : (
                ""
              )}
              <Button
                variant='outlined'
                style={{
                  borderColor: "gray",
                  color: "gray",
                }}
                onClick={handleBack}>
                Đóng
              </Button>
            </Box>
          </OrderDetail>
        </Container>
      )}
      {isShowDeleteOrder && <DeleteOrder />}
    </div>
  );
};

export default OrderDetailComponent;
