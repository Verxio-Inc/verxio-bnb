"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditUser,
  setUserProfile,
  setUserValue,
} from "../../../slices/userSlices";
import { useRouter } from "next/navigation";
import Button from "../Button";
import { Logo } from "../atoms";
import {  toast } from "react-toastify";
import { ButtonConnect } from "../../components/connectButton"
import { useAccount } from 'wagmi'


const HomeHeader = () => {

  const { address, isConnected } = useAccount()
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.persistedReducer.user.userValue);
  const userProfile = useSelector(
    (state) => state.persistedReducer.user.userProfile
  );

  const [user2, setUser2] = useState(null);

  console.log("user", user);
  console.log("userProfile", userProfile);
  console.log("user2", user2);

  console.log("Account detail", address)


  const fetchData = async (value) => {
    try {
      const response = await fetch(
        `https://verxio-backend.vercel.app/api/v1/profiles/${value}`
      ); // Replace with your actual endpoint
      if (response.ok) {
        const responseData = await response.json();
        // console.log(responseData);
        dispatch(setUserProfile(responseData.user));
        setUser2(responseData.user);
        router.push("/dashboard");
        toast.success("Login Successfull");
      } else {
        console.error("GET request failed");
        // console.log(response.status);
        if (response.status === 404) {
          toast.info("Pls create account");
          router.push("/dashboard/settings");
        }
      }
      // return response;
    } catch (error) {
      console.log("Error occurred while fetching data:", error);
    }
  };
  const login = async () => {
    if (user?.address) {
      // If user has address
      if (userProfile !== null && userProfile !== false) {
        // If userProfile is not null or false, navigate to dashboard
        router.push("/dashboard");
        toast.success("Login Successfull");
      } else {
        // If userProfile is null or false, navigate to dashboard/settings
        
        router.push("/dashboard/settings");
        toast.info("Pls create account");
      }
    } else {
      // If no address, set user value and navigate to dashboard
      dispatch(setUserValue({ address }));
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex justify-between  items-center w-full h-[100px] px-[45px] py-[40px]">
      <Logo className="w-[48px]" />
      <div>
        <ul className="flex gap-6 font-normal text-[14px] text-white">
          <li>Home</li>
          <li>Find a job</li>
          <li>Learn</li>
          <li>DAO</li>
          <li>About us</li>
          <li>Contact us</li>
        </ul>
      </div>
      {isConnected ? (
        <Button
          name="enter app"
          onClick={() => {
            login();
          }}
          outline
          className="border-white text-[14px] text-white"
        />
      ) : (
        <ButtonConnect />
      )}
    </div>
  );
};

export default HomeHeader;
