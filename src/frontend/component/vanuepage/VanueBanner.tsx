import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {  Autoplay, FreeMode} from 'swiper/modules';
import 'swiper/css/autoplay';
import ReactPlayer from 'react-player';

const data = [
  {
    image : '/media/frontendImage/b1.png',
    type: 'image'
  },

  {
    image : 'https://youtu.be/MlRRruoNccw?si=9AOQZIW12Eixsoj1',
     type: 'video'
  },
  {
    image : '/media/frontendImage/b4.png',
     type: 'image'
  },
  {
    image : 'https://youtu.be/HViHYEKKB8Y?si=8nj5vZEo7o62nAD2',
     type: 'video'
  },
  {
    image : '/media/frontendImage/b2.png',
     type: 'image'
  },
  {
    image : '/media/frontendImage/b3.png',
     type: 'image'
  },
  {
    image : 'https://youtu.be/d77TQupCENc?si=fBXBrgn4lfb2P1Hu',
     type: 'video'
  },
 
]
function VanueBanner(props: any) {
  const { VenuePageData } = props;
  return (
    <>
      <div className="mt-[-120px] mb-[45px] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 z-1"></div>
        {/* {VenuePageData?.gallery_images ? (
          <> 
           <div className="bg2"></div>
      <div className="bg1"></div>
          </>
        ): <></>}
        <div
          className="h-[560px] w-screen flex justify-start items-center  swiper-div ">
     <Swiper  
    spaceBetween={5}  
    autoplay={{
      delay: 0, 
      disableOnInteraction: false,
    }}
    speed={5000}
    loop={VenuePageData?.gallery_images.length > 1} 
    freeMode={{
      enabled: true,
      momentum: false,
    }}
    modules={[Autoplay, FreeMode]} 
    className="w-screen xl:w-auto cstm-swiper venue-slider h-[560px]"  
    breakpoints={{    
      320: {
        width: 300,
        slidesPerView: 1,
        spaceBetween: 5,
      },
      768: {
        slidesPerView: Math.min(2, VenuePageData?.gallery_images.length),
        spaceBetween: 5,
      },
      1024:{
        slidesPerView: Math.min(4, VenuePageData?.gallery_images.length), 
        spaceBetween: 5,
      },
    }}>
    {VenuePageData?.gallery_images.length > 0 ? (
      [...VenuePageData?.gallery_images, ...VenuePageData?.gallery_images].map(
        (item: any, index: any) => (
          <SwiperSlide key={index}>
            <div>
              <img src={item.image_url} alt="" className="h-[560px] object-cover w-full" />
            </div>
          </SwiperSlide>
        )
      )
    ) : (
      <div>No images available</div> 
    )}
     </Swiper>
          </div> */}
        {data ? (
          <> 
           <div className="bg2"></div>
      <div className="bg1"></div>
          </>
        ) : <></>}
        <div
          className="h-[400px] sm:h-[560px] w-screen flex justify-start items-center  swiper-div ">
     <Swiper  
    spaceBetween={5}  
    autoplay={{
      delay: 0, 
      disableOnInteraction: false,
    }}
    
    speed={5000}
    loop={data.length > 1} 
    freeMode={{
      enabled: true,
      momentum: false,
    }}
    modules={[ Autoplay ,FreeMode]} 
    className="w-screen xl:w-auto cstm-swiper venue-slider h-[560px]"  
    breakpoints={{    
      320: {
        slidesPerView: 1,
        spaceBetween: 5,
      },
      768: {
        slidesPerView: Math.min(2, data.length),
        spaceBetween: 5,
      },
      1024:{
        slidesPerView: Math.min(4, data.length), 
        spaceBetween: 5,
      },
    }}>
    {data.length > 0 ? (
      [...data, ...data].map(
        (item: any, index: any) => (
          <SwiperSlide key={index}>
            <div>
              {
                item.type === "video" ? <div className='relative'>
                            <ReactPlayer
                                url={item.image}
                                width="100%"
                                height="560px"
                                playing={true}
                                muted={true}  
                                loop={true}
                                style={{objectFit:"cover"}}
                            />
                             </div>:    <img src={item.image} alt="" className="h-[560px] object-cover w-full " />
              }
          
            </div>
          </SwiperSlide>
        )
      )
    ) : (
      <div>No images available</div> 
    )}
     </Swiper>
          </div>
          {/* <Container>
            <div className="pt-[131px] pb-[70px]">
              <h2 className="text-white text-[38px] leading-[40px] sm:text-[46px] sm:leading-[46px] font-medium mb-[10px]">
                {VenuePageData.title}
              </h2>
              <h3 className="text-white text-[28px] sm:text-[34px] leading-[30px] sm:leading-[34px] font-light">
                {VenuePageData.location}
              </h3>
            </div>
          </Container> */}
      </div>
    </>
  );
}

export default VanueBanner;
