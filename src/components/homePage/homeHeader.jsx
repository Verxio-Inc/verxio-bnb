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
      );
      if (response.ok) {
        const responseData = await response.json();
        dispatch(setUserProfile(responseData.user));
        setUser2(responseData.user);
        return true; // User data fetched successfully
      } else if (response.status === 404) {
        toast.info("Please create an account");
        router.push("/dashboard/settings");
        return false; // User not found
      } else {
        console.error("GET request failed");
        return false; // Other errors
      }
    } catch (error) {
      console.log("Error occurred while fetching data:", error);
      return false; // Fetch error
    }
  };

  const login = async () => {
    if (user?.address) {
      const userExists = await fetchData(user.address);
      if (userExists) {
        // If user exists, navigate to dashboard
        router.push("/dashboard");
        toast.success("Login Successful");
      } else {
        // If user doesn't exist or fetch error, navigate to settings
        router.push("/dashboard/settings");
      }
    } else {
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
