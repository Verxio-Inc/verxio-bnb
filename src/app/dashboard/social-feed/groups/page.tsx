import React from "react";
import Image from "next/image";
import FriendList from "../../../../components/social-feeds/friendList";
import { friendsData, contactData } from "../../../../components/social-feeds/data";

const CreateGroups = () => {
  return (
    <>
      <section className="p-4">
        <div className="flex flex-col items-center gap-4 bg-[#EBEBFA] rounded-xl w-full p-4 my-6">
          <div className="bg-[#DEDEF7] w-full flex items-center justify-start">
            <label
              htmlFor="groupName"
              className="text-[#222482] border-r border-[#bdbbbb] font-medium text-[12px] py-2 px-6"
            >
              Group Name
            </label>
            <input
              placeholder="e.g Code Ninjas"
              type="text"
              className="outline-none py-2 px-6 text-sm bg-[#DEDEF7] placeholder:text-[#424242] placeholder:text-sm"
            />
          </div>

          <blockquote className="flex flex-wrap items-center gap-4 w-full border-2 py-[.4rem] px-6 rounded-lg">
            {contactData.map((name, index) => (
              <div
                key={index}
                className="flex cursor-pointer items-center gap-3 bg-[#DEDEF7] rounded-full py-2 px-3 text-[#222482]"
              >
                <Image
                  src={"/images1/addParticipant.svg"}
                  alt="profile picture"
                  width={17}
                  height={17}
                />
                <p className="font-semibold text-[12px]">
                  {name.split(" ").length > 3
                    ? name.split(" ").slice(0, 3).join(" ") + "..."
                    : name}
                </p>
              </div>
            ))}
          </blockquote>
          <button className="w-full border-2 py-[.4rem] px-6 border-[#00ADEF] text-[#00ADEF] font-inter text-base rounded-lg">
            Create Group
          </button>
        </div>
      </section>
      <div className="flex items-center flex-col">
        {friendsData.map((data, index) => (
          <FriendList {...data} key={`friend-number-${index}`} />
        ))}
      </div>
    </>
  );
};

export default CreateGroups;
