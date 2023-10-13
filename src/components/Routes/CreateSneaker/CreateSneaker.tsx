import React from "react";
import { useState, useEffect } from "react";
import { Formik, Form, Field, useField } from "formik";
import { useSelector } from "react-redux";
import { getToken } from "../../../redux/slices/userSlice";
import * as Yup from "yup";
import axios from "axios";
import useNotify from "../../hooks/useNotify";
import './style.scss'

const SignInSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  brand: Yup.string().required("Required"),
  sex: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  price: Yup.string().required("Required"),
  discount: Yup.string().required("Required"),
  sizes: Yup.string().required("Required"),
});

export const CreateSneaker = () => {
  const [toggleNotify] = useNotify()
  const token = useSelector(getToken);
  const [accessError, setAccessError] = useState<any>(null)
    function getFormData(object:any) {
    const formData = new FormData();
    Object.keys(object).forEach(key => {
      if (typeof object[key] !== 'object') formData.append(key, object[key])
      else formData.append(key, JSON.stringify(object[key]))
    })
    return formData;
}
  const [sneakerImage, setSneakerImage] = useState<any>(null)
  const checkAccessRights = async () => {
    const info = await axios
      .get(`http://localhost:3001/api/basket/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAccessError(null);
      })
      .catch((err) => {
        setAccessError(`${err.response.status} ${err.response.data.message}`);
      });
  }
  useEffect(() => {
    checkAccessRights()
  }, [])
  
    if(accessError){
      return (
        <div><h1>{accessError}</h1></div>
      )
    }
  return (
    <div className="create-sneaker">
      {" "}
      <h1>Create Sneaker</h1>
      <hr />
      <Formik
        initialValues={{
          name: "",
          brand: "",
          sex: "",
          description: "",
          price: "",
          discount: "",
          sizes: "",
        }}
        validationSchema={SignInSchema}
        onSubmit={async (values) => {
          const formData = getFormData(values);
          // formData.append("img", sneakerImage);
          const imgArray = Array.from(sneakerImage)
          if(imgArray.length === 4){
            imgArray.map((item:any, index) => {
              formData.append(`img${index+1}`, sneakerImage[index]);
            })
            for (var pair of formData.entries()) {
              console.log(pair[0] + ", " + pair[1]);
            }
            const sneaker = axios.post(
              "http://localhost:3001/api/sneaker/",
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            ).then((res) => toggleNotify(res.data.message)).catch((err) => {toggleNotify(err.response.data.message)});
          } else {
            alert('You need add 4 images!')
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="create-sneaker-form">
            <Field name="name" />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
            <Field name="brand" />
            {errors.brand && touched.brand ? <div>{errors.brand}</div> : null}
            <Field name="sex" />
            {errors.sex && touched.sex ? <div>{errors.sex}</div> : null}
            <Field name="description" />
            {errors.description && touched.description ? <div>{errors.description}</div> : null}
            <Field name="price" />
            {errors.price && touched.price ? <div>{errors.price}</div> : null}
            <Field name="discount" />
            {errors.discount && touched.discount ? <div>{errors.discount}</div> : null}
            <Field name="sizes" />
            {errors.sizes && touched.sizes ? <div>{errors.sizes}</div> : null}
            <input
              id="file"
              name="file"
              type="file"
              multiple
              onChange={(event: any) => {
                setSneakerImage(event.currentTarget.files);
              }}
            />
            <button type="submit">Create</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
