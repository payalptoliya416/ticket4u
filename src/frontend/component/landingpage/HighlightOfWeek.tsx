import React, { useEffect, useState } from 'react'
import { toAbsoluteUrl } from '@/utils'
import { MdOutlineKeyboardArrowRight, MdOutlineStar } from "react-icons/md";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import { Container } from '@/components';
import { Link, useNavigate } from 'react-router-dom';

function HighlightOfWeek() {
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
          setAdd(data.address?.state_district)
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
          "city": add 
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
const handleAllData = (id: any,title: string , slug : any)=>{
  // const formattedTitle = title
  // .toLowerCase()
  // .replace(/-+/g, '-') 
  // .replace(/\s*-\s*/g, '-') 
  // .replace(/\s+/g, '-');
  navigate(`/${slug}`, { state: { id ,page: 'detail' } }); 
}

  return (
    <>
         <div className="mb-[50px] lg:mb-[80px]">
          <Container className='p-0 '>
        <div className="flex justify-between items-center mb-[16px] md:mb-[25px] px-[20px]" >
          <h3 className='text-[18px] md:text-[22px] xl:text-[28px] leading-[28px] font-medium  text-black'>Highlight of the week</h3>
          <Link to='' className='text-[#5CCD5C] text-[18px] md:text-[22px] font-normal leading-[22px]'>See all</Link>
        </div>
<div className="relative">
<button
        className="swiper-button-next custom-next1 absolute right-[-20%] z-10 bg-white p-2 rounded-full shadow"
        aria-label="Next"
      >
          <img src={toAbsoluteUrl('/media/frontendImage/right.png')} alt="" />
      </button>
      <Swiper  spaceBetween={30}
      navigation={{
        prevEl: ".custom-prev",
        nextEl: ".custom-next1",
      }}    modules={[Navigation]} className="w-screen xl:w-auto cstm-swiper"  breakpoints={{
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
                     <SwiperSlide className='cursor-pointer' key={index}>
            <div className="bg-white border-[1px] border-solid border-[#D3D3D3] p-[15px] rounded-[10px] cursor-po
            " onClick={()=>handleAllData(item.id , item.event_title , item.event_slug)}>
                 <img src={item.thumbnail_image ? item.thumbnail_image : item.banner_image} alt="" className='mb-[10px] sm:mb-[15px] w-full rounded-[10px]' />
                 <div>
                    <h3 className='text-sm xl:text-lg font-normal text-black mb-[5px] sm:mb-[10px] line-clamp-1 overflow-hidden text-ellipsis leading-[16px] xl:leading-[18px]'>{item.event_title}</h3>
                    <h4 className='text-[#6394F0] text-sm mb-[15px] leading-[14px]'>{item.venues.prices}</h4>
                    <div className="flex justify-between items-center">
                      <button className='text-sm font-normal text-white px-4 py-2 rounded-md bg-[#5CCD5C] hover:bg-[#2f612f] transition-all duration-[0.5s] leading-[14px] '>Get Ticket</button>
                      <div className='flex items-center gap-[5px]'><MdOutlineStar className='text-[#F9AC4D] inline-block' /> <span className='text-sm font-normal text-black leading-[14px] mt-[4px]'>{item.rate}</span></div>
                    </div>
                 </div>
            </div>
                     </SwiperSlide>
                )
              })  
            }
                </>
              ):(
                <>
                  {/* <div className="flex gap-2 items-center">
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

export default HighlightOfWeek
