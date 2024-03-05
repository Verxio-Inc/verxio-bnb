import Image from "next/image";
import { CreateProposal } from "../../../../components/dao-proposals";

const page = ({ params }: { params: { "proposal-id"?: string } }) => {

  // So basically here in the proposal id page, it was modelled such that 
  // this single page will be used to display the list of proposals using their ID dynamically
  return (
    <div>
      ID: {params?.["proposal-id"]}
      <CreateProposal />
      <section className="border p-0 md:p-[32px] rounded">
        <div className="flex items-center justify-between border-b pb-6">
          <blockquote className="flex items-start gap-3 flex-col">
            <div className="flex items-center gap-3">
              <Image
                src={"/images1/draco.svg"}
                alt="profile picture"
                width={40}
                height={40}
              />
              <p className="text-[#424242] font-normal text-sm md:text-base">
                Frank
              </p>
            </div>
            <div className="flex gap-3 items-center text-sm border rounded-lg px-6 py-2 text-[#000000]">
              <p className="flex items-center gap-2 cursor-pointer">
                <Image
                  src={"/images1/upvote.svg"}
                  alt="profile picture"
                  width={20}
                  height={20}
                />
                1.2k
              </p>
              <p className="flex items-center gap-2 cursor-pointer">
                1.2k
                <Image
                  src={"/images1/downvote.svg"}
                  alt="profile picture"
                  width={20}
                  height={20}
                />
              </p>
            </div>
          </blockquote>

          <blockquote className="flex items-end gap-3 flex-col">
            <button
              className={`text-base font-normal py-[6px] px-6 rounded-lg bg-[#DDF4CE]  text-[#489419] border border-[#489419]  `}
            >
              Active
            </button>

            <p className="text-[#3D41CC] font-semibold">16 hours ago</p>
            <p className="text-[#424242] font-semibold text-sm md:text-base">
              Proposed Count: <span className="font-normal">2463</span>
            </p>
          </blockquote>
        </div>

        <section className="flex flex-col gap-y-4 pt-6">
          <h2 className="text-[#424242] font-semibold text-base md:text-xl capitalise">
            Decentralised Investment Fund
          </h2>

          <div className="flex items-start flex-col gap-3">
            <h3 className="text-[#424242] font-semibold text-base md:text-xl capitalise">
              Objective:
            </h3>

            <p className="line-clamp-3 text-sm">
              To establish a decentralised investment fund managed by a DAO,
              allowing participants to collectively decide on investment
              strategies, asset allocations, and portfolio management,
              leveraging the power of blockchain technology and smart contracts.
            </p>
          </div>

          <div className="flex items-start flex-col gap-3">
            <h3 className="text-[#424242] font-semibold text-base md:text-xl capitalise">
              Overview:
            </h3>

            <p className="line-clamp-3 text-sm">
              The proposed DAO will operate as a collective investment vehicle,
              where members can contribute funds and collectively decide on
              investment decisions through voting mechanisms. The DAO will be
              governed by smart contracts, ensuring transparency, security, and
              immutability of transactions.
            </p>
          </div>
          
          <div className="flex items-start flex-col gap-3">
            <h3 className="text-[#424242] font-semibold text-base md:text-xl capitalise">
              Key Features:
            </h3>

            <div className="flex flex-col gap-y-3">
              <p className="text-sm">
                1. Membership: Any individual can become a member of the DAO by
                staking a certain amount of tokens (e.g., Ethereum or a custom
                token issued by the DAO). Members will have voting rights
                proportional to their stake.
              </p>
              <p className="text-sm">
                2. Membership: Any individual can become a member of the DAO by
                staking a certain amount of tokens (e.g., Ethereum or a custom
                token issued by the DAO). Members will have voting rights
                proportional to their stake.
              </p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default page;
