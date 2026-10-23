import React from 'react'
import { toAbsoluteUrl } from '@/utils'
import { MdOutlineStar } from "react-icons/md";
import { Swiper, SwiperSlide } from 'swiper/react';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import { Container } from '@/components';
import { Link } from 'react-router-dom';

const ticketData  = [
    {
        img :'/media/frontendImage/m1.png',
        title :'Coldplay 2025',
        time:"Tickets from €72.20",
        rate :'4.00'
    },
    {
        img :'/media/frontendImage/m2.png',
        title :'Lumi Neonz',
        time:"Tickets from €30.45",
        rate :'4.00'
    },
    {
        img :'/media/frontendImage/m3.png',
        title :'Boom Bush The New Year P...',
        time:"Tickets from €45.15",
        rate :'4.00'
    },
    {
        img :'/media/frontendImage/m4.png',
        title :'Levi Live 2025',
        time:"Tickets from €65.25",
        rate :'4.00'
    },
    {
        img :'/media/frontendImage/m1.png',
        title :'Coldplay 2025',
        time:"Tickets from €72.20",
        rate :'4.00'
    },
    {
        img :'/media/frontendImage/m2.png',
        title :'Lumi Neonz',
        time:"Tickets from €30.45",
        rate :'4.00'
    },
    {
        img :'/media/frontendImage/m3.png',
        title :'Boom Bush The New Year P...',
        time:"Tickets from €45.15",
        rate :'4.00'
    },
    {
        img :'/media/frontendImage/m4.png',
        title :'Levi Live 2025',
        time:"Tickets from €65.25",
        rate :'4.00'
    },

   
]

function TopArtist() {
  return (
    <>
    <div className="mb-[50px] lg:mb-[80px]">
      <Container className='p-0'>
        <div className="flex justify-between items-center mb-[16px] md:mb-[25px] px-[20px]" >
          <h3 className='text-[18px] md:text-[22px] xl:text-[28px] leading-[28px] font-medium  text-black'>Top Artists</h3>
          <Link to='' className='text-[#5CCD5C] text-[18px] md:text-[22px] font-normal leading-[22px]'>See all</Link>
        </div>
        <div className="relative">
        <button
        className="swiper-button-next custom-next absolute right-[-20%] z-10 bg-white p-2 rounded-full shadow"
        aria-label="Next"
      >
          <img src={toAbsoluteUrl('/media/frontendImage/right.png')} alt="" />
      </button>
      <Swiper  spaceBetween={30}
         navigation={{
        prevEl: ".custom-prev",
        nextEl: ".custom-next",
      }}
       modules={[Navigation]} className="w-screen xl:w-auto cstm-swiper"  breakpoints={{
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
                    <>
                     <SwiperSlide>
            <div className="bg-white border border-solid border-[#D3D3D3] p-[15px] rounded-[10px]">
                 <img src={toAbsoluteUrl(`${item.img}`)} alt="" className='mb-[10px] sm:mb-[15px] w-full rounded-[10px]' />
                 <div>
                    <h3 className='text-sm xl:text-lg font-normal text-black mb-[5px] sm:mb-[10px] line-clamp-1 overflow-hidden text-ellipsis leading-[16px] xl:leading-[18px]'>{item.title}</h3>
                    <h4 className='text-[#6394F0] text-sm mb-[15px] leading-[14px]'>{item.time}</h4>
                    <div className="flex justify-between items-center">
                      <button className='text-sm font-normal text-white px-4 py-2 rounded-md bg-[#5CCD5C] hover:bg-[#2f612f] transition-all duration-[0.5s] leading-[14px]'>Get Ticket</button>
                      <div className='flex items-center gap-[5px]'><MdOutlineStar className='text-[#F9AC4D] inline-block' /> <span className='text-sm font-normal text-black leading-[14px] mt-[4px]'>{item.rate}</span></div>
                    </div>
                 </div>
            </div>
                     </SwiperSlide>
                    </>
                )
              })  
            }
      </Swiper>
        </div>
      </Container>
      </div>
    </>
  )
}

export default TopArtist
