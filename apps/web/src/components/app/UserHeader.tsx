'use client';

import { useState } from 'react';

type UserMode = 'company' | 'personal';

export default function UserHeader() {
  const [userMode, setUserMode] = useState<UserMode>('personal');

  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-4">
      {/* Logo */}
      <h1 className="text-xl font-semibold text-gray-900">Sin City Tech Jobs</h1>

      {/* Mode Toggle */}
      <div className="flex items-center rounded-full border border-sky-500 bg-sky-50 p-1">
        <button
          onClick={() => setUserMode('company')}
          className={`cursor-pointer rounded-full px-6 py-2 font-medium transition-all duration-200 ${
            userMode === 'company'
              ? 'bg-blue-500 text-white'
              : 'bg-transparent text-sky-500 hover:bg-blue-500/10'
          }`}
        >
          Company
        </button>
        <button
          onClick={() => setUserMode('personal')}
          className={`cursor-pointer rounded-full px-6 py-2 font-medium transition-all duration-200 ${
            userMode === 'personal'
              ? 'bg-blue-500 text-white'
              : 'bg-transparent text-sky-500 hover:bg-blue-500/10'
          }`}
        >
          Personal
        </button>
      </div>

      {/* Avatar with Dropdown */}
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-semibold text-white">
            JS
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 border bg-white p-2 shadow-lg"
        >
          <li>
            <a className="hover:bg-base-200 text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Settings
            </a>
          </li>
          <li>
            <a className="hover:bg-base-200 text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
