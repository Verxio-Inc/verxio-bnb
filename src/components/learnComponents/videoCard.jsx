import Image from "next/image";
import React from "react";
import ManVR from "../../assets/manVR.png";
import LikeButtons from "../likeButtons";
import CommentButton from "../commentButton";
import Button from "../Button";

const VideoCard = () => {
  return (
    <div className="flex gap-8 border rounded-2xl px-8 py-6 mb-5">
      {/* <Image alt="person with VR" src={ManVR} /> */}
      <iframe
        width="500"
        height="180"
        src={`https://www.youtube.com/embed/kE-atXHNeV8?si=1JH8kjKWK7zsAG5i`}
        title="YouTube video player"
        // frameborder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
        // allowfullscreen
      ></iframe>

      <div className="flex flex-col w-[80%] ">
        <p className="font-semibold text-[24px] text-[#303036] mb-3">
        BNB Smart Chain Tutorial (Trust Wallet, MetaMask, Staking, Trading)
        </p>
        <p className="text-[16px]  text-[#484851]">
        In this workshop, you will learn how easily you can implement and 
            interact within the opBNB ecosystem.
        </p>
        <p className="text-[#60606C] text-[12px]">
        David Dal Busco, Software Engineer at Verxio Protocol
        </p>
        <div className="flex justify-between mt-5">
          <div className=" flex gap-[24px] items-center">
            <LikeButtons />
            <CommentButton />
          </div>
          <Button name="view lesson" outline href='/dashboard/learn/video-lesson' />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
