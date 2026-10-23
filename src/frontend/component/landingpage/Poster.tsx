import React, { useEffect, useState } from 'react'
import { Container } from '@/components'
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

function Poster() {
  const [poster, setPoster] = useState<Poster[]>([]);
  const authToken = localStorage.getItem("authToken") || "";
  const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;
  
  const fetchSlider = async () => {
    try {
      const response = await fetch(`${ADMIN_API_URL}/promotional-banners-list`, {
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
      setPoster(data.data); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSlider();
  }, []); 
  
  return (
    <>
    <Container className='p-0' >

        {
          poster && poster.length > 0 ? (
            <div className="px-[20px]">   
            <div className="grid grid-cols-12 sm:gap-[30px] mb-[50px] lg:mb-[80px] ">
            {poster.map((item,index : any)=>{
          return(
        <div className="col-span-12 md:col-span-6" key={index}>
         <div>
            <img src={item.url} alt="" className='w-full object-cover h-full rounded-[10px] mb-[30px] sm:mb-auto' />
         </div>
        </div>
          )
        })}
         </div>
            </div>
          ) : (
            <>
           {/* <div className="flex gap-2 items-center">
                <h3 className='text-xs sm:text-base md:text-lg font-semibold pt-1 mb-[20px] lg:mb-[80px] px-[20px]'>Data not available</h3>
                </div> */}
            </>
          )
        }
     
    </Container>
    </>
  )
}

export default Poster
