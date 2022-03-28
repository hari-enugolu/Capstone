// Now we need a library for Form validation, so we’re gonna add react-validation library to our project.
//this page has form with username and password
// – We’re gonna verify them as required field.
// – If the verification is ok, we call AuthService.login() method, then direct user to Profile page: props.history.push("/profile");,
//  or show message with response error.

// import React, { useState, useRef } from "react";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
// import AuthService from "../services/auth.service";
// const required = (value) => {
//   if (!value) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This field is required!
//       </div>
//     );
//   }
// };
// const Login = (props) => {
//   const form = useRef();
//   const checkBtn = useRef();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const onChangeUsername = (e) => {
//     const username = e.target.value;
//     setUsername(username);
//   };
//   const onChangePassword = (e) => {
//     const password = e.target.value;
//     setPassword(password);
//   };
//   const handleLogin = (e) => {
//     e.preventDefault();
//     setMessage("");
//     setLoading(true);
//     form.current.validateAll();
//     if (checkBtn.current.context._errors.length === 0) {
//       AuthService.login(username, password).then(
//         () => {
//           props.history.push("/profile");
//           window.location.reload();
//         },
//         (error) => {
//           const resMessage =
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString();
//           setLoading(false);
//           setMessage(resMessage);
//         }
//       );
//     } else {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="col-md-12">
//       <div className="card card-container">
//         <img
//           src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
//           alt="profile-img"
//           className="profile-img-card"
//         />
//         <Form onSubmit={handleLogin} ref={form}>
//           <div className="form-group">
//             <label htmlFor="username">Username</label>
//             <Input
//               type="text"
//               className="form-control"
//               name="username"
//               value={username}
//               onChange={onChangeUsername}
//               validations={[required]}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <Input
//               type="password"
//               className="form-control"
//               name="password"
//               value={password}
//               onChange={onChangePassword}
//               validations={[required]}
//             />
//           </div>
//           <div className="form-group">
//             <button className="btn btn-primary btn-block" disabled={loading}>
//               {loading && (
//                 <span className="spinner-border spinner-border-sm"></span>
//               )}
//               <span>Login</span>
//             </button>
//           </div>
//           {message && (
//             <div className="form-group">
//               <div className="alert alert-danger" role="alert">
//                 {message}
//               </div>
//             </div>
//           )}
//           <CheckButton style={{ display: "none" }} ref={checkBtn} />
//         </Form>
//       </div>
//     </div>
//   );
// };
// export default Login;

import React from "react";
import LockSharpIcon from "@mui/icons-material/LockSharp";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  Avatar,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

function Login({ handleChange }) {
  const paperStyle = {
    padding: 20,
    height: "56.5vh",
    width: 300,
    margin: "0 auto",
  };

  const avatarStyle = { backgroundColor: "darkcyan" };
  const btnstyle = { margin: "8px 0" }; //which helped sign in button to come down a little and aligned perfectly
  const initialValues = {
    username: "",
    password: "",
    remember: false,
  };
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });
  const onSubmit = (values, props) => {
    console.log(values);
    console.log(props);
    AuthService.login(values.username, values.password).then(() => {
      console.log("logged in");

      props.resetForm();
      props.setSubmitting(false);
      navigate("/home");
    });
  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockSharpIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                label="Username"
                name="username"
                placeholder="Enter username"
                fullWidth
                required
                helperText={<ErrorMessage name="username" />}
              />
              <Field
                as={TextField}
                label="Password"
                name="password"
                placeholder="Enter password"
                type="password"
                fullWidth
                required
                helperText={<ErrorMessage name="password" />}
              />
              <Field
                as={FormControlLabel}
                name="remember"
                control={<Checkbox color="primary" />}
                label="Remember Me"
              />
              <Button
                type="submit"
                variant="contained"
                disabled={props.isSubmitting}
                color="primary"
                style={btnstyle}
                fullWidth
              >
                {props.isSubmitting ? "Loading" : "Sign in"}
              </Button>

              {console.log(props)}
            </Form>
          )}
        </Formik>
        <Typography>
          <Link href="#">Forgot Password ?</Link>
        </Typography>
        <Typography>
          Don't have an account ?
          <Link href="#" onClick={() => handleChange("event", 1)}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
}

export default Login;
