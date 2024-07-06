/** @format */

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Avatar,
  Box,
} from "@mui/material";
import SearchElement from "../elements/search.element";
import CartElement from "../elements/cart.element";
import { NavBody, NavFooter } from "../common/assets/navbar.style";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const NavbarComponent = () => {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      if (decoded?.userId) {
        setUserId(decoded.userId);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/sign-in");
  };
  const navigate = useNavigate();
  return (
    <AppBar position='static'>
      <Container>
        <Toolbar sx={{ display: "flex", gap: "2rem" }}>
          <Typography
            variant='h6'
            component='div'
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}>
            ManhSangShop
          </Typography>
          <NavBody>
            <SearchElement />
            <CartElement />
          </NavBody>
          <NavFooter sx={{ cursor: "pointer" }}>
            <Avatar
              alt='avata'
              src='/static/images/avatar/1.jpg'
              onClick={() => navigate(`/profile/${userId}`)}
            />
            <Box onClick={handleLogout}>usermenu</Box>
          </NavFooter>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavbarComponent;
