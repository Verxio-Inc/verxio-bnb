import Image from "next/image";

const ChatFooter = () => {
    return (
        <section className="relative w-full bottom-0 h-[50px] px-6">
        <div className="absolute top-4 left-8 px-1">
          <Image
            src={"/images1/smiley.svg"}
            alt="profile picture"
            width={40}
            height={40}
            className="w-full h-full rounded-full bg-cover"
          />
        </div>
        <input
          type="text"
          placeholder="Message..."
          className="w-full border bg-[#F7F7FD] h-full outline-none rounded-xl py-2 pl-8 pr-28 placeholder:text-[#424242] placeholder:text-sm placeholder:font-inter"
        />
        <div className="absolute top-4 right-8 flex items-center gap-4 px-2">
          <Image
            src={"/images1/chatMic.svg"}
            alt="profile picture"
            width={15}
            height={15}
          />
          <Image
            src={"/images1/chatImage.svg"}
            alt="profile picture"
            width={15}
            height={15}
          />
          <Image
            src={"/images1/chatAttach.svg"}
            alt="profile picture"
            width={15}
            height={15}
          />
        </div>
      </section>
    )
    }
    
    export default  ChatFooter;