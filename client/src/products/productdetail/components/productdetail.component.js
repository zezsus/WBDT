/** @format */
import { Box, Button, CardMedia, Container, Typography } from "@mui/material";
import { useGetDetailProduct } from "../../../common/hook/product.hook";
import SpinnerComponent from "../../../components/spinner.component";
import {
  ListButton,
  ProductDescription,
  ProductDetail,
  ProductDetailContent,
  styleImage,
} from "../common/styles/productdetail.style";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { useCreateCart } from "../../../common/hook/cart.hook";
import { jwtDecode } from "jwt-decode";
import {
  setErrorMessage,
  setSuccessMessage,
} from "../../../common/redux/userSlice";
import { useDispatch } from "react-redux";
import Configuration from "../element/configuration.element";

const ProductDetailComponent = () => {
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const idProduct = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const getDetailProduct = useGetDetailProduct(idProduct.id);
  const createCart = useCreateCart();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      const decoded = jwtDecode(storedToken);
      if (decoded?.userId) {
        setUserId(decoded.userId);
        setAccessToken(storedToken);
      }
    }
  }, []);

  useEffect(() => {
    getDetailProduct.data && setProductDetail(getDetailProduct.data);
  }, [getDetailProduct]);

  const formatPrice = (price) => {
    return price?.toLocaleString("vi-VN") + " VNĐ";
  };

  const handleAddToCart = () => {
    const data = {
      product: productDetail,
      user: userId,
    };
    createCart.mutate(
      { data, accessToken },
      {
        onSuccess: () => {
          dispatch(setSuccessMessage("Cập nhật thông tin thành công"));
        },
        onError: (error) => {
          if (error.response.data.message) {
            dispatch(setErrorMessage(error.response.data.message));
          } else {
            dispatch(setErrorMessage("Đã xảy ra lỗi khi cập nhật thông tin"));
          }
        },
      }
    );
  };

  const handleBuyNow = () => {
    const buyItem = productDetail;
    navigate("/buy", { state: { buyItem } });
  };

  if (getDetailProduct.isLoading) {
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
    <ProductDetail>
      <Container>
        <ProductDetailContent>
          <CardMedia
            component={"img"}
            image={productDetail?.image}
            alt={productDetail?.name}
            sx={styleImage}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <ProductDescription>
              <Typography variant='h6'>{productDetail?.name}</Typography>
              {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Rating
                  name='read-only'
                  defaultValue={productDetail?.rating}
                  precision={0.1}
                  readOnly
                />
                <Typography
                  component={"body1"}
                  sx={{ color: "#BCB4B4", fontSize: 15 }}>
                  ({productDetail?.rating})ư
                </Typography>
              </Box> */}
              <Typography style={{ color: "red", fontSize: "1.7rem" }}>
                {formatPrice(productDetail?.price)}
              </Typography>
              <Typography style={{ color: "gray" }}>
                Số lượng còn trong kho: {productDetail?.countInStock}
              </Typography>
            </ProductDescription>
            <ListButton>
              <Button
                variant='contained'
                color='warning'
                sx={{ width: 180, height: 50, borderRadius: 2 }}
                onClick={handleAddToCart}>
                <AddShoppingCartOutlinedIcon fontSize='large' sx={{ pr: 1 }} />
                Thêm vào giỏ hàng
              </Button>
              <Button
                variant='contained'
                sx={{ width: 180, height: 50, borderRadius: 2 }}
                onClick={handleBuyNow}>
                <LocalMallOutlinedIcon fontSize='large' sx={{ pr: 1 }} />
                Mua ngay
              </Button>
            </ListButton>
          </Box>
        </ProductDetailContent>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography
            component={"body1"}
            style={{ maxWidth: "60%", textAlign: "justify" }}>
            {productDetail?.description}
          </Typography>
          <Configuration configData={productDetail} />
        </Box>
      </Container>
    </ProductDetail>
  );
};

export default ProductDetailComponent;
