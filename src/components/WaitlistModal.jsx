import React, { useState } from "react";
import PropTypes from "prop-types";

export default function WaitlistModal({ onClose }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    updates: true,
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    if (!form.fullName || !/^[\w\-\s']+$/.test(form.fullName)) {
      setStatus("error");
      setMessage("Please enter a valid name.");
      return;
    }
    if (!/^[\w\-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      setStatus("error");
      setMessage("Invalid email address.");
      return;
    }
    if (!/^\+?\d{7,16}$/.test(form.phone)) {
      setStatus("error");
      setMessage("Invalid phone number.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage("");
        setTimeout(() => {
          window.location = `/dashboard?name=${encodeURIComponent(form.fullName)}`;
        }, 1200);
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong!");
      }
    } catch {
      setStatus("error");
      setMessage("Network error.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-xl w-[90vw] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-faded hover:text-primary font-bold text-xl"
          aria-label="Close"
        >×
        </button>
        <h2 className="text-2xl font-bold text-dark mb-4">
          Join the Waitlist
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3 text-lg outline-primary focus:ring-2 focus:ring-primary text-dark bg-light"
            placeholder="Full Name"
            required
            maxLength={50}
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3 text-lg outline-primary focus:ring-2 focus:ring-primary text-dark bg-light"
            placeholder="E-mail Address"
            required
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3 text-lg outline-primary focus:ring-2 focus:ring-primary text-dark bg-light"
            placeholder="Phone Number"
            required
            maxLength={16}
          />
          <label className="inline-flex items-center gap-2 cursor-pointer text-primary ml-1">
            <input
              type="checkbox"
              name="updates"
              checked={form.updates}
              onChange={handleChange}
              className="accent-primary w-5 h-5"
            />
            Receive updates when Kyrios is live
          </label>
          <button
            disabled={status === "loading"}
            className="mt-4 bg-primary text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-[#6840DA] font-bold active:bg-[#351495] transition"
            type="submit"
          >
            {status === "loading" ? "Submitting..." : "Join the Waitlist"}
          </button>
        </form>
        {status === "error" && (
          <div className="mt-4 text-red-600">{message}</div>
        )}
        {status === "success" && (
          <div className="mt-4 text-primary font-bold">
            Registration successful!
          </div>
        )}
      </div>
    </div>
  );
}

WaitlistModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};