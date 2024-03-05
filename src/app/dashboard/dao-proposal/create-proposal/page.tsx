const page = () => {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-[#0D0E32] font-semibold text-base md:text-2xl">
          DAO Proposal
        </h2>
      </div>

      <section className="flex flex-col gap-6">
        <section className="border p-0 md:p-[32px] rounded space-y-3">
          <h2>Proposal Title</h2>
          <input
            type="text"
            placeholder="Enter Proposal Title"
            className="w-full h-[50px] pl-4 border outline-none text-[#424242] placeholder:text-[#424242] rounded-lg"
          />
        </section>

        <section className="bg-[#F7F7FD] border p-0 md:p-[32px] rounded flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h2>Objective:</h2>
            <textarea
              placeholder="Enter descriptive Objective"
              className="w-full bg-[#F7F7FD] p-3 border outline-none text-[#424242] placeholder:text-[#424242] rounded-lg"
              rows={4}
            ></textarea>
          </div>
          <div className="flex flex-col gap-3">
            <h2>Overview:</h2>
            <textarea
              placeholder="Enter a descriptive Overview"
              className="w-full bg-[#F7F7FD] p-3 border outline-none text-[#424242] placeholder:text-[#424242] rounded-lg"
              rows={4}
            ></textarea>
          </div>
          <div className="flex flex-col gap-3">
            <h2>Key Features:</h2>
            <textarea
              placeholder="Enter in details Key Features"
              className="w-full bg-[#F7F7FD] p-3 border outline-none text-[#424242] placeholder:text-[#424242] rounded-lg"
              rows={4}
            ></textarea>
          </div>
        </section>

        <div className="flex gap-3 self-end items-end">
          <button className="py-2 px-6 rounded-lg border border-[#00ADEF] text-[#00ADEF] font-semibold text-base">
            Cancel
          </button>
          <button className="py-2 px-6 rounded-lg bg-[#00ADEF] text-[#fff] font-semibold text-base">
            Publish
          </button>
        </div>
      </section>
    </>
  );
};

export default page;
