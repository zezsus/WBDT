/** @format */

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Avatar,
  Box,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchElement from "../elements/search.element";
import CartElement from "../elements/cart.element";
import { NavBody, NavFooter } from "../common/assets/navbar.style";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useGetDetailUser } from "../../common/hook/navigator.hook";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

const NavbarComponent = () => {
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [userMenu, setUserMenu] = useState(null);
  const open = Boolean(userMenu);
  const navigate = useNavigate();

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
  const { data } = useGetDetailUser(userId, accessToken);

  const handleHome = () => {
    navigate("/");
    window.location.reload();
  };

  const handleClickMenu = (e) => {
    setUserMenu(e.currentTarget);
  };

  const handleClickInfoUser = () => {
    navigate("/profile");
    handleCloseMenu();
  };

  const handleClickSystemManager = () => {
    navigate("/system-management");
    handleCloseMenu();
  };

  const handleCloseMenu = () => {
    setUserMenu(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/sign-in");
  };

  return (
    <AppBar position='static'>
      <Container>
        <Toolbar sx={{ display: "flex", gap: "2rem" }}>
          <Typography
            variant='h6'
            component='div'
            sx={{ cursor: "pointer" }}
            onClick={handleHome}>
            ManhSangShop
          </Typography>
          <NavBody>
            <SearchElement />
            <FilterAltOutlinedIcon />
            <CartElement />
          </NavBody>
          <NavFooter sx={{ cursor: "pointer" }}>
            <Tooltip title='Thông tin cá nhân' arrow>
              <Avatar
                alt='avata'
                src={data?.avatar}
                onClick={() => navigate("/profile")}
              />
            </Tooltip>
            <Box>
              <Typography onClick={handleClickMenu}>
                {data?.username}
              </Typography>
              {data?.isAdmin ? (
                <Menu
                  id='basic-menu'
                  anchorEl={userMenu}
                  open={open}
                  onClose={handleCloseMenu}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}>
                  <MenuItem onClick={handleClickInfoUser}>
                    Thông tin cá nhân
                  </MenuItem>
                  <MenuItem onClick={handleClickSystemManager}>
                    Quản lý hệ thống
                  </MenuItem>
                  <MenuItem>Đơn hàng</MenuItem>
                  <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                </Menu>
              ) : (
                <Menu
                  id='basic-menu'
                  anchorEl={userMenu}
                  open={open}
                  onClose={handleCloseMenu}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}>
                  <MenuItem onClick={handleClickInfoUser}>
                    Thông tin cá nhân
                  </MenuItem>
                  <MenuItem>Đơn hàng</MenuItem>
                  <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                </Menu>
              )}
            </Box>
          </NavFooter>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavbarComponent;
