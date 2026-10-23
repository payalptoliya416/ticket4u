import React, { useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FaRegClock } from 'react-icons/fa6'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { MdOutlineDateRange } from 'react-icons/md'
import { TbArmchair2 } from 'react-icons/tb'
import { useSelector } from 'react-redux'

function TicketPopup(props : any) {
    const { setOpen ,handleSeatCount ,availableTicket ,popupData ,eventParchasID} = props;
    // const {  VenuePageData } = useSelector((state: any) => state.VenuePageData);
    const [pages] = useState([1, 2, 3, 4 ,'5+']);
    
    const [isChecked, setIsChecked] = useState(false);
    // const formatEventDate = (dates: string[]) => {
    //     if (!dates || dates.length === 0) return '';
    //     const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short',year: 'numeric' };
    //     const formattedDates = dates.map((date) => {
    //       return new Date(date).toLocaleDateString('en-GB', options);
    //     });
    //     return `${formattedDates[0]} - ${formattedDates[1]}`;
    //   };
     
      const handleToggle = () => {
        setIsChecked(!isChecked);
      };

  return (
    <>
       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99999999]">
                                    <div className="relative bg-white rounded-[20px] shadow-lg py-[40px] h-full max-h-[480px] md:max-h-[550px]  overflow-y-auto  max-w-[90%] w-full sm:max-w-[700px] lg:max-w-[756px] z-[999999]">
                                        <div className="absolute top-0 right-0">
                                    <AiFillCloseCircle className='text-4xl text-black cursor-pointer' onClick={()=>setOpen(false)} />
                                        </div>
                                        <div className="px-[20px] sm:px-[30px] lg:px-[56px]">
                                        <h3 className='text-xl sm:text-[26px] leading-[26px] font-normal mb-[20px] sm:mb-[25px] text-center text-black'>{eventParchasID && eventParchasID.event_title}</h3>
                                        <div className='flex items-center justify-center flex-wrap gap-[5px] xs:gap-[10px] sm::gap-[20px] mb-[25px]'>
                                        <div className="flex items-center gap-[10px] text-sm xs:text-base leading-[20px] xs:leading-[16px] font-normal text-[#A5A5A5] relative after:absolute after:content-[''] after:top-[2px] after:right-[-10%] sm:after:right-[-5%] after:w-[1px] after:h-[17px] after:bg-[#A5A5A5]">
                                            <FaRegClock/> <span className='mt-1'>{popupData.start_time} - {popupData.end_time}</span>
                                        </div>
                                        <div className="flex items-center gap-[10px] text-base leading-[16px] font-nonrmal text-[#A5A5A5] relative after:absolute after:content-[''] after:top-[2px] after:right-[-6%] sm:after:right-[-14%] after:w-[1px] after:h-[17px] after:bg-[#A5A5A5] ">
                                            <HiOutlineLocationMarker/> <span className='mt-1'>{popupData.location} , {popupData.country}</span>
                                        </div>
                                        <div className="flex items-center gap-[10px] text-base leading-[16px] font-nonrmal text-[#A5A5A5]">
                                            <MdOutlineDateRange/> <span className='mt-1'>{popupData.event_date}</span>
                                        </div>
                                        </div>
                                        <div className="border-t">
                                            <h2 className='text-lg sm:text-[26px] md:text-[32px] mt-[20px] sm:mt-[30px] leading-[20px] sm:leading-[30px] md:leading-[42px] font-medium mb-[25px] w-full max-w-[400px]  text-center mx-auto text-black' >How many tickets are you looking for?</h2>
                                        </div>
                                        <div className="flex items-center justify-center gap-[15px] sm:gap-[20px] mb-[25px] ">
                                        {pages.map((page) => (
                                                <div
                                                key={page}
                                                className={`w-[50px] md:w-[68px] h-[34px] md:h-[42px] rounded-[10px] flex items-center justify-center border border-solid border-[#A5A5A5] text-lg font-normal leading-[18px] hover:bg-[#6394F0] transition-all duration-500 hover:text-white hover:cursor-pointer ${availableTicket === page ? "bg-[#6394F0] text-white":""}`} onClick={()=>handleSeatCount(page)}
                                                >
                                                <span className='mt-1'>{page}</span>
                                                </div>
                                            ))}
                                            {/* <div className='w-[50px] md:w-[68px] h-[34px] md:h-[42px] rounded-[10px] flex items-center justify-center border border-solid border-[#A5A5A5] text-lg font-normal leading-[18px] hover:bg-[#6394F0] transition-all duration-500 hover:text-white hover:cursor-pointer'   onClick={addPages}>
                                                <span className='mt-1'>{countNO}+</span>
                                        </div> */}
                                        </div>
                                        <div className='flex gap-[8px] xs:gap-[15px] items-center mb-[34px] justify-center'>
                                        <TbArmchair2 className='inline-block text-[#A5A5A5] text-lg leading-[18px]'/>
                                        <TbArmchair2 className='inline-block text-[#A5A5A5] text-lg leading-[18px]' />
                                        <span className='text-lg leading-[18px] font-normal text-[#A5A5A5]'>Seated Together</span>
                                        <div className="flex items-center">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={handleToggle}
                                        className="sr-only peer"
                                        />
                                        <div
                                        className={`w-[50px] h-[26px] bg-[#A5A5A5]
                                        rounded-full peer  peer-checked:after:translate-x-5
                                        peer-checked:after:border-white after:content-[''] after:absolute
                                        after:top-[3px] after:left-[4px] after:bg-white after:border-gray-300
                                        after:border after:rounded-full after:h-[20px] after:w-[20px] after:transition-all
                                        dark:border-gray-600 peer-checked:bg-blue-600`}
                                        ></div>
                                    </label>
                                    </div>
                                        </div>
                                        <div className='text-center'>
                                                <button onClick={()=>setOpen(false)} className='text-white text-lg leading-[18px] font-normal py-[10px] sm:py-[16px] ps-[30px] pe-[25px] rounded-[6px] bg-[#5CCD5C]'>View Tickets</button>
                                        </div>
                                        </div>
                                        </div>
                                        </div>
    </>
  )
}

export default TicketPopup
