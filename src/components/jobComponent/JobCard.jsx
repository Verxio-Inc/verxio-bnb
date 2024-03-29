// "use client"
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Ethereum from "../../assets/ethereum.svg";
import USDC from '../../assets/usdc-logo.svg'
import USDT from '../../assets/usdt-logo.svg'
import Solana from "../../assets/solana-logo.svg";
import BNB from "../../assets/bnb-bnb-logo.svg"
import Button from "../Button";
import { setJobDetails } from "../../../slices/jobSlice";
import { useSelector, useDispatch } from "react-redux";
import LikeButtons from "../likeButtons";
import CommentButton from "../commentButton";

const JobCard = ({ jobs }) => {

  const dispatch = useDispatch();
  const [ownerDetails, setOwnerDetails] = useState(null);
  
  const data = {
    ...jobs,
    ownerFirstName: ownerDetails?.firstName,
    ownerLastName: ownerDetails?.lastName,
    ownerBio: ownerDetails?.bio,
  }

const milliseconds = Number(data.postedTime) * 1000;
const date = new Date(milliseconds);
const formattedDate = date.toLocaleString("default", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

// data.postedTime = formattedDate;
data.upvotes = data.upvotes.toString();
data.downvotes = data.downvotes.toString();
data.taskId = data.taskId.toString();
data.totalPeople = data.totalPeople.toString();
data.prizePoolAmount = data.prizePoolAmount.toString();

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

  useEffect(() => {
    const fetchOwnerDetails = async () => {
      try {
        const response = await fetch(
          `https://verxio-backend.vercel.app/api/v1/profiles/${jobs.jobPoster}`
        );
        const ownerData = await response.json();
        setOwnerDetails(ownerData.user);
      } catch (error) {
        console.error("Error fetching owner details:", error);
      }
    };

    fetchOwnerDetails();      
  }, [jobs.jobPoster]);

  const formatNumberWithCommas = (number) => {
    if (isNaN(number)) {
      return number; 
    }
    return parseFloat(number).toLocaleString();
  };


  return (
    <div className="bg-[#FFFFFF] px-[32px] py-[24px] rounded-2xl shadow mb-[34px]">
      <div className=" rounded-2xl bg-[#F7F7FD] p-[18px] cursor-pointer flex justify-between border">
        <div className=" flex gap-4">
          <div>
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-8 aspect-square object-cover rounded-full border" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#020202] text-[18px] font-semibold capitalize">
              {data?.jobTitle}
            </p>
            <p className="font-normal text-[14px] text-[#424242]">
              {data?.ownerFirstName} {data?.ownerLastName}
            </p>
            <p className="text-[#484851] font-normal text-[16px] truncate sm:max-w-[400px] lg:max-w-[750px]">
              {data?.jobDescription}
            </p>
          </div>
        </div>
        <p className="text-[#0B0B28] text-[16px] font-semibold capitalize">
          open 
          {/* {data?.status} */}
        </p>
      </div>
      <div className="flex justify-between mt-[22px] items-center">
        <div className=" flex gap-[24px] items-center">
          <LikeButtons id={data.taskId} upVoteValue={data.upvotes} downVoteValue={data.downvotes}  />
          <CommentButton />
        </div>
        <div className="flex gap-[24px] items-center">
          <div className="flex border rounded-lg px-4 py-2 border-[#B6B8EC] items-center gap-2">
            <p className="text-[14px] font-medium">{formatNumberWithCommas(data?.prizePoolAmount.toString())}</p>
            {/* <span className="text-[8px] mr-1">$300</span> */}
            <Image
              alt="Ethereum"
              src={logo(data.paymentToken)}
              className="w-[18px]"
            />
          </div>
          <Button
            href="/dashboard/earn/job-description"
            onClick={() => dispatch(setJobDetails(data))}
            outline
            name="Apply"
            className="text-[#00ADEF]"
          />
        </div>
      </div>
    </div>
  );
};

export default JobCard;
