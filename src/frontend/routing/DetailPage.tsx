import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LandingPage from '../component/landingpage/LandingPage'
import Banner from '../component/detailpages/Banner'
import ShareEvent from '../component/detailpages/ShareEvent'
import TicketPrice from '../component/detailpages/TicketPrice'
import Testimonial from '../component/detailpages/Testimonial'
import TicketWhishper from '../component/detailpages/TicketWhishper'
import RecommandedYou from '../component/detailpages/RecommandedYou'
import RecentlyView from '../component/detailpages/RecentlyView'
import Ticketes from '../component/landingpage/Ticketes'
import Footer from '../component/landingpage/Footer'
import Gallary from '../component/detailpages/Gallary'
import { useDispatch } from 'react-redux'
import { useLocation, useParams } from 'react-router'
import { fetchBankData } from '../redux/thunks/DetailPageThunk'

function DetailPage() {

  const location = useLocation();
  const url = useParams();
// const { loading, detailpage, error } = useSelector((state: any) => state.detailPage);
const [detailpage , setDetailPage ] = useState<any>();
const { id } = location.state || {}; 
const dispatch = useDispatch<any>();
const [recentSlide, setRecentSlide] = useState<any>('');
const passID = detailpage?.id  || null ;

useEffect(() => {
  if (passID) {
    const existingIDs = JSON.parse(localStorage.getItem("storedIDs") || "[]");

    if (!existingIDs.includes(passID)) {
      existingIDs.push(passID);
      localStorage.setItem("storedIDs", JSON.stringify(existingIDs)); 
    }
  }
}, [passID]);

 useEffect(() => {
 if (id) {
    dispatch(fetchBankData(id));  
 }
 }, [dispatch, id]);

 useEffect(() => {
  const storedIDs = localStorage.getItem("storedIDs");
  if (storedIDs !== null && storedIDs !== undefined) {
    const parsedStorageID = JSON.parse(storedIDs);
    fetchSlider(parsedStorageID);
  }
}, [passID]);

const authToken = localStorage.getItem("authToken") || "";
const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;

  const fetchSlider = async (storageID: string | string[]) => {
    try {
      const response = await fetch(`${ADMIN_API_URL}/get-recent-events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          event_ids: storageID, 
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRecentSlide(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDirectData = async () => {
    const urlString = `${ADMIN_API_URL}/admin/eventDetailSlug/${url.title}`;
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
      setDetailPage(data.data);
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
        <Container>
        <LandingPage/>
        </Container> 
        <Banner detailpage={detailpage} />
        <ShareEvent detailpage={detailpage} />
        <TicketPrice classStyle='mb-[70px] md:mb-[80px]'/>
        <Testimonial/>
        <TicketWhishper/>
        <RecommandedYou/>
        <RecentlyView title="Recently viewed" recentSlide={recentSlide}/>
        <Ticketes/> 
        <Gallary/>
        <Footer/>
        </div>
    </>
  )
}

export default DetailPage
