import Link from "next/link";
import React from "react";

const SubmissionCard = ({ item, selectUser, ischecked }) => {
  // const { firstName, bio, date, description } = item;

  const {
    proposerFirstName,
    proposerLastName,
    proposerBio,
    jobTitle,
    proposerResume,
    proposerPortfolio,
    proposalText,
    submissionTime,
  } = item;

  const milliseconds = Number(submissionTime) * 1000; 
  const date = new Date(milliseconds).toLocaleString("default", { month: "short" , day:"2-digit"});

  return (
    <div className="flex align-top gap-4 border rounded-2xl p-7 bg-[#F7F7FD] mb-6">
      <div>
        <div className="border w-[89px] h-[89px] bg-gray-600 rounded-full"></div>
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <div>
            <div className="flex gap-1">
              <p className="text-[20px] font-bold text-[#18181B]">
                {proposerFirstName}
              </p>
              <p className="text-[20px] font-bold text-[#18181B]">
                {proposerLastName}
              </p>
            </div>
            <p className="text-[16px] font-normal text-[#484851]">
              {proposerBio}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <p>{date}</p>
            <input
              type="checkbox"
              className="w-9"
              checked={ischecked}
              onChange={() => selectUser(item)}
            />
          </div>
        </div>
        <br/>
        <p className="font-bold text-[#18181B] text-[16px]">{"Job Title: "} {jobTitle}</p>
        <p className="text-[#484851] mt-3 mb-5"><strong>Job Proposal:</strong> {proposalText}</p>

        <div className="flex gap-8">
          {proposerResume && (
            <Link
              href={proposerResume}
              className="px-4 py-3 shadow-md bg-white rounded-[8px] italic"
            >
              Applicant resume
            </Link>
          )}

          {proposerPortfolio && (
            <Link
              href={proposerPortfolio}
              className="px-4 py-3 shadow-md bg-white rounded-[8px] italic"
            >
              Applicant portfolio
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionCard;
