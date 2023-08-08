import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  surname: Yup.string().required("Required"),
});

export const SignUp = () => {
  return (
    <div>
      {" "}
      <h1>Sign Up</h1>
      <hr />
      <Formik
        initialValues={{
          name: "",
          surname: "",
          img: "",
          email: "",
          password: "",
        }}
        validationSchema={SignInSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="name" />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
            <Field name="surname" />
            {errors.surname && touched.surname ? <div>{errors.surname}</div> : null}
            <Field name="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <Field name="img" type="file" />
            {errors.img && touched.img ? <div>{errors.img}</div> : null}
            <Field type="password" name="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <button type="submit">Sign Up</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
