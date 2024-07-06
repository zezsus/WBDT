/** @format */

import { Avatar, Box, Button, Typography } from "@mui/material";
import {
  avata,
  Body,
  Content,
  Footer,
  Header,
  Profile,
  UserAvatar,
  UserInfo,
} from "../common/assets/profile.styles";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import { getDetailUser } from "../../common/services/navigator.service";
import SpinnerComponent from "../../../components/spinner.component";
import { useDispatch, useSelector } from "react-redux";
import { setIsUpdate } from "../../../common/redux/userSlice";
import UpdateProfileComponent from "./updateProfile.component";

const ProfileComponent = () => {
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const dispatch = useDispatch();
  const isUpdate = useSelector((state) => state.users.isUpdate);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      const decoded = jwtDecode(storedToken);
      if (decoded?.userId) {
        setUserId(decoded.userId);
        setAccessToken(storedToken);
      }
    }
  }, []);

  const handleUpdate = () => {
    dispatch(setIsUpdate(true));
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["userDetail", userId],
    queryFn: () => getDetailUser(userId, accessToken),
  });

  if (isLoading) {
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

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          color: "red",
        }}>
        Lỗi: {error.message}
      </div>
    );
  }

  return (
    <Box>
      {!isUpdate ? (
        <Profile>
          {data && (
            <Content>
              <Header>Thông tin cá nhân</Header>

              <Body>
                <UserAvatar>
                  <Avatar
                    alt='Avatar'
                    src={data.avatar && data.avatar}
                    style={avata}
                  />
                </UserAvatar>

                <UserInfo>
                  <Typography>
                    <span style={{ fontWeight: "bold" }}>Họ tên: </span>
                    {data.username}
                  </Typography>
                  <Typography>
                    <span style={{ fontWeight: "bold" }}>Số điện thoại: </span>
                    {data.phone}
                  </Typography>
                  <Typography>
                    <span style={{ fontWeight: "bold" }}>Địa chỉ: </span>
                    {data.address}
                  </Typography>
                  <Typography>
                    <span style={{ fontWeight: "bold" }}>Email: </span>
                    {data.email}
                  </Typography>
                </UserInfo>
              </Body>

              <Footer>
                <Button
                  variant='contained'
                  style={{ width: "max-content" }}
                  onClick={handleUpdate}>
                  Thay đổi
                </Button>
              </Footer>
            </Content>
          )}
        </Profile>
      ) : (
        <UpdateProfileComponent
          userData={data}
          userId={userId}
          accessToken={accessToken}
        />
      )}
    </Box>
  );
};

export default ProfileComponent;
