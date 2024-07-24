/** @format */

import {
  Box,
  Button,
  CardMedia,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import SpinnerComponent from "../../../components/spinner.component";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import { useDispatch, useSelector } from "react-redux";
import MessageComponent from "../../../components/message.component";
import { useGetAllProduct } from "../../../common/hook/product.hook";
import Add from "@mui/icons-material/Add";
import {
  setShowCreate,
  setShowDelete,
  setShowUpdate,
} from "../../../common/redux/productSlice";
import CreateProductComponent from "./createProduct.component";
import UpdateProductComponent from "./updateProduct.component";
import DeleteProductComponent from "./deleteProduct.component";

const ProductManagementComponent = () => {
  const columns = [
    { id: "action", label: "Hành Động", minWidth: 100 },
    { id: "image", label: "Hình Ảnh", minWidth: 150 },
    { id: "name", label: "Tên sản phẩm", minWidth: 150 },
    {
      id: "price",
      label: "Giá Sản phẩm",
      format: (value) => value.toLocaleString("vi-VN") + " VNĐ",
      minWidth: 150,
    },
    { id: "brand", label: "Hãng Sản Xuất", minWidth: 150 },
    { id: "type", label: "Hệ điều hành", minWidth: 150 },
    { id: "rating", label: "Đánh Giá", minWidth: 100 },
    { id: "description", label: "Chi Tiết Sản Phẩm", minWidth: 400 },
    {
      id: "countInStock",
      label: "Số Lượng Trong Kho",
      format: (value) => value.toLocaleString("vi-VN"),
      minWidth: 180,
    },
  ];

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [accessToken, setAccessToken] = useState(null);
  const [productDeleteId, setProductDeleteId] = useState(null);
  const [productUpdate, setProductUpdate] = useState(null);
  const [description, setDescriptions] = useState({});

  const isShowCreate = useSelector((state) => state.products.isShowCreate);
  const isShowUpdate = useSelector((state) => state.products.isShowUpdate);
  const isShowDelete = useSelector((state) => state.products.isShowDelete);

  const dispatch = useDispatch();

  const { data, isLoading } = useGetAllProduct(page);

  useEffect(() => {
    if (data?.totalPage) {
      setTotalPage(data?.totalPage);
    }
  }, [data]);

  useEffect(() => {
    const storage = localStorage.getItem("accessToken");
    if (storage) {
      setAccessToken(storage);
    }
  }, []);

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  const handleCreateProduct = () => {
    dispatch(setShowCreate(true));
  };

  const handleUpdateProduct = (product) => {
    setProductUpdate(product);
    dispatch(setShowUpdate(true));
  };

  const handleDeleteProduct = (id) => {
    dispatch(setShowDelete(true));
    setProductDeleteId(id);
  };

  const handleToggleDescription = (id) => {
    setDescriptions((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  if (isLoading) {
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
      <Box
        sx={{ pb: "10px" }}
        style={{
          display: "flex",
          boxSizing: "border-box",
          justifyContent: "space-between",
        }}>
        <IconButton
          onClick={handleCreateProduct}
          color='primary'
          sx={{
            backgroundColor: "#115BF8",
            color: "white",
            "&:hover": {
              backgroundColor: "#4691F7",
            },
          }}>
          <Tooltip title='Thêm mới sản phẩm' arrow>
            <Add fontSize='medium' />
          </Tooltip>
        </IconButton>
        <MessageComponent />
      </Box>
      <Paper
        sx={{ width: "100%", overflow: "hidden", boxShadow: "1px 1px 10px" }}>
        <TableContainer sx={{ maxHeight: 430 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={"center"}
                    style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data?.map((product) => {
                return (
                  <TableRow
                    hover
                    role='checkbox'
                    tabIndex={-1}
                    key={product._id}>
                    {columns.map((column) => {
                      const value = product[column.id];
                      return (
                        <TableCell key={column.id} align={"center"}>
                          {column.id === "image" ? (
                            <CardMedia
                              component='img'
                              style={{ height: 80, width: "auto" }}
                              image={value}
                              alt='Product Image'
                            />
                          ) : column.id === "description" ? (
                            <div>
                              <Typography
                                noWrap={!description[product._id]}
                                style={{
                                  maxWidth: "500px",
                                  maxHeight: description[product._id]
                                    ? "none"
                                    : "80px",
                                  overflow: "hidden",
                                  textAlign: "justify",
                                }}>
                                {product[column.id]}
                              </Typography>
                              {product[column.id].length > 100 && (
                                <Button
                                  color='primary'
                                  variant='text'
                                  onClick={() =>
                                    handleToggleDescription(product._id)
                                  }>
                                  {description[product._id]
                                    ? "Thu gọn"
                                    : "Xem thêm"}
                                </Button>
                              )}
                            </div>
                          ) : column.id === "action" ? (
                            <Box
                              style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                              }}>
                              <Tooltip title='Sửa thông tin sản phẩm' arrow>
                                <EditCalendarOutlinedIcon
                                  color='warning'
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleUpdateProduct(product)}
                                />
                              </Tooltip>

                              <Tooltip title='Xóa sản phẩm' arrow>
                                <DeleteForeverOutlinedIcon
                                  color='error'
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    handleDeleteProduct(product._id)
                                  }
                                />
                              </Tooltip>
                            </Box>
                          ) : column.format && typeof value === "number" ? (
                            column.format(value)
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

      {isShowCreate && <CreateProductComponent />}
      {isShowUpdate && (
        <UpdateProductComponent
          productUpdate={productUpdate}
          accessToken={accessToken}
        />
      )}
      {isShowDelete && (
        <DeleteProductComponent
          id={productDeleteId}
          accessToken={accessToken}
        />
      )}
    </Box>
  );
};

export default ProductManagementComponent;
