"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import Ethereum from "../../assets/ethereum.svg";
import Solana from "../../assets/solana-logo.svg";
import USDC from "../../assets/usdc-logo.svg";
import USDT from "../../assets/usdt-logo.svg"
import PaperClip from "../../assets/paperclip.svg";
import HardDrive from "../../assets/hard-drive.svg";
import LinkIcon from "../../assets/link.svg";
import DescListCard from "./descListCard";
import { useSelector } from "react-redux";
import LikeButtons from "../likeButtons";
import CommentButton from "../commentButton";
import { CloseCircle } from "iconsax-react";
import { toast } from "react-toastify";
import BNB from "../../assets/bnb-bnb-logo.svg";
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { VerxioCreateTask } from "../abi/verxioTask.json";

const JobDescription = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userProposal, setUserProposal] = useState("");
  const [loading, setLoading] = useState(false);
  const [upVoteValue, setUpVoteValue] = useState(0)
  const [downVoteValue, setDownVoteValue] = useState(0)

  const data = useSelector(
    (state) => state.persistedReducer.jobValues.jobDetails
  );

  // console.log(data);

  const userProfile = useSelector(
    (state) => state.persistedReducer.user.userProfile
  );
  // console.log(data)
  // console.log(userProfile)
  const { config } = usePrepareContractWrite({
    abi: VerxioCreateTask,
    address: '0x1f6A37FECCB212859Cd4184BdD059b304885f8b5',
    functionName: 'submitTaskApplication',
    args: [
      data.taskId,
      userProposal
    ],
  })
    const {
      data: taskProposalData,
      isLoading: submittingTaskProposal,
      isSuccess: taskProposalSubmitted,
      write: submitTaskProposal,
      isError: submittingTaskProposalError,
    } = useContractWrite(config);

  const toggleModal = async () => {
    // setIsModalOpen(!isModalOpen);
    setLoading(true);
    // try {
    //   if (userProposal.trim() !== "") {
    //     const submissionData = {
    //       ...data,
    //       applicantProposal: userProposal,
    //       applicantFirstName: userProfile?.firstName,
    //       applicantLastName: userProfile?.lastName,
    //       applicantBio: userProfile?.bio,
    //       applicantPortfolio: userProfile?.website,
    //       applicantResume: userProfile?.powUrl,
    //       applicantId: userProfile?._id,
    //     };
    //     console.log("Submission Data", submissionData);
    //     console.log("Submitting task proposal...");


    //     console.log("Submission successful");
    //     toast.success("Submission successful");
    //     setLoading(false);
    //   }
    // } catch (error) {
    //   console.error("Task submission error:", error);
    //   toast.error("Submission Failed");
    //   setLoading(false);
    // }

    try {
      const transaction = submitTaskProposal();
      toast.success("You've successfuly applied for the task.");
      setLoading(false);
    } catch (submittingTaskProposalError) {
      console.error("Task Error:", submittingTaskProposalError);
      toast.error('Task Submission Failed.')
      setLoading(false);
    }
  };


  const handleProposalChange = (event) => {
    setUserProposal(event.target.value);
  };

  const logo = (coin) => {
    if (coin === "etherum") {
      return Ethereum;
    } else if (coin === "BNB") {
      return BNB;
    }else if (coin === "solana") {
      return Solana;
    } else if (coin === 'USDT'){
    return USDT;
  } else if (coin === 'USDC'){
    return USDC;
  }
  };


  const formatNumberWithCommas = (number) => {
    if (isNaN(number)) {
      return number; // Return as is if not a valid number
    }
    return parseFloat(number).toLocaleString();
  };

  return (
    <>
      <div>
        <div className="border border-[#B6B8EC bd-[#FFFFFF] px-[22px] py-[16px] rounded-2xl shadow mb-[34px]">
          <div className="flex justify-between ">
            <div className=" flex gap-4">
              <div>
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-8 aspect-square object-cover rounded-full border" />
              </div>
              <div className="flex flex-col">
                <p className="text-[#020202] text-[18px] font-semibold capitalize">
                  {/* Trail Bitz Company */}
                  {data?.jobTitle}
                </p>
                <p className="font-normal text-[14px] text-[#424242]">
                  {data.ownerBio}
                </p>
              </div>
            </div>
            <div className="flex border rounded-lg px-4 py-2 border-[#B6B8EC] items-center gap-2">
              <p className="text-[14px] font-medium mt-1">{formatNumberWithCommas(data.prizePoolAmount.toString())}</p>
              {/* <span className="text-[8px] mr-1">$300</span> */}
              <Image
                alt="Ethereum"
                src={logo(data.paymentToken)}
                className="w-[20px]"
              />
            </div>
          </div>
          <div className=" flex gap-[24px] mt-[22px] items-center">
          <LikeButtons id={data.taskId} upVoteValue={data.upvotes} downVoteValue={data.downvotes}  />
            <CommentButton />
          </div>
        </div>
        <div className="border border-[#B6B8EC bg-[#FFFFFF] shadow rounded-2xl p-[30px]">
          <DescListCard label="Job Description" value={data.jobDescription} />
          <DescListCard
            label="responsibilities"
            value={data.jobResponsibilities}
          />
          <DescListCard label="requirements" value={data.jobRequirements} />
          <DescListCard label="reward pool" value={data.jobRewardPool} />
        </div>
        <div className="flex gap-5 mt-[56px] justify-end">
          <Button outline name="Submissions" href="/dashboard/submissions" />
          <Button name="Apply" onClick={() => setIsModalOpen(true)} />
        </div>
      </div>

      {isModalOpen && (
        <div className="absolute top-0 left-0 bottom-0 w-full h-screen bg-[rgba(0,0,0,0.1)] z-50 flex justify-center items-center ">
          <div className="bg-white p-[48px]">
            <div
              className="flex justify-end mb-4 cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              <CloseCircle />
            </div>
            <div className="border p-5 flex rounded-xl  flex-col">
              <div className="flex gap-3 items-center">
                <div>
                  <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-8 aspect-square object-cover rounded-full border" />
                </div>
                <input
                  className="outline-none bg-[#F2F4F3] rounded-[8px] p-3 text-[14px] "
                  placeholder="Write Something..."
                  value={userProposal}
                  onChange={handleProposalChange}
                />
              </div>
              <div className="flex justify-end gap-5 py-3">
                <Image alt="Hard-drive" src={HardDrive} />
                <Image alt="copy" src={PaperClip} />
                <Image alt="Link Icon" src={LinkIcon} />
              </div>
            </div>
            <div className="flex justify-end  mt-10">
              <Button
                name="Submit Now"
                isLoading={loading}
                onClick={toggleModal}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobDescription;
