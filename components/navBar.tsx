"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function NavBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/verify`,
          {},
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            withCredentials: true, // ✅ for cookie-based auth
          }
        );

        setIsAuthenticated(true);
        setUserName(res.data.user?.name || "User");
      } catch (err) {
        console.error("User not verified:", err);
        setIsAuthenticated(false);
      }
    };

    verifyUser();
  }, []);

  return (
    <div className="mx-20 px-10 poppins flex justify-between items-center h-20 ">
      <div className="">Logo</div>

      <div className="flex justify-between items-center w-1/3">
        <div>Explore</div>
        <div>Experiences</div>
        <div>Contact Us</div>
      </div>

      <div className="flex justify-between items-center w-1/4">
        <div className="bg-[#FFFDF6] px-4 py-2 rounded-4xl text-[#000040] hover:bg-[#000040] hover:text-[#FFFDF6] cursor-pointer transition duration-300">
          Become a Host
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-2 text-[#000040]">
            <div className="w-8 h-8 rounded-full bg-[#D9D9D9] flex items-center justify-center text-sm">
              {userName[0]?.toUpperCase() || "U"}
            </div>
            <div>{userName}</div>
          </div>
        ) : (
          <>
            <Link href="/register">Sign Up</Link>
            <Link href="/login">Log In</Link>
          </>
        )}
      </div>
    </div>
  );
}
