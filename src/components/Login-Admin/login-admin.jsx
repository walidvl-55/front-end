import React from "react";
import { Formik, Form, Field } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios"; // Make sure to install axios if it's not already

const LoginAdmin = () => {
  const router = useRouter(); // To navigate after login

  const handleSubmit = async (values) => {
    try {
      console.log('Form Data:', values);
      // Send the login request to the backend
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: values.email,
        password: values.password,
        admin_code: values.admin_code, // Include the admin code in the login request
      });

      // If login is successful, store the token in localStorage
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);  // Store token in localStorage
        alert("Login successful");
        router.push("/admin/new-blog");
      }


    } catch (error) {
      console.error("Error logging in:", error);
      alert("Invalid credentials or admin code");
    }
  };

  return (
    <section className="contact section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mt-115">
            <div className="form md-mb50">
              <Formik
                initialValues={{ email: "", password: "", admin_code: "" }} // Added initialValues
                onSubmit={handleSubmit} // Handle form submission
              >
                <Form id="login-form">
                  <div className="form-group">
                    <Field
                      id="form_email"
                      type="email"
                      name="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      id="form_password"
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      id="form_admin_code"
                      type="password"
                      name="admin_code"
                      placeholder="Code from Admin"
                      required
                    />
                  </div>
                  <button type="submit" className="butn bord">
                    <span>Login</span>
                  </button>

                  <Link href={`/admin/new-admin`}>
                    <a className="text-login ml-4">Register</a>
                  </Link>
                </Form>
              </Formik>
            </div>
          </div>
          <div className="col-lg-5 offset-lg-1">
            <img
              src="/img/login.jpg"
              alt="Display"
              className="rounded"
              style={{ borderRadius: "15px", width: "100%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginAdmin;
