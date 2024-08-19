/** @format */

import {
  Box,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { useGetAllOrder } from "../../../common/hook/order.hook";
import SpinnerComponent from "../../../components/spinner.component";
import { useEffect, useState } from "react";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrderId,
  setShowDeleteOrder,
  setShowUpdateOrder,
  setUpdateItem,
} from "../../../common/redux/orderSlice";
import DeleteOrder from "../elements/delete.element";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import UpdateOrder from "../elements/update.element";

const OrderManagementComponent = () => {
  const columns = [
    { id: "action", label: "Hành Động", minWidth: 100 },
    { id: "shippingAddress.name", label: "Người dùng", minWidth: 150 },
    { id: "shippingAddress.address", label: "Địa chỉ", minWidth: 150 },
    { id: "shippingAddress.phone", label: "Số điện thoại", minWidth: 150 },
    { id: "isDelivered", label: "Giao hàng", minWidth: 150 },
    { id: "isReceived", label: "Nhận hàng", minWidth: 150 },
    { id: "isPaid", label: "Thanh toán", minWidth: 150 },
    { id: "orderItems.name", label: "Sản phẩm", minWidth: 150 },
    {
      id: "orderItems.quantity",
      label: "Số Lượng",
      format: (value) => value.toLocaleString("vi-VN"),
      minWidth: 150,
    },
    {
      id: "totalPrice",
      label: "Tổng hóa đơn",
      format: (value) => value.toLocaleString("vi-VN") + " VNĐ",
      minWidth: 180,
    },
  ];

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const isShowUpdate = useSelector((state) => state.orders.isShowUpdate);
  const isShowDeleteOrder = useSelector(
    (state) => state.orders.isShowDeleteOrder
  );
  const dispatch = useDispatch();

  const getAllOrder = useGetAllOrder(page);

  useEffect(() => {
    if (getAllOrder.data?.totalPage) {
      setTotalPage(getAllOrder.data?.totalPage);
    }
  }, [getAllOrder]);

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  const handleUpdateOrder = (item) => {
    dispatch(setShowUpdateOrder(true));
    dispatch(setUpdateItem(item));
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(setOrderId(orderId));
    dispatch(setShowDeleteOrder(true));
  };

  if (getAllOrder.isLoading) {
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
    <Box>
      <Paper
        sx={{ width: "100%", overflow: "hidden", boxShadow: "1px 1px 10px" }}>
        <TableContainer sx={{ maxHeight: 430 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => {
                  return (
                    <TableCell
                      key={column.id}
                      align={"center"}
                      style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {getAllOrder.data?.data?.map((order) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={order._id}>
                    {columns.map((column) => {
                      const value = column.id.includes(".")
                        ? column.id.split(".").reduce((o, i) => o[i], order)
                        : order[column.id];

                      return (
                        <TableCell key={column.id} align={"center"}>
                          {column.id === "action" ? (
                            <Tooltip title='Xóa đơn hàng' arrow>
                              <DeleteForeverOutlinedIcon
                                color='error'
                                style={{ cursor: "pointer" }}
                                onClick={() => handleDeleteOrder(order._id)}
                              />
                            </Tooltip>
                          ) : column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : column.id === "isDelivered" ? (
                            value === true ? (
                              <span
                                style={{
                                  color: "orange",
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}>
                                Đã giao hàng
                                <BorderColorIcon
                                  fontSize='small'
                                  onClick={() => handleUpdateOrder(order)}
                                />
                              </span>
                            ) : (
                              <span
                                style={{
                                  color: "red",
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}>
                                Chưa giao hàng{" "}
                                <BorderColorIcon
                                  style={{ color: "orange" }}
                                  fontSize='small'
                                  onClick={() => handleUpdateOrder(order)}
                                />
                              </span>
                            )
                          ) : column.id === "isReceived" ? (
                            value === true ? (
                              <span style={{ color: "orange" }}>
                                Đã nhận hàng
                              </span>
                            ) : (
                              <span style={{ color: "red" }}>
                                Chưa nhận hàng
                              </span>
                            )
                          ) : column.id === "isPaid" ? (
                            value === true ? (
                              <span style={{ color: "orange" }}>
                                Đã thanh toán
                              </span>
                            ) : (
                              <span style={{ color: "red" }}>
                                Chưa thanh toán
                              </span>
                            )
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {totalPage > 1 && (
        <Box
          style={{ display: "flex", justifyContent: "center" }}
          sx={{ mt: 2 }}>
          <Pagination
            count={totalPage}
            page={page}
            onChange={handlePageChange}
            color='primary'
            showFirstButton
            showLastButton
            size='large'
          />
        </Box>
      )}
      {isShowUpdate && <UpdateOrder />}
      {isShowDeleteOrder && <DeleteOrder />}
    </Box>
  );
};
export default OrderManagementComponent;
