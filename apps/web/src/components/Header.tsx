"use client";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-4 border-b bg-white">
      <h1 className="text-xl font-semibold">
        Sin City Tech Jobs{" "}
        <span className="text-gray-500 text-sm">by Tech Alley</span>
      </h1>
      <button className="btn btn-primary">Login / Sign Up</button>
    </header>
  );
}
