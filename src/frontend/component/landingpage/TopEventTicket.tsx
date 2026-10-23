
import React, { useEffect, useRef, useState } from 'react'
import { toAbsoluteUrl } from '@/utils'
import {  MdOutlineStar } from "react-icons/md";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import { Container } from '@/components';
import { Link, useNavigate } from 'react-router-dom';
import { IoLocationSharp } from 'react-icons/io5';
import { FaAngleDown } from 'react-icons/fa6';

function TopEventTicket() {
  const [event, setEvent] = useState<any[]>([]);
  const authToken = localStorage.getItem("authToken") || "";
  const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;
  const [dropdown ,setDropdown] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [add ,setAdd] = useState<any>('');
  const navigate = useNavigate();

  const handleAllData = (id: any, title: string , slug : any) => {
    navigate(`/${slug}`, { state: { id, page: 'detail' } });
  };
  
  const handleOpen = ()=>{
    setDropdown(!dropdown);
  }
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setDropdown(false); 
  };
  
  const updateLiveLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setAdd(data.address?.state_district)
          setSelectedCity(data.address?.state_district || ''); 
          setDropdown(false); 
        })
        .catch((error) => console.error("Error fetching live location:", error));
    });
  };

  useEffect(() => {
    updateLiveLocation();
  }, []);

    const fetchevent = async () => {
      try {
        const response = await fetch(`${ADMIN_API_URL}/city-wise-events?city=${selectedCity}&type=Event&limit=8`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: any = await response.json();
        setEvent(data.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    useEffect(() => {
      fetchevent();
    }, [selectedCity]); 
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdown(false);
      }
    };
  
    window.addEventListener('mousedown', handleOutsideClick ,true);
    return () => {
      window.removeEventListener('mousedown', handleOutsideClick ,true);
    };
  }, []);
  
  return (
    <>
    <div className='pt-[38px] bg-no-repeat mb-[50px] md:mb-[80px] mt-[-290px]'>
      <Container className='p-0'>
        <div className="flex justify-between sm:items-center mb-[10px] px-[20px]  z-25 relative" >
           <div className='flex flex-col sm:flex-row gap-2 sm:gap-[15px] md:gap-[20px] xl:gap-[24px] sm:items-center'>
            <h3 className='text-[18px] md:text-[22px] xl:text-[28px] font-normal text-white'>Top Events in</h3> 
            <div className="flex  gap-[10px] items-center">
            <form className='relative'>
       <div 
        className="text-[18px] leading-[18px] text-[#1D1D1B] font-normal bg-transparent pt-[7px] pb-[7px] pe-[15px] ps-[40px] bg-white border border-solid border-[#D3D3D3] rounded-[8px] focus:outline-none cursor-pointer"
        onClick={handleOpen}
      >
        {selectedCity || "Select a City"} 
        <FaAngleDown className="inline-block text-sm ms-2" />
      </div>
      {dropdown && (
        <div className="absolute top-[50px] z-25 left-0" ref={dropdownRef}> 
          <ul className="rounded-[10px] w-full min-w-[193px] border border-solid cursor-pointer">
            <li
              className={` rounded-t-[10px] border py-[15px] px-[10px]  text-lg leading-[17px] hover:text-[#2be197] hover:bg-[#1D1D1B] transition-all duration-[0.5s] ${selectedCity === add ? "text-[#2be197] bg-[#dafaed]":"bg-white text-[#1D1D1B]"}`}
              onClick={() => updateLiveLocation()} 
            >
              {add}
            </li>
            <li
              className={` border py-[15px] px-[10px]  text-lg leading-[17px] hover:text-[#2be197] hover:bg-[#1D1D1B] transition-all duration-[0.5s] ${selectedCity === "Paphos" ? "text-[#2be197] bg-[#dafaed]":"bg-white text-[#1D1D1B]"}`}
              onClick={() => handleCityChange("London")}
            >
              London
            </li>
            <li
              className={`rounded-b-[10px] border py-[15px] px-[10px]  text-lg leading-[17px] hover:text-[#2be197] hover:bg-[#1D1D1B] transition-all duration-[0.5s] ${selectedCity === "Paphos" ? "text-[#2be197] bg-[#dafaed]":"bg-white text-[#1D1D1B]"}`}
              onClick={() => handleCityChange("Surat")}>
              Surat
            </li>
          </ul>
        </div>
      )}
        <div>
            <IoLocationSharp  className='text-[20px] text-[#09DC85] absolute top-[5px] left-[15px]' />
              </div>
            </form>
            </div>
           </div>
           <Link to='' className='text-[#5CCD5C] text-[18px] md:text-[22px] font-normal leading-[22px]'>See all</Link>
        </div>
        <div className="relative z-20">
        <button
        className="swiper-button-next custom-next9 absolute right-[-20%] z-25 bg-white p-2 rounded-full shadow"
        aria-label="Next"
      >
        
          <img src={toAbsoluteUrl('/media/frontendImage/right.png')} alt=""  />
      </button>
      <Swiper  spaceBetween={30} 
        navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next9",
          }} 
          modules={[Navigation]} className=" w-screen  xl:w-auto cstm-swiper"  
      breakpoints={{    
        320: {
          width: 300,
          slidesPerView: 1,
          spaceBetween: 30
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        1024:{
            spaceBetween: 30,
            slidesPerView: 4
        }
      }} >
            {
              event && event.length > 0? (
                <>
                 {
              event.map((item : any,index : any)=>{
                return (
                     <SwiperSlide className='cursor-pointer' key={index}>
                   <div className="bg-white border-[1px] border-solid border-[#D3D3D3] p-[15px] rounded-[10px] h-full cursor-po
            " onClick={()=>handleAllData(item.id , item.event_title , item.event_slug)}>
                 <img src={item.thumbnail_image} alt="" className='mb-[10px] sm:mb-[15px] w-full rounded-[10px]' />
                 <div>
                    <h3 className='text-sm xl:text-lg font-normal text-black mb-[5px] sm:mb-[10px] line-clamp-1 overflow-hidden text-ellipsis leading-[16px] xl:leading-[18px]'>{item.event_title}</h3>
                    <h4 className='text-[#A5A5A5] text-sm leading-[14px] mb-[10px] sm:mb-[15px] '>{item.category.name}</h4>
                    <div className="flex justify-between items-center">
                      <button className='text-sm font-normal text-white px-4 py-2 rounded-md bg-[#5CCD5C] hover:bg-[#2f612f] transition-all duration-[0.5s] leading-[14px] ' >Get Ticket</button>
                      <div className='flex items-center gap-[5px]'><MdOutlineStar className='text-[#F9AC4D] inline-block' /> <span className='text-sm font-normal text-black leading-[14px] mt-[4px]'>{item.rate}</span></div>
                    </div>
                 </div> 
                       </div>
                     </SwiperSlide>
                )
              })  
            }
                </>
              ) : (
                <>
                {/* <div className="flex gap-2 items-center">
               <BsCalendar2EventFill className='text-sm sm:text-lg' />  <h3 className='text-xs sm:text-base md:text-lg font-semibold mb-0 pt-1'>There are no Data.</h3>
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

export default TopEventTicket
