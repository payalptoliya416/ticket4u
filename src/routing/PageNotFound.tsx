import React from 'react'
import { toAbsoluteUrl } from '@/utils'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <>
    <div className="flex justify-center items-center flex-col h-screen w-screen bg-no-repeat bg-cover bg-white" style={{
    backgroundImage: `url('/media/frontendImage/test.png')`,}}>
      <img src={toAbsoluteUrl('/media/frontendImage/errorpage.png')} alt="" className='object-cover w-full max-w-[600px]' />
     <Link to='/'  className="text-white text-xs sm:text-sm font-normal leading-[14px] md:leading-[16px] lg:leading-[18px] px-[15px] sm:px-[15px] lg:px-[13px] xl:px-[30px] pt-[8px] md:pt-[8px] pb-[6px] md:pb-[8px] bg-[#5CCD5C] rounded-[6px] mt-5">Back to Home</Link>
    </div>
    </>
  )
}

export default PageNotFound
    