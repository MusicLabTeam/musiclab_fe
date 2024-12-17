import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function LoginModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
      <div className="relative w-[25rem] flex flex-col items-center h-[20rem] p-[4rem] bg-lightBackground/70  dark:bg-darkBackground/90 rounded-xl shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl hover:text-primary"
        >
          <IoClose />
        </button>

        <div className="flex justify-center w-full mb-[1rem]">
          <img className="w-[10rem]" src="dark_logo.png" alt="MusicLab" />
        </div>
        {/* <h2 className=" mt-[.5rem] text-center">Sign in</h2> */}
        <div className="space-y-[1rem] w-full mt-[3rem]">
          <button
            type="submit"
            className="w-full py-[0.5rem] flex items-center justify-center gap-[0.5rem] bg-primary text-white rounded-md hover:bg-blue-600"
          >
            <FaGoogle className="text-[1.2rem]" />
            <span className="font-medium">Sign in with Google</span>
          </button>
          <button
            type="submit"
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
