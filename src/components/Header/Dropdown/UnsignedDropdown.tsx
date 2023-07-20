import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export const UnsignedDropdown = () => {
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
          const user = await axios.post('http://localhost:3001/api/user/login/', values)
          console.log(user);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="email" />
            {errors.email && touched.email ? (
              <div>{errors.email}</div>
            ) : null}
            <Field type="password" name="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <button type="submit">Sign In</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
