/** @format */

import {
  Box,
  Button,
  IconButton,
  Modal,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowCreate } from "../../../common/redux/productSlice";
import { style } from "../common/assets/modal.style";
import { useForm } from "react-hook-form";
import {
  Content,
  Footer,
  Header,
  Products,
} from "../common/assets/create.style";
import { useCreateProduct } from "../common/hook";
import {
  setErrorMessage,
  setSuccessMessage,
} from "../../../common/redux/userSlice";
import CloseIcon from "@mui/icons-material/Close";
import InfomationProduct from "../elements/add/infomationProduct.elment";
import AddConfig from "../elements/add/addConfig.element";

const CreateProductComponent = () => {
  const steps = ["Thông tin cơ bản", "Cấu hình máy"];
  const { register, handleSubmit, reset } = useForm();
  const [imageProduct, setImageProduct] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isAddNewBrand, setIsAddNewBrand] = useState(false);
  const [isAddNewType, setIsAddNewType] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const isShowCreate = useSelector((state) => state.products.isShowCreate);
  const dispatch = useDispatch();

  const createProduct = useCreateProduct();

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <InfomationProduct
            imageProduct={imageProduct}
            handleOnChangeProduct={handleOnChangeProduct}
            register={register}
            isAddNewBrand={isAddNewBrand}
            setIsAddNewBrand={setIsAddNewBrand}
            isAddNewType={isAddNewType}
            setIsAddNewType={setIsAddNewType}
          />
        );
      case 1:
        return <AddConfig register={register} />;
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

  const handleCreateProduct = (data) => {
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

    const newProduct = {
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
        aria-describedby='modal-modal-description'
        style={{ display: "block" }}>
        <Box sx={style}>
          <IconButton
            onClick={handleClose}
            style={{ position: "absolute", top: 10, right: 10 }}>
            <CloseIcon />
          </IconButton>

          <Products onSubmit={handleSubmit(handleCreateProduct)}>
            <Content>
              <Header>Thêm Sản Phẩm</Header>
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
                              ? handleSubmit(handleCreateProduct)
                              : handleNext
                          }>
                          {activeStep === steps.length - 1
                            ? "Thêm mới"
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

export default CreateProductComponent;
