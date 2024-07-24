/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsUpdate } from "../../../common/redux/userSlice";
import {
  Address,
  Hr,
  styleAddress,
  styleButtonChangeAddress,
} from "../common/assets/address,style";
import { Box, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import UpdateProfileComponent from "../../../navigator/profile/components/updateProfile.component";

export const ShippingAddress = ({ userData, userId, accessToken }) => {
  const isUpdate = useSelector((state) => state.users.isUpdate);
  const dispatch = useDispatch();

  const handleChangeAddress = () => {
    dispatch(setIsUpdate(true));
  };

  return (
    <div>
      <Address py={1}>
        <Box >
          <Box sx={{ p: 1 }}>
            <Typography sx={styleAddress}>
              <LocationOnIcon />
              Địa chỉ nhận hàng
            </Typography>

            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              sx={{ px: 1 }}>
              {userData && (
                <Box>
                  <Typography component={"span"} style={{ fontWeight: "bold" }}>
                    {userData.username} | {userData.phone}
                  </Typography>
                  <Typography component={"span"} px={2}>
                    {userData.address}
                  </Typography>
                </Box>
              )}

              <Typography
                style={styleButtonChangeAddress}
                onClick={() => handleChangeAddress()}>
                Thay đổi
              </Typography>
            </Box>
          </Box>
          <Hr></Hr>
        </Box>
      </Address>
      {isUpdate && (
        <UpdateProfileComponent
          userData={userData}
          userId={userId}
          accessToken={accessToken}
        />
      )}
    </div>
  );
};

export default ShippingAddress;
