/** @format */

import { Container, Stack, Typography } from "@mui/material";
import { Cart, CartContent, CartHeader } from "../common/assets/cart.style";
import CartItemElm from "../elements/cartitem.element";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const CartComponent = () => {
  const [listCartItem, setListCartItem] = useState(null);
  const cartItem = useSelector((state) => state.products.cartProduct);
  useEffect(() => {
    if (cartItem) {
      setListCartItem(cartItem);
    }
  }, [cartItem]);
  return (
    <Cart>
      <Container>
        <Stack spacing={2} p={1}>
          <CartHeader>
            <Typography
              gutterBottom
              variant='body2'
              component='div'
              width={200}>
              Product
            </Typography>
            <CartContent>
              <Typography variant='body2' width={150}>
                Price
              </Typography>
              <Typography variant='body2' width={250}>
                Number
              </Typography>
              <Typography variant='body2' width={150}>
                Total
              </Typography>
            </CartContent>
            <Typography variant='body2' sx={{ width: 150 }}>
              Action
            </Typography>
          </CartHeader>
          <CartItemElm cartItem={listCartItem} />
        </Stack>
      </Container>
    </Cart>
  );
};

export default CartComponent;
