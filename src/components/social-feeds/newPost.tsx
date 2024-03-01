import React from "react";
import Image from "next/image";

interface ISubComment {
  innerPostSrc: string;
  innerPostComment: string;
  innerPostlike: number;
  innerPostreply: number;
}

interface INewPostProps {
  posterImage: string;
  posterName: string;
  postedDate: string;
  postedTime: string;
  writeUp: string;
  postImage: string;
  like?: number;
  comment?: number;
  share?: number;
  subComments: ISubComment[];
}

const NewPost = ({
  posterImage,
  posterName,
  postedTime,
  postedDate,
  writeUp,
  postImage,
  like,
  share,
  comment,
  subComments,
}: INewPostProps) => {
  return (
    <section className="border rounded-lg">
      <blockquote className="flex items-start gap-2 p-3">
        <div>
          <Image
            src={posterImage}
            alt="profile picture"
            width={40}
            height={40}
          />
        </div>
        <div className="text-[#424242]">
          <h2 className="font-semibold text-base">{posterName}</h2>
          <p className="text-[12px] font-medium flex items-center gap-4">
            {postedDate} <span className="font-normal">{postedTime}</span>
          </p>
        </div>
      </blockquote>

      <div className="my-5 px-5 flex flex-col gap-3">
        <h3 className=" text-wrap font-semibold text-[12px] text-[#424242] leading-4 ">
          {writeUp}
        </h3>
        <Image
          src={postImage}
          alt="profile picture"
          width={200}
          height={200}
          className="w-full h-full rounded bg-cover"
        />
      </div>

      <div className="border-t w-full flex items-center gap-5 text-sm font-inter text-[#424242] py-4 px-3">
        <div className="flex items-center gap-1">
          <Image
            src={"/images1/like.svg"}
            alt="profile picture"
            width={20}
            height={20}
            className="w-full h-full rounded-full bg-cover"
          />
          <span>{like}</span>
          <span>Like</span>
        </div>
        <div className="flex items-center gap-1">
          <Image
            src={"/images1/comment.svg"}
            alt="profile picture"
            width={20}
            height={20}
            className="w-full h-full rounded-full bg-cover"
          />
          <span>{comment}</span>
          <span>Comments</span>
        </div>
        <div className="flex items-center gap-1">
          <Image
            src={"/images1/share.svg"}
            alt="profile picture"
            width={20}
            height={20}
            className="w-full h-full rounded-full bg-cover"
          />
          <span>{share}</span>
          <span>Shares</span>
        </div>
      </div>

      <div className="flex w-full items-center gap-y-2 flex-col border-t border-b p-4">
        <div className="flex flex-col w-full items:start md:items-center md:flex-row gap-4 my-4">
          <Image
            src={"/images1/profileImage.svg"}
            alt="profile picture"
            width={40}
            height={40}
          />
          <input
            type="text"
            className="border text-sm text-[#424242] p-3 rounded-lg  bg-[#F7F7FD] rounded-tr-lg rounded-bl-lg h-full w-full outline-none  placeholder:text-[#424242] placeholder:text-sm placeholder:font-inter"
            placeholder="Write Something..."
          />
        </div>

        {subComments.map(
          (
            { innerPostSrc, innerPostComment, innerPostlike, innerPostreply },
            index
          ) => (
            <div
              key={index}
              className="flex flex-col gap-4 md:flex-row items-start"
            >
              <Image
                src={innerPostSrc}
                alt="profile picture"
                width={40}
                height={40}
              />

              <div className="flex flex-col gap-3 items-start">
                <div className="bg-[#DFDFF7] text-[#60606C] rounded p-3 text-[12px] font-normal">
                  {innerPostComment}
                </div>
                <div className="flex items-center gap-2 text-sm font-normal">
                  <Image
                    src={"/images1/likeIcon.svg"}
                    alt="profile picture"
                    width={15}
                    height={15}
                  />
                  <span>{innerPostlike}</span>
                  <span>Like</span>
                  <span>Reply</span>
                  <span>{innerPostreply}</span>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default NewPost;
