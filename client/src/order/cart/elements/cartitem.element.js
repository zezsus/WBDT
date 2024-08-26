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
import {
  setProductCartId,
  setShowDelete,
} from "../../../common/redux/cartSlice";
import DeleteCartModalComponent from "../components/delete.component";
import { useNavigate } from "react-router-dom";
import { useGetCart } from "../../../common/hook/cart.hook";
import SpinnerComponent from "../../../components/spinner.component";

const CartItemElm = ({ userId, accessToken }) => {
  const [listCartItem, setListCartItem] = useState(null);

  const dispatch = useDispatch();
  const isShowDelete = useSelector((state) => state.carts.isShowDelete);
  const navigate = useNavigate();

  const getCart = useGetCart(userId);

  useEffect(() => {
    if (getCart.data) {
      setListCartItem(getCart.data?.items);
    }
  }, [getCart.data]);

  const handleAddQuantity = (id) => {
    const updateCart = listCartItem.map((item) =>
      item._id === id ? { ...item, quantity: ++item.quantity } : item
    );
    setListCartItem(updateCart);
  };

  const handleSubQuantity = (id) => {
    const updateCart = listCartItem.map((item) => {
      return item._id === id
        ? item.quantity > 1
          ? { ...item, quantity: --item.quantity }
          : { ...item, quantity: 1 }
        : item;
    });
    setListCartItem(updateCart);
  };

  const handleBuyNow = (item) => {
    const buyItem = item.product;
    navigate("/buy", { state: { buyItem } });
  };

  const handleDeleteCart = (productId) => {
    dispatch(setProductCartId(productId));
    dispatch(setShowDelete(true));
  };

  const formatPrice = (price) => {
    return price?.toLocaleString("vi-VN") + " VNĐ";
  };

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
    <ListCart>
      <Container>
        {listCartItem && listCartItem.length ? (
          listCartItem.map((cartItem) => {
            return (
              <CartItem key={cartItem?._id} sx={{ my: 2 }}>
                <CartItemImage>
                  <CardMedia
                    component={"img"}
                    sx={{ height: 80, width: 80 }}
                    image={cartItem?.product?.image}
                    title={cartItem?.product?.name}
                  />
                  <Typography
                    gutterBottom
                    variant='body2'
                    component='div'
                    sx={{ textTransform: "capitalize" }}>
                    {cartItem?.product?.name}
                  </Typography>
                </CartItemImage>
                <CartContent>
                  <Typography variant='body2' width={150}>
                    {formatPrice(cartItem?.product?.price)}
                  </Typography>
                  <Typography
                    variant='body1'
                    py={2}
                    width={250}
                    sx={{ display: "flex", alignItems: "center" }}
                    component={"div"}>
                    <Counter>
                      <IconButton
                        onClick={() => handleSubQuantity(cartItem?._id)}>
                        <RemoveIcon />
                      </IconButton>
                      <CounterInput value={cartItem?.quantity} />
                      <IconButton
                        onClick={() => handleAddQuantity(cartItem?._id)}>
                        <AddIcon />
                      </IconButton>
                    </Counter>
                  </Typography>
                  <Typography variant='body1' width={150} sx={{ color: "red" }}>
                    {formatPrice(cartItem?.product?.price * cartItem?.quantity)}
                  </Typography>
                </CartContent>
                <CardActions sx={{ width: 150 }}>
                  <Button
                    onClick={() => handleBuyNow(cartItem)}
                    disabled={cartItem?.product?.countInStock <= 0}>
                    Buy now
                  </Button>
                  <IconButton
                    color='error'
                    onClick={() => handleDeleteCart(cartItem?.product?._id)}>
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
      {isShowDelete && (
        <DeleteCartModalComponent accessToken={accessToken} userId={userId} />
      )}
    </ListCart>
  );
};

export default CartItemElm;
