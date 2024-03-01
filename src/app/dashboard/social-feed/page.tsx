"use client";
import { friendsData, FriendList } from "../../../components/social-feeds";

const page = () => {
  return (
    <>
      <h2 className="text-[#212121] font-semibold text-[16px] my-6 pl-6 uppercase font-inter">
        Friends
      </h2>

      <div className="flex items-center flex-col">
        {friendsData.map((data, index) => (
          <FriendList
            {...data}
            key={`friend-number-${index}`}
            renderCheckbox={false}
          />
        ))}
      </div>
    </>
  );
};

export default page;
