import React, { useEffect, useState } from 'react'
import { Container } from '@/components'

function Gallary() {
  const [slider, setSlider] = useState<any>([]);
  const authToken = localStorage.getItem("authToken") || "";
  const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;
  
  const fetchSlider = async () => {
    try {
      const response = await fetch(`${ADMIN_API_URL}/event-detail-banners-list`, {
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
      
      setSlider(data.data); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSlider();
  }, []); 
  
  return (
    <>
      <Container>
        {
          slider && slider.map((item : any,index : any)=>(
        <div className="pt-[29px] pb-[28px] px-[50px] mb-[80px] bg-no-repeat" style={{backgroundImage: `url(${item.url})` , backgroundSize:"cover ", fontFamily:"'Roboto Condensed', sans-serif"}} >
            <h3 className='text-white text-[60px] font-medium leading-[55px]'>Ticket</h3>
            <h3 > <span className='text-white text-[40px] font-medium leading-[55px]'>Your </span>  <span className='text-white text-[60px] font-medium leading-[55px]'>Event</span></h3>
            <h3  className='text-white text-[40px] font-medium leading-[55px]'>With Us</h3>
        </div>
          )
          )
        }
      </Container>
    </>
  )
}

export default Gallary
