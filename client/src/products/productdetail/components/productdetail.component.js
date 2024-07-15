/** @format */
import {
  Box,
  Button,
  CardMedia,
  Container,
  Rating,
  Typography,
} from "@mui/material";
import { useGetDetailProduct } from "../../../common/hook/product.hook";
import SpinnerComponent from "../../../components/spinner.component";
import {
  ListButton,
  ProductDescription,
  ProductDetail,
  ProductDetailContent,
  styleImage,
} from "../common/styles/productdetail.style";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetailComponent = () => {
  const idProduct = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const getDetailProduct = useGetDetailProduct(idProduct.id);
  useEffect(() => {
    getDetailProduct.data && setProductDetail(getDetailProduct.data);
  }, [getDetailProduct]);

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
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Rating
                  name='read-only'
                  defaultValue={productDetail?.rating}
                  precision={0.1}
                  readOnly
                />
                <Typography
                  component={"body1"}
                  sx={{ color: "#BCB4B4", fontSize: 15 }}>
                  ({productDetail?.rating})
                </Typography>
              </Box>
              <Typography variant='h6'>{productDetail?.price}</Typography>
            </ProductDescription>
            <ListButton>
              <Button
                variant='contained'
                color='warning'
                sx={{ width: 180, height: 50, borderRadius: 2 }}>
                Thêm vào giỏ hàng
              </Button>
              <Button
                variant='contained'
                sx={{ width: 180, height: 50, borderRadius: 2 }}>
                Mua ngay
              </Button>
            </ListButton>
          </Box>
        </ProductDetailContent>
        <Typography component={"body1"}>
          {productDetail?.description}
        </Typography>
      </Container>
    </ProductDetail>
  );
};

export default ProductDetailComponent;
