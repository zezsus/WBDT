/** @format */

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

export const Configuration = ({ configData }) => {
  const data = [
    { label: "Màn hình", value: configData?.configuration?.screen },
    { label: "Hệ điều hành", value: configData?.configuration?.system },
    { label: "Camera sau", value: configData?.configuration?.rearCamera },
    { label: "Camera trước", value: configData?.configuration?.frontCamera },
    { label: "Chip", value: configData?.configuration?.chip },
    { label: "RAM", value: configData?.configuration?.ram },
    { label: "Dung lượng lưu trữ", value: configData?.configuration?.rom },
    { label: "SIM", value: configData?.configuration?.sim },
    { label: "Pin, Sạc", value: configData?.configuration?.battery },
    { label: "Hãng", value: configData?.brand },
  ];

  return (
    <div>
      <Typography style={{ fontWeight: "bold", paddingBottom: "20px" }}>
        Cấu hình Điện thoại {configData?.name}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.label}>
                <TableCell style={{ fontWeight: "bold" }}>
                  {item.label}
                </TableCell>
                <TableCell align='right'>{item.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Configuration;
