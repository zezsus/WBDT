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
import { PayPalButton } from "react-paypal-button-v2";
import { getPayment } from "../common/service/payment.service";
import {
  setErrorMessage,
  setShowMessage,
  setSuccessMessage,
} from "../../../common/redux/userSlice";
import MessageComponent from "../../../components/message.component";

const BuyComponent = () => {
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [payMethod, setPayMethod] = useState("Thanh toán khi nhận hàng");
  const [sdkReady, setSdkReady] = useState(false);
  const location = useLocation();
  const buyItem = location.state?.buyItem;
  const userInfo = useGetDetailUser(userId, accessToken);
  const createOrder = useCreateOrder();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const paymentPrice = ((buyItem?.price * quantity) / 24000).toFixed(2);

  useEffect(() => {
    const storeToken = localStorage.getItem("accessToken");
    if (storeToken) {
      const decode = jwtDecode(storeToken);
      if (decode) {
        setUserId(decode.userId);
        setAccessToken(storeToken);
      }
    }
  }, []);

  console.log("user", userInfo.data);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ";
  };

  const handleAddQuantity = () => {
    if (buyItem?.countInStock - quantity > 0) {
      setQuantity(quantity + 1);
    }
  };

  const handleSubQuantity = () => {
    quantity > 1 && setQuantity(quantity - 1);
  };

  const handlePaymantMethod = (e) => {
    setPayMethod(e.target.value);
  };

  const addPaypalScript = async () => {
    const { data } = await getPayment();
    if (!data) {
      console.log("Không có client id");
      return;
    }
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://sandbox.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!window.paypal) {
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, [setSdkReady]);

  const handleSuccess = () => {
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
      totalPrice: buyItem?.price * quantity,
      paymentMethod: payMethod,
      user: userInfo.data?._id,
      isPaid: true,
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
  };

  const handleBuyNow = () => {
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
      totalPrice: buyItem?.price * quantity,
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
          dispatch(setSuccessMessage(data?.message));
          dispatch(setShowMessage(true));
          setTimeout(() => {
            dispatch(setSuccessMessage(""));
          }, 3000);
        },

        onError: (error) => {
          console.log(error.response.data.message);

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
      <MessageComponent />
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
          {payMethod === "Thanh toán online" && sdkReady ? (
            <Box style={{ width: "100%" }}>
              <PayPalButton
                style={{
                  color: "blue",
                }}
                amount={paymentPrice}
                onSuccess={handleSuccess}
                onError={(error) => {
                  console.log("error", error);
                }}
              />
            </Box>
          ) : (
            <Button
              variant='contained'
              color='warning'
              style={{ width: "100%", height: 50 }}
              onClick={handleBuyNow}>
              Đặt hàng
            </Button>
          )}
        </Box>
      </BuyProduct>
    </Container>
  );
};
export default BuyComponent;
