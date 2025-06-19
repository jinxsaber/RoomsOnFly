"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Right() {
  const endpoint = process.env.NEXT_PUBLIC_API + "/register";
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await axios.post(
        endpoint,
        { name, email, password },
        { withCredentials: true }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const err = error.response.data;
        setErrorMessage(typeof err === "string" ? err : err.error || "Registration failed");
      } else {
        setErrorMessage("Something went wrong");
      }
    }
  };

  return (
    <div className="w-1/2 h-full flex flex-col items-center py-10 justify-between">
      <div className="text-[#000040]">
        <div className="text-3xl text-center pb-2">Register</div>
        <div className="montserrat text-sm text-center">Join new adventures</div>
      </div>
      <div className="mt-4 w-3/5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="mb-1 font-medium text-black">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-sm px-3 py-2 bg-white text-black text-sm"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="email" className="mb-1 font-medium text-black">
              Email
            </label>
            <input
              id="email"
              type="email"
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
            className="mt-4 bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition cursor-pointer text-sm"
          >
            Register
          </button>

          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}
        </form>
      </div>

      <div className="text-sm mt-2">
        <span className="text-slate-600">Already Registered ?</span>{" "}
        <Link href="/login" className="text-red-600">
          Log In
        </Link>
      </div>
    </div>
  );
}
