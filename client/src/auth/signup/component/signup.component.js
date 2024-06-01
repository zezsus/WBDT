/** @format */

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  AuthBody,
  AuthFooter,
  AuthForm,
  AuthHeader,
  Div,
  styleError,
  styleSuccess,
} from "../../common/assets/auth.style";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import {
  SignUpFormLeft,
  SignUpFormRight,
  stylePassword,
} from "../../common/assets/signup.style";
import { usePostNewtUser } from "../../common/hook/auth.hook";

const SignUpComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const createUser = usePostNewtUser();

  const handleSignUp = (data) => {
    const { username, email, password, comfirmPassword } = data;
    const newUser = {
      username,
      email,
      password,
      comfirmPassword,
    };
    createUser.mutate(newUser, {
      onSuccess: () => {
        reset();
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
    });
  };
  useEffect(() => {
    if (createUser.data) {
      setSuccessMsg(createUser.data.message);
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  }, [createUser.data]);

  return (
    <Div>
      <AuthForm onSubmit={handleSubmit(handleSignUp)}>
        <SignUpFormLeft>
          <Box>
            {errorMsg && <Box style={styleError}>{errorMsg}</Box>}
            {successMsg && <Box style={styleSuccess}>{successMsg}</Box>}
          </Box>
          <AuthBody>
            <TextField
              variant='outlined'
              label='Tên người dùng'
              size='small'
              fullWidth
              {...register("username")}
            />
            <TextField
              type='email'
              variant='outlined'
              label='Email'
              size='small'
              fullWidth
              {...register("email")}
            />
            {showPassword ? (
              <Box sx={stylePassword}>
                <TextField
                  variant='outlined'
                  label='Mật khẩu'
                  size='small'
                  fullWidth
                  {...register("password")}
                />
                <TextField
                  variant='outlined'
                  label='Nhập lại mật khẩu'
                  size='small'
                  fullWidth
                  {...register("comfirmPassword")}
                />
              </Box>
            ) : (
              <Box sx={stylePassword}>
                <TextField
                  type='password'
                  variant='outlined'
                  label='Mật khẩu'
                  size='small'
                  fullWidth
                  {...register("password")}
                />
                <TextField
                  type='password'
                  variant='outlined'
                  label='Nhập lại mật khẩu'
                  size='small'
                  fullWidth
                  {...register("comfirmPassword")}
                />
              </Box>
            )}
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox onClick={() => setShowPassword(!showPassword)} />
                }
                label='Hiển thị mật khẩu'
              />
            </FormGroup>
          </AuthBody>
          <AuthFooter>
            <Button type='submit' variant='contained' color='primary'>
              Đăng ký
            </Button>
          </AuthFooter>
        </SignUpFormLeft>

        <SignUpFormRight>
          <AuthHeader variant='h5'>Đăng ký</AuthHeader>
          <Typography variant='body1' sx={{ textAlign: "center" }}>
            {`Nếu bạn đã có tài khoản hãy `}
          </Typography>
          <Button
            variant='outlined'
            sx={{ color: "#ffffff" }}
            onClick={() => navigate("/sign-in")}>
            Đăng nhập
          </Button>
        </SignUpFormRight>
      </AuthForm>
    </Div>
  );
};
export default SignUpComponent;
