import Image from "next/image";
import Link from "next/link";

interface IproposalProps {
  id: number;
  imgScr: string;
  userId: string;
  statusText: string;
  proposedCount: number;
  proposalName: string;
  description: string;
  like: string;
  dislike: string;
  time: string;
  status: string;
}
[];

const Proposal = ({
  id,
  imgScr,
  userId,
  statusText,
  proposedCount,
  proposalName,
  description,
  like,
  dislike,
  time,
  status,
}: IproposalProps) => {
  return (
    <Link
        href={`/dashboard/dao-proposal/${id}`}
      className="relative inline-block w-full border rounded p-4 space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src={imgScr} alt="profile picture" width={40} height={40} />
          <p className="text-[#424242] font-normal text-sm md:text-base">
            {userId}
          </p>
          <button
            className={`text-base font-normal py-[10px] px-4 rounded-lg bg-[#DDF4CE]  text-[#489419] border border-[#489419] ${
              status === "nonactive" && " text-red-500 border border-red-500"
            } `}
          >
            {statusText === "active" ? "Active" : "Not Active"}
          </button>
        </div>

        <p className="text-[#424242] font-semibold text-sm md:text-base">
          {" "}
          Proposed Count: <span className="font-normal">
            {proposedCount}
          </span>{" "}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-[#424242] font-semibold text-base md:text-xl capitalise">
          {proposalName}
        </h2>
        <p className="line-clamp-3 text-base">{description}</p>
      </div>

      <section className="flex items-center justify-between">
        <div className="flex gap-3 items-center border rounded-lg px-6 py-2 text-[#000000]">
          <p className="flex items-center gap-2 cursor-pointer">
          <Image src={"/images1/upvote.svg"} alt="profile picture" width={20} height={20} />
            {like}
            </p>
          <p className="flex items-center gap-2 cursor-pointer">
            {dislike}
          <Image src={"/images1/downvote.svg"} alt="profile picture" width={20} height={20} />
            </p>
        </div>
        <p className="text-[#3D41CC] font-semibold">{time}</p>
      </section>
    </Link>
  );
};

export default Proposal;
