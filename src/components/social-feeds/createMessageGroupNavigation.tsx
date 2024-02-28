import Image from "next/image";
import Link from "next/link";

const CreateMessageGroupNavigation = () => {
  return (
    <div className="h-[54px] w-full flex items-center gap-4">
      <div className="flex-[40%] pl-6 flex items-center gap-6">
        <Link href={"/dashboard/social-feed"} className="cursor-pointer text-red-500">
          <Image
            src={"/images1/message.svg"}
            alt="profile picture"
            width={20}
            height={20}
          />
        </Link>

        <Link href={"/dashboard/social-feed/groups"} className="cursor-pointer">
          <Image
            src={"/images1/addmessage.svg"}
            alt="profile picture"
            width={20}
            height={20}
          />
        </Link>

        <Link href={"/dashboard/social-feed/create-groups"} className="cursor-pointer">
          <Image
            src={"/images1/user.svg"}
            alt="profile picture"
            width={20}
            height={20}
          />
        </Link>
      </div>
      <div className="flex-[60%] h-full w-full relative">
        <Image
          src={"/images1/search.svg"}
          alt="profile picture"
          width={20}
          height={20}
          className="absolute top-4 left-2"
        />
        <input
          type="text"
          placeholder="Search for friends..."
          className="border bg-[#F7F7FD] rounded-tr- lg rounded-bl-lg h-full w-full outline-none pl-8 py-3 placeholder:text-[#424242] placeholder:text-sm placeholder:font-inter"
        />
      </div>
    </div>
  );
};

export default CreateMessageGroupNavigation;
