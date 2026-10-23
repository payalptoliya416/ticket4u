import React, { useEffect, useRef, useState } from 'react'
import { toAbsoluteUrl } from '@/utils'
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
        img :'/media/frontendImage/ct1.png',
        title :'Mediterranean island of Cyprus',
        time:"Paphos",
    },
    {
        img :'/media/frontendImage/ct2.png',
        title :"It's known for Finikoudes Beach",
        time:"Larnaca",
    },
    {
        img :'/media/frontendImage/ct3.png',
        title :'Centuries-old Limassol Castle',
        time:"Limassol",
    },
    {
        img :'/media/frontendImage/ct4.png',
        title :'Divided capital city of Cyprus',
        time:"Nicosia",
    },
   
    {
        img :'/media/frontendImage/ct1.png',
        title :'Mediterranean island of Cyprus',
        time:"Paphos",
    },
    {
        img :'/media/frontendImage/ct2.png',
        title :"It's known for Finikoudes Beach",
        time:"Larnaca",
    },
    {
        img :'/media/frontendImage/ct3.png',
        title :'Centuries-old Limassol Castle',
        time:"Limassol",
    },
    {
        img :'/media/frontendImage/ct4.png',
        title :'Divided capital city of Cyprus',
        time:"Nicosia",
    },
   
]


function City() {
  const [event, setEvent] = useState<any>([]);
    const authToken = localStorage.getItem("authToken") || "";
    const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;
    const [add ,setAdd] = useState<any>('');
    const navigate = useNavigate();
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

      const fetchevent = async () => {
        try {
          const response = await fetch(`${ADMIN_API_URL}/city-wise-events?city=${add}&type=Activity&limit=8`, {
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
          setEvent(data); 
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      useEffect(() => {
        fetchevent();
      }, []); 
  
      const handleAllData = (id: any, slug : any) => {
        navigate(`/${slug}`, { state: { id, page: 'detail' } });
      };

  return (
    <>
          <div className="mb-[50px] lg:mb-[80px]">
            <Container className='p-0 '>
        <div className="flex justify-between items-center mb-[16px] md:mb-[25px] px-[20px]" >
          <h3 className='text-[18px] md:text-[22px] xl:text-[28px] leading-[28px] font-medium  text-black'>What's on in your city?</h3>
           <Link to='' className='text-[#5CCD5C] text-[18px] md:text-[22px] font-normal leading-[22px]'>See all</Link>
        </div>
<div className="relative">
<button
        className="swiper-button-next custom-next4 absolute right-[-20%] z-10 bg-white p-2 rounded-full shadow"
        aria-label="Next"
      >
          <img src={toAbsoluteUrl('/media/frontendImage/right.png')} alt="" />
      </button>
      <Swiper  spaceBetween={30}
       loop={true}
      navigation={{
        prevEl: ".custom-prev",
        nextEl: ".custom-next4",
      }}     modules={[Navigation]} className="w-screen xl:w-auto cstm-swiper"  breakpoints={{
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
      {(!event.data || event.data.length === 0) && <h3>- No events found for the specified city</h3>}
      {event.data &&
        event.data.map((item: any, index : any) => (
          <SwiperSlide key={index}>
            <div
              className="bg-white border border-solid border-[#D3D3D3] p-[15px] rounded-[10px] cursor-pointer"
              onClick={() =>
                handleAllData(item.id, item.event_slug)
              }
            >
              <img
                src={toAbsoluteUrl(`${item.thumbnail_image}`)}
                alt=""
                className="mb-[10px] sm:mb-[15px] w-full rounded-[10px]"
              />
              <div>
                <h3 className="text-sm xl:text-lg font-normal text-black mb-[5px] sm:mb-[10px] line-clamp-1 overflow-hidden text-ellipsis leading-[16px] xl:leading-[20px]">
                  {item.event_title}
                </h3>
                <h4 className="text-[#6394F0] text-base leading-[14px]">
                  {item.category.name}
                </h4>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
</div>
            </Container>
    </div>
    </>
  )
}

export default City
