import React from "react";
import Image from "next/image";
import FriendList from "../../../components/social-feeds/friendList";
import { friendsData } from "../../../components/social-feeds/data";
import ChatHeader from "../../../components/social-feeds/chatHeader";
import CreateMessageGroupNavigation from "../../../components/social-feeds/createMessageGroupNavigation";

const ChatRoom = () => {
  return (
    <div className="flex flex-col-reverse md:gap-0 gap-10 md:flex-row border-collapse">
      <section className="bg-[#F7F7FD]  flex-[40%] md:flex-1 flex flex-col h-fit border border-r">
        <CreateMessageGroupNavigation />

        <h2 className="text-[#212121] font-semibold text-[16px] my-6 pl-6 uppercase font-inter">
          Friends
        </h2>

        <div className="flex items-center flex-col">
          {friendsData.map((data, index) => (
            <FriendList
              {...data}
              key={`friend-number-${index}`}
              renderCheckbox={false}
              renderChatbox={false}
            />
          ))}
        </div>
      </section>

      <section className="flex-[60%] md:flex-1 flex flex-col bg-[#F7F7FD] pb-5">
        <ChatHeader />

        <section className="w-full py-3 px-6">
          <div className="sticky top-3 font-inter flex items-center justify-center my-3">
            <span className="text-center font-base text-[#303036] font-normal bg-[#fdfdfd] shadow-md px-6 py-2">
              Feb 12. 11:24 pm
            </span>
          </div>
          <div className="w-full flex flex-col gap-4">
            <p className="bg-[#BDEDFF] w-full md:w-1/2 p-3 justify-start text-wrap rounded-t-lg rounded-br-lg text-[#484851] font-normal text-sm md:text-base">
              Sorry, I didn’t hear my phone ring. I didn’t see you at the Cloud
              3 code conference. It was crazy. Harbert was a guest speaker babe.
            </p>
            <p className="bg-[#00ADEF] w-full md:w-1/2 p-3 justify-end text-wrap rounded-t-lg	rounded-bl-lg self-end text-[#FFFFFF] font-normal text-sm md:text-base">
              What happened to your phone. I’ve been calling about Hooker’s
              project
            </p>
            <Image
              src={"/images1/chatRoomImage.svg"}
              alt="profile picture"
              width={150}
              height={150}
              className="justify-start rounded-lg self-start"
            />
            <p className="bg-[#00ADEF] w-full md:w-1/2 p-3 justify-end text-wrap rounded-t-lg	rounded-bl-lg self-end text-[#FFFFFF] font-normal text-sm md:text-base">
              Dang! Bro, you look goo. What conference was that again?
            </p>
          </div>
        </section>

        <section className="relative w-full bottom-0 h-[50px] px-6">
          <div className="absolute top-4 left-8 px-1">
            <Image
              src={"/images1/smiley.svg"}
              alt="profile picture"
              width={40}
              height={40}
              className="w-full h-full rounded-full bg-cover"
            />
          </div>
          <input
            type="text"
            placeholder="Message..."
            className="w-full border bg-[#F7F7FD] h-full outline-none rounded-xl py-2 pl-8 pr-28 placeholder:text-[#424242] placeholder:text-sm placeholder:font-inter"
          />
          <div className="absolute top-4 right-8 flex items-center gap-4 px-2">
            <Image
              src={"/images1/chatMic.svg"}
              alt="profile picture"
              width={15}
              height={15}
            />
            <Image
              src={"/images1/chatImage.svg"}
              alt="profile picture"
              width={15}
              height={15}
            />
            <Image
              src={"/images1/chatAttach.svg"}
              alt="profile picture"
              width={15}
              height={15}
            />
          </div>
        </section>
      </section>
    </div>
  );
};

export default ChatRoom;
