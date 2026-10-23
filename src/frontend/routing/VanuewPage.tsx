import { Container } from '@/components'
import React, { useEffect, useState } from 'react'
import LandingPage from '../component/landingpage/LandingPage'
import VanueBanner from '../component/vanuepage/VanueBanner'
import VenueDetail from '../component/vanuepage/VenueDetail'
import VenueHallImages from '../component/vanuepage/VenueHallImages'
import VenueDescription from '../component/vanuepage/VenueDescription'
import Testimonial from '../component/detailpages/Testimonial'
import TicketPrice from '../component/detailpages/TicketPrice'
import VenueMap from '../component/vanuepage/VenueMap'
import Events from '../component/vanuepage/Events'
import TicketWhishper from '../component/detailpages/TicketWhishper'
import Ticketes from '../component/landingpage/Ticketes'
import Gallary from '../component/detailpages/Gallary'
import Footer from '../component/landingpage/Footer'
import TickeyGenie from '../component/vanuepage/TickeyGenie'
import {  useDispatch, useSelector } from 'react-redux'
import { fetchVenuePageData } from '../redux/thunks/VenuePageThunk'
import { useLocation, useParams } from 'react-router'

function VanuewPage() {
  const location = useLocation();
  const url = useParams();
  const [ VenuePageData , setVenuePageData] = useState<any>();
  const dispatch = useDispatch<any>();
  const { id } = location.state || {}; 

  useEffect(() => {
      if (id) {
          const timeout = setTimeout(() => {
              dispatch(fetchVenuePageData(id));
          }, 1000); 

          return () => clearTimeout(timeout);
      }
  }, [dispatch, id]);
  const authToken = localStorage.getItem("authToken") || "";
  const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;

  const fetchDirectData = async () => {
    const urlString = `${ADMIN_API_URL}/admin/venueDetailSlug/${url.title}`;
  
    try {
      const response = await fetch(urlString, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setVenuePageData(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  
  useEffect(() => {
    if (url && url.title) {
      fetchDirectData();
    }
  }, [url]); 
  return (
    <>
       <div style={{fontFamily: 'CircularSpotifyTxT'}}> 
       {VenuePageData && (
        <>
       <Container>
        <LandingPage/>
        </Container> 
          <VanueBanner VenuePageData={VenuePageData} />
          <VenueDetail VenuePageData={VenuePageData} />
          <VenueDescription VenuePageData={VenuePageData} />
          {/* <VenueHallImages VenuePageData={VenuePageData} /> */}
          <VenueMap VenuePageData={VenuePageData} />
        <Testimonial/>
        <TicketPrice classStyle='mt-[30px] lg:mt-[80px] mb-[50px] lg:mb-[80px]'/>
        <Events/>
        <TicketWhishper/>
        <TickeyGenie/>
        <Ticketes/>
        <Gallary/>
        <Footer/>
        </>
      )}   
       </div>
    </>
  )
}

export default VanuewPage
