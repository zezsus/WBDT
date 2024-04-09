/** @format */

import React, { useEffect, useState } from "react";
import { getListProduct } from "../common/mockdata";
import { Box, CardMedia, CardContent, Typography, Button } from "@mui/material";
import {
  ButtonLearnMore,
  CardProduct,
  ListProducts,
  styleImageProduct,
} from "../common/assets/listproduct.style";
import { useNavigate } from "react-router-dom";

const ListProductElement = () => {
  const listProduct = getListProduct();

  const [products, setProducts] = useState(listProduct);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const navigate = useNavigate();

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  useEffect(() => {
    setVisibleProducts(products?.slice(0, visibleCount));
  }, [products, visibleCount]);
  return (
    <Box>
      {visibleProducts && visibleProducts.length > 0 ? (
        <Box>
          <ListProducts>
            {visibleProducts.map((item) => {
              return (
                <CardProduct
                  key={item.id}
                  onClick={() => navigate(`product/${item.id}`)}>
                  <CardMedia
                    component='img'
                    image={item.image}
                    alt={item?.name}
                    sx={styleImageProduct}
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {item?.title}
                    </Typography>
                    <Typography variant='h6'>$ {item.price}</Typography>
                  </CardContent>
                </CardProduct>
              );
            })}
          </ListProducts>
          {visibleCount < products?.length && (
            <ButtonLearnMore>
              <Button variant='contained' onClick={handleShowMore}>
                Learn More
              </Button>
            </ButtonLearnMore>
          )}
        </Box>
      ) : (
        <ListProducts>
          <Typography variant='h5'>Products Not Found</Typography>
        </ListProducts>
      )}
    </Box>
  );
};

export default ListProductElement;
