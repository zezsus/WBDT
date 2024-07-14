/** @format */

import {
  Box,
  CardMedia,
  CardContent,
  Typography,
  Pagination,
} from "@mui/material";
import {
  CardProduct,
  ListProducts,
  Paging,
  styleImageProduct,
} from "../common/assets/listproduct.style";
import { useNavigate } from "react-router-dom";
import { useGetAllProduct } from "../../../common/hook/product.hook";
import SpinnerComponent from "../../../components/spinner.component";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ListProductElement = () => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [company, setCompany] = useState("");
  const search = useSelector((state) => state.products.nameProduct);
  const navigate = useNavigate();

  const getProduct = useGetAllProduct(
    page,
    search,
    type,
    company,
    `${minPrice}-${maxPrice}`
  );

  useEffect(() => {
    if (getProduct.data?.totalPage) {
      setTotalPage(getProduct.data?.totalPage);
    }
    if (getProduct.data?.data) {
      setProducts(getProduct.data?.data);
    }
  }, [getProduct.data]);

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  if (getProduct.isLoading) {
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
    <Box>
      {products?.length ? (
        <ListProducts>
          {products?.map((item) => {
            return (
              <CardProduct
                key={item._id}
                onClick={() => navigate(`product/${item.id}`)}>
                <CardMedia
                  component='img'
                  image={item.image}
                  alt={item?.name}
                  sx={styleImageProduct}
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {item?.name}
                  </Typography>
                  <Typography variant='h6'>$ {item.price}</Typography>
                </CardContent>
              </CardProduct>
            );
          })}
        </ListProducts>
      ) : (
        <ListProducts>
          <Typography variant='h5'>Products Not Found</Typography>
        </ListProducts>
      )}
      {totalPage > 1 && (
        <Paging>
          <Pagination
            count={totalPage}
            page={page}
            onChange={handlePageChange}
            color='primary'
            showFirstButton
            showLastButton
            size='large'
          />
        </Paging>
      )}
    </Box>
  );
};

export default ListProductElement;
