import React, { useState } from "react";
import WaitlistModal from "../components/WaitlistModal";

export default function LandingPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-light">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow z-10">
        <img src="/kyrios-logo.svg" alt="Kyrios Logo" className="h-8" />
        <nav className="space-x-8 text-dark hidden md:block"></nav>
        <button
          className="bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#6840DA] active:bg-[#351495] transition"
          onClick={() => setShowModal(true)}
        >
          Join the Waitlist
        </button>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center px-4 md:px-0">
        <section className="flex flex-col items-center max-w-3xl text-center mt-12 mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-dark mb-4 leading-tight">
            Seamless Payments. Limitless Possibilities.
          </h1>
          <p className="text-lg md:text-xl text-accent mb-6 font-medium">
            Revolutionizing fintech for Africa's businesses and creators with secure, fast, and easy-to-use payment tools.
          </p>
          <button
            className="bg-primary text-white px-8 py-4 rounded-full shadow-lg hover:bg-[#6840DA] active:bg-[#351495] text-lg font-bold transition mb-4"
            onClick={() => setShowModal(true)}
          >
            Join the Waitlist
          </button>
          <span className="text-primary font-medium">
            Be among the first to experience Kyrios!
          </span>
        </section>
        <img
          src="/landing-illustration.png"
          alt="Kyrios Fintech Illustration"
          className="w-full max-w-xl mb-16"
        />
      </main>
      <footer className="bg-white text-faded text-center py-6 shadow-inner">
        &copy; {new Date().getFullYear()} Kyrios. All Rights Reserved.
      </footer>
      {showModal && <WaitlistModal onClose={() => setShowModal(false)} />}
    </div>
  );
}