/** @format */

import React, { useEffect, useState } from "react";
import { useGetDetailOrder } from "../../../common/hook/order.hook";
import { useLocation } from "react-router-dom";
import SpinnerComponent from "../../../components/spinner.component";
import { Box, CardMedia, Container, Typography } from "@mui/material";
import {
  OrderDetail,
  OrderHeader,
  ProductDetail,
  Status,
  UserInfo,
} from "../common/asset/orderDetail.style";
import { useSelector } from "react-redux";
import DeleteOrder from "../element/deleteOrder";

const OrderDetailComponent = () => {
  const [orderDetail, setOrderDetail] = useState(null);
  const location = useLocation();
  const orderId = location.state?.orderId;
  const getOrderDetail = useGetDetailOrder(orderId);
  const isShowDeleteOrder = useSelector(
    (state) => state.orders.isShowDeleteOrder
  );

  useEffect(() => {
    getOrderDetail.data?.data && setOrderDetail(getOrderDetail.data?.data);
  }, [getOrderDetail.data?.data]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ";
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
                    mb: 1,
                  }}>
                  Trạng thái
                </Typography>

                {!orderDetail.isDelivered ? (
                  <Typography color={"red"}>Chưa giao hàng</Typography>
                ) : (
                  <Typography color={"orange"}>Đã giao hàng</Typography>
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
          </OrderDetail>
        </Container>
      )}
      {isShowDeleteOrder && <DeleteOrder />}
    </div>
  );
};

export default OrderDetailComponent;
