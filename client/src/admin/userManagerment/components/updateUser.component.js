/** @format */

import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAdminUpdate } from "../../../common/redux/userSlice";
import { style } from "../common/assets/modal.styles";
import { Footer, Header } from "../common/assets/update.styles";

const AdimUpdateUser = () => {
  const isAdminUpdate = useSelector((state) => state.users.isAdminUpdate);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setAdminUpdate(false));
  };

  return (
    <div>
      <Modal
        open={isAdminUpdate}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Header>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Sửa thông tin người dùng
            </Typography>
          </Header>

          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>

          <Divider />
          <Footer sx={{ py: 2 }}>
            <Button variant='contained' color='warning'>
              Sửa
            </Button>
            <Button variant='contained' style={{ backgroundColor: "gray" }}>
              Đóng
            </Button>
          </Footer>
        </Box>
      </Modal>
    </div>
  );
};
export default AdimUpdateUser;
