'use client';

import UserHeader from './user/UserHeader';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, login, logout } = useAuth();

  if (user) {
    return (
      <UserHeader
        user={user}
        logout={logout}
      />
    );
  }
  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-4">
      <h1 className="text-xl font-semibold">
        Sin City Tech Jobs <span className="text-sm text-gray-500">by Tech Alley</span>
      </h1>
      <button
        className="btn btn-primary"
        onClick={login}
      >
        Login / Sign Up
      </button>
    </header>
  );
}
