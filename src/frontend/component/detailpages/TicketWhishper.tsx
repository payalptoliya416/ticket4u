import { Container } from '@/components'
import { toAbsoluteUrl } from '@/utils'
import React from 'react'

function TicketWhishper() {
  return (
    <>
    <Container>
      <div className="my-[50px] sm:my-[80px] rounded-[15px] bg-no-repeat py-[40px] px-[30px] sm:px-[70px] lg:px-[144px] h-full w-full bg-cover tet-center"  style={{backgroundImage: "url('/media/frontendImage/dancing1.png') " , backgroundSize:"cover"}}>
      <div className="flex justify-center mb-[34px]">
        <div className="w-[90px] h-[90px] flex justify-center items-center rounded-full border border-solid border-[#40444a] bg-white bg-opacity-[5%] outline-[#23262E] outline-[5px] outline shadow-animation">
              <img src={toAbsoluteUrl('/media/frontendImage/msj.png')} alt="" />
        </div>
      </div>
        <h3 className='text-white text-xl xs:text-[22px] sm:text-[28px] font-medium leading-[22px] xs:leading-[24px] sm:leading-[28px] mb-[17px] text-center'>Strictly Come Dancing Live - TicketWhisper</h3>
        <p className='text-white text-base sm:text-lg font-light leading-[20px] sm:leading-[28px] mb-[28px] sm:mb-[35px] text-center w-full max-w-[750px] mx-auto'>Register for Strictly Come Dancing Live TicketAlarm and Newsletter to receive a notification when new events are
        announced.</p>
        <form className='mb-[25px] text-center'>
            <div className="mb-3 flex gap-[10px] items-center justify-center flex-col sm:flex-row">
                <input type="text" className='py-[12px] sm:py-[16px] px-[20px] border border-solid border-[rgba(255, 255, 255, 0.15)] rounded-[8px] bg-white bg-opacity-[7%] w-full max-w-[499px] placeholder:text-[#A5A5A5] text-[#A5A5A5] text-[14px] leading-[14px] placeholder:text-[14px] placeholder:leading-[14px]' placeholder='Your email address' />
                <button type='submit' className='bg-[#5CCD5C] rounded-[6px] py-[12px] sm:py-[16px] px-[40px] text-white font-normal text-lg leading-[18px]'>Subscribe</button>
            </div>
        </form>
        <p className='font-light text-white text-sm leading-[24px] text-center w-full max-w-[890px] mx-auto'>I would like to subscribe to ticket alarm and be informed about other events through the Eventim weekly newsletter. Eventim I-JK LTD may use your email address
        for this purpose. Eventim I-JK place great imgxrtance on data protection. You can read the data protection stament <span className='text-[#6394F0]'>here</span>.</p>
      </div>
    </Container>
    </>
  )
}

export default TicketWhishper
