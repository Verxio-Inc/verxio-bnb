"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navItems = [
  {
    href: "/dashboard/social-feed",
    src: "/images1/message.svg",
    description: "",
  },
  {
    href: "/dashboard/social-feed/create-groups",
    src: "/images1/addmessage.svg",
    description: "New Group",
  },
  {
    href: "/dashboard/social-feed/groups",
    src: "/images1/user.svg",
    description: "Groups",
  },
];

const CreateMessageGroupNavigation = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleActiveItem = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="h-[54px] w-full flex items-center gap-4">
      <div className="flex-[45%] h-[54px] pl-6 ">
        <div className="flex items-center gap-6  w-full h-full">
          {navItems.map(({ href, src /*description*/ }, index) => (
            <Link
              key={index}
              onClick={() => toggleActiveItem(index)}
              href={href}
              className={`cursor-pointer flex flex-col items-center j ustify-center te xt-center ${
                activeIndex === index ? "text-[#00ADEF]" : ""
              }`}
            >
              <Image
                src={src}
                alt={"navigation-icons"}
                width={20}
                height={20}
              />
              {/* {activeIndex === index && description && (
                <p className="text-[#00ADEF] text-[8px] w-full">
                  {description}
                </p>
              )} */}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex-[55%] h-full w-full relative">
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
