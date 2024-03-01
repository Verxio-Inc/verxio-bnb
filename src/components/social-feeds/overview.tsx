"use client";
import Image from "next/image";
import NewPost from "./newPost";
import { newPostData } from "./data";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const Overview = () => {
  const searchParams = useSearchParams();
  const isCreateNew = searchParams.get("create-new"); //Checking if user is creating new post
  if (isCreateNew == "true") {
    return null;
  }
  return (
    <section className="flex-[60%] flex flex-col gap-y-5">
      <h1 className="text-[#212121] font-semibold text-[20px] font-inter">
        Share Something With Us
      </h1>

      <div className="bg-[#F7F7FD] h-18 p-3 border flex items-center rounded">
        <Image
          src={"/images1/profileImage.svg"}
          alt="profile picture"
          width={40}
          height={40}
        />
        <Link
          href={"?create-new=true"}
          className="bg-[#F7F7FD] pl-4 w-full  text-[#424242] font-inter"
        >
          What happened today?
        </Link>

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
