import React from 'react'
import Image from "next/image";


const ChatHeader = () => {
  return (
    <blockquote className="flex border items-center w-full justify-between py-2 px-6 shadow-sm rounded-tr-lg ">
    <section className="flex items-center gap-3">
      <div>
        <Image
          src={"/images1/chatAvatar.svg"}
          alt="profile picture"
          width={20}
          height={20}
          className="w-full h-full rounded-full bg-cover"
        />
      </div>

      <div>
        <h2 className="text-[#424242] font-medium text-sm">
          Okpara Tekhila
        </h2>
        <p className="text-sm text-[#0089BD] font-normal">
          @TakTon
        </p>
        <span className="font-light text-xs">Active 5m ago</span>
      </div>
    </section>

    <div className="flex items-center gap-4">
      <Image
        src={"/images1/callIcon.svg"}
        alt="profile picture"
        width={20}
        height={20}
      />
      <Image
        src={"/images1/videoIcon.svg"}
        alt="profile picture"
        width={20}
        height={20}
      />
    </div>
  </blockquote>
  )
}

export default ChatHeader