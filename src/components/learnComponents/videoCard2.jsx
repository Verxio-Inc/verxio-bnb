import Image from "next/image";
import React from "react";
import ManVR from "../../assets/manVR.png";
import LikeButtons from "../likeButtons";
import CommentButton from "../commentButton";
import Button from "../Button";

const VideoCard2 = () => {
  return (
    <div className="flex gap-8 border rounded-2xl px-8 py-6 mb-5">
      {/* <Image alt="person with VR" src={ManVR} /> */}
      <iframe
        width="500"
        height="180"
        src={`https://www.youtube.com/embed/OLtvLGgoztA?si=9SVHJ9v7VslNjn3Q`}
        title="YouTube video player"
        // frameborder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
        // allowfullscreen
      ></iframe>

      <div className="flex flex-col w-[80%] ">
        <p className="font-semibold text-[24px] text-[#303036] mb-3">
        How To Bridge to opBNB From BNB Chain (BSC)
        </p>
        <p className="text-[16px]  text-[#484851]">
        It takes around 1min currently to bridge over to opBNB from BSC. 
        You need BNB on the BNB chain then you can visit the official website, 
        follow the video as I do and you will have your BNB on opBNB.
        </p>
        <p className="text-[#60606C] text-[12px]">
        Kader Calls, Software Engineer at Verxio Protocol
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

export default VideoCard2;
