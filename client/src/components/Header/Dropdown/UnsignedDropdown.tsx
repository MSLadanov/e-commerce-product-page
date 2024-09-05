import React from "react";
import { Formik, Form, Field } from "formik";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signIn } from "../../../redux/slices/userSlice";
import useNotify from "../../hooks/useNotify";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export const UnsignedDropdown = () => {
  const [toggleNotify] = useNotify()
  const dispatch = useDispatch();
  return (
    <div>
      {" "}
      <h1>Sign In</h1>
      <hr />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignInSchema}
        onSubmit={async (values) => {
          await axios
            .post("http://localhost:3001/api/user/login/", values)
            .then((res) => {
              dispatch(signIn(res.data.token));
              toggleNotify('Вы успешно вошли!')
            })
            .catch((err) => toggleNotify(err.response.data.message)); 
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <Field type="password" name="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <button type="submit">Sign In</button>
          </Form>
        )}
      </Formik>
      <div className="signup-btn">
        Don't have an account yet?
        <NavLink to="signup/">Sign Up</NavLink>
      </div>
    </div>
  );
};
