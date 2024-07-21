/** @format */

import { Box, Button, CardMedia, Input, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowCreate } from "../../../common/redux/productSlice";
import { style } from "../common/assets/modal.style";
import { useForm } from "react-hook-form";
import {
  Body,
  Content,
  Footer,
  Header,
  ImageProduct,
  productImage,
  ProductInfo,
  Products,
} from "../common/assets/create.style";
import MessageComponent from "../../../components/message.component";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useCreateProduct } from "../common/hook";
import {
  setErrorMessage,
  setSuccessMessage,
} from "../../../common/redux/userSlice";

const CreateProductComponent = () => {
  const { register, handleSubmit, reset } = useForm();
  const [imageProduct, setImageProduct] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const isShowCreate = useSelector((state) => state.products.isShowCreate);
  const dispatch = useDispatch();

  const createProduct = useCreateProduct();

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  const handleCreateProduct = (data) => {
    const newProduct = { ...data, image: imageProduct };
    createProduct.mutate(
      { accessToken, newProduct },
      {
        onSuccess: (data) => {
          dispatch(setShowCreate(false));
          dispatch(setSuccessMessage(data.message));
          reset();
        },
      },
      {
        onError: (error) => {
          if (error.response.data.message) {
            dispatch(setErrorMessage(error.response.data.message));
          } else {
            dispatch(setErrorMessage("Đã xảy ra lỗi khi cập nhật thông tin"));
          }
        },
      }
    );
  };
  const handleClose = () => {
    dispatch(setShowCreate(false));
  };

  const handleOnChangeProduct = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const product = reader.result;
        setImageProduct(product);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box>
      <Modal
        open={isShowCreate}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Products onSubmit={handleSubmit(handleCreateProduct)}>
            <Content>
              <Header>Thêm Sản Phẩm</Header>
              <MessageComponent />
              <Body>
                <ImageProduct>
                  <CardMedia
                    component='img'
                    style={productImage}
                    image={imageProduct}
                    alt='Product Image'
                  />
                  <Button
                    variant='contained'
                    component='label'
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    <CloudUploadIcon
                      fontSize='large'
                      style={{ paddingRight: 10 }}
                    />
                    Thay đổi
                    <Input
                      type='file'
                      accept='image/*'
                      hidden
                      onChange={handleOnChangeProduct}
                      style={{ display: "none" }}
                    />
                  </Button>
                </ImageProduct>

                <ProductInfo>
                  <TextField
                    label='Tên sản phẩm'
                    variant='outlined'
                    size='small'
                    {...register("name")}
                    fullWidth
                  />
                  <TextField
                    label='Giá'
                    variant='outlined'
                    size='small'
                    {...register("price")}
                    fullWidth
                  />
                  <TextField
                    label='Hãng sản xuất'
                    size='small'
                    variant='outlined'
                    {...register("brand")}
                    fullWidth
                  />
                  <TextField
                    label='Hệ điều hành'
                    size='small'
                    variant='outlined'
                    {...register("type")}
                    fullWidth
                  />
                  <TextField
                    label='Đánh giá'
                    variant='outlined'
                    size='small'
                    {...register("rating")}
                    fullWidth
                  />
                  <TextField
                    label='Số lượng trong kho'
                    variant='outlined'
                    size='small'
                    {...register("countInStock")}
                    fullWidth
                  />
                  <TextField
                    id='outlined-multiline-static'
                    label='Miêu tả'
                    size='small'
                    variant='outlined'
                    multiline
                    rows={3}
                    {...register("description")}
                    fullWidth
                  />
                </ProductInfo>
              </Body>
              <Footer>
                <Button
                  type='submit'
                  variant='contained'
                  style={{ width: "max-content" }}>
                  Thêm mới
                </Button>
                <Button
                  variant='contained'
                  style={{ width: "max-content", backgroundColor: "gray" }}
                  onClick={handleClose}>
                  Quay Lại
                </Button>
              </Footer>
            </Content>
          </Products>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateProductComponent;
