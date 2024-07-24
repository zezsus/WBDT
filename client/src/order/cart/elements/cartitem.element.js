/** @format */

import {
  Box,
  Button,
  CardActions,
  CardMedia,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import { CartContent } from "../common/assets/cart.style";
import {
  CartItem,
  CartItemImage,
  Counter,
  CounterInput,
  ListCart,
} from "../common/assets/cartitem.style";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCartId, setShowDelete } from "../../../common/redux/cartSlice";
import DeleteCartModalComponent from "../components/delete.component";

const CartItemElm = ({ cartItem, accessToken }) => {
  const [carts, setCarts] = useState(null);
  const dispatch = useDispatch();
  const isShowDelete = useSelector((state) => state.carts.isShowDelete);

  useEffect(() => {
    cartItem && setCarts(cartItem);
  }, [cartItem]);

  const handleAddQuantity = (id) => {
    const updateCart = carts.map((item) =>
      item._id === id ? { ...item, quantity: ++item.quantity } : item
    );
    setCarts(updateCart);
  };

  const handleSubQuantity = (id) => {
    const updateCart = carts.map((item) => {
      return item._id === id
        ? item.quantity > 1
          ? { ...item, quantity: --item.quantity }
          : { ...item, quantity: 1 }
        : item;
    });
    setCarts(updateCart);
  };

  const handleDeleteCart = (cartId) => {
    dispatch(setCartId(cartId));
    dispatch(setShowDelete(true));
  };

  const formatPrice = (price) => {
    return price?.toLocaleString("vi-VN") + " VNĐ";
  };

  return (
    <ListCart>
      <Container>
        {carts && carts.length ? (
          carts.map((item) => {
            return (
              <CartItem key={item._id} sx={{ my: 2 }}>
                <CartItemImage>
                  <CardMedia
                    component={"img"}
                    sx={{ height: 80, width: 80 }}
                    image={item.product?.image}
                    title={item.product?.name}
                  />
                  <Typography
                    gutterBottom
                    variant='body2'
                    component='div'
                    sx={{ textTransform: "capitalize" }}>
                    {item.product?.name}
                  </Typography>
                </CartItemImage>
                <CartContent>
                  <Typography variant='body2' width={150}>
                    {formatPrice(item.product?.price)}
                  </Typography>
                  <Typography
                    variant='body1'
                    py={2}
                    width={250}
                    sx={{ display: "flex", alignItems: "center" }}
                    component={"div"}>
                    <Counter>
                      <IconButton onClick={() => handleSubQuantity(item._id)}>
                        <RemoveIcon />
                      </IconButton>
                      <CounterInput value={item.quantity} />
                      <IconButton onClick={() => handleAddQuantity(item._id)}>
                        <AddIcon />
                      </IconButton>
                    </Counter>
                  </Typography>
                  <Typography variant='body1' width={150} sx={{ color: "red" }}>
                    {formatPrice(item.product.price * item.quantity)}
                  </Typography>
                </CartContent>
                <CardActions sx={{ width: 150 }}>
                  <Button>Buy now</Button>
                  <IconButton
                    color='error'
                    onClick={() => handleDeleteCart(item._id)}>
                    <DeleteForeverIcon />
                  </IconButton>
                </CardActions>
              </CartItem>
            );
          })
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              gap: "1rem",
              boxSizing: "border-box",
            }}>
            <Typography variant='h5' style={{ textTransform: "capitalize" }}>
              Không có sản phẩm nào trong giỏ hàng
            </Typography>
          </Box>
        )}
      </Container>
      {isShowDelete && <DeleteCartModalComponent accessToken={accessToken} />}
    </ListCart>
  );
};

export default CartItemElm;
