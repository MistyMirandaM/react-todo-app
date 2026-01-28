import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./ContactPage.css";

export default function ContactPage() {
  const formRef = useRef(null);

  const [status, setStatus] = useState({
    state: "idle", 
    message: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    setStatus({ state: "sending", message: "Sending your report..." });

    emailjs
      .sendForm(
        "service_vrgwe7n",
        "template_ge9kug3",
        formRef.current,
        "f-z_vp9Iik4p3F-Uy"
      )
      .then(() => {
        setStatus({
          state: "success",
          message: "Thanks! Your message was sent. We’ll get back to you soon.",
        });

        formRef.current.reset();
      })
      .catch(() => {
        setStatus({
          state: "error",
          message: "Something went wrong. Please try again.",
        });
      });
  }

  return (
    <section>
      <h1 style={{ textAlign: "center" }}>Contact</h1>

      <p className="contactIntro">
        Having issues with the app? Send us a message and we’ll get back to you
        as soon as possible.
      </p>

      <div className="contactWrap">
        <div className="contactCard">
          {status.state !== "idle" && (
            <div className={`banner ${status.state}`}>{status.message}</div>
          )}

          {status.state !== "success" && (
            <form ref={formRef} onSubmit={handleSubmit} className="contactForm">
              <div className="grid2">
                <label className="field">
                  <span className="labelText">First name</span>
                  <input name="firstName" type="text" required />
                </label>

                <label className="field">
                  <span className="labelText">Last name</span>
                  <input name="lastName" type="text" required />
                </label>
              </div>

              <label className="field">
                <span className="labelText">Email</span>
                <input name="email" type="email" required />
              </label>

              <label className="field">
                <span className="labelText">Describe the issue</span>
                <textarea name="comments" rows={5} required />
              </label>

              <button
                type="submit"
                className="primaryBtn"
                disabled={status.state === "sending"}
              >
                {status.state === "sending" ? "Sending..." : "Submit"}
              </button>
            </form>
          )}

          {status.state === "success" && (
            <div className="afterSuccess">
              If you don’t hear back soon, check your spam folder for the auto
              reply.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
