import React, { useEffect, useRef, useState } from 'react';
import { Container } from '@/components';
import { GrLanguage } from 'react-icons/gr';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { FaRegClock } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVenuePageData } from '@/frontend/redux/thunks/VenuePageThunk';
import { TbArmchair2 } from 'react-icons/tb';
import { MdOutlineDateRange } from 'react-icons/md';
import { AiFillCloseCircle } from 'react-icons/ai';
import ReactPlayer from 'react-player';

function Banner(props: any) {
  const { detailpage } = props;
  const { VenuePageData } = useSelector((state: any) => state.VenuePageData); 
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [pages] = useState([1, 2, 3, 4, '5+']);
  const [seatCount, setSeatCount] = useState<any>('');
  const [eventKey, setEventKey] = useState('');

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  const dispatch = useDispatch<any>();
  const [popupData, setPopupData] = useState<any>();
  const handleOPenTicket = async (id: any, key: string, item: any) => {
    await dispatch(fetchVenuePageData(id));
    setEventKey(key);
    setPopupData(item);
    setOpen(true);
  };

  const handlePatchase = (id: any) => {
    navigate('/eventparchas', {
      state: {
        id: id,
        seatCount: seatCount,
        eventKey: eventKey,
        eventParchasID: detailpage,
        popupData: popupData
      }
    });
  };
  const handleSeatCount = (page: any) => {
    setSeatCount(page);
  };
  const handleVenuePage = async (id: any, slug: any) => {
    navigate(`/${slug}`, { state: { id } });
  };

  return (
    <>
      <div className="mt-[-84px] mb-[40px] relative w-screen h-[450px] bg-cover">
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 z-1"></div>
        {detailpage?.banner_type === 'image' ? (
          <img
            src={detailpage?.banner_image || ''}
            alt=""
            className="w-screen h-[450px] object-cover"
          />
        ) : detailpage?.banner_type === 'video' ? (
          <>
          {/* <div
          className="w-screen h-[450px] bg-cover flex justify-center items-center"
          style={{ backgroundImage: `url(${detailpage.banner_image})` }}
        >
          <ReactPlayer
            url={detailpage?.video_url || ''}
            width="100%" 
            height="100%"
            playing={true}
            muted={true}
            loop={true}
            style={{ objectFit: 'cover', maxWidth: '800px' }} 
          />
        </div> */}
        <div
          className="w-screen h-[450px] flex justify-center items-center"
          style={{
            backgroundImage: detailpage.banner_image ? `url(${detailpage.banner_image})` : 'none',
            backgroundColor: detailpage.banner_image ? 'transparent' : '#f0f0f0',
          }}
        >
          <ReactPlayer
            url={detailpage?.video_url || ''}
            width="100%" 
            height="100%"
            playing={true}
            muted={true}
            loop={true}
            style={{ objectFit: 'cover', maxWidth: '800px' }} 
          />
        </div>
          </>
        ) : (
          <div className="w-screen h-[450px] text-sm flex items-center justify-center ">
            Loading...
          </div>
        )}
        <Container>
          <div className={`${detailpage?.venues.length > 0 ? 'mt-[-90px]' : ''} relative z-1`}>
            {detailpage?.venues.map((item: any, index: any) => {
              return (
                <div
                  className="py-[20px] lg:py-[25px] px-[15px] sm:px-[22px] lg:px-[30px] grid grid-cols-12 gap-[6px] md:gap-[20px] lg:gap-[30px] md:items-center border border-solid border-[#E2E2E2] rounded-[11px] bg-white mb-[20px] sm:mb-[30px]"
                  style={{ boxShadow: '0px 5px 30px 0px rgba(0, 0, 0, 0.08)' }}
                  key={index}
                >
                  <div className="col-span-9 md:col-span-3 xl:col-span-2 hidden md:block">
                    <div className="bg-[#6394F01A] bg-opacity-[10%] py-[7px] md:py-[24px] lg:py-[26px] px-[13px] md:px-[28px] lg:px-[33px] rounded-[6px]  md:rounded-[13px] text-center flex gap-[3px] md:flex-col w-max md:w-auto">
                      <h3 className="text-black md:text-[#6394F0] text-xs md:text-[20px] font-normal md:font-medium md:mb-[5px] leading-[12px] md:leading-[28px]">
                        {' '}
                        {item.event_date}
                      </h3>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-7 xl:col-span-8  ">
                    <div className="flex justify-between items-center mb-[10px] md:mb-0 gap-2">
                      <div className="bg-[#6394F01A] bg-opacity-[10%] py-[8px] md:py-[24px] lg:py-[26px] px-[10px] md:px-[28px] lg:px-[33px] rounded-[6px]  md:rounded-[13px] text-center flex gap-[3px] md:flex-col w-max md:w-auto md:mb-[10px] md:hidden ">
                        <h3 className="text-black md:text-[#6394F0] text-sm md:text-[20px] font-normal md:font-medium md:mb-[5px] leading-[16px] md:leading-[28px]">
                          {' '}
                          {item.event_date}
                        </h3>
                      </div>
                      {item.from_price ? (
                        <button
                          className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-normal leading-[14px] md:leading-[16px] lg:leading-[18px] px-[15px] sm:px-[15px] lg:px-[13px] xl:px-[30px] pt-[8px] md:pt-[8px] lg:pt-[14px] pb-[6px] md:pb-[8px] lg:pb-[12px] bg-[#5CCD5C] rounded-[6px] md:hidden"
                          onClick={() => handleOPenTicket(item.id, item.event_key, item)}
                        >
                          Find Tickets
                        </button>
                      ) : (
                        ''
                      )}
                    </div>
                    <div>
                      <div className="flex gap-[2px] sm:gap-[16px] items-center justify-between md:justify-normal mb-[10px] md:mb-0">
                        <h3 className="text-base sm:text-lg sm:text-[22px] lg:text-[28px] font-normal leading-[18px] xs:leading-[18px] sm:leading-[22px] lg:leading-[28px] md:mb-[17px] text-black">
                          {item.title}
                        </h3>
                        <div className="">
                          <div className="border border-[#E6E6E6] border-solid  md:mb-[15px] rounded-[6px] px-[10px] pt-[8px] pb-[6px] flex gap-[5px]  items-center ">
                            <GrLanguage className="text-black  text-[10px] sm:text-xs mt-[-3px]" />{' '}
                            <h4 className="text-[10px] md:text-xs font-normal leading-[12px] text-black mt-[1px]">
                              English
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mb-[10px] md:mb-0">
                        <div className=" text-black flex items-center  gap-[10px] md:mb-[16px] text-xs sm:text-sm md:text-[18px] font-normal leading-[12px] sm:leading-[14px] md:leading-[18px]">
                          <FaRegClock />{' '}
                          <span>
                            {item.start_time} - {item.end_time}
                          </span>
                        </div>
                        {item.from_price ? (
                          <h3 className="text-[#6394F0] text-sm sm:text-base lg:text-[20px] xl:text-[26px] font-medium leading-[14px] sm:leading-[16px] lg:leading-[20px] xl:leading-[26px]  md:mb-[15px] md:hidden">
                            From €{item.from_price && item.from_price}
                          </h3>
                        ) : (
                          ''
                        )}
                      </div>

                      <div
                        className=" text-black flex items-center gap-[10px] sm:mb-[16px] text-xs sm:text-sm md:text-[18px] font-normal leading-[12px] sm:leading-[14px] md:leading-[18px] cursor-pointer"
                        onClick={() => handleVenuePage(item.id, item.slug)}
                      >
                        <HiOutlineLocationMarker />{' '}
                        <span>
                          {item.location}, {item.city}, {item.country}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 md:col-span-2 hidden md:block">
                    <div className="flex flex-col-reverse md:block gap-[10px]">
                      {item.from_price ? (
                        <h3 className="text-[#6394F0] text-sm sm:text-base lg:text-[20px] xl:text-[26px] font-medium leading-[14px] sm:leading-[16px] lg:leading-[20px] xl:leading-[26px]  md:mb-[15px]">
                          From €{item.from_price && item.from_price}
                        </h3>
                      ) : (
                        ''
                      )}
                      <div>
                        {item.from_price ? (
                          <button
                            className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-normal leading-[14px] md:leading-[16px] lg:leading-[18px] px-[5px] sm:px-[15px] lg:px-[13px] xl:px-[30px] pt-[6px] sm:pt-[8px] lg:pt-[14px] pb-[6px] sm:pb-[8px] lg:pb-[12px] bg-[#5CCD5C] rounded-[6px]"
                            onClick={() => handleOPenTicket(item.id, item.event_key, item)}
                          >
                            Find Tickets
                          </button>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </div>

                  {open && (
                    // <TicketPopup handlePatchase={handlePatchase} setOpen={setOpen} setSeatCount={setSeatCount}  seatCount={seatCount}/>
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99999999]">
                      <div className="relative bg-white rounded-[20px] shadow-lg py-[40px] h-full max-h-[480px] md:max-h-[550px]  overflow-y-auto  max-w-[90%] w-full sm:max-w-[700px] lg:max-w-[756px] z-[999999]">
                        <div className="absolute top-0 right-0">
                          <AiFillCloseCircle
                            className="text-4xl text-black cursor-pointer"
                            onClick={() => setOpen(false)}
                          />
                        </div>
                        <div className="px-[20px] sm:px-[30px] lg:px-[56px]">
                          <h3 className="text-xl sm:text-[26px] leading-[26px] font-normal mb-[20px] sm:mb-[25px] text-center text-black">
                            {detailpage && detailpage.event_title}
                          </h3>
                          <div className="flex items-center justify-center flex-wrap gap-[5px] xs:gap-[10px] sm::gap-[20px] mb-[25px]">
                            <div className="flex items-center gap-[10px] text-sm xs:text-base leading-[20px] xs:leading-[16px] font-normal text-[#A5A5A5] relative after:absolute after:content-[''] after:top-[2px] after:right-[-10%] sm:after:right-[-5%] after:w-[1px] after:h-[17px] after:bg-[#A5A5A5]">
                              <FaRegClock />{' '}
                              <span className="mt-1">
                                {popupData.start_time} - {popupData.end_time}
                              </span>
                            </div>
                            <div className="flex items-center gap-[10px] text-base leading-[16px] font-nonrmal text-[#A5A5A5] relative after:absolute after:content-[''] after:top-[2px] after:right-[-6%] sm:after:right-[-14%] after:w-[1px] after:h-[17px] after:bg-[#A5A5A5] ">
                              <HiOutlineLocationMarker />{' '}
                              <span className="mt-1">
                                {VenuePageData.location} , {VenuePageData.country}
                              </span>
                            </div>
                            <div className="flex items-center gap-[10px] text-base leading-[16px] font-nonrmal text-[#A5A5A5]">
                              <MdOutlineDateRange />{' '}
                              <span className="mt-1">{popupData.event_date} </span>
                            </div>
                          </div>
                          <div className="border-t">
                            <h2 className="text-lg sm:text-[26px] md:text-[32px] mt-[20px] sm:mt-[30px] leading-[20px] sm:leading-[30px] md:leading-[42px] font-medium mb-[25px] w-full max-w-[400px]  text-center mx-auto text-black">
                              How many tickets are you looking for?
                            </h2>
                          </div>
                          <div className="flex items-center justify-center gap-[15px] sm:gap-[20px] mb-[25px] ">
                            {pages.map((page) => (
                              <div
                                key={page}
                                className={`w-[50px] md:w-[68px] h-[34px] md:h-[42px] rounded-[10px] flex items-center justify-center border border-solid border-[#A5A5A5] text-lg font-normal leading-[18px] hover:bg-[#6394F0] transition-all duration-500 hover:text-white hover:cursor-pointer ${seatCount === page ? 'bg-[#6394F0] text-white' : ''}`}
                                onClick={() => handleSeatCount(page)}
                              >
                                <span className="mt-1">{page}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-[8px] xs:gap-[15px] items-center mb-[34px] justify-center">
                            <TbArmchair2 className="inline-block text-[#A5A5A5] text-lg leading-[18px]" />
                            <TbArmchair2 className="inline-block text-[#A5A5A5] text-lg leading-[18px]" />
                            <span className="text-lg leading-[18px] font-normal text-[#A5A5A5]">
                              Seated Together
                            </span>
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
                          <div className="text-center">
                            <button
                              onClick={() => handlePatchase(VenuePageData.id)}
                              className="text-white text-lg leading-[18px] font-normal py-[10px] sm:py-[16px] ps-[30px] pe-[25px] rounded-[6px] bg-[#5CCD5C]"
                            >
                              View Tickets
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </>
  );
}

export default Banner;
