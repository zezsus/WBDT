/** @format */

import { Avatar, Box, Button, Input, Modal, TextField } from "@mui/material";
import {
  avata,
  Body,
  Content,
  Footer,
  Header,
  Profile,
  UserAvatar,
  UserInfo,
} from "../common/assets/updateprofile.styles";
import SpinnerComponent from "../../../components/spinner.component";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrorMessage,
  setIsUpdate,
  setSuccessMessage,
} from "../../../common/redux/userSlice";
import { useForm } from "react-hook-form";
import { useUpdateUser } from "../../../common/hook/user.hook";
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { style } from "../../../admin/userManagerment/common/assets/modal.styles";

const UpdateProfileComponent = ({ userData, userId, accessToken }) => {
  const [avatarPreview, setAvatarPreview] = useState(userData.avatar || "");
  const dispatch = useDispatch();
  const isUpdate = useSelector((state) => state.users.isUpdate);

  const { register, handleSubmit } = useForm({
    defaultValues: userData,
  });

  const updateUser = useUpdateUser();

  const handleSave = (data) => {
    if (!userId || !accessToken) {
      return;
    }

    const userData = { ...data, avatar: avatarPreview };

    updateUser.mutate(
      { userId, userData, accessToken },
      {
        onSuccess: () => {
          dispatch(setSuccessMessage("Cập nhật thông tin thành công"));
          dispatch(setIsUpdate(false));
        },
        onError: (error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            dispatch(setErrorMessage(error.response.data.message));
            dispatch(setIsUpdate(false));
          }
        },
      }
    );
  };

  const handleOnChangeAvatar = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const avatar = reader.result;
        setAvatarPreview(avatar);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    dispatch(setIsUpdate(false));
  };

  if (updateUser.isLoading) {
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

  if (updateUser.error) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          color: "red",
        }}>
        Lỗi: {updateUser.error.message}
      </div>
    );
  }

  return (
    <Modal
      open={isUpdate}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <Box sx={style}>
        <Profile onSubmit={handleSubmit(handleSave)}>
          {userData && (
            <Content>
              <Header>Cập nhật thông tin</Header>
              <Body>
                <UserAvatar>
                  <Avatar alt='Avatar' src={avatarPreview} style={avata} />
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
                      onChange={handleOnChangeAvatar}
                      style={{ display: "none" }}
                    />
                  </Button>
                </UserAvatar>

                <UserInfo>
                  <TextField
                    label='Họ tên'
                    variant='outlined'
                    size='small'
                    {...register("username")}
                    fullWidth
                  />
                  <TextField
                    label='Số điện thoại'
                    variant='outlined'
                    size='small'
                    {...register("phone")}
                    fullWidth
                  />
                  <TextField
                    label='Địa chỉ'
                    size='small'
                    variant='outlined'
                    {...register("address")}
                    fullWidth
                  />
                  <TextField
                    label='Email'
                    size='small'
                    variant='outlined'
                    {...register("email")}
                    disabled
                    fullWidth
                  />
                </UserInfo>
              </Body>
              <Footer>
                <Button
                  type='submit'
                  variant='contained'
                  style={{ width: "max-content" }}
                  color='warning'>
                  Lưu
                </Button>
                <Button
                  variant='contained'
                  style={{ width: "max-content", backgroundColor: "gray" }}
                  onClick={handleClose}>
                  Quay Lại
                </Button>
              </Footer>
            </Content>
          )}
        </Profile>
      </Box>
    </Modal>
  );
};

export default UpdateProfileComponent;
