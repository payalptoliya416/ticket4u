import React from 'react'
import { toAbsoluteUrl } from '@/utils'
import { MdOutlineStar } from "react-icons/md";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import { Container } from '@/components';
import { Link } from 'react-router-dom';

const ticketData  = [
    {
        img :'/media/frontendImage/l1.png',
        title :'Bring The Funny',
        time:"5 Events",
        rate :'4.00'
    },
    {
        img :'/media/frontendImage/l2.png',
        title :'Stand-Up-Comedy',
        time:"15+ Events",
        rate :'4.00'
    },
    {
        img :'/media/frontendImage/l3.png',
        title :'Stand-Up-Comedy ( LOL )',
        time:"6 Events",
        rate :'4.00'
    },
    {
        img :'/media/frontendImage/l4.png',
        title :'Music Shows',
        time:"10+ Events",
        rate :'4.00'
    },
    {
        img :'/media/frontendImage/l1.png',
        title :'Bring The Funny',
        time:"5 Events",
        rate :'4.00'
    },
    {
        img :'/media/frontendImage/l2.png',
        title :'Stand-Up-Comedy',
        time:"15+ Events",
        rate :'4.00'
    },
    {
        img :'/media/frontendImage/l3.png',
        title :'Stand-Up-Comedy ( LOL )',
        time:"6 Events",
        rate :'4.00'
    },
    {
        img :'/media/frontendImage/l4.png',
        title :'Music Shows',
        time:"10+ Events",
        rate :'4.00'
    },
   
]

function LiveEvent() {
  return (
    <>
             <div className="mb-[50px] lg:mb-[80px]">
              <Container className='p-0 '>
       <div className="">
        <div className="flex justify-between items-center mb-[16px] md:mb-[25px] px-[20px]" >
          <h3 className='text-[18px] md:text-[22px] xl:text-[28px] leading-[28px] font-medium  text-black'>Promotions</h3>
          <Link to='' className='text-[#5CCD5C] text-[18px] md:text-[22px] font-normal leading-[22px]'>See all</Link>
        </div>
        <div className="relative">
        <button
        className="swiper-button-next custom-next5 absolute right-[-20%] z-10 bg-white p-2 rounded-full shadow"
        aria-label="Next"
      >
          <img src={toAbsoluteUrl('/media/frontendImage/right.png')} alt="" />
      </button>
      <Swiper  spaceBetween={30}
       loop={true}
      
       navigation={{
        prevEl: ".custom-prev",
        nextEl: ".custom-next5",
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
      {
              ticketData.map((item ,index)=>{
                return (
                     <SwiperSlide key={index}>
            <div className="bg-white border border-solid border-[#D3D3D3] p-[15px] rounded-[10px]">
                 <img src={toAbsoluteUrl(`${item.img}`)} alt="" className='mb-[10px] sm:mb-[15px] w-full rounded-[10px]' />
                 <div>
                    <h3 className='text-sm xl:text-lg font-normal text-black mb-[5px] sm:mb-[10px] line-clamp-1 overflow-hidden text-ellipsis leading-[16px] xl:leading-[18px]'>{item.title}</h3>
                    <div className="flex justify-between items-center">
                    <h4 className='text-[#6394F0] text-base'>{item.time}</h4>
                      <div className='flex items-center gap-[5px]'><MdOutlineStar className='text-[#F9AC4D] inline-block' /> <span className='text-sm font-normal text-black leading-[14px] mt-[4px]'>{item.rate}</span></div>
                    </div>
                 </div>
            </div>
                     </SwiperSlide>
                )
              })  
            }
      </Swiper>
        </div>
      </div>
              </Container>
    </div>
    </>
  )
}

export default LiveEvent
