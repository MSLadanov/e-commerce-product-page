import React from "react";
import { useState, useRef } from "react";
import { Formik, Form, Field, useField } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  surname: Yup.string().required("Required"),
});


const FileUpload = ({ fileRef, ...props }:any) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor="files">Choose files</label>{" "}
      <input ref={fileRef} multiple={true} type="file" {...field} />
      {meta.touched && meta.error ? (
        <div style={{ color: "red" }}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export const SignUp = () => {
  const [userImage, setUserImage] = useState(null)
  const fileRef = useRef<any>(null);
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
          values.img = fileRef.current.files[0]
          const getFormData = (object:any) => Object.keys(object).reduce((formData, key) => {
            formData.append(key, object[key]);
            return formData;
        }, new FormData());
        console.log(getFormData(values))
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
            <FileUpload name="files" fileRef={fileRef} />
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
