"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserProfile } from "../../../slices/userSlices";
import {  toast } from "react-toastify";

const Page = () => {
  const user = useSelector((state) => state.persistedReducer.user.userValue);
  const userProfile = useSelector(
    (state) => state.persistedReducer.user.userProfile
  );
  const router = useRouter();
  const dispatch = useDispatch();

  console.log("main", user);

  useEffect(() => {
    if (!user?.address) {
      router.push("/");
    } else if (Object.keys(userProfile).length === 0) {
      toast.info("Pls create account");
      router.push("/dashboard/settings");
    } else {
      router.push("/dashboard/earn");
    }
  }, [user?.address, userProfile]);

  if (
    !user ||
    !user.address ||
    !userProfile ||
    userProfile === false
  ) {
    return null; 
  }
};

export default Page;
