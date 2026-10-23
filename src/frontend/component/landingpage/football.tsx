import React from 'react'
import { toAbsoluteUrl } from '@/utils'
import {  MdOutlineStar } from "react-icons/md";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation} from 'swiper/modules';
import { Link } from 'react-router-dom';
import { Container } from '@/components';

const ticketData  = [
    {
        img :'/media/frontendImage/ball1.png',
        title :'RC Celta - FC Barcelona',
        time:"5 Events",
        rate :'4.00'
    },
    {
        img :'/media/frontendImage/ball2.png',
        title :'Real Madrid CF - FC Twente',
        time:"15+ Events",
        rate :'4.00'
    },
    {
        img :'/media/frontendImage/ball3.png',
        title :'Atlético de Madrid - Alavés',
        time:"6 Events",
        rate :'4.00'
    },
    {
        img :'/media/frontendImage/ball4.png',
        title :'Real Madrid CF - FC Barcel...',
        time:"10+ Events",
        rate :'4.00'
    },
    {
        img :'/media/frontendImage/ball1.png',
        title :'RC Celta - FC Barcelona',
        time:"5 Events",
        rate :'4.00'
    },
    {
        img :'/media/frontendImage/ball2.png',
        title :'Real Madrid CF - FC Twente',
        time:"15+ Events",
        rate :'4.00'
    },
    {
        img :'/media/frontendImage/ball3.png',
        title :'Atlético de Madrid - Alavés',
        time:"6 Events",
        rate :'4.00'
    },
    {
        img :'/media/frontendImage/ball4.png',
        title :'Real Madrid CF - FC Barcel...',
        time:"10+ Events",
        rate :'4.00'
    },
   
]

function Football() {
  return (
    <>
             <div className="mb-[50px] lg:mb-[80px]">
       <Container className='p-0 '>
        <div className="flex justify-between items-center mb-[14px] sm:mb-[25px] px-[20px]" >
          <h3 className='text-[18px] md:text-[22px] xl:text-[28px] leading-[28px] font-medium  text-black'>Football</h3>
          <Link to='' className='text-[#5CCD5C] text-[18px] md:text-[22px] font-normal leading-[22px]'>See all</Link>
        </div>
              <div className="relative">
              <button
                      className="swiper-button-next custom-next3 absolute right-[-20%] z-10 bg-white p-2 rounded-full shadow"
                      aria-label="Next"
                    >
                        <img src={toAbsoluteUrl('/media/frontendImage/right.png')} alt="" />
                    </button>
                    <Swiper  spaceBetween={30}
                     
                    slidesPerView={4}  navigation={{
                      prevEl: ".custom-prev",
                      nextEl: ".custom-next3",
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
                                  <>
                                  <SwiperSlide>
                                    <div className="pb-1">
                          <div className="bg-white border border-solid border-[#D3D3D3] p-[15px] rounded-[10px]">
                              <img src={toAbsoluteUrl(`${item.img}`)} alt="" className='mb-[10px] sm:mb-[15px] w-full rounded-[10px]' />
                              <div>
                                  <h3 className='text-sm xl:text-lg font-normal text-black mb-[5px] sm:mb-[10px] line-clamp-1 overflow-hidden text-ellipsis leading-[16px] xl:leading-[18px]'>{item.title}</h3>
                                  <div className="flex justify-between items-center">
                                  <h4 className='text-[#6394F0] text-base leading-[14px]'>{item.time}</h4>
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
                    </Swiper>
              </div>
      </Container>
    </div>
    </>
  )
}

export default Football
