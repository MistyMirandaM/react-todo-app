import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    comments: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Form submitted (demo). Check your typed values on the page!");
  }

  return (
    <section>
      <h1>Contact</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
        <label>
          First Name
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            type="text"
          />
        </label>

        <br />

        <label>
          Last Name
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            type="text"
          />
        </label>

        <br />

        <label>
          Email
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
          />
        </label>

        <br />

        <label>
          Comments
          <textarea
            name="comments"
            value={form.comments}
            onChange={handleChange}
            rows={4}
          />
        </label>

        <br />

        <button type="submit">Submit</button>
      </form>

      <hr />

      {/* proof it's controlled */}
      <h2>Live Form State</h2>
      <p>First: {form.firstName}</p>
      <p>Last: {form.lastName}</p>
      <p>Email: {form.email}</p>
      <p>Comments: {form.comments}</p>
    </section>
  );
}
