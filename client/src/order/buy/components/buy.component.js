/** @format */

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ShippingAddress from "../elements/address.element";
import { useGetDetailUser } from "../../../navigator/common/hook/navigator.hook";
import SpinnerComponent from "../../../components/spinner.component";
import { BuyProduct } from "../common/assets/buy.style";
import {
  Box,
  Button,
  CardMedia,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Counter, CounterInput } from "../../cart/common/assets/cartitem.style";
import { useCreateOrder } from "../../../common/hook/order.hook";
import { useDispatch } from "react-redux";
import { setOrderId } from "../../../common/redux/orderSlice";

const BuyComponent = () => {
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [payMethod, setPayMethod] = useState("Thanh toán khi nhận hàngcd");
  const location = useLocation();
  const buyItem = location.state?.buyItem;
  const userInfo = useGetDetailUser(userId, accessToken);
  const createOrder = useCreateOrder();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storeToken = localStorage.getItem("accessToken");
    if (localStorage) {
      const decode = jwtDecode(storeToken);
      if (decode) {
        setUserId(decode.userId);
        setAccessToken(storeToken);
      }
    }
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ";
  };

  const handleAddQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleSubQuantity = () => {
    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
  };

  const handlePaymantMethod = (e) => {
    setPayMethod(e.target.value);
  };

  const handleBuyNow = () => {
    if (payMethod === "Thanh toán khi nhận hàng") {
      const newOrder = {
        orderItems: {
          name: buyItem?.name,
          quantity: quantity,
          image: buyItem?.image,
          price: buyItem?.price,
          product: buyItem?._id,
        },
        shippingAddress: {
          name: userInfo.data?.username,
          address: userInfo.data?.address,
          phone: userInfo.data?.phone,
        },
        itemsPrice: buyItem?.price,
        shippingPrice: 0,
        totalPrice: buyItem?.price * quantity + 20000,
        paymentMethod: payMethod,
        user: userInfo.data?._id,
        isPaid: false,
        isDelivered: false,
        isReceived: false,
      };

      createOrder.mutate(
        { newOrder, userId, accessToken },
        {
          onSuccess: (data) => {
            const orderId = data.data._id;
            navigate("/order-detail", { state: { orderId } });
            dispatch(setOrderId(data.data._id));
          },
        }
      );
    } else {
      console.log("Thanh toán onl");
    }
  };

  if (userInfo.isLoading) {
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
    <Container
      style={{
        width: "50%",
        boxShadow: "1px 1px 10px gray",
        borderRadius: "10px",
      }}
      sx={{ mt: 2 }}>
      {userInfo && (
        <ShippingAddress
          userData={userInfo.data}
          userId={userId}
          accessToken={accessToken}
        />
      )}
      <BuyProduct sx={{ pt: 3 }}>
        <Box
          style={{ display: "flex", gap: 10, justifyContent: "space-between" }}
          sx={{ pb: 3 }}>
          <Box style={{ display: "flex" }}>
            <CardMedia
              component='img'
              image={buyItem?.image}
              alt={buyItem?.name}
              style={{ width: 180, height: "auto" }}
            />
            <Typography fontWeight={"bold"} fontSize={22}>
              {buyItem?.name}
            </Typography>
          </Box>

          <Typography color={"red"}>{formatPrice(buyItem?.price)}</Typography>
        </Box>

        <Box display={"flex"} flexDirection={"column"} gap={2} sx={{ mb: 1 }}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography fontWeight={"bold"}>Số lượng sản phẩm</Typography>{" "}
            <Counter>
              <IconButton onClick={handleSubQuantity}>
                <RemoveIcon />
              </IconButton>
              <CounterInput value={quantity} />
              <IconButton onClick={handleAddQuantity}>
                <AddIcon />
              </IconButton>
            </Counter>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography fontWeight={"bold"}>Tổng giá</Typography>
            <Typography color={"red"}>
              {formatPrice(buyItem?.price * quantity)}
            </Typography>
          </Box>
        </Box>
        <hr sx={{ border: "none", borderTop: "1px solid #C9C9C9" }} />
        <Box>
          <Box>
            <FormControl>
              <FormLabel
                id='paymethod'
                sx={{ fontSize: "20px", textTransform: "capitalize" }}>
                Phương thức thanh toán
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby='paymethod'
                defaultValue='Thanh toán khi nhận hàng'
                name='radio-buttons-group'>
                <FormControlLabel
                  value='Thanh toán khi nhận hàng'
                  control={<Radio />}
                  label='Thanh toán khi nhận hàng'
                  onChange={handlePaymantMethod}
                />
                <FormControlLabel
                  value='Thanh toán online'
                  control={<Radio />}
                  label='Thanh toán online'
                  onChange={handlePaymantMethod}
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>

        <Box display={"flex"} justifyContent={"center"} sx={{ py: 2 }}>
          <Button
            variant='contained'
            color='warning'
            style={{ width: "100%", height: 50 }}
            onClick={handleBuyNow}>
            Đặt hàng
          </Button>
        </Box>
      </BuyProduct>
    </Container>
  );
};
export default BuyComponent;
