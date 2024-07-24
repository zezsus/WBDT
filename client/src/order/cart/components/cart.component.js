/** @format */

import { Box, Container, Stack, Typography } from "@mui/material";
import { CartContent, CartHeader } from "../common/assets/cart.style";
import CartItemElm from "../elements/cartitem.element";
import { useEffect, useState } from "react";
import { useGetCart } from "../../../common/hook/cart.hook";
import SpinnerComponent from "../../../components/spinner.component";
import { jwtDecode } from "jwt-decode";

const CartComponent = () => {
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [listCartItem, setListCartItem] = useState(null);

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

  const getCart = useGetCart(userId);

  useEffect(() => {
    if (getCart.data) {
      setListCartItem(getCart.data);
    }
  }, [getCart.data]);

  if (getCart.isLoading) {
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
      <Container>
        <Stack spacing={2} p={1}>
          <CartHeader>
            <Typography
              gutterBottom
              variant='body2'
              component='div'
              style={{ textAlign: "left", width: 200 }}>
              Sản phẩm
            </Typography>
            <CartContent>
              <Typography
                variant='body2'
                style={{ textAlign: "left", width: 150 }}>
                Giá
              </Typography>
              <Typography
                variant='body2'
                style={{ textAlign: "left", width: 250 }}>
                Số lượng
              </Typography>
              <Typography
                variant='body2'
                style={{ textAlign: "left", width: 150 }}>
                Tổng tiền
              </Typography>
            </CartContent>
            <Typography
              variant='body2'
              style={{ textAlign: "left", width: 150 }}>
              Hành động
            </Typography>
          </CartHeader>
        </Stack>
      </Container>
      <CartItemElm cartItem={listCartItem} accessToken={accessToken} />
    </Box>
  );
};

export default CartComponent;
