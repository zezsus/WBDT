/** @format */
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AuthBody,
  AuthFooter,
  AuthForm,
  AuthHeader,
  Div,
} from "../../common/assets/auth.style";
import {
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
import MessageComponent from "../../../components/message.component";
import { useDispatch } from "react-redux";
import {
  setErrorMessage,
  setShowMessage,
  setSuccessMessage,
} from "../../../common/redux/userSlice";

const SignInComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const signIn = useSignIn();

  const handleSignIn = (data) => {
    const { email, password } = data;
    signIn.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          if (!localStorage.getItem("accessToken")) {
            localStorage.setItem("accessToken", data?.accessToken);
          }
          location?.state ? navigate(location?.state) : navigate("/");
          dispatch(setSuccessMessage(""));
          dispatch(setErrorMessage(""));
          dispatch(setSuccessMessage(data.message));
          dispatch(setShowMessage(true));
          setTimeout(() => {
            dispatch(setSuccessMessage(""));
          }, 2000);
          reset();
        },
        onError: (error) => {
          dispatch(setSuccessMessage(""));
          dispatch(setErrorMessage(""));
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            dispatch(setErrorMessage(error.response.data.message));
            dispatch(setShowMessage(true));
            setTimeout(() => {
              dispatch(setErrorMessage(""));
            }, 3000);
          }
        },
      }
    );
  };

  return (
    <Div>
      <MessageComponent />
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
