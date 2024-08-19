/** @format */

import {
  Box,
  Button,
  Modal,
  Step,
  StepLabel,
  Stepper,
  Typography,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowUpdate } from "../../../common/redux/productSlice";
import { style } from "../common/assets/modal.style";
import { useForm } from "react-hook-form";
import { useUpdateProduct } from "../common/hook";
import {
  setErrorMessage,
  setSuccessMessage,
} from "../../../common/redux/userSlice";
import InformationUpdateProduct from "../elements/update/inforProduct";
import UpdateConfig from "../elements/update/updateConfig";
import {
  Content,
  Footer,
  Header,
  Products,
} from "../common/assets/create.style";
import CloseIcon from "@mui/icons-material/Close";

const UpdateProductComponent = ({ productUpdate, accessToken }) => {
  const steps = ["Thông tin cơ bản", "Cấu hình máy"];
  const { register, handleSubmit } = useForm({ defaultValues: productUpdate });
  const [imageProduct, setImageProduct] = useState(productUpdate.image || null);
  const [isAddNewBrand, setIsAddNewBrand] = useState(false);
  const [isAddNewType, setIsAddNewType] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const isShowUpdate = useSelector((state) => state.products.isShowUpdate);
  const dispatch = useDispatch();

  const updateProduct = useUpdateProduct();

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            {imageProduct && (
              <InformationUpdateProduct
                imageProduct={imageProduct}
                handleOnChangeProduct={handleOnChangeProduct}
                register={register}
                isAddNewBrand={isAddNewBrand}
                setIsAddNewBrand={setIsAddNewBrand}
                isAddNewType={isAddNewType}
                setIsAddNewType={setIsAddNewType}
                productUpdate={productUpdate}
              />
            )}
          </>
        );
      case 1:
        return (
          <UpdateConfig register={register} productUpdate={productUpdate} />
        );
      default:
        return "Unknown step";
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleUpdateProduct = (data) => {
    const {
      screen,
      system,
      frontCamera,
      rearCamera,
      chip,
      ram,
      rom,
      sim,
      battery,
      ...restData
    } = data;

    const dataUpdate = {
      ...restData,
      image: imageProduct,
      configuration: {
        screen: data.screen,
        system: data.system,
        frontCamera: data.frontCamera,
        rearCamera: data.rearCamera,
        chip: data.chip,
        ram: data.ram,
        rom: data.rom,
        sim: data.sim,
        battery: data.battery,
      },
    };
    const id = productUpdate?._id;
    updateProduct.mutate(
      { id, accessToken, dataUpdate },
      {
        onSuccess: (data) => {
          dispatch(setShowUpdate(false));
          dispatch(setSuccessMessage(data.message));
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
    dispatch(setShowUpdate(false));
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
        open={isShowUpdate}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <IconButton
            onClick={handleClose}
            style={{ position: "absolute", top: 10, right: 10 }}>
            <CloseIcon />
          </IconButton>
          <Products onSubmit={handleSubmit(handleUpdateProduct)}>
            <Content>
              <Header>Cập nhật thông tin</Header>
              <Box>
                <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => (
                    <Step key={index} sx={{ pb: 2 }}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <Box>
                  {activeStep === steps.length ? (
                    <Box>
                      <Typography>Hoàn thành</Typography>
                    </Box>
                  ) : (
                    <Box>
                      {getStepContent(activeStep)}
                      <Footer>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}>
                          Quay lại
                        </Button>
                        <Button
                          variant='contained'
                          onClick={
                            activeStep === steps.length - 1
                              ? handleSubmit(handleUpdateProduct)
                              : handleNext
                          }>
                          {activeStep === steps.length - 1
                            ? "Cập nhật"
                            : "Tiếp theo"}
                        </Button>
                      </Footer>
                    </Box>
                  )}
                </Box>
              </Box>
            </Content>
          </Products>
        </Box>
      </Modal>
    </Box>
  );
};

export default UpdateProductComponent;
