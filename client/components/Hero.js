import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useCrowdFundingContext } from '../context/CrowdFunding';
import { useAuthContext } from '../context/Auth';
import { useRouter } from 'next/router';

const Hero = () => {
  const router = useRouter();
  const { createCampaign, address } = useCrowdFundingContext();
  const { user } = useAuthContext();
  const [form, setForm] = useState({
    title: '',
    description: '',
    target: '',
    deadline: '',
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const difference = new Date(form.deadline).getTime() - Date.now();
    console.log(form);

    if (!address) {
      alert('Please connect your wallet first');
    } else if (difference < 0) {
      alert('Deadline should be in the future');
    } else if (isNaN(form.target)) {
      alert('The target is not a number!');
    } else if (
      address &&
      form.title &&
      form.description &&
      form.target &&
      form.deadline
    ) {
      try {
        const response = await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        console.log(response);
        if (response) {
          const username = user.username;
          const role = 'Creator';
          const title = form.title;
          await fetch('/api/update-user', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, role, title }),
          });
        }
        router.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      setForm({ ...form });
    }
  };

  return (
    <div className="relative">
      <span className="coverLine"></span>
      {/* <img
        src="https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
        src="https://cdn.shopify.com/s/files/1/0070/7032/files/BestCrowdfundingSites_resized-03.jpg?v=1628129221"
        className="absolute inset-0 objet-cover w-full h-full"
        alt=""
        bg-[url('https://cdn.shopify.com/s/files/1/0070/7032/files/BestCrowdfundingSites_resized-03.jpg?v=1628129221')]
      /> */}
      <div className="relative bg-opacity-75 backgroundMain">
        <svg
          className="absolute inset-x-0 bottom-0 text-white"
          viewBox="0 0 1160 163"
        >
          <path
            fill="currentColor"
            d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
          />
        </svg>
        <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex flex-col items-center justify-between xl:flex-row">
            <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-none">
                Crypto King <br className="hidden md:block" />
                Voltran Funding
              </h2>
              <p className="max-w-xl mb-4 text-base text-gray-200 md:text-lg">
                Empower innovative ideas and make a positive impact by joining
                Voltran where you can support fund projects that matter to you
                and the community.
              </p>
            </div>
            <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
              <div className="bg-white    rounded shadow-2xl p-7 sm:p-10">
                <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                  Campaign
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="title"
                      className="inline-block mb-1 font-medium"
                    >
                      Campaign Title
                    </label>
                    <input
                      placeholder="Write a title"
                      required
                      onChange={e => handleFormFieldChange('title', e)}
                      value={form.name}
                      type="text"
                      name="title"
                      id="title"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="description"
                      className="inline-block mb-1 font-medium"
                    >
                      Description
                    </label>
                    <input
                      placeholder="Write a description"
                      required
                      onChange={e => handleFormFieldChange('description', e)}
                      value={form.description}
                      type="text"
                      name="description"
                      id="description"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="target"
                      className="inline-block mb-1 font-medium"
                    >
                      Goal
                    </label>
                    <input
                      placeholder="ETH 0.50 "
                      required
                      onChange={e => handleFormFieldChange('target', e)}
                      value={form.target}
                      type="number"
                      name="target"
                      id="target"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="deadline"
                      className="inline-block mb-1 font-medium"
                    >
                      Deadline
                    </label>
                    <input
                      placeholder="Deadline"
                      required
                      onChange={e => handleFormFieldChange('deadline', e)}
                      value={form.deadline}
                      type="date"
                      name="deadline"
                      id="deadline"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mt-4 mb-2 sm:mb-4">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none newColor"
                    >
                      Create Campaign
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 sm:text-sm">
                    Create your Campaign and start raising funds
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
