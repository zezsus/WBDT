/** @format */

import { Avatar, Box, Button, Input, TextField } from "@mui/material";
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
import { useDispatch } from "react-redux";
import { setIsUpdate } from "../../../common/redux/userSlice";
import { useForm } from "react-hook-form";
import { useUpdateUser } from "../../../common/hook/user.hook";
import {
  styleError,
  styleSuccess,
} from "../../../auth/common/assets/auth.style";
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UpdateProfileComponent = ({ userData, userId, accessToken }) => {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(userData.avatar || "");

  const dispatch = useDispatch();

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
          setSuccessMsg("Cập nhật thông tin thành công");
          setTimeout(() => {
            setSuccessMsg("");
            dispatch(setIsUpdate(false));
          }, 3000);
        },
        onError: (error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            setErrorMsg(error.response.data.message);
            setTimeout(() => setErrorMsg(""), 3000);
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
    <Profile onSubmit={handleSubmit(handleSave)}>
      <Box>
        {errorMsg && <Box style={styleError}>{errorMsg}</Box>}
        {successMsg && <Box style={styleSuccess}>{successMsg}</Box>}
      </Box>
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
              style={{ width: "max-content", color: "white" }}
              color='secondary'
              onClick={handleClose}>
              Quay Lại
            </Button>
          </Footer>
        </Content>
      )}
    </Profile>
  );
};

export default UpdateProfileComponent;
