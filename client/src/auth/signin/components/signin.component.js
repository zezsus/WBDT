/** @format */
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
import { useState } from "react";
import {
  FormLoginLeft,
  FormLoginRight,
} from "../../common/assets/signin.style";
import { useSignIn } from "../../common/hook/auth.hook";

const SignInComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const signIn = useSignIn();

  const handleSignIn = (data) => {
    const { email, password } = data;
    signIn.mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate("/");
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
      }
    );
  };
  return (
    <Div>
      <AuthForm onSubmit={handleSubmit(handleSignIn)}>
        <FormLoginLeft>
          <AuthHeader variant='h5'>Đăng nhập</AuthHeader>
          <Typography
            variant='body1'
            component={"div"}
            sx={{ textAlign: "center" }}>
            {`Nếu bạn chưa có tài khoản hãy `}
          </Typography>
          <Button
            variant='outlined'
            onClick={() => navigate("/sign-up")}
            sx={{ color: "white" }}>
            Đăng ký
          </Button>
        </FormLoginLeft>
        <FormLoginRight>
          <Box>
            {errorMsg && <Box style={styleError}>{errorMsg}</Box>}
            {successMsg && <Box style={styleSuccess}>{successMsg}</Box>}
          </Box>

          <AuthBody>
            <TextField
              type='email'
              variant='outlined'
              label='Email'
              size='small'
              fullWidth
              {...register("email")}
            />
            {showPassword ? (
              <TextField
                variant='outlined'
                label='Mật khẩu'
                size='small'
                fullWidth
                {...register("password")}
              />
            ) : (
              <TextField
                type='password'
                variant='outlined'
                label='Mật khẩu'
                size='small'
                fullWidth
                {...register("password")}
              />
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
            <Button
              type='submit'
              sx={{ width: 150 }}
              variant='contained'
              color='primary'>
              Đăng nhập
            </Button>
          </AuthFooter>
        </FormLoginRight>
      </AuthForm>
    </Div>
  );
};
export default SignInComponent;
