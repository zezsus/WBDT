/** @format */

import {
  Avatar,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
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

const UserManagementComponent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [accessToken, setAccessToken] = useState(null);
  const [userUpdateId, setUserUpdateId] = useState(null);
  const [userDeleteId, setUserDeleteId] = useState(null);
  const [userUpdate, setUserUpdate] = useState(null);

  const columns = [
    { id: "username", label: "Họ Tên", minWidth: 100 },
    { id: "email", label: "Email", minWidth: 100 },
    {
      id: "phone",
      label: "Số Điện Thoại",
      minWidth: 80,
    },
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
  const successMessage = useSelector((state) => state.users.successMessage);
  const errorMessage = useSelector((state) => state.users.errorMessage);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, [successMessage, errorMessage, dispatch]);

  const { data, isLoading } = useGetALlUser(accessToken);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAdminUpdate = (user) => {
    setUserUpdate(user);
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

  const paginatedData = data?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper
      sx={{ width: "100%", overflow: "hidden", boxShadow: "1px 1px 10px" }}>
      <MessageComponent />
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
          <TableBody>
            {paginatedData?.map((user) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={user.id}>
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
                            <EditCalendarOutlinedIcon
                              color='warning'
                              style={{ cursor: "pointer" }}
                              onClick={() => handleAdminUpdate(user)}
                            />

                            <DeleteForeverOutlinedIcon
                              color='error'
                              style={{ cursor: "pointer" }}
                              onClick={() => handleAdminDelete(user._id)}
                            />
                          </Box>
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15, 20]}
        component='div'
        count={data?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
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
  );
};

export default UserManagementComponent;
