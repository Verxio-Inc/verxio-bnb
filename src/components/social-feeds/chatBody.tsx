import Image from "next/image";

const ChatBody = () => {
  return (
    <section className="w-full py-3 px-6  max-h-[450px] overflow-y-scroll">
      <div className="sticky top-3 font-inter flex items-center justify-center my-3">
        <span className="text-center text-xs text-[rgb(48,48,54)] font-normal bg-[#fdfdfd] shadow-md px-4 py-2">
          Feb 12. 11:24 pm
        </span>
      </div>
      <div className="w-full flex flex-col gap-4">
        <p className="bg-[#BDEDFF] w-full md:w-1/2 p-3 justify-start text-wrap rounded-t-lg rounded-br-lg text-[#484851] font-normal text-sm md:text-base">
          Sorry, I didn’t hear my phone ring. I didn’t see you at the Cloud 3
          code conference. It was crazy. Harbert was a guest speaker babe.
        </p>
        <p className="bg-[#00ADEF] w-full md:w-1/2 p-3 justify-end text-wrap rounded-t-lg	rounded-bl-lg self-end text-[#FFFFFF] font-normal text-sm md:text-base">
          What happened to your phone. I’ve been calling about Hooker’s project
        </p>
        <Image
          src={"/images1/chatRoomImage.svg"}
          alt="profile picture"
          width={150}
          height={150}
          className="justify-start rounded-lg self-start"
        />
        <p className="bg-[#00ADEF] w-full md:w-1/2 p-3 justify-end text-wrap rounded-t-lg	rounded-bl-lg self-end text-[#FFFFFF] font-normal text-sm md:text-base">
          Dang! Bro, you look goo. What conference was that again?
        </p>
      </div>
    </section>
  );
};

export default ChatBody;
