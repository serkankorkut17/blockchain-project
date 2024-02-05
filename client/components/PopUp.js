import React, { useState, useEffect } from "react";
import { useCrowdFundingContext } from "../context/CrowdFunding";
import { useAuthContext } from "../context/Auth";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import Loading from "./Loading";

const PopUp = ({
  setOpenModal,
  donateCampaign,
  donateFunction,
  getDonations,
}) => {
  const router = useRouter();
  const { user } = useAuthContext();
  const { address } = useCrowdFundingContext();
  const [amount, setAmount] = useState("");
  const [allDonationData, setAllDonationData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const createDonation = async () => {
    if (!address) {
      alert("Please connect your wallet first");
      return;
    }
    try {
      setIsLoading(true);
      const data = await donateFunction(donateCampaign.id, amount);
      router.reload();
      console.log(data);
      if (data) {
        const username = user.username;
        const role = "Donator";
        const title = amount + " " + "ETH";
        const titleOfCampaign = donateCampaign.title;
        const donation = amount + " " + "ETH";
        await fetch("/api/update-user", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            role,
            title,
            titleOfCampaign,
            donation,
          }),
        });
      }
      setOpenModal(false);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setOpenModal(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchDonations = async () => {
      const allDonationData = await getDonations(donateCampaign.id);
      setAllDonationData(allDonationData);
    };
    fetchDonations();
    console.log(parseFloat(donateCampaign.target));
    console.log(parseFloat(donateCampaign.amountRaised));
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {donateCampaign.title}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setOpenModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-100 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                {parseFloat(donateCampaign.target) -
                  parseFloat(donateCampaign.amountRaised) >
                0 ? (
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      {donateCampaign.description}
                    </p>
                    <input
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      type="number"
                      placeholder="Amount"
                      required
                      onChange={(e) => setAmount(e.target.value)}
                      id="amount"
                      name="amount"
                      step="0.01"
                    />

                    {allDonationData?.map((donation, i) => (
                      <p
                        className="my-4 text-slate-500 text-lg leading-relaxed"
                        key={i + 1}
                      >
                        {i + 1}: {donation.donation} {""}
                        {donation.donator.slice(0, 35)}
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      The target amount has been reached, no more donation can
                      be made. Try another campaign!
                    </p>
                  </div>
                )}
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setOpenModal(false)}
                  >
                    Close
                  </button>
                  {parseFloat(donateCampaign.target) -
                    parseFloat(donateCampaign.amountRaised) >
                  0 ? (
                    <button
                      className="background text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => createDonation()}
                    >
                      Donate
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

export default PopUp;
