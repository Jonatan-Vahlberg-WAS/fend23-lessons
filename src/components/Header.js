"use client";
import { useAuth } from "@/context/auth";

import Link from "next/link";

function Header() {
  const auth = useAuth();

  return (
    <header class="flex items-center justify-between bg-gray-800 p-4">
      <h1 class="text-3xl font-bold text-white">Library</h1>
      {auth.token ? (
        <Link
          href="/"
          onClick={auth.logout}
          class="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </Link>
      ) : (
        <Link
          href="/"
          class="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        >
          Login
        </Link>
      )}
    </header>
  );
}
export default Header;
