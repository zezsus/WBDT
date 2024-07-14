/** @format */
import { useParams } from "react-router-dom";
import { Box, Button, CardMedia, Rating, Typography } from "@mui/material";
import {
  ListButton,
  ProductDescription,
  ProductDetail,
  ProductDetailContent,
  styleImage,
} from "../common/styles/productdetail.style";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import { setCartProduct } from "../../../common/redux/productSlice";

const ProductDetailComponent = () => {
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(setCartProduct(item));
  };

  return (
    <ProductDetail>
      {/* {product.map((item) => {
        return (
          <ProductDetailContent key={item.key}>
            <CardMedia
              component={"img"}
              image={item.image}
              alt={item.name}
              sx={styleImage}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <ProductDescription>
                <Typography variant='h6'>{item.name}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Rating
                    name='read-only'
                    defaultValue={item.rating}
                    precision={0.1}
                    readOnly
                  />
                  <Typography
                    component={"body1"}
                    sx={{ color: "#BCB4B4", fontSize: 15 }}>
                    ({item.rating})
                  </Typography>
                </Box>
                <Typography variant='h6'>{item.price}</Typography>
                <Typography component={"body1"}>{item.description}</Typography>
              </ProductDescription>
              <ListButton>
                <Button
                  variant='contained'
                  color='warning'
                  sx={{ width: 180, height: 50, borderRadius: 2 }}
                  onClick={() => handleAddToCart(item)}>
                  <AddShoppingCartIcon />
                  Add to card
                </Button>
                <Button
                  variant='contained'
                  sx={{ width: 180, height: 50, borderRadius: 2 }}>
                  Buy now
                </Button>
              </ListButton>
            </Box>
          </ProductDetailContent>
        );
      })} */}
    </ProductDetail>
  );
};

export default ProductDetailComponent;
