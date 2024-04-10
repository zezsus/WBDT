/** @format */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  AuthBody,
  AuthFooter,
  AuthForm,
  AuthHeader,
  Div,
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
import { SignUpFormLeft, SignUpFormRight, stylePassword } from "../../common/assets/signup.style";

const SignUpComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleSignUp = () => {
    console.log("signup");
  };
  return (
    <Div>
      {/* <ToastMessageComponent /> */}
      <AuthForm onSubmit={handleSubmit(handleSignUp)}>
        <SignUpFormLeft>
          <AuthBody>
            <TextField
              variant='outlined'
              label='UserName'
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
                  label='Password'
                  size='small'
                  fullWidth
                  {...register("password")}
                />
                <TextField
                  variant='outlined'
                  label='Comfirm Password'
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
                  label='Password'
                  size='small'
                  fullWidth
                  {...register("password")}
                />
                <TextField
                  type='password'
                  variant='outlined'
                  label='Comfirm Password'
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
                label='Show Password'
              />
            </FormGroup>
          </AuthBody>
          <AuthFooter>
            <Button type='submit' variant='contained' color='primary'>
              Sign Up
            </Button>
          </AuthFooter>
        </SignUpFormLeft>

        <SignUpFormRight>
          <AuthHeader variant='h5'>Sign Up</AuthHeader>
          <Typography variant='body1' sx={{ textAlign: "center" }}>
            {`SignIn if you are already a member`}
          </Typography>
          <Button
            variant='outlined'
            sx={{ color: "#ffffff" }}
            onClick={() => navigate("/sign-in")}>
            Sign In
          </Button>
        </SignUpFormRight>
      </AuthForm>
    </Div>
  );
};
export default SignUpComponent;
