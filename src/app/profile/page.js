"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { isAuthenticated, profile, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !profile) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center py-[8rem] min-h-screen">
      <h1 className="text-[2rem] font-bold mb-4">Profile</h1>
      <img
        src={profile.profileImage}
        alt="Profile"
        className="w-[8rem] h-[8rem] rounded-full mx-auto mb-[3rem] mt-[1rem] shadow-lg object-cover"
      />
      <div className="space-y-[1rem] text-[1.1rem]">
        <p>
          <strong className="text-left">Name </strong>
          <span className="ml-[1rem] text-left">{profile.name}</span>
        </p>
        <p>
          <strong className="text-left">Email </strong>
          <span className="ml-[1rem] text-left">{profile.email}</span>
        </p>
      </div>
      <button
        onClick={() => {
          logout();
          router.push("/");
        }}
        className="mt-[2.5rem] bg-red-500 hover:bg-red-600 text-white py-[.5rem] px-[1.5rem] rounded-md"
      >
        Sign out
      </button>
    </div>
  );
}
