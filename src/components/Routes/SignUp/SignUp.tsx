import React from "react";
import { useState, useRef } from "react";
import { Formik, Form, Field, useField } from "formik";
import * as Yup from "yup";
import axios from "axios";
import useNotify from "../../hooks/useNotify";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  surname: Yup.string().required("Required"),
});

export const SignUp = () => {
  const [toggleNotify] = useNotify()
  function getFormData(object:any) {
    const formData = new FormData();
    Object.keys(object).forEach(key => {
      if (typeof object[key] !== 'object') formData.append(key, object[key])
      else formData.append(key, JSON.stringify(object[key]))
    })
    return formData;
}
  const [userImage, setUserImage] = useState<any>(null)
  return (
    <div>
      {" "}
      <h1>Sign Up</h1>
      <hr />
      <Formik
        initialValues={{
          name: "",
          surname: "",
          email: "",
          password: "",
        }}
        validationSchema={SignInSchema}
        onSubmit={async (values) => {
          const formData = getFormData(values);
          formData.append('img', userImage)
          const user = await axios.post(
            "http://localhost:3001/api/user/register/",
            formData
          ).then((res) => toggleNotify(res.data.message)).catch((err) => {toggleNotify(err.response.data.message)});;
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="name" />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
            <Field name="surname" />
            {errors.surname && touched.surname ? (
              <div>{errors.surname}</div>
            ) : null}
            <Field name="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <input
              id="file"
              name="file"
              type="file"
              onChange={(event:any) => {
                setUserImage(event.currentTarget.files[0])
              }}
            />
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
