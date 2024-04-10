/** @format */

import {
  Button,
  CardActions,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { CartContent } from "../common/assets/cart.style";
import {
  CartItem,
  CartItemImage,
  Counter,
  CounterInput,
} from "../common/assets/cartitem.style";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const CartItemElm = ({ cartItem }) => {
  if (!cartItem) {
    return;
  }

  return (
    <CartItem>
      <CartItemImage>
        <CardMedia
          component={"img"}
          sx={{ height: 80, width: 80 }}
          image={cartItem.image}
          title={cartItem.name}
        />
        <Typography
          gutterBottom
          variant='body2'
          component='div'
          sx={{ textTransform: "capitalize" }}>
          {cartItem.name}
        </Typography>
      </CartItemImage>
      <CartContent>
        <Typography variant='body2' width={150}>
          ${cartItem.price}
        </Typography>
        <Typography
          variant='body1'
          py={2}
          width={250}
          sx={{ display: "flex", alignItems: "center" }}
          component={"div"}>
          <Counter>
            <IconButton>
              <RemoveIcon />
            </IconButton>
            <CounterInput />
            <IconButton>
              <AddIcon />
            </IconButton>
          </Counter>
        </Typography>
        {/* <Typography variant='body1' width={150} sx={{ color: "red" }}>
          $ {cartItem.price * numberProduct}
        </Typography> */}
      </CartContent>
      <CardActions sx={{ width: 150 }}>
        <Button>Buy now</Button>
        <IconButton color='error'>
          <DeleteForeverIcon />
        </IconButton>
      </CardActions>
    </CartItem>
  );
};

export default CartItemElm;
