import React from "react";
import Image from "next/image";
import NewPost from "./newPost";
import { newPostData } from "./data";

const Overview = () => {
  return (
    <section className="flex-[60%] flex flex-col gap-y-5">
      <h1 className="text-[#212121] font-semibold text-[20px] font-inter">
        Share Something With Us
      </h1>

      <div className="bg-[#F7F7FD] h-18 p-3 border  flex rounded items-center">
        <Image
          src={"/images1/profileImage.svg"}
          alt="profile picture"
          width={40}
          height={40}
        />
        <input
          type="text"
          placeholder="What happened today?"
          className="bg-[#F7F7FD] pl-4 outline-none border-none w-full h-full placeholder:text-[#424242] placeholder:text-sm placeholder:font-inter"
        />

        <Image
          src={"/images1/photoUpload.svg"}
          alt="profile picture"
          width={40}
          height={40}
        />
      </div>

      {newPostData.map((data, index) => (
        <NewPost {...data} key={`post-number${index}`} />
      ))}
    </section>
  );
};

export default Overview;
