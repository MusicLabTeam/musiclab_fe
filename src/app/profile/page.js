"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

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

  const { language } = useLanguage();
  const translations = {
    En: {
      profile: "Profile",
      name: "Name",
      email: "Email",
      signout: "Sign out",
    },
    Ko: {
      profile: "프로필",
      name: "이름",
      email: "이메일",
      signout: "로그아웃",
    },
    Ja: {
      profile: "プロフィール",
      name: "名前",
      email: "メール",
      signout: "ログアウト",
    },
  };

  const Text = translations[language] || translations.En;

  return (
    <div className="flex flex-col items-center py-[8rem] min-h-screen">
      <h1 className="text-[2rem] font-bold mb-4">{Text.profile}</h1>
      <img
        src={profile.profile_image}
        alt="Profile"
        className="w-[8rem] h-[8rem] rounded-full mx-auto mb-[3rem] mt-[1rem] shadow-lg object-cover"
      />
      <div className="space-y-[1rem] text-[1.1rem]">
        <div className="flex items-start">
          <strong className="w-[6rem] text-left">{Text.name}</strong>
          <span className="text-left">{profile.name}</span>
        </div>
        <div className="flex items-start">
          <strong className="w-[6rem] text-left">{Text.email}</strong>
          <span className="text-left">{profile.email}</span>
        </div>
      </div>

      <button
        onClick={() => {
          logout();
          router.push("/");
        }}
        className="mt-[2.5rem] bg-red-500 hover:bg-red-600 text-white py-[.5rem] px-[1.5rem] rounded-md"
      >
        {Text.signout}
      </button>
    </div>
  );
}
