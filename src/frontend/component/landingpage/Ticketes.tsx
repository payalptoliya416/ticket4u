import { Container } from '@/components'
import { toAbsoluteUrl } from '@/utils'
import React from 'react'

const data = [
    {
        icon : '/media/frontendImage/icon1.png',
        title :"Original tickets and fair prices",
        line :'1'
    },
    {
        icon : '/media/frontendImage/icon2.png',
        title :"Safe, easy and fast purchase",
        line :'1'
    },
    {
        icon : '/media/frontendImage/icon3.png',
        title :"The best live entertainment",
        line :'1'
    },
    {
        icon : '/media/frontendImage/icon4.png',
        title :"Exclusive benefits",
        line :'1'
    },
    {
        icon : '/media/frontendImage/icon5.png',
        title :"Multiple payment methods",
        line :''
    },
]
function Ticketes() {
  return (
    <>
    <div className="mb-[50px] lg:mb-[80px] ">
        <Container  className='p-0'>
      <h3 className='text-center sm:text-start text-[18px] md:text-[22px] xl:text-[28px] leading-[28px] font-medium  text-black mb-[25px] px-[20px]'>Why Tickets4u ?</h3>
        <div className="flex flex-col sm:flex-row xl:items-start gap-[10px] md:gap-[30px] xl:justify-between px-[20px]">
            {
                data.map((item,index)=>{
                    return (
                        <>
                           <div className={`flex gap-[20px] flex-col items-center relative after:w-0  after:absolute after:content-[""] md:after
                           :right-[-19%] xl:after:right-[-20%] after:top-[18px] after:bg-[#E2E2E2] sm:after:w-[1px] after:h-[73%] after:right-[-14%] ${item.line === '1' ?"":"after:hidden"}`}>
                <div className='text-center'>
                <img src={toAbsoluteUrl(`${item.icon}`)} alt="" />
                </div>
                <h3 className='text-[18px] sm:text-base xl:text-[22px] leading-[28px] font-normal w-full max-w-[200px] text-black text-center'>{item.title}</h3>
            </div>
                        </>
                    )
                })
            }
         
        </div>
        </Container>
    </div>
    </>
  )
}

export default Ticketes
