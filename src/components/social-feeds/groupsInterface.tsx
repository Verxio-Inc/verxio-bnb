// import Image from "next/image";

interface GroupInterfaceIProps {
  //   groupImages: string[];
  groupName: string;
  memberCount: number;
  lastActive: number;
  timeStamp: string;
}

const GroupsInterface = ({
  //   groupImages,
  groupName,
  memberCount,
  lastActive,
  timeStamp,
}: GroupInterfaceIProps) => {
  return (
    <section className="w-full px-6 py-3 border-[#d4d4da] border-b flex items-center justify-between cursor-pointer transition duration-300 hover:bg-[#DEDEF7]">
      <blockquote className="flex items-start gap-2">
        {/* <div className="flex items-center mx-[-13px] border border-red-500">
          {groupImages.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt="groups"
              width={40}
              height={40}
              className="w-full h-full rounded-full bg-cover ml-[-20px]"
            />
          ))}
        </div> */}
        <div>
          <h2 className="text-[#424242] capitalize font-semibold text-base text-wrap">
            {groupName}
          </h2>
          <p className="text-[12px] text-[#0089BD] font-normal flex items-center gap-4">
            {`${memberCount} members`}
          </p>
        </div>
      </blockquote>

      <div className="flex flex-col gap-y-3 items-end">
        <button className="text-[12px] font-semibold text-[#FBFBFE] bg-[#0089BD] px-2 py-1 rounded-2xl">
          {lastActive}
        </button>
        <p className="font-light text-[12px] text-[#303036]">{timeStamp}</p>
      </div>
    </section>
  );
};

export default GroupsInterface;
