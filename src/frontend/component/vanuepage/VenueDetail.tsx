import React from 'react'
import { Container } from '@/components'
import { HiOutlineLocationMarker } from 'react-icons/hi'

function VenueDetail(props : any) {
  const {VenuePageData} = props;
  return (
    <>
    <Container>
       <div className={`mt-[-90px] relative z-1`}>
                <div className='py-[20px] lg:py-[25px] px-[15px] sm:px-[22px] lg:px-[30px] grid grid-cols-12 gap-5 md:gap-0 lg:gap-[30px] md:items-start border border-solid border-[#E2E2E2] rounded-[11px] bg-white mb-[20px] sm:mb-[30px]' style={{ boxShadow: '0px 5px 30px 0px rgba(0, 0, 0, 0.08)' }}>
                <div className="col-span-12 md:col-span-9 xl:col-span-10 ">
                  <div className="flex items-center gap-[20px] xl:gap-[30px] sm:flex-row flex-col">
                    <div> 
                        <img src={`${VenuePageData?.thumbnail_image}`} alt="" className='rounded-md w-[160px] h-[131px] object-cover' />
                    </div> 
                    <div>
                      <h3 className='text-black text-lg sm:text-[24px] lg:text-[28px] leading-[20px] sm:leading-[26px] lg:leading-[28px] mb-[12px] sm:mb-[15px] font-normal text-center sm:text-start'>{VenuePageData.title}</h3>
                      <div className='text-base sm:text-lg leading-[16px] sm:leading-[18px] font-normal mb-[10px] sm:mb-[12px] xl:mb-[16px] flex gap-[5px] items-center justify-center sm:justify-normal'><HiOutlineLocationMarker className='inline-block' /><h4 className='mt-1 text-black'> 
                        {VenuePageData.location} , {VenuePageData.city} , {VenuePageData.state} , {VenuePageData.country} </h4></div>
                        <div className="flex items-center gap-[10px] sm:gap-[12px] md:gap-[15px] xl:gap-[30px] flex-wrap  justify-center sm:justify-normal">
                          { 
                            VenuePageData?.amenities.map((item : any,index : any)=>{
                              return(
                                <>
                                <h4 className='text-black text-base sm:text-lg leading-[16px] sm:leading-[18px] font-normal flex items-center gap-[5px] relative after:absolute after:top-[4px] after:right-[-9%] md:after:right-[-15%] xl:after:right-[-18%] after:content-[""] after:bg-[#E2E2E2] after:w-[1px] after:h-[60%]' key={index}><img src={item.icon_url} alt="" /> <span className='mt-1'>{item.title}</span></h4>
                                </>
                              )
                            })
                          }
                        </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-2  text-center sm:text-start">
                  <button className='text-white text-lg font-normal leading-[18px] bg-[#5CCD5C] px-[50px] pt-[14px] pb-[12px] rounded-[6px]'>Tickets</button>
                </div>
                 </div>
        </div>
    </Container>
    </>
  )
}

export default VenueDetail
