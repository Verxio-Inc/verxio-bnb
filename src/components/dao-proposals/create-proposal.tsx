import Link from "next/link";

const CreateProposal = () => {
  return (
    <div className="flex items-center justify-between my-6">
      <p className="text-[#484851] font-semibold text-base md:text-[26px]">
        Proposals
      </p>

      <Link
        href={"/dashboard/dao-proposal/create-proposal"}
        className="text-[#00ADEF] rounded-lg font-normal px-6 py-2 border border-[#00ADEF]"
      >
        Create Proposal
      </Link>
    </div>
  );
};

export default CreateProposal;
