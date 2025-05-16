import React from "react";

function useQuery() {
  return new URLSearchParams(window.location.search);
}

export default function Dashboard() {
  const query = useQuery();
  const name = query.get("name") || "User";

  return (
    <div className="min-h-screen bg-light flex flex-col">
      <header className="flex items-center px-6 py-4 bg-white shadow z-10">
        <img src="/kyrios-logo.svg" alt="Kyrios Logo" className="h-8" />
        <div className="flex-1" />
      </header>
      <main className="flex flex-1 flex-col items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-dark mb-3">
          Welcome, {name}!
        </h1>
        <p className="text-xl text-accent mb-6">
          Thank you for joining the Kyrios waitlist.<br />You'll be the first to know when we go live!
        </p>
        <img
          src="/dashboard-illustration.png"
          alt="Kyrios Dashboard Illustration"
          className="w-full max-w-md mt-6"
        />
      </main>
      <footer className="bg-white text-faded text-center py-6 shadow-inner">
        &copy; {new Date().getFullYear()} Kyrios. All Rights Reserved.
      </footer>
    </div>
  );
}
