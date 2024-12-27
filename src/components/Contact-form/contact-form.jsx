import React, { useEffect, useState } from "react";
import ContactFromDate from "../../data/sections/form-info.json";
import { Formik, Form, Field } from "formik";

const ContactForm = () => {
  const messageRef = React.useRef(null);
  const [storedEmail, setStoredEmail] = useState(""); // State to store email from cookies

  // Function to get the email from cookies
  const getEmailFromCookies = () => {
    const cookieString = localStorage.getItem('UserEmail');
  };

  // Check for stored email on mount
  useEffect(() => {
    const emailFromCookie = getEmailFromCookies();
    if (emailFromCookie) {
      setStoredEmail(emailFromCookie); // Set the email to the state if available
    }
  }, []);

  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }

  const sendMessage = (ms) => new Promise((r) => setTimeout(r, ms));

  return (
    <section className="contact section-padding-contact">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="form md-mb50">
              <h4 className="fw-700 mb-50" style={{ color: "#4D4D4D" }}>
                Kontakt Aufnehmen.
              </h4>
              <Formik
                initialValues={{
                  name: "",
                  email: storedEmail || "", // Use stored email from cookies if available
                  message: "",
                }}
                onSubmit={async (values) => {
                  await sendMessage(500);
                  alert(JSON.stringify(values, null, 2));
                  messageRef.current.innerText =
                    "Your Message has been successfully sent. I will contact you soon.";
                  values.name = "";
                  values.email = "";
                  values.message = "";
                  setTimeout(() => {
                    messageRef.current.innerText = "";
                  }, 2000);
                }}
              >
                {({ errors, touched }) => (
                  <Form id="contact-form">
                    <div className="messages" ref={messageRef}></div>
                    <div className="controls">
                      <div className="form-group">
                        <Field
                          id="form_name"
                          type="text"
                          name="name"
                          placeholder="Name"
                          required="required"
                        />
                      </div>
                      <div className="form-group">
                        <Field
                          validate={validateEmail}
                          id="form_email"
                          type="email"
                          name="email"
                          placeholder="Email"
                        />
                        {errors.email && touched.email && <div>{errors.email}</div>}
                      </div>
                    </div>
                    <div className="form-group">
                      <Field
                        as="textarea"
                        id="form_message"
                        name="message"
                        placeholder="Message"
                        rows="4"
                        required="required"
                      />
                    </div>
                    <div className="form-group">
                      <div className="checkbox-container">
                        <Field
                          type="checkbox"
                          name="accept"
                          required
                          id="data-accept"
                        />
                        <label htmlFor="data-accept item">
                          Ich bin mit einer Speicherung meiner hier angegebenen
                          Daten entsprechend der <a href="/">Datenschutzverordnung</a> zum Zweck
                          der Kontaktaufnahme einverstanden. *
                        </label>
                      </div>
                    </div>

                    <button type="submit" className="butn bord">
                      <span>Send Message</span>
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className="col-lg-5 offset-lg-1">
            <div className="cont-info">
              <h4 className="fw-700  mb-50" style={{ color: "#4D4D4D" }}>
                Kontaktinformationen.
              </h4>
              <h3 className="wow" data-splitting style={{ color: "#333333" }}>
                Lass Uns Reden.
              </h3>
              <div className="item mb-40">
                <h5>
                  <a href="#0">{ContactFromDate.email}</a>
                </h5>
                <h5>{ContactFromDate.phone}</h5>
              </div>
              <h3 className="wow" data-splitting style={{ color: "#333333" }}>
                Besuchen Sie uns.
              </h3>
              <div className="item">
                <h6>
                  {ContactFromDate.location.first}
                  <br />
                  {ContactFromDate.location.second}
                </h6>
              </div>
              <div className="social mt-50">
                <a href="https://www.facebook.com/vtec.chip" className="icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://www.instagram.com/vtecchiptuning/"
                  className="icon"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
