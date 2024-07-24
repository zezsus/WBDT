/** @format */

import { Typography } from "@mui/material";
import {
  SystemManagement,
  SystemManagementLeft,
  SystemManagementRight,
} from "../common/assets/systemManagement.style";
import UserManagementComponent from "../userManagerment/components/userManagement.component";
import ProductManagementComponent from "../productManagement/components/productManagement.component";
import OrderManagementComponent from "../orderManagement/components/orderManagement.component";
import { useState } from "react";

const SystemManagementCompoent = () => {
  const items = [
    { key: "user", name: "Quản lý người dùng" },
    { key: "product", name: "Quản lý sản phẩm" },
    { key: "order", name: "Quản lý đơn hàng" },
  ];

  const [keySelected, setKeySelected] = useState(null);
  const handleOnClick = (key) => {
    setKeySelected(key);
  };
  const renderPage = (key) => {
    switch (key) {
      case "user":
        return <UserManagementComponent />;
      case "product":
        return <ProductManagementComponent />;
      case "order":
        return <OrderManagementComponent />;
      default:
        return <UserManagementComponent />;
    }
  };
  return (
    <SystemManagement>
      <SystemManagementLeft>
        {items.map((item) => {
          return (
            <Typography
              key={item.key}
              onClick={() => handleOnClick(item.key)}
              style={{ cursor: "pointer", padding: "10px" }}>
              {item.name}
            </Typography>
          );
        })}
      </SystemManagementLeft>
      <SystemManagementRight>{renderPage(keySelected)}</SystemManagementRight>
    </SystemManagement>
  );
};
export default SystemManagementCompoent;
