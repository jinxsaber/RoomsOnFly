"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Right() {
  const endpoint = process.env.NEXT_PUBLIC_API + "/host";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        endpoint,
        { email, password },
        {
          withCredentials: true,
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.error || "Login failed");
      } else {
        setErrorMessage("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-1/2 h-full flex flex-col items-center py-10 justify-between">
      <div className="text-[#000040]">
        <div className="text-4xl text-center pb-2">Login</div>
        <div className="montserrat text-center">Welcome Back</div>
      </div>
      <div className="mt-4 w-3/5">
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="mb-1 font-medium text-black">
              Email
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-sm px-3 py-2 bg-white text-black text-sm"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="password" className="mb-1 font-medium text-black">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-sm px-3 py-2 bg-white text-black text-sm"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition cursor-pointer text-sm"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}
        </form>
      </div>

      <div className="text-sm mt-2">
        <span className="text-slate-600">Not Registered?</span>{" "}
        <Link href="/register" className="text-red-600">
          Sign Up
        </Link>
      </div>

      <div className="text-sm text-black">
        <Link href="/host">Become a host</Link>
      </div>
    </div>
  );
}
