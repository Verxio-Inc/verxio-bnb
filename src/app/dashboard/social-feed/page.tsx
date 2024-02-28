"use client";
import { friendsData } from "../../..//components/social-feeds/data";
import FriendList from "../../../components/social-feeds/friendList"

const page = () => {
  return (
    <>
      <h2 className="text-[#212121] font-semibold text-[16px] my-6 pl-6 uppercase font-inter">
        Friends
      </h2>

      <div className="flex items-center flex-col">
        {friendsData.map((data, index) => (
          <FriendList
            {...data}
            key={`friend-number-${index}`}
            renderCheckbox={false}
          />
        ))}
      </div>
    </>
  );
};

export default page;

// const sendImages = [
//   "/images1/sendImage1.svg",
//   "/images1/sendImage4.svg",
//   "/images1/sendImage3.svg",
//   "/images1/sendImage4.svg",
// ];

//  <section className="relative flex-[60%] flex flex-col gap-y-5">
//           <h1 className="text-[#212121] font-semibold text-[20px] font-inter">
//             Share Something With Us
//           </h1>

//           <section className="flex flex-col relative bg-[#F7F7FD] p-4 border rounded-xl h-[420px] w-full">
//             <div className="bg-[#F7F7FD] h-18  flex rounded items-center">
//               <Image
//                 src={"/images1/profileImage.svg"}
//                 alt="profile picture"
//                 width={40}
//                 height={40}
//               />
//               <input
//                 type="text"
//                 placeholder="What happened today?"
//                 className="bg-[#F7F7FD] pl-4 outline-none border-none w-full h-full placeholder:text-[#424242] placeholder:text-sm placeholder:font-inter"
//               />

//               <div className="flex items-center gap-3">
//                 <Image
//                   src={"/images1/threeDots.svg"}
//                   alt="profile picture"
//                   width={20}
//                   height={20}
//                 />
//                 <Image
//                   src={"/images1/smiley.svg"}
//                   alt="profile picture"
//                   width={20}
//                   height={20}
//                 />
//                 <Image
//                   src={"/images1/attachFiles.svg"}
//                   alt="profile picture"
//                   width={20}
//                   height={20}
//                 />
//               </div>
//             </div>

//             <div className="absolute bottom-5 left-[15%] items-center justify-center mx-auto flex items center gap-6">
//               {sendImages.map((image, index) => (
//                 <Image
//                   key={index}
//                   src={image}
//                   alt="profile picture"
//                   width={60}
//                   height={60}
//                   className="cursor-pointer hover:scale-75 transition duration-300 ease-in-out"
//                 />
//               ))}
//               <button className="bg-[#00ADEF] px-8 py-3 rounded-lg text-[#fff]">
//                 Send
//               </button>
//             </div>
//           </section>
// </section> 