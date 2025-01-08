import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function LoginModal({ onClose, onLoginSuccess }) {
  const GoogleLogin = useGoogleLogin({
    flow: "auth-code",
    ux_mode: "popup",
    redirect_uri: "http://localhost:3000",
    onSuccess: async (codeResponse) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/auth/google",
          {
            code: codeResponse.code,
          }
        );

        if (response.status === 200) {
          const accessToken = response.data.access_token;
          localStorage.setItem("access_token", accessToken);

          const userResponse = await axios.get(
            "http://localhost:8000/api/auth/me",
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );

          if (userResponse.status === 200) {
            const { profile_image, name, email } = userResponse.data;
            const user = { profile_image, name, email };

            localStorage.setItem("profile_image", profile_image);
            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
            onLoginSuccess(user);
          }

          onClose();
        }
      } catch (error) {
        console.error(
          "Google Login Error:",
          error.response?.data || error.message
        );
        alert("로그인에 실패했습니다.");
      }
    },
    onError: (error) => {
      console.error("Google OAuth Error:", error);
      alert("Google 인증에 실패했습니다.");
    },
  });

  const GithubLogin = async () => {
    try {
      const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
      const redirectUri = "http://localhost:3000";
      const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
      const popup = window.open(
        githubAuthUrl,
        "_blank",
        "width=500,height=700,scrollbars=yes"
      );

      const interval = setInterval(() => {
        try {
          const url = new URL(popup.location.href);
          const code = url.searchParams.get("code");
          console.log(code);
          if (code) {
            clearInterval(interval);
            popup.close();

            axios
              .post("http://localhost:8000/api/auth/github", {
                code: code,
              })
              .then((response) => {
                if (response.status === 200) {
                  const accessToken = response.data.access_token;
                  const user = response.data.user;

                  localStorage.setItem("access_token", accessToken);
                  localStorage.setItem("profile_image", user.profile_image);
                  localStorage.setItem("name", user.name);
                  localStorage.setItem("email", user.email);

                  onLoginSuccess(user);
                  onClose();
                }
              })
              .catch((error) => {
                console.error("GitHub Login Error:", error.message);
                alert("GitHub 로그인에 실패했습니다.");
              });
          }
        } catch (error) {
          //
        }
      }, 1000);
    } catch (error) {
      console.error("GitHub Login Error:", error.message);
      alert("GitHub 로그인에 실패했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
      <div className="relative w-[25rem] flex flex-col items-center h-[20rem] p-[4rem] bg-lightBackground/90 dark:bg-darkBackground/90 rounded-xl shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl hover:text-primary"
        >
          <IoClose />
        </button>

        <div className="flex justify-center w-full mb-[1rem]">
          <img
            className="w-[10rem] hidden dark:block"
            src="dark_logo.png"
            alt="MusicLab Dark Logo"
          />
          <img
            className="w-[10rem] block dark:hidden"
            src="light_logo.png"
            alt="MusicLab Light Logo"
          />
        </div>

        <div className="space-y-[1rem] w-full mt-[3rem]">
          <button
            type="button"
            onClick={() => {
              GoogleLogin(), onClose();
            }}
            className="w-full py-[0.5rem] flex items-center justify-center gap-[0.5rem] bg-primary text-white rounded-md hover:bg-blue-600"
          >
            <FaGoogle className="text-[1.2rem]" />
            <span className="font-medium">Sign in with Google</span>
          </button>

          <button
            type="button"
            onClick={() => {
              GithubLogin(), onClose();
            }}
            className="w-full py-[0.5rem] flex items-center justify-center gap-[0.5rem] bg-gray-800 text-white rounded-md hover:bg-gray-900"
          >
            <FaGithub className="text-[1.2rem]" />
            <span className="font-medium">Sign in with Github</span>
          </button>
        </div>
      </div>
    </div>
  );
}
