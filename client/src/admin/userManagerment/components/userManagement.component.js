/** @format */

import {
  Avatar,
  Box,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import SpinnerComponent from "../../../components/spinner.component";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setAdminDelete, setIsUpdate } from "../../../common/redux/userSlice";
import AdimDeleteUser from "./deleteUser.component";
import { useGetALlUser } from "../../common/hook/user.hook";
import MessageComponent from "../../../components/message.component";
import UpdateUserComponent from "../../../navigator/profile/components/updateProfile.component";
import { jwtDecode } from "jwt-decode";

const UserManagementComponent = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [userUpdateId, setUserUpdateId] = useState(null);
  const [userDeleteId, setUserDeleteId] = useState(null);
  const [userUpdate, setUserUpdate] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [userId, setUserId] = useState(null);

  const columns = [
    { id: "username", label: "Họ Tên", minWidth: 100 },
    { id: "email", label: "Email", minWidth: 100 },
    { id: "phone", label: "Số Điện Thoại", minWidth: 80 },
    {
      id: "address",
      label: "Địa Chỉ",
      minWidth: 200,
    },
    {
      id: "avatar",
      label: "Ảnh đại diện",
      minWidth: 80,
    },
    {
      id: "action",
      label: "",
      minWidth: 80,
    },
  ];

  const dispatch = useDispatch();
  const isUpdate = useSelector((state) => state.users.isUpdate);
  const isAdminDelete = useSelector((state) => state.users.isAdminDelete);
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

  const { data, isLoading } = useGetALlUser(page, accessToken);

  useEffect(() => {
    if (data?.totalPage) {
      setTotalPage(data?.totalPage);
    }
  }, [data]);

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  const handleAdminUpdate = (user) => {
    if (user && user.phone) {
      setUserUpdate({ ...user, phone: "0" + user.phone });
    } else {
      setUserUpdate(user);
    }

    dispatch(setIsUpdate(true));
    setUserUpdateId(user._id);
  };

  const handleAdminDelete = (id) => {
    dispatch(setAdminDelete(true));
    setUserDeleteId(id);
  };

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

  return (
    <Box>
      {!isUpdate && <MessageComponent />}
      <Box sx={{ p: "10px" }}></Box>
      <Paper
        sx={{ width: "100%", overflow: "hidden", boxShadow: "1px 1px 10px" }}>
        <TableContainer sx={{ maxHeight: 450 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={"center"}
                    style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {data?.data && data?.data?.length > 1 ? (
              <TableBody>
                {data?.data?.map((user) => {
                  if (user._id !== userId) {
                    return (
                      <TableRow
                        hover
                        role='checkbox'
                        tabIndex={-1}
                        key={user._id}>
                        {columns.map((column) => {
                          const value = user[column.id];
                          return (
                            <TableCell key={column.id} align={"center"}>
                              {column.id === "avatar" ? (
                                <Avatar
                                  alt='Avatar'
                                  src={value}
                                  style={{ width: "50px", height: "50px" }}
                                />
                              ) : column.id === "action" ? (
                                <Box
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                  }}>
                                  <Tooltip
                                    title='Sửa thông tin người dùng'
                                    arrow>
                                    <EditCalendarOutlinedIcon
                                      color='warning'
                                      style={{ cursor: "pointer" }}
                                      onClick={() => handleAdminUpdate(user)}
                                    />
                                  </Tooltip>
                                  <Tooltip
                                    title='Xóa thông tin người dùng'
                                    arrow>
                                    <DeleteForeverOutlinedIcon
                                      color='error'
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        handleAdminDelete(user._id)
                                      }
                                    />
                                  </Tooltip>
                                </Box>
                              ) : column.id === "phone" && value ? (
                                <Typography>0{value}</Typography>
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            ) : (
              <TableBody>
                <TableCell
                  colSpan={columns.length}
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    fontSize: "20px",
                  }}>
                  Không có người dùng nào khác
                </TableCell>
              </TableBody>
            )}
          </Table>
        </TableContainer>

        {isUpdate && (
          <UpdateUserComponent
            userId={userUpdateId}
            accessToken={accessToken}
            userData={userUpdate}
          />
        )}
        {isAdminDelete && (
          <AdimDeleteUser userId={userDeleteId} accessToken={accessToken} />
        )}
      </Paper>
      {totalPage > 1 && (
        <Box
          style={{ display: "flex", justifyContent: "center" }}
          sx={{ mt: 2 }}>
          <Pagination
            count={totalPage}
            page={page}
            onChange={handlePageChange}
            color='primary'
            showFirstButton
            showLastButton
            size='large'
          />
        </Box>
      )}
    </Box>
  );
};

export default UserManagementComponent;
