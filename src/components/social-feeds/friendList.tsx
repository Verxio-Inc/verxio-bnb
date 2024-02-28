import React from "react";
import Image from "next/image";
import Link from "next/link";

interface IFriendListProps {
  friendImage: string;
  friendName: string;
  friendTag: string;
  status: string;
  lastSeen?: string;
  renderCheckbox?: boolean;
  renderChatbox?: boolean;
}

const FriendList = ({
  friendImage,
  friendName,
  friendTag,
  status,
  lastSeen,
  renderCheckbox = true,
  renderChatbox = true,
}: IFriendListProps) => {
  return (
    <Link
      href={"/dashboard/chatRoom"}
      className={`${
        renderChatbox && "py-3"
      } relative w-full px-6 py-2 border-[#F7F7FD[ border-b flex items-center justify-between cursor-pointer transition duration-300 hover:bg-[#DEDEF7]`}
    >
      {renderCheckbox && (
        <input
          type="checkbox"
          name="checkbox"
          id="checkbox"
          className="absolute cursor-pointer top-2 left-2"
        />
      )}
      <blockquote className="flex items-start gap-2">
        <div>
          <Image
            src={friendImage}
            alt="profile picture"
            width={40}
            height={40}
          />
        </div>
        <div className="">
          <h2 className="text-[#424242] font-semibold text-base">
            {friendName}
          </h2>
          <p className="text-[12px] text-[#0089BD] font-normal flex items-center gap-4">
            {friendTag}
          </p>
        </div>
      </blockquote>

      <div className="flex items-center justify-end flex-col gap-3">
        {status === "online" ? (
          <Image
            src={"/images1/online.svg"}
            alt="profile picture"
            width={15}
            height={15}
          />
        ) : (
          <p className="font-normal text-[14px] text-[#303036]">{lastSeen}</p>
        )}
        {renderChatbox && (
          <Image
            src={"/images1/comment.svg"}
            alt="profile picture"
            width={20}
            height={20}
          />
        )}
      </div>
    </Link>
  );
};

export default FriendList;
