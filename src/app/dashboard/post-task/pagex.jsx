"use client";
import { useState } from "react";
import Button from "../../../components/Button";
import * as Yup from "yup";
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { VerxioCreateTask } from '../../../components/abi/verxioTask.json';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Page = () => {
  const userProfile = useSelector(
    (state) => state.persistedReducer.user.userProfile
  );

  const user = useSelector((state) => state.persistedReducer.user.userValue);

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [totalPeople, setTotalPeople] = useState("");
  const [amount, setAmount] = useState("");
  const [jobType, setJobType] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [requirements, setRequirements] = useState("");
  const [reward, setReward] = useState("");

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    responsibilities: Yup.string().required("Responsibilities is required"),
    requirements: Yup.string().required("Requirement is required"),
    reward: Yup.string().required("Reward is required"),
    jobType: Yup.string().required("Job type is required"),
    paymentMethod: Yup.string().required("Please select payment method"),
    totalPeople: Yup.number().required("Please input amount"),
    amount: Yup.number().required("Please input amount"),
  });

  const { config } = usePrepareContractWrite({
    abi: VerxioCreateTask.abi,
    address: '0x1f6A37FECCB212859Cd4184BdD059b304885f8b5',
    functionName: 'createTask',
    args: [
      title,
      description,
      totalPeople,
      amount,
      jobType,
      paymentMethod,
      responsibilities,
      requirements,
      reward,
    ],
  });

  const {
    data: taskData,
    isLoading: isCreatingTask,
    isSuccess: isTaskCreated,
    write: submitTaskWrite,
    isError: isCreatingTaskError,
  } = useContractWrite(config);

  const submitValue = async () => {
    console.log("submitting...")
    setLoading(true);

    try {
      const transaction = submitTaskWrite();
      toast.success("Task created successfully.");
      setLoading(false);
    } catch (error) {
      console.error("Task Error:", error);
      toast.error('Task Upload Failed');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "responsibilities":
        setResponsibilities(value);
        break;
      case "requirements":
        setRequirements(value);
        break;
      case "reward":
        setReward(value);
        break;
      case "jobType":
        setJobType(value);
        break;
      case "paymentMethod":
        setPaymentMethod(value);
        break;
      case "totalPeople":
        setTotalPeople(value);
        break;
      case "amount":
        setAmount(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="border rounded-[8px] px-[90px] py-[50px]">
      <div className="border text-center w-full py-[65px] px-[94px] font-semibold text-[32px] rounded-lg bg-post-hero-img bg-no-repeat bg-cover  bg-[rgba(0,0,0,0.1)]">
        What{" "}
        <span className="text-[#00ADEF] border-b-[2px] border-[#00ADEF] italic">
          work call
        </span>{" "}
        do you have in mind today?
      </div>

      <form className="mt-6 flex flex-col gap-5 w-[80%]" onSubmit={(e) => { e.preventDefault(); submitValue(); }}>
        <div className="flex flex-col gap-3 text-16 ">
          <label htmlFor="title">Enter Task Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleInputChange}
            className="border outline-none rounded-[4px] border-black p-2"
          />
        </div>

        <div className="flex flex-col gap-3 text-16 ">
          <label htmlFor="description">Enter Task Description</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleInputChange}
            className="border outline-none rounded-[4px] border-black p-2 max-h-[90px]"
          />
        </div>

        <div className="flex flex-col gap-3 text-16 ">
          <label htmlFor="responsibilities">Enter Task Responsibilities</label>
          <textarea
            name="responsibilities"
            value={responsibilities}
            onChange={handleInputChange}
            className="border outline-none rounded-[4px] border-black p-2 max-h-[90px]"
          />
        </div>

        <div className="flex flex-col gap-3 text-16 ">
          <label htmlFor="requirements">Enter Task Requirements</label>
          <textarea
            name="requirements"
            value={requirements}
            onChange={handleInputChange}
            className="border outline-none rounded-[4px] border-black p-2 max-h-[90px]"
          />
        </div>

        <div className="flex flex-col gap-3 text-16 ">
          <label htmlFor="reward">How Will Reward Be Shared?</label>
          <textarea
            name="reward"
            value={reward}
            onChange={handleInputChange}
            className="border outline-none rounded-[4px] border-black p-2 max-h-[90px]"
          />
        </div>

        <div className="flex flex-col gap-3 text-16 ">
          <label htmlFor="jobType">Task Type</label>
          <select
            name="jobType"
            value={jobType}
            onChange={handleInputChange}
            className="border outline-none rounded-[4px] border-black p-2"
          >
            <option value="">Select task type</option>
            <option value="quest">Quest</option>
            <option value="bounty">Bounty</option>
            <option value="contract">Contract</option>
            <option value="fulltime">Full Time</option>
          </select>
        </div>

        <div className="flex flex-col gap-3 text-16 ">
          <label htmlFor="paymentMethod">Payment Token</label>
          <select
            name="paymentMethod"
            value={paymentMethod}
            onChange={handleInputChange}
            className="border outline-none rounded-[4px] border-black p-2"
          >
            <option value="">Select payment token eg. BNB</option>
            <option value="BNB">BNB</option>
            <option value="USDT">USDT</option>
            <option value="USDC">USDC</option>
            <option value="ethereum">Ethereum</option>
            <option value="solana">Solana</option>
          </select>
        </div>

        <div className="flex flex-col gap-3 text-16 ">
          <label htmlFor="totalPeople">How Many People Are Required For The Task?</label>
          <input
            type="text"
            name="totalPeople"
            value={totalPeople}
            onChange={handleInputChange}
            className="border outline-none rounded-[4px] border-black p-2"
          />
        </div>

        <div className="flex flex-col gap-3 text-16 ">
          <label htmlFor="amount">Enter Prize Pool Amount</label>
          <input
            type="text"
            name="amount"
            value={amount}
            onChange={handleInputChange}
            className="border outline-none rounded-[4px] border-black p-2"
          />
        </div>

        <div>
          <Button
            type="submit"
            name="Submit"
            isLoading={loading}
            className="mt-8 w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default Page;

