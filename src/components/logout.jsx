import React from "react";
import Image from "next/image";
import SignOut from "../assets/SignOut.svg";
import { useDispatch } from "react-redux";
import { useDisconnect } from 'wagmi'
import {
  setUserValue,
  setUserProfile,
  setEditUser,
  resetState,
} from "../../slices/userSlices";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const { disconnect } = useDisconnect()
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    // signOut();
    disconnect()
    // dispatch(setUserValue({}));
    // dispatch(setUserProfile({}));
    // dispatch(setEditUser(false));
    dispatch(resetState());
    router.push("/");
  };

  return (
    <div
      onClick={handleLogout}
      className="flex items-center mx-auto w-[70%] gap-3 cursor-pointer"
    >
      <Image src={SignOut} alt="" />
      <p className="text-white">Logout</p>
    </div>
  );
};

export default LogoutButton;
