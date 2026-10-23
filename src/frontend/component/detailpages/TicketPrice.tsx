import React from 'react'
import { Container } from '@/components'
import { IoMdClose } from "react-icons/io";

function TicketPrice(props : any) {
  const classStyle = props
  return (
    <>
      <Container>
        <div className={` ${classStyle.classStyle}`}>
        {/* <div className="flex justify-end mb-[10px]"><IoMdClose className='text-xl' /></div> */}
        <div className="px-[20px] xs:px-[32px] sm:px-[45px] py-[33px]" style={{backgroundImage: "url('/media/frontendImage/ticketbg.png')", backgroundSize: "100% 100%" ,  backgroundRepeat: "no-repeat"}}>
        <h3 className='text-lg md:text-[28px] leading-[22px] sm:leading-[28px] font-medium text-white mb-[16px] md:mb-[20px]'>Want better ticket prices?</h3>
            <button className='py-[10px] md:py-[14px] px-[16px] sm:px-[26px] md:px-[30px] text-white  text-base sm:text-lg font-normal leading-[16px] sm:leading-[18px] bg-[#5CCD5C] rounded-[6px]'>Sign in / Create an account</button>
        </div>
        </div>
      </Container>
    </>
  )
}

export default TicketPrice
