import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useCrowdFundingContext } from '../context/CrowdFunding';
import { useAuthContext } from '../context/Auth';
import Hero from '../components/Hero';
import Card from '../components/Card';
import PopUp from '../components/PopUp';

const HomePage = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const {
    address,
    contract,
    getCampaigns,
    getUserCampaigns,
    getDonations,
    donate,
  } = useCrowdFundingContext();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  const [allCampaigns, setAllCampaigns] = useState([]);
  const [userCampaigns, setUserCampaigns] = useState([]);

  const fetchCampaigns = async () => {
    const allCampaignsData = await getCampaigns();
    const userCampaignsData = await getUserCampaigns();
    setAllCampaigns(allCampaignsData);
    setUserCampaigns(userCampaignsData);
  };

  useEffect(() => {
    if (contract) {
      fetchCampaigns();
    }
  }, [contract]);

  return (
    <>
      <Hero />
      <Card
        title="All Listed Campaigns"
        allCampaigns={allCampaigns}
        donateFunction={donate}
        getDonations={getDonations}
      />
      <Card
        title="My Campaigns"
        allCampaigns={userCampaigns}
        donateFunction={donate}
        getDonations={getDonations}
      />
    </>
  );
};

export default HomePage;
