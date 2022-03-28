// This page is similar to Login Page. For Form Validation, there are some more details:
// username: required, between 3 and 20 characters
// email: required, email format
// password: required, between 6 and 40 characters

// We’re gonna call AuthService.register() method and show response message (successful or error).
// import React, { useState, useRef } from "react";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
// import { isEmail } from "validator";
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
// const validEmail = (value) => {
//   if (!isEmail(value)) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This is not a valid email.
//       </div>
//     );
//   }
// };
// const vusername = (value) => {
//   if (value.length < 3 || value.length > 20) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The username must be between 3 and 20 characters.
//       </div>
//     );
//   }
// };
// const vpassword = (value) => {
//   if (value.length < 6 || value.length > 40) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The password must be between 6 and 40 characters.
//       </div>
//     );
//   }
// };

// //todo
// const vconfirmPassword = (value) => {};

// const Register = (props) => {
//   const form = useRef();
//   const checkBtn = useRef();
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [successful, setSuccessful] = useState(false);
//   const [message, setMessage] = useState("");
//   const onChangeUsername = (e) => {
//     const username = e.target.value;
//     setUsername(username);
//   };
//   const onChangeEmail = (e) => {
//     const email = e.target.value;
//     setEmail(email);
//   };
//   const onChangePassword = (e) => {
//     const password = e.target.value;
//     setPassword(password);
//   };
//   const handleRegister = (e) => {
//     e.preventDefault();
//     setMessage("");
//     setSuccessful(false);
//     form.current.validateAll();
//     if (checkBtn.current.context._errors.length === 0) {
//       AuthService.register(username, email, password).then(
//         (response) => {
//           setMessage(response.data.message);
//           setSuccessful(true);
//         },
//         (error) => {
//           const resMessage =
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString();
//           setMessage(resMessage);
//           setSuccessful(false);
//         }
//       );
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
//         <Form onSubmit={handleRegister} ref={form}>
//           {!successful && (
//             <div>
//               <div className="form-group">
//                 <label htmlFor="username">Username</label>
//                 <Input
//                   type="text"
//                   className="form-control"
//                   name="username"
//                   value={username}
//                   onChange={onChangeUsername}
//                   validations={[required, vusername]}
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <Input
//                   type="text"
//                   className="form-control"
//                   name="email"
//                   value={email}
//                   onChange={onChangeEmail}
//                   validations={[required, validEmail]}
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <Input
//                   type="password"
//                   className="form-control"
//                   name="password"
//                   value={password}
//                   onChange={onChangePassword}
//                   validations={[required, vpassword]}
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="password">Confirm Password</label>
//                 <Input
//                   type="password"
//                   className="form-control"
//                   name="confirmPassword"
//                   value={password}
//                   onChange={onChangePassword}
//                   validations={[required, vpassword]}
//                 />
//               </div>
//               <div className="form-group">
//                 <button className="btn btn-primary btn-block">Sign Up</button>
//               </div>
//             </div>
//           )}
//           {message && (
//             <div className="form-group">
//               <div
//                 className={
//                   successful ? "alert alert-success" : "alert alert-danger"
//                 }
//                 role="alert"
//               >
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
// export default Register;

import {
  Typography,
  Avatar,
  Grid,
  Paper,
  TextField,
  Button,
  FormHelperText,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Formik, Field, Form, ErrorMessage } from "formik";
import AuthService from "../services/auth.service";
import * as Yup from "yup";
// import { FormHelperText } from "@material-ui/core";

function Signup() {
  const paperStyle = { padding: 20, width: 300, margin: "0 auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "darkcyan" };
  const btnstyle = { margin: "8px 0" };
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3, "It's too short").required("Required"),
    email: Yup.string().email("Enter valid email").required("Required"),
    password: Yup.string()
      .min(4, "Password minimum length should be 4")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password not matched")
      .required("Required"),
    role: Yup.string()
      .oneOf(["hotel", "ngo", "customer"], "Required")
      .required("Required"),
  });
  const onSubmit = (values, props) => {
    console.log(values);
    console.log(props);
    AuthService.register(values.username, values.email, values.password, [
      values.role,
    ]).then(() => {
      console.log("registered");
      setTimeout(() => {
        props.resetForm();
        props.setSubmitting(false);
      }, 2000);
    });
  };
  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an Account
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                name="username"
                label="Username"
                placeholder="Enter your Username"
                helperText={<ErrorMessage name="username" />}
              />
              <Field
                as={TextField}
                fullWidth
                name="email"
                label="E-mail"
                placeholder="Enter your email"
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                fullWidth
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                helperText={<ErrorMessage name="password" />}
              />
              <Field
                as={TextField}
                fullWidth
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                helperText={<ErrorMessage name="confirmPassword" />}
              />

              <FormControl component="fieldset" style={btnstyle}>
                <FormLabel component="legend"> :</FormLabel>
                <Field
                  as={RadioGroup}
                  aria-label="role"
                  name="role"
                  // name="role"
                  style={{ display: "initial" }}
                >
                  <FormControlLabel
                    value="hotel"
                    control={<Radio />}
                    label="Hotel"
                  />
                  <FormControlLabel
                    value="ngo"
                    control={<Radio />}
                    label="NGO"
                  />
                  <FormControlLabel
                    value="customer"
                    control={<Radio />}
                    label="Customer"
                  />
                </Field>
              </FormControl>
              <FormHelperText>
                <ErrorMessage name="role" />
              </FormHelperText>
              {/* <FormControlLabel
                control={<Field as={Checkbox} name="termsAndConditions" />}
                label="I accept the terms and conditions"
              />
              <FormHelperText>
                <ErrorMessage name="termsAndConditions" />
              </FormHelperText> */}
              <Button
                type="submit"
                variant="contained"
                disabled={props.isSubmitting}
                color="primary"
              >
                {props.isSubmitting ? "Loading" : "Sign Up"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
}

export default Signup;
