import { toAbsoluteUrl } from '@/utils'
import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { RiFacebookFill } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Container } from '@/components';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <footer className='bg-[#0B1018] pt-[30px] pb-[15px]'>
        <Container className='p-0'>
            <div className="sm:grid grid-cols-12 gap-10 pb-[20px] border-b border-solid border-[rgba(255, 255, 255, 0.15)] px-[20px]">
                <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <div>
                  <Link to='/'>
                    <img src={toAbsoluteUrl('/media/frontendImage/logo.png')} alt="" className='mb-[20px] w-full max-w-[196px]'/>
                  </Link>
                    <p className='text-[#A5A5A5] text-base xl:text-[18px] leading-[26px] font-light mb-[20px] w-full max-w-[350px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                        <h3 className='text-[#5CCD5C] text-xl leading-[24px] font-normal mb-[15px]'>Social Media</h3>
                        <ul className='flex items-center gap-[15px]'>
                          <li><a href="#" className='h-[40px] w-[40px] rounded-full border border-solid border-[rgba(255, 255, 255, 0.1)] flex justify-center items-center bg-white bg-opacity-[6%] transition-all duration-[0.5s] hover:bg-opacity-[10%] group'><FaInstagram  className='text-white text-[18px] group-hover:text-[#5CCD5C]'/></a></li>
                          <li><a href="#" className='h-[40px] w-[40px] rounded-full border border-solid border-[rgba(255, 255, 255, 0.1)] flex justify-center items-center bg-white bg-opacity-[6%]  transition-all duration-[0.5s] hover:bg-opacity-[10%] group'><RiFacebookFill   className='text-white text-[18px] group-hover:text-[#5CCD5C]'/></a></li>
                          <li><a href="#" className='h-[40px] w-[40px] rounded-full border border-solid border-[rgba(255, 255, 255, 0.1)] flex justify-center items-center bg-white bg-opacity-[6%] transition-all duration-[0.5s] hover:bg-opacity-[10%] group '><FaLinkedinIn   className='text-white text-[18px] group-hover:text-[#5CCD5C]'/></a></li>
                          <li><a href="#" className='h-[40px] w-[40px] rounded-full border border-solid border-[rgba(255, 255, 255, 0.1)] flex justify-center items-center bg-white bg-opacity-[6%]  transition-all duration-[0.5s] hover:bg-opacity-[10%] group'><FaXTwitter   className='text-white text-[18px] group-hover:text-[#5CCD5C]'/></a></li>
                        </ul>
                </div>
                </div>
                <div className="col-span-12 sm:col-span-6 lg:col-span-3 mt-6 sm:mt-0">
                 <div>
                 <h3 className='text-[#5CCD5C] text-xl leading-5 font-normal mb-[15px]'>Help</h3>
                 <ul>
                    <li className='mb-[15px] text-base leading-[16px]'><a href="#" className='text-[#A5A5A5] transition-all duration-[0.5s] hover:text-[#5CCD5C] font-light text-base  leading-[16px]'>Customer Service - FAQ</a></li>
                    <li className='mb-[15px] text-base leading-[16px]'><a href="#" className='text-[#A5A5A5] transition-all duration-[0.5s] hover:text-[#5CCD5C] font-light text-base  leading-[16px]'>Cancelation insurance</a></li>
                    <li className='mb-[15px] text-base leading-[16px]'><a href="#" className='text-[#A5A5A5] transition-all duration-[0.5s] hover:text-[#5CCD5C] font-light text-base  leading-[16px]'>Exchange service</a></li>
                    <li className='mb-[15px] text-base leading-[16px]'><a href="#" className='text-[#A5A5A5] transition-all duration-[0.5s] hover:text-[#5CCD5C] font-light text-base  leading-[16px]'>Has my event been cancelled?</a></li>
                    <li className=''><a href="#" className='text-[#A5A5A5] transition-all duration-[0.5s] hover:text-[#5CCD5C] font-light text-base  leading-[16px]'>My tickets4u.cy</a></li>
                 </ul>
                 </div>
                </div>
                <div className="col-span-12 sm:col-span-6 lg:col-span-2 mt-6 sm:mt-0">
                <div>
                 <h3 className='text-[#5CCD5C] text-xl leading-5  font-normal mb-[15px]'>Our benefits </h3>
                 <ul>
                    <li className='mb-[15px] text-base leading-[16px]'><a href="#" className='text-[#A5A5A5] transition-all duration-[0.5s] hover:text-[#5CCD5C] font-light text-base  leading-[16px]'>Tickets for groups</a></li>
                    <li className='mb-[15px] text-base leading-[16px]'><a href="#" className='text-[#A5A5A5] transition-all duration-[0.5s] hover:text-[#5CCD5C] font-light text-base  leading-[16px]'>fanSALE</a></li>
                    <li className='mb-[15px] text-base leading-[16px]'><a href="#" className='text-[#A5A5A5] transition-all duration-[0.5s] hover:text-[#5CCD5C] font-light text-base  leading-[16px]'>Gift voucher</a></li>
                    <li className='mb-[15px] text-base leading-[16px]'><a href="#" className='text-[#A5A5A5] transition-all duration-[0.5s] hover:text-[#5CCD5C] font-light text-base  leading-[16px]'>Fan Ticket  </a></li>
                    <li className='mb-[15px] text-base leading-[16px]'><a href="#" className='text-[#A5A5A5] transition-all duration-[0.5s] hover:text-[#5CCD5C] font-light text-base  leading-[16px]'>Fanbonus</a></li>
                    <li className='mb-[15px] text-base leading-[16px]'><a href="#" className='text-[#A5A5A5] transition-all duration-[0.5s] hover:text-[#5CCD5C] font-light text-base  leading-[16px]'>Bono Cultural Joven</a></li>
                    <li className=''><a href="#" className='text-[#A5A5A5] transition-all duration-[0.5s] hover:text-[#5CCD5C] font-light text-base  leading-[16px]'>Entrada.Pass</a></li>
                 </ul>
                 </div>
                </div>
                <div className="col-span-12 sm:col-span-6 lg:col-span-3 mt-6 sm:mt-0">
                <div>
                 <h3 className='text-[#5CCD5C]  text-xl leading-5 font-normal mb-[15px]'>Policies </h3>
                 <ul>
                    <li className='mb-[15px] text-base leading-[16px]'><a href="#" className='text-[#A5A5A5] transition-all duration-[0.5s] hover:text-[#5CCD5C] font-light text-base  leading-[16px]'>Privacy and cookie policy</a></li> 
                    <li className='mb-[15px] text-base leading-[16px]'><a href="#" className='text-[#A5A5A5] transition-all duration-[0.5s] hover:text-[#5CCD5C] font-light text-base  leading-[16px]'>Terms and Conditions</a></li>
                    <li className='mb-[15px] text-base leading-[16px]'><a href="#" className='text-[#A5A5A5] transition-all duration-[0.5s] hover:text-[#5CCD5C] font-light text-base  leading-[16px]'>Cookie Settings</a></li>
                    <li className='mb-[15px] text-base leading-[16px]'><a href="#" className='text-[#A5A5A5] transition-all duration-[0.5s] hover:text-[#5CCD5C] font-light text-base  leading-[16px]'>Legal Notice </a></li>
                    <li className='mb-[15px] text-base leading-[16px]'><a href="#" className='text-[#A5A5A5] transition-all duration-[0.5s] hover:text-[#5CCD5C] font-light text-base  leading-[16px]'>Eventim International</a></li>
                    <li className=''><a href="#" className='text-[#A5A5A5] transition-all duration-[0.5s] hover:text-[#5CCD5C] font-light text-base  leading-[16px]'>Magazine Backstage</a></li>
                 </ul>
                 </div>
                </div>
            </div>
            <div className="mt-[18px] xl:mt-[250x] px-[20px]">
              <p className='text-center text-lg leading-[20px] font-light text-white'>Copyright 2024 © tickets4u.cy. All Rights Reserved.</p>
            </div>
        </Container>
      </footer>
    </>
  )
}

export default Footer
