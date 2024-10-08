/** @format */

import { Box, Container, Stack, Typography } from "@mui/material";
import { CartContent, CartHeader } from "../common/assets/cart.style";
import CartItemElm from "../elements/cartitem.element";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import MessageComponent from "../../../components/message.component";

const CartComponent = () => {
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

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

  return (
    <Box>
      <MessageComponent />
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
      <CartItemElm accessToken={accessToken} userId={userId} />
    </Box>
  );
};

export default CartComponent;
