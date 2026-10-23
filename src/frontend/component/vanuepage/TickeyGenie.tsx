import React from 'react'
import { toAbsoluteUrl } from '@/utils'
import {  MdOutlineStar } from "react-icons/md";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Container } from '@/components';
import { Link } from 'react-router-dom';

const data = [
    {
      img: '/media/frontendImage/est1.png',
      title : "Tom Hanks Is Finch",
      subtitle: "2024-Action, 2h 20m",
      rate:'4.00'
    },
    {
      img: '/media/frontendImage/est2.png',
      title : "M3GAN",
      subtitle: "2024-Action, 2h 20m",
      rate:'4.00'
    },
    {
      img: '/media/frontendImage/est3.png',
      title : "Ex Machina",
      subtitle: "2024-Action, 2h 20m",
      rate:'4.00'
    },
    {
      img: '/media/frontendImage/est4.png',
      title : "Star Wars (film series)",
      subtitle: "2024-Action, 2h 20m",
      rate:'4.00'
    },
    {
      img: '/media/frontendImage/est1.png',
      title : "Tom Hanks Is Finch",
      subtitle: "2024-Action, 2h 20m",
      rate:'4.00'
    },
    {
      img: '/media/frontendImage/est2.png',
      title : "M3GAN",
      subtitle: "2024-Action, 2h 20m",
      rate:'4.00'
    },
    {
      img: '/media/frontendImage/est3.png',
      title : "Ex Machina",
      subtitle: "2024-Action, 2h 20m",
      rate:'4.00'
    },
    {
      img: '/media/frontendImage/est4.png',
      title : "Star Wars (film series)",
      subtitle: "2024-Action, 2h 20m",
      rate:'4.00'
    },
        
    ]
function TickeyGenie() {
  return (
    <>
       <div className="mb-[50px] lg:mb-[80px]">
            <Container className='p-0 '>
        <div className="sm:flex justify-between items-center mb-[14px] sm:mb-[25px] px-[20px]" >
          <h3 className='text-[18px] md:text-[22px] xl:text-[28px] leading-[28px] font-medium  text-black'>Our TickyGenie AI Assistant Also Recommends you:</h3>
          <div className="text-end ">
            <Link to='' className='text-[#5CCD5C] text-[18px] md:text-[22px] font-normal leading-[22px]'>See all</Link>
            </div>
        </div>
<div className="relative">
<button
        className="swiper-button-next custom-N absolute right-[-20%] z-10 bg-white p-2 rounded-full shadow"
        aria-label="Next"
      >
          <img src={toAbsoluteUrl('/media/frontendImage/right.png')} alt="" />
      </button>
      <Swiper  spaceBetween={30}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-N",
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
              data && data.length > 0 ? (
                <>
                 {
              data.map((item ,index)=>{
                return (
                    <>
                     <SwiperSlide>
                       <div className="col-span-3">
            <div className="bg-white border border-solid border-[#D3D3D3] p-[15px] rounded-[10px]">
                 <img src={item.img} alt="" className='mb-[10px] sm:mb-[15px] w-full rounded-[10px] h-full max-h-[260px]' />
                 <div>
                    <h3 className='text-sm xl:text-lg font-normal text-black mb-[5px] sm:mb-[10px] line-clamp-1 overflow-hidden text-ellipsis leading-[16px] xl:leading-[18px]'>{item.title}</h3>
                    <h4 className='text-[#A5A5A5] text-sm mb-[15px]'>{item.subtitle}</h4>
                    <div className="flex justify-between items-center">
                      <button className='text-sm font-normal text-white px-4 py-2 rounded-md bg-[#5CCD5C] hover:bg-[#2f612f] transition-all duration-[0.5s] leading-[14px] '>Get Ticket</button>
                      <div className='flex items-center gap-[5px]'><MdOutlineStar className='text-[#F9AC4D] inline-block' /> <span className='text-sm font-normal text-black leading-[14px] mt-[4px]'>{item.rate}</span></div>
                    </div>
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

export default TickeyGenie
