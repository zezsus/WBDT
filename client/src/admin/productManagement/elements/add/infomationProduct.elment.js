/** @format */

import {
  Box,
  Button,
  CardMedia,
  Input,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import {
  Body,
  ImageProduct,
  productImage,
  ProductInfo,
} from "../../common/assets/create.style";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  useGetBrandProduct,
  useGetTypeProduct,
} from "../../../../common/hook/product.hook";

const InfomationProduct = ({
  imageProduct,
  handleOnChangeProduct,
  register,
  isAddNewBrand,
  setIsAddNewBrand,
  isAddNewType,
  setIsAddNewType,
}) => {
  const newInputRef = useRef(null);

  const typeProduct = useGetTypeProduct();
  const brandProduct = useGetBrandProduct();

  useEffect(() => {
    if ((isAddNewType || isAddNewBrand) && newInputRef.current) {
      newInputRef.current.focus();
    }
  }, [isAddNewType, isAddNewBrand]);

  const handleAddNewBrand = () => {
    setIsAddNewBrand(true);
  };

  const handleAddNewType = () => {
    setIsAddNewType(true);
  };

  return (
    <div>
      <Body>
        <ImageProduct>
          <CardMedia
            component='img'
            style={productImage}
            image={imageProduct}
            alt='Vui lòng chọn hình ảnh sản phẩm'
          />
          <Button
            variant='contained'
            component='label'
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <CloudUploadIcon fontSize='large' style={{ paddingRight: 10 }} />
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
            id='outlined-select-currency'
            select
            label='Hãng sản xuất'
            sx={{ minWidth: 200 }}
            {...register("brand")}
            disabled={isAddNewBrand}>
            {brandProduct.data
              ?.filter((brand) => brand !== "All")
              .map((brand) => (
                <MenuItem
                  key={brand}
                  value={brand}
                  onClick={() => setIsAddNewBrand(false)}>
                  {brand}
                </MenuItem>
              ))}
            <MenuItem
              style={{ color: "blue", textTransform: "uppercase" }}
              onClick={handleAddNewBrand}>
              Thêm mới...
            </MenuItem>
          </TextField>
          {isAddNewBrand && (
            <Box
              style={{
                border: "1px solid gray",
                borderRadius: "5px",
                padding: "8px",
              }}>
              <TextField
                label='Hãng sản xuất mới'
                size='small'
                variant='outlined'
                {...register("brand")}
                fullWidth
                inputRef={newInputRef}
              />
              <Typography
                color={"gray"}
                textAlign={"end"}
                style={{ cursor: "pointer" }}
                onClick={() => setIsAddNewBrand(false)}>
                Đóng
              </Typography>
            </Box>
          )}

          <TextField
            id='outlined-select-currency'
            select
            label='Hệ điều hành'
            sx={{ minWidth: 200 }}
            {...register("type")}
            disabled={isAddNewType}>
            {typeProduct.data
              ?.filter((type) => type !== "All")
              .map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            <MenuItem
              style={{ color: "blue", textTransform: "uppercase" }}
              onClick={handleAddNewType}>
              Thêm mới...{" "}
            </MenuItem>
          </TextField>
          {isAddNewType && (
            <Box
              style={{
                border: "1px solid gray",
                borderRadius: "5px",
                padding: "8px",
              }}>
              <TextField
                label='Hệ điều hành mới'
                size='small'
                variant='outlined'
                {...register("type")}
                fullWidth
                inputRef={newInputRef}
              />
              <Typography
                color={"gray"}
                onClick={() => setIsAddNewType(false)}
                textAlign={"end"}
                style={{ cursor: "pointer" }}>
                Đóng
              </Typography>
            </Box>
          )}

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
    </div>
  );
};

export default InfomationProduct;
