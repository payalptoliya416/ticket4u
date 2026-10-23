import React, { useEffect, useState } from 'react';
import { toAbsoluteUrl } from '@/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Container } from '@/components';
interface Poster {
  banner_id: number;
  type: string;
  url: string;
  index: number;
  created_at: string;
}
interface ApiResponse {
  status: string;
  message: string;
  data: Poster[];
}

function Banner() {
  const [poster, setPoster] = useState<Poster[]>([]);
  const authToken = localStorage.getItem('authToken') || '';
  const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;

  const fetchSlider = async () => {
    try {
      const response = await fetch(`${ADMIN_API_URL}/advertisement-banners-list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      setPoster(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchSlider();
  }, []);

  return (
    <>
      <div className="mb-[30px] md:mb-[79px]">
        <Container className="p-0 ">
          <div className="relative">
            <button
              className="swiper-button-next custom-next2 absolute right-[-20%] z-10 bg-white p-2 rounded-full shadow"
              aria-label="Next"
            >
              <img src={toAbsoluteUrl('/media/frontendImage/right.png')} alt="" />
            </button>
            <Swiper
              spaceBetween={30}
              navigation={{
                prevEl: '.custom-prev',
                nextEl: '.custom-next2'
              }}
              modules={[ Navigation]}
              className="w-screen xl:w-auto cstm-swiper"
              breakpoints={{
                320: {
                  width: 300,
                  slidesPerView: 1,
                  spaceBetween: 30
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20
                },
                1024: {
                  spaceBetween: 30,
                  slidesPerView: 3
                }
              }}
            >
              {poster.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="col-span-4">
                      <div>
                        <img src={item.url} alt="" className="w-full object-cover" />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Banner;
