import { Container } from '@/components';
import React from 'react';

function VenueMap(props : any) {
  const {VenuePageData} = props;
  
  return (
    <>
      <Container>{
            VenuePageData.map_url ?
        <div className="mb-[80px]">
           <iframe
            src={VenuePageData.map_url}
            
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Venue Map"
            className='w-full h-[370px]'
          ></iframe>   </div> : ""
          }
      </Container>
    </>
  );
}

export default VenueMap;
