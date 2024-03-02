"use client";
import Image from "next/image";
import React from "react";
import Thumbsup from "../assets/thumbs-up.svg";
import Thumbsdown from "../assets/thumbs-down.svg";
import { useContractWrite } from "wagmi";
import { VerxioCreateTask } from "./abi/verxioTask.json"


const LikeButtons = ({
  upVote,
  upVoteValue,
  downVote,
  downVoteValue,
  id,
}) => {

  const {
    write: upvoteTask,
  } = useContractWrite({
    abi: VerxioCreateTask,
    address: '0x1f6A37FECCB212859Cd4184BdD059b304885f8b5',
    functionName: 'upvoteTask',
    args: [
      id
    ],
  });

  const {
    write: downvoteTask,
  } = useContractWrite({
    abi: VerxioCreateTask,
    address: '0x1f6A37FECCB212859Cd4184BdD059b304885f8b5',
    functionName: 'downvoteTask',
    args: [
      id
    ],
  });

  const handleUpvoteClick = async () => {
    console.log("Handling upvote click");
    try {
      upvoteTask()
    } catch (error) {
      console.error("Error upvoting post:", error);
      // Handle error or provide user feedback
    }
  };

  const handleDownVoteClick = async () => {
    try {
      downvoteTask()
    } catch (error) {
      console.error("Error downvoting post:", error);
      // Handle error or provide user feedback
    }
  };

  return (
    <div className="flex border rounded-lg px-4 py-2 border-[#B6B8EC] items-center bg-[#F7F7FD]">
      <div className="flex gap-2 items-center border-r pr-2 mr-2">
        <Image
          alt="like it"
          src={Thumbsup}
          className="cursor-pointer"
          onClick={() => handleUpvoteClick()}
        />
        <p className="text-[12px] mt-2">{upVoteValue}</p>
      </div>
      <div className="flex gap-2 items-center">
        <p className="text-[12px] mt-2">{downVoteValue}</p>
        <Image
          alt="dislike it"
          src={Thumbsdown}
          className="cursor-pointer mt-1"
          onClick={() => handleDownVoteClick()}
        />
      </div>
    </div>
  );
};

export default LikeButtons;
