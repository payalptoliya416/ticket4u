import { Container } from '@/components'
import { toAbsoluteUrl } from '@/utils'
import React from 'react'

function VenueHallImages(props : any) {
    const {VenuePageData} = props;
  return (
    <>
      <Container>
        <div className="mb-[30px] mt-[30px]">
        <h3 className='text-black mb-[20px] text-[26px] leading-[26px] font-normal'>Royal Albert Hall Image</h3>
        <div className="grid grid-cols-12 gap-[20px] sm:gap-[27px]">
            {
                VenuePageData?.gallery_images.map((item : any , index: any)=>{
                    return (
          <div className="col-span-6 sm:col-span-3" key={index}>
            <img src={item.image_url} alt=""  className='rounded-xl'/>
          </div>
                    )
                })
            }
        </div>
        </div>
      </Container>
    </>
  )
}

export default VenueHallImages
