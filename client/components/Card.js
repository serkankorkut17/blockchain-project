import React from 'react';

const Card = ({ allCampaigns, setOpenModal, setDonate, title }) => {
  const daysLeft = deadline => {
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);
    if (remainingDays < 0) {
      return 0;
    }
    return remainingDays.toFixed(0);
  };

  const clickHandler = campaign => {
    setOpenModal(true);
    setDonate(campaign);
    /* console.log(campaign); */
  };

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:py-20">
      <p className="py-16 text-2xl font-bold leading-5 uppercase">{title}</p>
      <div className="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        {allCampaigns?.map((campaign, i) => (
          <div
            onClick={() => clickHandler(campaign)}
            key={i + 1}
            className="cursor-pointer border overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm hover:shadow"
          >
            <img
              src="https://odul.fongogo.com/blog/wp-content/uploads/2021/01/crowdfunding.jpg"
              alt=""
              className="object-cover w-full h-64 rounded"
            />
            <div className="py-5 pl-2">
              <p className="mb-2 text-xs font-semibold text-gray-600 uppercase">
                Days Left: {daysLeft(campaign.deadline)}
              </p>
              <a
                href="#"
                aria-label="Article"
                className="inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
              >
                <p className="text-2xl font-bold leading-5">{campaign.title}</p>
              </a>
              <p className="mb-4 text-gray-700">{campaign.description}</p>
              <div className="flex space-x-4">
                <p className="font-semibold">Target: {campaign.target} ETH</p>
                <p className="font-semibold">
                  Raised: {campaign.amountRaised} ETH
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
