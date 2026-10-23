import React, { useEffect, useState } from 'react'
import { toAbsoluteUrl } from '@/utils'
import {  MdOutlineStar } from "react-icons/md";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation  } from 'swiper/modules';
import { Container } from '@/components';
import { Link, useNavigate } from 'react-router-dom';

const ticketData  = [
    {
        img :'/media/frontendImage/artis1.png',
        title :'The Exorcism',
        time:"English",
        rate :'4.00',
        premiere:"Premiere"
    },
    {
        img :'/media/frontendImage/artis2.png',
        title :'The Promised Land',
        time:"Danish",
        rate :'4.00',
        premiere : 'premiere'
    },
    {
        img :'/media/frontendImage/artis3.png',
        title :'In the Name of God',
        time:"Swedish",
        rate :'4.00',
        premiere:""
    },
    {
        img :'/media/frontendImage/artis4.png',
        title :'Treasure',
        time:"English",
        rate :'4.00',
        premiere:"premiere"
    },
   
    {
        img :'/media/frontendImage/artis1.png',
        title :'The Exorcism',
        time:"English",
        rate :'4.00',
        premiere:"premiere"
    },
    {
        img :'/media/frontendImage/artis2.png',
        title :'The Promised Land',
        time:"Danish",
        rate :'4.00',
        premiere:"premiere"
    },
    {
        img :'/media/frontendImage/artis3.png',
        title :'In the Name of God',
        time:"Swedish",
        rate :'4.00',
        premiere:""
    },
    {
        img :'/media/frontendImage/artis4.png',
        title :'Treasure',
        time:"English",
        rate :'4.00',
        premiere:"premiere"
    },
   
]


function Premieres() {
  const [slider, setSlider] = useState<any[]>([]);
  const authToken = localStorage.getItem("authToken") || "";
  const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;
  const [add ,setAdd] = useState<any>('');

  const updateLiveLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setAdd(data.address?.country)
        })
        .catch((error) => console.error("Error fetching live location:", error));
    });
  };

  useEffect(() => {
    updateLiveLocation();
  }, []);

  const fetchSlider = async (add : any) => {
    try {
      const response = await fetch(`${ADMIN_API_URL}/event-with-type`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          "type":"highlight_of_week"  ,
          "country": add
      }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: any = await response.json();
      setSlider(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    fetchSlider(add); 
  }, []);

  const navigate = useNavigate();
const handleAllData = (id: any , title : string , slug : any) =>{
  // const formattedTitle = title
  // .toLowerCase()
  // .replace(/-+/g, '-') 
  // .replace(/\s*-\s*/g, '-') 
  // .replace(/\s+/g, '-');
  navigate(`/${slug}`, { state: { id ,page: 'detail' } });
}

  return (
    <>
                <div className="mb-[50px] lg:mb-[80px] bg-[#0B1018] py-[60px]">
                  <Container className='p-0 '>
        <div className="flex justify-between items-center mb-[20px] md:mb-[30px] px-[20px]" >
         <div className="flex items-center gap-[10px]">
            <div><h3 className='text-[18px] md:text-[28px] leading-[28px] text-mb-3 md:mb-[5px] font-medium text-white'>Cyprus Best Events</h3>
            <p className='text-[12px] md:text-base font-normal text-white'>Brand new releases every Friday</p>
            </div>
         </div>
         <Link to='' className='text-[#5CCD5C] text-[18px] md:text-[22px] font-normal leading-[22px]'>See all</Link>
        </div>
<div className="relative">
<button
        className="swiper-button-next custom-next6 absolute right-[-20%] z-10 bg-white p-2 rounded-full shadow"
        aria-label="Next"
      >
       <img src={toAbsoluteUrl('/media/frontendImage/right.png')} alt="" />
      </button>
      <Swiper  spaceBetween={30}
      navigation={{
        prevEl: ".custom-prev",
        nextEl: ".custom-next6",
      }}     modules={[Navigation]}
       className="w-screen xl:w-auto cstm-swiper"  
       breakpoints={{
        320: {
          width: 300,
          slidesPerView: 1,
          spaceBetween: 30
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024:{
          spaceBetween: 30,
          slidesPerView:4
      }
      }}>
    
            {
              slider && slider.length > 0 ? (
                <>
                  {
              slider.map((item ,index : any)=>{
                return (
                    <>
                     <SwiperSlide  className='cursor-pointer' key={index}>
            <div className="bg-[#fff] bg-opacity-[5%] border border-solid border-[#D3D3D3] p-[15px] rounded-[10px] cursor-po
            " onClick={()=>handleAllData(item.id ,item.event_title , item.event_slug)}>
                 <img src={item.thumbnail_image ? item.thumbnail_image : item.banner_image} alt="" className='mb-[10px] sm:mb-[15px] w-full rounded-[10px] relative' />
               {item.premiere && <button className='absolute top-[15px] left-[15px] py-[9px] px-[15px] text-base leading-[16px] text-white font-normal bg-[#5CCD5C] rounded-br-[8px] rounded-tl-[8px]'>{item.premiere}</button> }  
                 <div>
                    <h3 className='text-lg font-normal text-white mb-[10px] leading-[18px]'>{item.event_title}</h3>
                    <div className="flex justify-between items-center">
                    <h4 className='text-[#A5A5A5] text-sm'>{item.category.name}</h4>
                      <div className='flex items-center gap-[5px]'><MdOutlineStar className='text-[#F9AC4D] inline-block' /> <span className='text-sm font-normal text-white mt-[4px]'>{item.rate}</span></div>
                    </div>
                 </div>
            </div>  
                     </SwiperSlide>
                    </>
                )
              })  
            }
                </>
              ):(
                <>
                 {/* <div className="flex gap-2 items-center text-white">
               <BsCalendar2EventFill className='text-sm sm:text-lg' />  <h3 className='  text-xs sm:text-base md:text-lg font-semibold mb-0 pt-1'>There are no Data.</h3>
                </div> */}
                </>
              )
            }
      </Swiper>
</div>
                  </Container>
    </div>
    </>
  )
}

export default Premieres
