import React from "react";
import { groupInterfaceData } from "../../../../components/social-feeds/data";
import GroupsInterface from "../../../../components/social-feeds/groupsInterface";
import Link from "next/link";

const Groups = () => {
  return (
    <>
      <div className="flex items-center justify-between my-6 px-6">
        <h2 className="text-[#212121] font-semibold text-[16px] uppercase font-inter">
          Groups
        </h2>
        <Link href={'/social-feeds/groups'} className="border-2 py-[.4rem] px-6 border-[#00ADEF] text-[#00ADEF] font-inter text-base rounded-lg">
          Create Group
        </Link>
      </div>

      {groupInterfaceData.map((data, index) => (
        <GroupsInterface {...data} key={`group-interface-${index}`} />
      ))}
    </>
  );
};

export default Groups;
