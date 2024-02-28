"use client";

import JobCard from "../../../components/jobComponent/JobCard";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useReadContract } from "wagmi";
import  { VerxioCreateTask } from '../../../components/abi/verxioTask.json'

const Page = () => {
  const [jobs, setJobs] = useState([]);
  const user = useSelector((state) => state.persistedReducer.user.userValue);
  const userProfile = useSelector(
    (state) => state.persistedReducer.user.userProfile
  );

  const { data } = useReadContract({
    address: "0x4c321A088EC43F5C9e246e4894798C7c77deb1e6",
    abi: VerxioCreateTask,
    functionName: "getAllTasks",
  });

  useEffect(() => {
    setJobs(data);
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
