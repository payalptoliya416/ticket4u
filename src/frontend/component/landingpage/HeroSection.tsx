import React, { useEffect, useState } from 'react'
import 'swiper/css';
import 'swiper/css/pagination';
import ReactPlayer from 'react-player';
import { Container } from '@/components';
import { Link } from 'react-router-dom';

interface Slider {
  slider_id: number;
  type: string;
  url: string;
  index: number;
  created_at: string;
}
interface ApiResponse {
  status: string;
  message: string;
  data: Slider[];
}

function HeroSection() {
  const [slider, setSlider] = useState<Slider[]>([]);
  const authToken = localStorage.getItem("authToken") || "";
  const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;
  
  const fetchSlider = async () => {
    try {
      const response = await fetch(`${ADMIN_API_URL}/get-hero-sec`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse = await response.json();
      
      setSlider(data.data); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSlider();
  }, []); 
  
  return (
    <>
    <div className="mt-[-110px]">
       {/* <Swiper pagination={true} slidesPerView={1} modules={[Pagination]} className="mySwiper w-screen h-[450px] hero-swiper" 
         allowTouchMove={true} >
           {
            slider.map((item : any,index : any)=>{
              return(
                <>
                   <SwiperSlide key={index}>
                {item.type === "image" ? (
                   <div className='relative '>
                  <img src={item.url} alt="" className='w-screen h-[450px] object-cover' />
                  </div>
                ) : (
            <div className='relative'>
            <ReactPlayer
                url={item.url}
                width="100vw"
                height="450px"
                playing={true}
                muted={true}  
                loop={true}
                style={{objectFit:"cover"}}
            />
             </div>
                ) }
                </SwiperSlide>
                </>
              )
            })
           }
      </Swiper> */}
      <div className="w-full h-[690px] relative">
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 z-1"></div>
        {slider && slider.length > 0 ?(
          <>
          {slider.map((item:any,index)=>(
            <>
          <ReactPlayer
            url={item.video_url}
            width="100vw" 
            height="690px"
            playing={true}
            muted={true}
            loop={true}
            style={{ objectFit: 'fill' }}
            // className='after:absolute after:top-0 after:left-0 after:w-screen after:h-full after:contents-[""] after:bg-black z-1 after:z-1 after:bg-opacity-20 relative'
          />
           <div className="absolute top-[-10%] left-0 w-full h-full z-10">
      <Container className="h-full flex items-center">
        <div className="text-white">
          <h3 className="text-[28px] md:text-[40px] font-semibold leading-[30px] md:leading-tight mb-2">
           {item.title}
          </h3>
          <p className="mb-5 font-normal text-sm sm:text-base leading-[16px] sm:leading-[18px] md:text-xl md:leading-[22px] w-full max-w-[600px]">{item.description}</p>
          <Link
      to={item.btn_url}
      target="_blank" 
      rel="noopener noreferrer" 
      className="rounded-md bg-[#5CCD5C] hover:bg-[#2f612f] px-6 pt-[9px] pb-[7px] transition-all duration-[0.5s]"
    >
      {item.btn_text}
    </Link>

        </div>
      </Container>
          </div>
        </>
          ))}
          </>
        ) : <div className='w-screen h-[690px] bg-black bg-opacity-70'></div>}
      </div>
    </div>
    </>
  )
}

export default HeroSection
