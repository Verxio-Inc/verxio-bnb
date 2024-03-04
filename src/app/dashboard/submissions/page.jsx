"use client";
import React, { useState, useEffect } from "react";
import Button from "../../../components/Button";
import SubmissionCard from "../../../components/submissionCard";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { VerxioCreateTask } from '../../../components/abi/verxioTask.json';
import { useContractRead } from "wagmi";

const Page = () => {
  const [assignees, setAssignees] = useState([]);
  const [isCheckeds, setIscheckeds] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formattedSubmissions, setFormattedSubmissions] = useState([]);
  
  const user = useSelector((state) => state.persistedReducer.user.userValue);
  
  const { data } = useContractRead({
    address: "0x1f6A37FECCB212859Cd4184BdD059b304885f8b5",
    abi: VerxioCreateTask,
    functionName: "getAllTaskSubmissions",
  });

  useEffect(() => {
    setSubmissions(data);
  }, [data]);

  useEffect(() => {
    const fetchFormattedSubmissions = async () => {
      try {
        const formattedSubmissions = await Promise.all((submissions ?? []).map(async (submission) => {
          const {
            jobPoster,
            jobRequirements,
            jobDescription,
            jobResponsibilities,
            jobTitle,
            taskId,
            proposals,
          } = submission;

          if (proposals && proposals.length > 0) {
            const formattedProposals = await Promise.all(proposals.map(async (proposal) => {
              const { submissionTime, proposer, proposalText } = proposal;
  
              try {
                const response = await fetch(
                  `https://verxio-backend.vercel.app/api/v1/profiles/${proposer}`
                );
                const applicantData = await response.json();
  
                return {
                  jobPoster,
                  jobRequirements,
                  jobResponsibilities,
                  jobDescription,
                  jobTitle,
                  taskId,
                  submissionTime,
                  proposer,
                  proposalText,
                  proposerFirstName: applicantData.user.firstName,
                  proposerLastName: applicantData.user.lastName,
                  proposerBio: applicantData.user.bio,
                  proposerPortfolio: applicantData.user.website,
                  proposerResume: applicantData.user.powUrl
                };
              } catch (error) {
                console.error("Error fetching owner details:", error);
                return null;
              }
            }));
  
            return formattedProposals; 
          } else {
            return null; 
          }
        }));
  
      const filteredSubmissions = formattedSubmissions.filter(submission => submission !== null);
      const flattenedSubmissions = filteredSubmissions.flat();
      setFormattedSubmissions(flattenedSubmissions);

        console.log("formatted", formattedSubmissions)
      } catch (error) {
        console.error("Error processing submissions:", error);
      }
    };

    if (submissions?.length > 0) {
      fetchFormattedSubmissions();
    }
  }, [submissions]);
  


  const selectUser = (item) => {
    setIscheckeds(!isCheckeds);

    const existingitem = assignees.findIndex(
      (existingItem) => existingItem.id === item.id
    );

    if (existingitem !== -1) {
      assignees.splice(existingitem, 1);
    } else {
      setAssignees([...assignees, item]);
    }
  };

  console.log("assignees", assignees);

  const handleAssignButtonClick = async () => {
    setLoading(true);
    try {
      if (assignees.length > 0) {
        console.log("Assigning task...");

        console.log("Project assignment done.");
        toast.success('Assignment successfull')
      } else {
        console.log(
          "No items assigned. Please select at least one item before clicking Assign."
          );
          toast.info("Please select at least one item ");
      }
    } catch (error) {
      console.error("Error assigning items:", error);
      toast.error('Assignment failed')
    }
    setLoading(false);
  };

  return (
    <div className="border rounded-lg px-[41px] py-[37px] h-full">
      <div className="flex justify-between mb-9 ">
        <h2 className="text-primary text-[28px] font-semibold capitalize">
          Submissions
        </h2>
        {activeTab === 1 && (
          <Button outline name="assign" isLoading={loading} onClick={handleAssignButtonClick} />
        )}
      </div>
      <div className="flex gap-5 mb-7">
        <Button
          name="job posted"
          outline={activeTab !== 1}
          onClick={() => setActiveTab(1)}
          className={
            activeTab === 1
              ? "text-[#00ADEF] bg-[#00ADEF]/10 rounded-[0px] "
              : "text-[#60606C] bg-transparent rounded-[0px]"
          }
        />
        <Button
          name="job applied"
          outline={activeTab !== 2}
          onClick={() => setActiveTab(2)}
          className={
            activeTab === 2
              ? "text-[#00ADEF] bg-[#00ADEF]/10 rounded-[0px] "
              : "text-[#60606C] bg-transparent rounded-[0px]"
          }
        />
      </div>

      {activeTab === 1 &&
        formattedSubmissions
          .filter((item) => item.jobPoster === user.address)
          .map((item) => {
            return (
              <SubmissionCard
                key={item.taskId.toString()}
                item={item}
                selectUser={selectUser}
                isChecked={isCheckeds}
              />
            );
          })}
      {activeTab === 2 &&
        formattedSubmissions
          .filter((item) => item.proposer === user.address)
          .map((item) => {
            return (
              <SubmissionCard
                key={item.taskId.toString()}
                item={item}
                selectUser={selectUser}
                isChecked={isCheckeds}
              />
            );
          })}

    </div>
  );
};

export default Page;
