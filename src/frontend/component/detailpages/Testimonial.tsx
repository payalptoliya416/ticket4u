import React from 'react'
import { Container } from '@/components';
import { FaStar } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { toAbsoluteUrl } from '@/utils';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

const data = [
  {
      img:"/media/frontendImage/im1.png",
      title :"Cameron Williamson",
      copy: "Copywriter",
      description:"“I love Reinspire! It's super easy to use and has helped me create content faster.”"
  },
  {
      img:"/media/frontendImage/im2.png",
      title :"Jane Cooper",
      copy: "Copywriter",
      description:"I used to spend hours trying to create content, but now I can quickly repurpose  material into fresh, engaging posts. 🎉"
  },
  {
      img:"/media/frontendImage/im3.png",
      title :"Esther Howard",
      copy: "Copywriter",
      description:"“I changed my content workflow after discovering Reinspire. I simply upload my content and let the A1 do the rest.”"
  },
    {
        img:"/media/frontendImage/im1.png",
        title :"Cameron Williamson",
        copy: "Copywriter",
        description:"“I love Reinspire! It's super easy to use and has helped me create content faster.”"
    },
    {
        img:"/media/frontendImage/im2.png",
        title :"Jane Cooper",
        copy: "Copywriter",
        description:"I used to spend hours trying to create content, but now I can quickly repurpose  material into fresh, engaging posts. 🎉"
    },
    {
        img:"/media/frontendImage/im3.png",
        title :"Esther Howard",
        copy: "Copywriter",
        description:"“I changed my content workflow after discovering Reinspire. I simply upload my content and let the A1 do the rest.”"
    },
]
function Testimonial() {
  return (
    <>
      <Container>
        <div>
            <h3 className='text-xl xs:text-2xl sm:text-[28px] font-normal leading-[22px] xs:leading-[26px] sm:leading-[28px]  mb-5 text-black'>Strictly Come Dancing Live Fan Report: Ratings and Reviews</h3>
            <div className="flex items-start md:items-center justify-between mb-[40px] flex-col md:flex-row gap-4 sm:gap-5">
                <div>
              <div className='flex gap-5 items-center mb-[12px] sm:mb-[15px]'>
                <h3 className='text-base sm:text-lg md:text-xl leading-5 text-[#656565] font-normal mb-0'>125 Reviews (5.0)</h3>
                <div className='flex items-center gap-[5px]'>
                    <FaStar className='inline-block text-[#FFC107]'/><FaStar className='inline-block text-[#FFC107 text-[#FFC107] '/><FaStar className='inline-block text-[#FFC107 text-[#FFC107] '/><FaStar className='inline-block text-[#FFC107 text-[#FFC107] '/><FaStar className='inline-block text-[#FFC107 text-[#FFC107] '/>
                </div>
              </div>
                <p className='text-[#656565] font-light text-base sm:text-lg md:text-xl leading-[18px] sm:leading-5 mb-0'>Information and rules for our <span className='text-[#5CCD5C] underline font-normal'>reviews feature</span></p>
                </div>
                <div>
                        <button className='text-white text-base sm:text-lg font-normal leading-[18px] sm:leading-[16px] py-[8px] md:py-[13px] px-[30px] flex gap-[5px] items-center justify-center bg-[#6394F0] rounded-md'>
                          <FiEdit />
                         <span className='mt-1'>Write your Report</span></button>
                </div>
            </div>
            </div>
            </Container>
        <Container className='p-0'>
            <div className="relative">
    <button
        className="swiper-button-next custom-next2 absolute right-[-20%] z-10 bg-white p-2 rounded-full shadow"
        aria-label="Next"
      >
          <img src={toAbsoluteUrl('/media/frontendImage/right.png')} alt="" />
      </button>
    <Swiper  spaceBetween={30}
      navigation={{
        prevEl: ".custom-prev",
        nextEl: ".custom-next2",
      }}     modules={[Navigation]} className="w-screen xl:w-auto cstm-swiper"  breakpoints={{
        320: {
          width: 300,
          slidesPerView: 1,
          spaceBetween: 30
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024:{
          spaceBetween: 30,
          slidesPerView:3
      }
      }}>
        {
          data && data.length > 0 ? (
            <>
            {
              data.map((item,index)=>{
                return (
                  <>
                  <SwiperSlide>
             <div>
                <div className="border border-solid border-[#E2E2E2] rounded-[11px] px-[20px] py-[25px]">
                   <div className="flex items-start justify-between mb-[15px]">
                         <div className="flex items-center gap-[10px] ">
                          <div><img src={item.img} alt="" className='w-[58px] h-[58px] rounded-full '/></div>
                          <div>
                              <h3 className='text-[#5CCD5C] mb-[5px] font-medium text-base leading-[16px]'>{item.title}</h3>
                            <h4 className='text-[#A5A5A5] mb-[5px] text-sm leading-[14px] font-normal'>{item.copy}</h4>
                            <div className='flex items-center gap-[5px]'>
                    <FaStar className='inline-block text-[#FFC107]'/><FaStar className='inline-block text-[#FFC107] '/><FaStar className='inline-block text-[#FFC107 text-[#FFC107] '/><FaStar className='inline-block text-[#FFC107 text-[#FFC107] '/><FaStar className='inline-block text-[#FFC107 text-[#FFC107] '/>
                </div>
                          </div>
                         </div>
                         <div>
                          <img src={toAbsoluteUrl("/media/frontendImage/invert.png")} alt="" /></div>
                   </div>
                   <p className='text-black text-base sm:text-lg leading-[20px] sm:leading-[26px] mb-0 font-light '>{item.description} </p>
                </div>
            </div>
             </SwiperSlide>
                  </>
                )
              })
            }
             
            </>
          ): (
            <>
            </>
          )
        }
    
      </Swiper>
         </div>
        </Container>
    </>
  )
}

export default Testimonial
