"use client";

import JobCard from "../../../components/jobComponent/JobCard";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useContractRead } from "wagmi";
import  { VerxioCreateTask } from '../../../components/abi/verxioTask.json'

const Page = () => {
  const [jobs, setJobs] = useState([]);
  const user = useSelector((state) => state.persistedReducer.user.userValue);
  const userProfile = useSelector(
    (state) => state.persistedReducer.user.userProfile
  );

  const { data } = useContractRead({
    address: "0x1f6A37FECCB212859Cd4184BdD059b304885f8b5",
    abi: VerxioCreateTask,
    functionName: "getAllTasks",
  });

  useEffect(() => {
    setJobs(data?.slice().reverse());
  }, [data]);


  return (
    <div className="border p-[32px] rounded-2xl">
      <h2 className="text-primary text-[28px] font-semibold mb-[32px] capitalize">
        Welcome back {userProfile?.firstName}
      </h2>
      {jobs?.map((item) => (
        <JobCard key={item.taskId.toString()} jobs={item} />
      ))}
    </div>
  );
};

export default Page;
