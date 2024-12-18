"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const router = useRouter();

  const accessToken = localStorage.getItem("access_token");
  const email = localStorage.getItem("email");
  const name = localStorage.getItem("name");
  const profileImage = localStorage.getItem("profile_image");

  if (!accessToken || !email || !name || !profileImage) {
    return <div className="text-center mt-10">Loading..</div>;
  }

  return (
    <div className="flex flex-col items-center py-[8rem] min-h-screen">
      {/* 프로필 */}
      <h1 className="text-[2rem] font-bold mb-4">Profile</h1>

      <div className="flex flex-col justify-center">
        <img
          src={profileImage}
          alt="Profile"
          className="w-[8rem] h-[8rem] rounded-full mx-auto mb-[3rem] mt-[1rem] shadow-lg object-cover"
        />
        <div className="space-y-[1rem] text-[1.1rem]">
          <p>
            <strong className="text-left">Name </strong>
            <span className="ml-[1rem] text-left">{name}</span>
          </p>
          <p>
            <strong className="text-left">Email </strong>
            <span className="ml-[1rem] text-left">{email}</span>
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={() => {
              localStorage.removeItem("access_token");
              localStorage.removeItem("email");
              localStorage.removeItem("name");
              localStorage.removeItem("profile_image");
              router.push("/");
              window.location.reload();
            }}
            className="mt-[2.5rem] bg-red-500 hover:bg-red-600 text-white py-[.5rem] px-[1.5rem] rounded-md"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
