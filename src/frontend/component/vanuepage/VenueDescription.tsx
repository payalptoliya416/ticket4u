import { Container } from '@/components'
import React from 'react'
import { TbMathGreater } from 'react-icons/tb'
import { Link } from 'react-router-dom'

function VenueDescription(props : any) {
  const {VenuePageData} = props;
  
  return (
    <>
      <Container>
        <div className="mt-[40px]">
        <ul className='flex items-center gap-[2px] mb-[15px] md:mb-[30px]'>
            <li>
                    <Link to='' className='text-[#494949] text-base sm:text-xl font-normal leading-[18px] sm:leading-5'>Home <TbMathGreater className='inline-block  text-xs sm:text-sm text-[#494949]' /></Link>
            </li>
            <li>
                    <Link to='' className='text-[#494949] text-base sm:text-xl font-normal leading-[18px] sm:leading-5   '>Category  <TbMathGreater className='inline-block  text-xs sm:text-sm text-[#494949]' /></Link>
            </li>
            <li>
                    <Link to='' className='text-[#494949] text-base sm:text-xl font-normal leading-[18px] sm:leading-5   '> Sub Category  <TbMathGreater className='inline-block  text-xs sm:text-sm text-[#494949]' /></Link>
            </li>
            <li>
                    <Link to='' className='text-[#5CCD5C] text-base sm:text-xl font-normal leading-[18px] sm:leading-5'>
                    {VenuePageData.city}
                     </Link>
            </li>
        </ul>
        <div className='mb-[30px]'>
            <h3 className='text-[26px] leading-[28px] mb-[20px] sm:mb-[32px] font-medium text-black  '><span className='text-[#6394F0]'>{VenuePageData.title}</span>, {VenuePageData.location}</h3>
            <p className='text-black text-base sm:text-lg font-light leading-5 sm:leading-[26px] mb-[15px]'  dangerouslySetInnerHTML={{ __html: VenuePageData?.description || "" }} />
        </div>
        </div>
        <div className="slider-container">
         
          </div>
      </Container>
    </>
  )
}

export default VenueDescription
