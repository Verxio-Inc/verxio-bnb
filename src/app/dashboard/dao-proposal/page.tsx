import Image from "next/image";
import {
  Proposal,
  CreateProposal,
  daoProposalData,
} from "../../../components/dao-proposals";

const page = () => {
  return (
    <section>
      {/* firstUpper Section */}
      <section className="h-[208px] flex flex-col gap-12 p-8 bg-[#0D0E32] rounded">
        <div className="flex items-center justify-between">
          <p className="text-[#DFDFF7] border border-[#8E90E2] rounded-lg py-2 px-4 font-medium text-base md:text-[26px]">
            DOA Proposals
          </p>

          <div className="flex items-center gap-3">
            <p className="text-[#FBFBFE] font-semibold font-base">
              Passed: <span className="text-[#44A721] font-normal">40</span>
            </p>
            <p className="text-[#FBFBFE] font-semibold font-base">
              Failed: <span className="text-[#CE1212] font-normal">20</span>
            </p>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <Image
            src={"/images1/searchIcon.svg"}
            alt="profile picture"
            width={20}
            height={20}
            className="absolute top-3 right-[27%]"
          />
          <input
            type="text"
            placeholder="Search for DAOs and proposal"
            className="w-[520px] border border-[#00ADEF] font-normal rounded-full bg-transparent outline-none px-6 py-3 pl-6 text-[#DFDFF7]"
          />
        </div>
      </section>

      {/* Second Section  */}
      <CreateProposal />

      {/* Third component Section  */}
      <section>
        {!daoProposalData || daoProposalData.length == 0 ? (
          <div className="text-center flex items-center justify-center text-[#00ADEF] font-semibold text-base md:text-3xl">
            There are no proposals yet
          </div>
        ) : (
          <section className="flex flex-col gap-3">
            {daoProposalData?.map((data, index) => (
              <Proposal {...data} key={`proposal-${index}`} />
            ))}
          </section>
        )}
      </section>
    </section>
  );
};

export default page;
