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
  function getFormData(object:any) {
    const formData = new FormData();
    Object.keys(object).forEach(key => {
      if (typeof object[key] !== 'object') formData.append(key, object[key])
      else formData.append(key, JSON.stringify(object[key]))
    })
    return formData;
}
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
        onSubmit={async (values) => {
          values.img = fileRef.current.files[0]
         const formData = getFormData(values)
        console.log(formData.getAll('img'))
        // const user = await axios.post(
        //   "http://localhost:3001/api/user/register/",
        //   values
        // );
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
