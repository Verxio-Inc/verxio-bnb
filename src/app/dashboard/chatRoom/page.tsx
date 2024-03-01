"use client";
import {
  ChatFooter,
  ChatBody,
  CreateMessageGroupNavigation,
  ChatHeader,
  friendsData,
  FriendList,
} from "../../../components/social-feeds";

const ChatRoom = () => {
  return (
    <div className="bg-[#F7F7FD] flex flex-col-reverse md:gap-0 gap-10 md:flex-row border-collapse">
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

      <section className="flex-[60%] md:flex-1 flex flex-col pb-5">
        <ChatHeader />
        <ChatBody />
        <ChatFooter />
      </section>
    </div>
  );
};

export default ChatRoom;
