/** @format */
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
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import {  useState } from "react";
import {
  FormLoginLeft,
  FormLoginRight,
} from "../../common/assets/signin.style";

const SignInComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/");
  };
  return (
    <Div>
      {/* <ToastMessageComponent /> */}
      <AuthForm onSubmit={handleSubmit(handleSignIn)}>
        <FormLoginLeft>
          <AuthHeader variant='h5'>Sign In</AuthHeader>
          <Typography
            variant='body1'
            component={"div"}
            sx={{ textAlign: "center" }}>
            {`SignUp an account if you are a new member`}
          </Typography>
          <Button
            variant='outlined'
            onClick={() => navigate("/sign-up")}
            sx={{ color: "white" }}>
            Sign Up
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
                label='Password'
                size='small'
                fullWidth
                {...register("password")}
              />
            ) : (
              <TextField
                type='password'
                variant='outlined'
                label='Password'
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
                label='Show Password'
              />
            </FormGroup>
          </AuthBody>
          <AuthFooter>
            <Button
              type='submit'
              sx={{ width: 150 }}
              variant='contained'
              color='primary'>
              sign in
            </Button>
          </AuthFooter>
        </FormLoginRight>
      </AuthForm>
    </Div>
  );
};
export default SignInComponent;
