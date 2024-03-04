import Image from "next/image";
import React from "react";
import ManVR from "../../assets/manVR.png";
import LikeButtons from "../likeButtons";
import CommentButton from "../commentButton";
import Button from "../Button";

const VideoCard1 = () => {
  return (
    <div className="flex gap-8 border rounded-2xl px-8 py-6 mb-5">
      {/* <Image alt="person with VR" src={ManVR} /> */}
      <iframe
        width="500"
        height="180"
        src={`https://www.youtube.com/embed/N006obmUQ3U?si=U81kguUG2BZPGeYY`}
        title="YouTube video player"
        // frameborder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
        // allowfullscreen
      ></iframe>

      <div className="flex flex-col w-[80%] ">
        <p className="font-semibold text-[24px] text-[#303036] mb-3">
        What Is OpBNB? A Guide to OpBNB’s Ecosystem
        </p>
        <p className="text-[16px]  text-[#484851]">
        A look at the fledging opBNB ecosystem — the layer-2 network for the BNB Chain, developed using the OP stack.
        </p>
        <p className="text-[#60606C] text-[12px]">
        CoinMarketCap, A Crypto News Hub.
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

export default VideoCard1;
