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

  //Donation PopUp
  const [openModal, setOpenModal] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState();

  return (
    <>
      <Hero />
      <Card
        title="All Listed Campaigns"
        allCampaigns={allCampaigns}
        setOpenModal={setOpenModal}
        setDonate={setDonateCampaign}
      />
      <Card
        title="My Campaigns"
        allCampaigns={userCampaigns}
        setOpenModal={setOpenModal}
        setDonate={setDonateCampaign}
      />

      {openModal && (
        <PopUp
          setOpenModal={setOpenModal}
          donateCampaign={donateCampaign}
          donateFunction={donate}
          getDonations={getDonations}
        />
      )}
    </>
  );
};

export default HomePage;
