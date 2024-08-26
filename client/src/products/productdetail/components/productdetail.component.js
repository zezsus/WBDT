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
import Configuration from "../element/configuration.element";
import MessageComponent from "../../../components/message.component";
import { useDispatch } from "react-redux";
import {
  setErrorMessage,
  setShowMessage,
  setSuccessMessage,
} from "../../../common/redux/userSlice";

const ProductDetailComponent = () => {
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const idProduct = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const getDetailProduct = useGetDetailProduct(idProduct.id);
  const [statusButton, setStatusButton] = useState(false);
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

  useEffect(() => {
    if (productDetail?.countInStock === 0) {
      setStatusButton(true);
    }
  }, [productDetail]);

  const formatPrice = (price) => {
    return price?.toLocaleString("vi-VN") + " VNĐ";
  };

  const handleAddToCart = () => {
    const data = {
      user: userId,
      items: {
        product: productDetail?._id,
        quantity: 1,
      },
    };
    if (accessToken) {
      createCart.mutate(
        { userId, data, accessToken },
        {
          onSuccess: (data) => {
            dispatch(setSuccessMessage(""));
            dispatch(setErrorMessage(""));
            dispatch(setSuccessMessage(data?.message));
            dispatch(setShowMessage(true));
            setTimeout(() => {
              dispatch(setSuccessMessage(""));
            }, 3000);
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
    } else {
      navigate("/sign-in");
    }
  };

  const handleBuyNow = () => {
    const buyItem = productDetail;
    if (accessToken) {
      navigate("/buy", { state: { buyItem } });
    } else {
      navigate("/sign-in");
    }
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
        <MessageComponent />

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
                onClick={handleBuyNow}
                disabled={statusButton}>
                <LocalMallOutlinedIcon fontSize='large' sx={{ pr: 1 }} />
                Mua ngay
              </Button>
            </ListButton>
          </Box>
        </ProductDetailContent>
        <Box display={"flex"} justifyContent={"space-between"} gap={5}>
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
