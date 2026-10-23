import Reac from 'react'
import { Container } from '@/components'
import { Link } from 'react-router-dom'
import { TbMathGreater } from "react-icons/tb";
import { toAbsoluteUrl } from '@/utils';
import { IoCallOutline } from 'react-icons/io5';
import { GrLanguage } from 'react-icons/gr';

function ShareEvent(props : any) {
        const {detailpage} = props;
  return (
    <>
      <Container>
        <div className="mb-[70px] md:mb-[80px]">
        <ul className='flex items-center gap-[2px] mb-[15px] md:mb-[30px]'>
            <li>
                    <Link to='/' className='text-[#494949] text-base sm:text-xl font-normal leading-[18px] sm:leading-5'>Home <TbMathGreater className='inline-block  text-xs sm:text-sm text-[#494949]' /></Link>
            </li>
            <li>
              <Link to='' className='text-[#494949] text-base sm:text-xl font-normal leading-[18px] sm:leading-5'>
       
                {
                  detailpage && detailpage.category && detailpage.category.name ? (
                    <>
                    {detailpage.category.name} <TbMathGreater className='inline-block text-xs sm:text-sm text-[#494949]' />
                    </>
                  ) : null
                }
              </Link>
            </li>

            <li>
              <Link to='' className='text-[#494949] text-base sm:text-xl font-normal leading-[18px] sm:leading-5'>
              

                      {        
                      detailpage && detailpage.subcategory && detailpage.subcategory.name ? (
                    <>
                    {detailpage.subcategory.name} <TbMathGreater className='inline-block text-xs sm:text-sm text-[#494949]' />
                    </>
                  ) : null
                }
              </Link>
            </li>
            <li>
                    <Link to='' className='text-[#5CCD5C] text-base sm:text-xl font-normal leading-[18px] sm:leading-5'>
                    {
                detailpage?.venues.map((item : any)=>item.city)}
                     </Link>
            </li>
        </ul>
        <div className='pt-[20px]'>
                <h3 className='text-black text-lg sm:text-xl md:text-[26px] font-medium leading-[24px] md:leading-[26px] mb-[12px] md:mb-[15px] '><span className='text-[#6394F0]'>{detailpage && detailpage.event_title} </span>tickets at TICKETS4U.CY</h3>
                <p className='mb-[32px] md:mb-[30px] text-base sm:text-lg md:text-xl leading-[18px] md:leading-5 font-light text-black'>Your hub for every event, concert and festival around Cyprus</p>
                <h3 className='text-lg sm:text-xl md:text-[22px] leading-[22px] sm:leading-[20px] md:leading-[22px] font-normal mb-[12px] md:mb-[15px] text-black'>The <span className='text-[#6394F0]'>{detailpage && detailpage.event_title} </span> Description:</h3>
                 <p className='text-black font-light text-base sm:text-lg leading-[20px] sm:leading-[26px] mb-[12px]
                 sm:mb-[15px] '
                dangerouslySetInnerHTML={{ __html: detailpage?.description || "" }}
                />
                 
                <div className='flex gap-4 md:gap-[120px] md:flex-row flex-col mt-[30px]'>
                 <div className='relative after:absolute after:content-[""] after:top-[13%] after:right-[-23%] after:bg-[#E2E2E2] after:w-[1px] after:h-[68%]'>
               <h3 className='text-base sm:text-[22px] leading-5 mb-[10px] sm:mb-[15px] text-black font-normal'>Producer/Organizer</h3>
                <ul>
                        {
                                detailpage?.organiser.phone_number && 
                        <li className='mb-[10px]'>
                        <a 
                                href={`tel:${detailpage?.organiser.phone_number}`} 
                                className='flex gap-[5px] items-center text-base md:text-lg leading-[26px] font-light text-black'
                                >
                                <IoCallOutline className='inline-block' />
                                <span>{detailpage?.organiser.phone_number}</span>
                                </a>

                        </li>
                        }
                        {
                                detailpage?.organiser.website_link && 
                        <li className='mb-[10px]'>
                           <Link to={detailpage?.organiser.website_link} target='_blank' className='flex gap-[5px] items-center text-base md:text-lg leading-[26px] font-light text-black'><GrLanguage className='inline-block' /><span>{detailpage?.organiser.website_link}</span></Link>
                        </li>
                        }
                </ul>
                        </div>
                <div>
                <h3 className='text-base sm:text-[22px] leading-5  mb-[10px] sm:mb-[15px] text-black font-normal'>Share this event</h3>
                <ul className='flex items-center gap-5'>
                        <li><Link to='#' className='border border-[#E2E2E2] border-solid rounded-full w-[40px] h-[40px] flex items-center justify-center'><img src={toAbsoluteUrl('/media/frontendImage/facebook.png')} alt="" /></Link></li>
                        <li><Link to='#' className='border border-[#E2E2E2] border-solid rounded-full w-[40px] h-[40px] flex items-center justify-center'><img src={toAbsoluteUrl('/media/frontendImage/insta.png')} alt="" /></Link></li>
                        <li><Link to='#' className='border border-[#E2E2E2] border-solid rounded-full w-[40px] h-[40px] flex items-center justify-center'><img src={toAbsoluteUrl('/media/frontendImage/linkdin.png')} alt="" /></Link></li>
                        <li><Link to='#' className='border border-[#E2E2E2] border-solid rounded-full w-[40px] h-[40px] flex items-center justify-center'><img src={toAbsoluteUrl('/media/frontendImage/twitter.png')} alt="" /></Link></li>
                </ul>
                </div>
                </div>
        </div>
        </div>
      </Container>
    </>
  )
}

export default ShareEvent
