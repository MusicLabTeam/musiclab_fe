import React from "react";
import { useRouter } from "next/navigation";
import { MdOutlinePlaylistPlay } from "react-icons/md";

export default function Library() {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/list")}
      className="h-[2.3rem] px-[1rem] w-[13rem] ml-[.5rem] flex items-center rounded-[0.5rem] button"
    >
      <div className="flex items-center text-[1rem] space-x-[.7rem] ">
        <MdOutlinePlaylistPlay className="text-[1rem]"></MdOutlinePlaylistPlay>
        <p className="text-[.8rem] ">Library</p>
      </div>
    </div>
  );
}
