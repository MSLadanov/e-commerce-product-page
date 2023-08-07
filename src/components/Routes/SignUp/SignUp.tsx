import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export const SignUp = () => {
  return (
    <div>
    {" "}
    <h1>Sign Up</h1>
    <hr />
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={SignInSchema}
      onSubmit={(values) => {
        console.log(values)
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
          <button type="submit">Sign Up</button>
        </Form>
      )}
    </Formik>
  </div>
  )
}
