import React, { useEffect,useRef,useState } from 'react';
import { Container } from '@/components';
import { toAbsoluteUrl } from '@/utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { PiBellSimpleRinging } from "react-icons/pi";
import { HiOutlineUser } from "react-icons/hi2";
import { SeatsioSeatingChart } from '@seatsio/seatsio-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVenuePageData } from '../redux/thunks/VenuePageThunk';
import 'react-toastify/dist/ReactToastify.css';
import TicketPopup from './TicketPopup';
import MainLoginPopup from '../component/auth/modals/MainLoginPopup';

const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;
const CHECKOUT_API_URL = `${ADMIN_API_URL}/checkout`;

function EventParchas() {
    const location = useLocation();
    const { id , seatCount , eventKey , eventParchasID , popupData } = location.state || {};
    const dispatch = useDispatch<any>();
    const { VenuePageData } = useSelector((state: any) => state.VenuePageData);
    const [open ,setOpen] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState<any[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [availableTicket ,setAvailableTicket]  = useState<any>(seatCount || 0);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(()=>{ 
       dispatch(fetchVenuePageData(id));
    },[]);

    const handleSeatCount = (page : any)=>{
      setAvailableTicket(page);
    }
const [popup , setPopup]  = useState(false);

      const [loginPopup , setLoginPopup] = useState(false);
     const [signUpPopup, setSignUpPopup] = useState(false);

     const handleLoginOpen = ()=>{
      setLoginPopup(true);
      setSignUpPopup(false);
     }

     const SignUpPopupOpen = ()=>{
      setSignUpPopup(true);
      setLoginPopup(false);
     }
     
    const handleCheckout = async () => {
      
      const accessToken = localStorage.getItem('cust_access_token');
      const custId = localStorage.getItem('cust_id');
      
      if(!accessToken && !custId) {
        setPopup(true);
        setLoginPopup(true);
        setSignUpPopup(false);
        return;
      }

      setLoading(true);
      setError(null);
      setSuccessMessage(null);
  
      const checkoutData: Record<string, any> = {
        cust_id: localStorage.getItem('cust_id'),
        event_key: popupData.event_key,
        event_seatio_id: popupData.event_seatio_id,
        event_id: eventParchasID.id,
        venue_id: popupData.id,
        total_price: totalPrice,
        seats: selectedSeats.map((seat) => seat.label).join(","),
      };
      
      try {
        const response = await fetch(CHECKOUT_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(checkoutData),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setSuccessMessage(data.message || 'Checkout successful!');

          setTimeout(() => {
            navigate('/');
          }, 1000);
        } else {
          setError(data.message || 'An error occurred during checkout.');
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };   
    const syncSelectedSeats = (chartSelectedObjects: any[]) => {
      const newSeats = chartSelectedObjects.map((obj) => ({
        label: obj.label,
        category: obj.category,
        pricing: obj.pricing,
      }));
      const newTotalPrice = newSeats.reduce((sum, seat) => sum + seat.pricing.price, 0);
      setSelectedSeats(newSeats);
      setTotalPrice(newTotalPrice);
    };

    const handleSeatSelect = (seat: any) => {
        setSelectedSeats((prevSeats) => {
          const newSeats = [...prevSeats, seat];
          const newTotalPrice = newSeats.reduce((sum, seat) => sum + seat.pricing.price, 0);
          setTotalPrice(newTotalPrice);
          return newSeats;
        });
    };

    const handleSeatDeselect = (seat: any) => {
      setSelectedSeats((prevSeats) => {
        const newSeats = prevSeats.filter((selectedSeat) => selectedSeat.label !== seat.label);
        const newTotalPrice = newSeats.reduce((sum, seat) => sum + seat.pricing.price, 0);
        setTotalPrice(newTotalPrice);
        return newSeats;
      });
    };
    const handleOpenTicket = ()=>{
        setOpen(true);
    }
  
    useEffect(() => {
      const checkData = async () => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
        setIsLoading(false);
      };
      checkData();
    }, []);
 
    useEffect(() => {
      if (!isLoading) {
        if (!VenuePageData || !id || !eventParchasID?.event_title) {
          navigate('*'); 
        }
      }
    }, [isLoading, VenuePageData, id, eventParchasID, navigate]);
    
    if (isLoading) {
      return   <div role="status" className='h-screen w-screen flex justify-center items-center'>
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
      </div>
      ; 
    }

  return (
    <>
    <div  className='mx-auto'>
    <Container>
        <div className="">
      <div className="pb-[30px] pt-[34px] border-b border-[#E2E2E2]">
        <div className="grid grid-cols-12 items-center gap-[10px] xl:gap-[40px] ">
            <div className="col-span-12 sm:col-span-4 lg:col-span-2 order-1 ">
              <div className="flex justify-center lg:justify-normal">
                <Link to='/' >
                  <img src={toAbsoluteUrl('/media/frontendImage/logo.png')} className='w-full max-w-[196px]' />
                </Link>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-12 lg:col-span-6 order-3 lg:order-2 mt-4 sm:mt-5 lg:mt-0">
                <div className="flex items-start mb-[5px] gap-1 sm:gap-0 justify-center lg:justify-normal flex-wrap sm:flex-nowrap">
                <h3 className='text-base sm:text-xl leading-[20px] font-normal  text-black'>{eventParchasID && eventParchasID.event_title}</h3>
                 <div className='mb-1 sm:mb-0 border border-[#E6E6E6] border-solid  rounded-[6px] px-[10px] py-[7px] flex gap-[5px] items-center ms-2'>
                       {/* <img src={toAbsoluteUrl('/media/frontendImage/flag.png')} alt=""  className='rounded-full w-[18px] h-[18px]'/> */}
                       <h4 className='text-[10px] sm:text-xs font-normal leading-[12px] text-black '>English</h4>
                 </div>
                </div>
                       <div className="flex items-center gap-[10px] sm:gap-[20px]  justify-center lg:justify-normal flex-wrap">
                       <h3 className='text-black text-sm leading-[14px] font-normal relative after:absolute after:content-[""] after:top-0 after:right-[-10px] after:bg-[#E2E2E2] after:w-[1px] after:h-[90%]'>{popupData && popupData.event_date}</h3>
                       <h3 className='text-black text-sm leading-[14px] font-normal'> {VenuePageData && VenuePageData.location} , {VenuePageData && VenuePageData.city} , {VenuePageData && VenuePageData.country}</h3>
                       </div>
            </div>
            <div className="col-span-12 sm:col-span-8 lg:col-span-4 order-2 lg:order-3">
                <div className="flex items-center gap-[15px] justify-center sm:justify-end lg:justify-normal">
                  <button className='py-[8px] sm:py-[11px] px-[5px] xs:px-[10px] xl:px-[14px] border border-solid border-[#E2E2E2] rounded-[6px] flex items-center gap-[8px] xl:gap-[14px] text-black text-[11px] xs:text-sm leading-[14px] font-normal' onClick={handleOpenTicket}>{availableTicket || 0} Ticket <FaRegEdit className='text-[11px]' /></button>
                  <button className='py-[8px] sm:py-[11px] px-[5px] xs:px-[10px] xl:px-[14px] border border-solid border-[#E2E2E2] rounded-[6px] flex items-center gap-[8px] xl:gap-[14px] text-black text-[11px] xs:text-sm leading-[14px] font-normal'>TicketWhisper
                     <PiBellSimpleRinging  className='text-[11px]' /></button>
                  <div className='w-[38px] xs:w-[44px] h-[30px] xs:h-[38px] bg-[#014F59] flex justify-center items-center rounded-[8px]'>
                    <HiOutlineUser className='text-white text-lg xs:text-[24px] font-medium'/></div>
                </div>
                {
                     open && 
                     <TicketPopup setOpen={setOpen} seatCount={seatCount} handleSeatCount={handleSeatCount} availableTicket={availableTicket} popupData={popupData} eventParchasID={eventParchasID}/>
                }
            </div>
        </div>
      </div>
      <div className="mt-[30px] mb-[20px]">
        <div className="grid grid-cols-12 sm:gap-[40px] items-center">
        <div className="col-span-12 lg:col-span-5 xl:col-span-4">
            <div className="border border-[#E2E2E2] py-[30px] px-[20px] rounded-[12px]">
           <div className="flex flex-col gap-[20px]">
            {
              popupData && popupData.venue_category && popupData.venue_category.length > 0 ? (
                <>
                {
                  popupData.venue_category.map((item : any, index : number)=>{
                    return(
                <div className='p-[12px] gap-2 sm:p-[20px] flex items-center justify-between border border-[#6394F04D] border-opacity-[30%] rounded-[8px] flex-wrap xs:flex-nowrap' key={index}>
                <div>
                 <h3 className='text-sm leading-[14px] font-normal text-black mb-[5px]'>{item.category_label}</h3>
                </div>
                <div>
                    <button className='py-[7px] sm:py-[11px] px-[12px] sm:px-[19px] bg-[#5CCD5C] text-white text-sm leading-[14px] font-normal  rounded-[6px]'>€{item.price} each</button>
                </div>
               </div>
                    )
                  })
                }
                </>
              ): (
                <div className='flex justify-center items-center'>No categories available</div>
              )
            }
         
           </div>
            </div>
        </div>
        <div className="col-span-12 lg:col-span-7 xl:col-span-8">
        <div className="mt-6" style={{ 'height': '500px' }}>
        {
          eventParchasID &&
          eventParchasID.event_categories &&
          eventParchasID.event_categories.length > 0 ? (
            <SeatsioSeatingChart
              workspaceKey="091afdc1-5214-4cc4-a869-fdd1d86c4846"
              event={eventKey}
              region="eu"
              pricing={
                eventParchasID.event_categories.map((item: any) => ({
                  category: item.category_label,
                  price: parseFloat(item.price),
                }))
              }
              priceFormatter={(price) => `€${price.toFixed(2)}`}
            //   onObjectSelected={handleSeatSelect}
            // onObjectDeselected={handleSeatDeselect}
            onObjectSelected={(seat) => {
              handleSeatSelect(seat);
            }}
            onObjectDeselected={(seat) => {
              handleSeatDeselect(seat);
            }}
            maxSelectedObjects={availableTicket}
            onChartRendered={(chartInstance) => {
              const chartSelectedObjects = chartInstance.selectedObjects;
              syncSelectedSeats(chartSelectedObjects);
            }}
            />
          ) : (
          ''
          )
        }
        </div>
        </div>
        </div>
      </div>
        </div>
      </Container>
      <div className="bg-[#F7F7F7] border-t border-[#E2E2E2] w-full">
        <Container >
            <div className="py-[15px] items-center justify-between sm:flex-row flex-col grid grid-cols-12 gap-[20px] lg:gap-2">
                  <div className='col-span-12 lg:col-span-5 flex justify-center lg:justify-normal'>
                 <div>
                 <h3 className='text-base leading-[22px] font-normal text-black mb-[5px]'>
                   {selectedSeats.map((seat) => (
                    <>
                <span key={seat.label} className='ms-1 mb-1'>
                {seat.category.label}  {seat.label} ,
                </span>
                    </>
              ))}
                  </h3>
                  <h4 className='text-sm leading-[14px] font-light text-black'>({selectedSeats.length}Tickets)</h4>
                 </div>
                  </div>
                  <div className='col-span-12 sm:col-span-6 lg:col-span-2 flex justify-center'>
                    <h3 className='text-black text-base leading-[16px] font-normal '>Total Price: <span className='text-[#5CCD5C]ms-[5px]'> €{totalPrice.toFixed(2)}</span></h3>
                  </div>
                  {/* <div className='col-span-12 sm:col-span-6 lg:col-span-5 flex justify-center sm:justify-end'>
                    <button onClick={handleCheckout} className='bg-[#5CCD5C] text-white text-xs leading-[14px] py-[12px] px-[79px] flex items-center justify-center rounded-[6px]'>Checkout</button>
                  </div> */}
                  <div className='col-span-12 sm:col-span-6 lg:col-span-5 flex justify-center sm:justify-end'>
                    <span>
                      {successMessage && <span className="text-green-600">{successMessage}</span>}
                      {errorMessage && <span className="text-red-600">{errorMessage}</span>}
                    </span>
                    <button
                      onClick={handleCheckout}
                      disabled={loading}
                      className='bg-[#5CCD5C] text-white text-xs leading-[14px] py-[12px] px-[79px] flex items-center justify-center rounded-[6px]'
                    >
                      {loading ? 'Processing...' : 'Checkout'}
                    </button>
                  </div>
                 
                   {
                        popup && 
                        <MainLoginPopup signUpPopup={signUpPopup} loginPopup={loginPopup} SignUpPopupOpen={SignUpPopupOpen} handleLoginOpen={handleLoginOpen} setLoginPopup={setLoginPopup} setPopup={setPopup}/>
                       }
            </div>
        </Container>
      </div>
    </div>
    </>
  )
}
export default EventParchas