import { Formik, Form, Field } from "formik";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/slices/userSlice";
import useNotify from "../../hooks/useNotify";
import { userService } from "../../api/api";
import useApi from "../../hooks/useApi";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export const UnsignedDropdown = () => {
  const [toggleNotify] = useNotify()
  const dispatch = useDispatch();
  const { login } = useApi()
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
        onSubmit={(values) => {
          login(values)
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
