
import React, { useEffect, useState } from 'react'
import { toAbsoluteUrl } from '@/utils'
import { IoSearch } from "react-icons/io5";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { FaAngleDown } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { LoginPopup, SignupPopup } from '../auth/modals';
import MainLoginPopup from '../auth/modals/MainLoginPopup';

function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
 
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [customerName, setCustomerName] = useState('');

    useEffect(() => {
        const accessToken = localStorage.getItem('cust_access_token');
        if (accessToken) {
          const userName = localStorage.getItem('user_name');
          
          if (userName) {
            setCustomerName(userName);
          }
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }, []);

      const handleLogout = () => {
        localStorage.removeItem('cust_access_token');
        localStorage.removeItem('cust_id');
        localStorage.removeItem('user_name');
        
        setIsLoggedIn(false);
        navigate('/');
      };
const [popup ,setPopup]= useState(false);
     const [loginPopup , setLoginPopup] = useState(false);
     const [signUpPopup, setSignUpPopup] = useState(false);

     const handleLoginOpen = ()=>{
         setLoginPopup(true);
         setSignUpPopup(false);
         setPopup(true);
     }

     const SignUpPopupOpen = ()=>{
      setSignUpPopup(true);
      setLoginPopup(false);
      setPopup(true);
     }

  return (
    <>
   <header>
    <nav className="bg-transparent pt-[30px]">
        <div className="flex lg:justify-end items-center relative z-[999]">
            <Link to='/'>
                <img src={toAbsoluteUrl('/media/frontendImage/logo.png')} className='w-full max-w-[196px]' />
            </Link>
            <div className=" flex items-center justify-end w-full gap-[20px] xl:gap-[30px]">
                <ul className="hidden lg:flex items-center gap-[10px] xl:gap-[20px]">
                    <li>
                        <Link to='/' className={`block py-2 pr-4 pl-3 text-lg leading-[18px] font-light
                             ${location.pathname === '/' ? "text-[#5CCD5C]":"text-white "} hover:text-[#5CCD5C] rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 relative after:absolute after:content-[''] after:bg-[#5CCD5C] hover:after:w-full after:h-[1px] after:bottom-[-5px] after:left-0 before:absolute before:right-[-1px] before:bottom-[-7px] before:content-[''] before:bg-[#5CCD5C] after:w-0 before:w-0 after:transition-all after:duration-[0.5s]  before:transition-all before::duration-[0.5s] hover:before:w-[20px] before:h-[2px] transition-all duration-[0.5s]`} >Home</Link>
                    </li>
                    <li>
                        <a href="#" className="text-white py-2 pr-4 pl-3 text-lg leading-[18px] font-light text-gray-700 block hover:text-[#5CCD5C] rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 relative after:absolute after:content-[''] after:bg-[#5CCD5C] hover:after:w-full after:h-[1px] after:bottom-[-5px] after:left-0 before:absolute before:right-[-1px] before:bottom-[-7px] before:content-[''] before:bg-[#5CCD5C] after:w-0 before:w-0 after:transition-all after:duration-[0.5s]  before:transition-all before::duration-[0.5s] hover:before:w-[20px] before:h-[2px] transition-all duration-[0.5s]">Movie</a>
                    </li>
                    <li>
                        <a href="#" className="text-white py-2 pr-4 text-lg leading-[18px] font-light pl-3text-gray-700 block hover:text-[#5CCD5C] rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 relative after:absolute after:content-[''] after:bg-[#5CCD5C] hover:after:w-full after:h-[1px] after:bottom-[-5px] after:left-0 before:absolute before:right-[-1px] before:bottom-[-7px] before:content-[''] before:bg-[#5CCD5C] after:w-0 before:w-0 after:transition-all after:duration-[0.5s]  before:transition-all before::duration-[0.5s] hover:before:w-[20px] before:h-[2px] transition-all duration-[0.5s] ">Coming soon</a>
                    </li>
                   <li className='bg-transparent text-white font-light text-lg leading-[18px] relative cursor-pointer group py-[14px] transition-all duration-[0.5s]'>Event <FaAngleDown className='inline-block text-sm ms-2'/>
                   <div className="absolute top-[40px] z-5 group-hover:opacity-[1] group-hover:visible  opacity-0 invisible">
                    <ul className='rounded-[10px] w-full min-w-[193px]'> 
                       <li className='py-[15px] px-[10px] text-[#2be197] text-lg leading-[17px] bg-[#dafaed] rounded-t-[10px]' >Comedy Show</li>
                       <li className='py-[15px] px-[10px] text-[#1D1D1B] text-lg leading-[17px] bg-white hover:text-[#2be197] hover:bg-[#1D1D1B] transition-all duration-[0.5s]'><Link to=''>Music Shows</Link></li>
                       <li className='py-[15px] px-[10px] text-[#1D1D1B] text-lg leading-[17px] bg-white hover:text-[#2be197] hover:bg-[#1D1D1B] transition-all duration-[0.5s]' ><Link to=''>Kids</Link></li>
                       <li className='py-[15px] px-[10px] text-[#1D1D1B] text-lg leading-[17px] bg-white hover:text-[#2be197] hover:bg-[#1D1D1B] transition-all duration-[0.5s]' ><Link to=''>Exhibitions</Link></li>
                       <li className='py-[15px] px-[10px] text-[#1D1D1B] text-lg leading-[17px] bg-white rounded-b-[10px] hover:text-[#2be197] hover:bg-[#1D1D1B] transition-all duration-[0.5s]' ><Link to=''>Award shows</Link></li>
                    </ul>
                  </div>
                   </li >
                   <li className='bg-transparent text-white font-light text-lg leading-[18px] relative cursor-pointer py-[14px] group' >Location <FaAngleDown className='inline-block text-sm ms-2'/>
                 <div className="absolute top-[40px] z-5 group-hover:opacity-[1] group-hover:visible  opacity-0 invisible">
                    <ul className='rounded-[10px] w-full min-w-[193px]'> 
                       <li  className='py-[15px] px-[10px] text-[#2be197] text-lg leading-[17px] bg-[#dafaed] rounded-t-[10px]' >Surat</li>
                       <li  className='py-[15px] px-[10px] text-[#1D1D1B] text-lg leading-[17px] bg-white rounded-b-[10px] hover:text-[#2be197] hover:bg-[#1D1D1B] transition-all duration-[0.5s]' >London</li>
                    </ul>
              </div>
                   </li>
                   <li>
                    <form className='relative'>
                        <input type="text" placeholder='Search for artists and events' className='bg-white bg-opacity-[10%] text-sm py-[8px] lg:py-[14px] px-[15px] w-full sm:w-[309px] rounded-[8px] focus:border-none placeholder:text-[14px] text-[14px] leading-[16px] placeholder:leading-[16px] placeholder:font-light font-light focus:outiline-none text-white'/>
                        <IoSearch className='absolute text-white right-[10px] top-[10px] lg:top-[14px] text-lg cursor-pointer' />
                    </form>
                   </li>
                </ul>
                <ul className='flex items-center gap-[10px] xl:gap-[20px]'>
                   
                   {/* <li>
                    <img src={toAbsoluteUrl('/media/frontendImage/Frame.png')}  alt="" />
                   </li> */}
                   {/* <li className='bg-transparent text-white font-light text-lg leading-[18px] relative cursor-pointer py-[14px] group'>
                        <img src={toAbsoluteUrl('/media/frontendImage/Frame.png')} alt="Sign In" />
                        <div className="absolute top-[40px] z-5 group-hover:opacity-[1] group-hover:visible opacity-0 invisible">
                            <ul className='rounded-[10px] w-full min-w-[193px]'>
                                <li className='py-[15px] px-[10px] text-[#2be197] text-lg leading-[17px] bg-[#dafaed] rounded-t-[10px]'>
                                    <Link to="/login" className="hover:text-[#1D1D1B]">Login</Link>
                                </li>
                                <li className='py-[15px] px-[10px] text-[#1D1D1B] text-lg leading-[17px] bg-white rounded-b-[10px] hover:text-[#2be197] hover:bg-[#1D1D1B] transition-all duration-[0.5s]'>
                                    <Link to="/signup" className="hover:text-[#1D1D1B]">Sign Up</Link>
                                </li>
                            </ul>
                        </div>
                    </li> */}
                    <li className='bg-transparent text-white font-light text-lg leading-[18px] relative cursor-pointer py-[14px] group'>
                        <img src={toAbsoluteUrl('/media/frontendImage/Frame.png')} alt="Sign In" />
                        <div className="absolute top-[50px] 3xl:left-0 right-[-10px] z-5 group-hover:opacity-[1]  group-hover:visible opacity-0 invisible">
                            <ul className='rounded-[10px] w-full min-w-[193px]'>
                            {isLoggedIn ? (
                                <>
                                <li className='py-[10px] sm:py-[15px] px-[8px] sm:px-[10px] text-[#2be197] text-lg leading-[17px] bg-[#dafaed] rounded-t-[10px]'>
                                    <span>{customerName}</span> 
                                </li>
                                <li
                                    className='py-[10px] sm:py-[15px] px-[8px] sm:px-[10px] text-[#1D1D1B] text-lg leading-[17px] bg-white rounded-b-[10px] hover:text-[#2be197] hover:bg-[#1D1D1B] transition-all duration-[0.5s]'
                                    onClick={handleLogout}
                                >
                                    Logout 
                                </li>
                                </>
                            ) : (
                                <>
                                <li className='py-[10px] sm:py-[15px] px-[8px] sm:px-[10px] text-[#2be197] text-lg leading-[17px] bg-[#dafaed] rounded-t-[10px] hover:text-[#2be197] hover:bg-[#1D1D1B]' onClick={handleLoginOpen}>
                                    <span className="hover:text-[#2be197]" >Login</span>
                                </li>
                                <li className='py-[10px] sm:py-[15px] px-[8px] sm:px-[10px] text-[#1D1D1B] text-lg leading-[17px] bg-white rounded-b-[10px] transition-all duration-[0.5s] hover:text-[#2be197] hover:bg-[#1D1D1B]' onClick={SignUpPopupOpen}>
                                    <span className="hover:text-[#2be197] " >Sign Up</span>
                                </li>
                                </>
                            )}
                            </ul>
                        </div>
                    </li>
                    { 
                        popup && <MainLoginPopup signUpPopup={signUpPopup} loginPopup={loginPopup} SignUpPopupOpen={SignUpPopupOpen} handleLoginOpen={handleLoginOpen} setSignUpPopup={setSignUpPopup} setPopup={setPopup} />
                    }
                   
                </ul>
                <div className='lg:hidden'>
                <HiMiniBars3BottomRight  className='text-white text-3xl'   onClick={toggleMenu}/>
                </div>
                <ul className={`flex-col items-start gap-[10px] xl:gap-[20px] absolute top-[120%] rounded-md p-2 left-0 w-full bg-[#8a8a8ae7] ${isMenuOpen ? "h-auto flex": "h-0 hidden"}`}>
                    <li>
                        <Link to='/sasasas' className="block py-2 pr-4 text-[#5CCD5C] rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 relative after:absolute after:content-[''] after:bg-[#5CCD5C] after:w-full after:h-[1px] after:bottom-[-2px] after:left-0 before:absolute before:right-[-1px] before:bottom-[-4px] before:content-[''] before:bg-[#5CCD5C] before:w-[20px] before:h-[2px]" >Home</Link>
                    </li>
                    <li>
                        <a href="#" className="text-white py-2 pr-4 text-gray-700">Movie</a>
                    </li>
                    <li>
                        <a href="#" className="text-white py-2 pr-4 text-gray-700">Coming soon</a>
                    </li>
                   <li className='bg-transparent text-white font-light text-lg leading-[18px] relative cursor-pointer group '  >Event <FaAngleDown className='inline-block text-sm ms-2'/>
               <div className="absolute top-[20px] z-5  group-hover:opacity-[1] group-hover:visible  opacity-0 invisible" >
                    <ul className='rounded-[10px] w-full min-w-[193px]'> 
                       <li  className='py-[15px] px-[10px] text-[#2be197] text-lg leading-[17px] bg-[#dafaed] rounded-t-[10px]' >Comedy Show</li>
                       <li  className='py-[15px] px-[10px] text-[#1D1D1B] text-lg leading-[17px] bg-white  hover:text-[#2be197] hover:bg-[#1D1D1B] transition-all duration-[0.5s]' >Music Shows</li>
                       <li  className='py-[15px] px-[10px] text-[#1D1D1B] text-lg leading-[17px] bg-white  hover:text-[#2be197] hover:bg-[#1D1D1B] transition-all duration-[0.5s]' >Kids</li>
                       <li  className='py-[15px] px-[10px] text-[#1D1D1B] text-lg leading-[17px] bg-white  hover:text-[#2be197] hover:bg-[#1D1D1B] transition-all duration-[0.5s]' >Exhibitions</li>
                       <li  className='py-[15px] px-[10px] text-[#1D1D1B] text-lg leading-[17px] bg-white rounded-b-[10px] hover:text-[#2be197] hover:bg-[#1D1D1B] transition-all duration-[0.5s]' >Award shows</li>
                    </ul>
              </div>
             
                   </li>
                   <li className='bg-transparent text-white font-light text-lg leading-[18px] relative cursor-pointer group '  >Location <FaAngleDown className='inline-block text-sm ms-2'/>
               <div className="absolute top-[20px] z-5  group-hover:opacity-[1] group-hover:visible  opacity-0 invisible" >
                    <ul className='rounded-[10px] w-full min-w-[193px]'> 
                       <li  className='py-[15px] px-[10px] text-[#2be197] text-lg leading-[17px] bg-[#dafaed] rounded-t-[10px]' >Surat</li>
                       <li  className='py-[15px] px-[10px] text-[#1D1D1B] text-lg leading-[17px] bg-white rounded-b-[10px] hover:text-[#2be197] hover:bg-[#1D1D1B] transition-all duration-[0.5s]' >London</li>
                    </ul>
              </div>
             
                   </li>
                   <li>
                    <form className='relative'>
                        <input type="text" placeholder='Search for artists and events' className='bg-gray-200 bg-opacity-[10%] text-sm py-[8px] lg:py-[14px] px-[15px] w-[250px] sm:w-[309px] rounded-[8px] focus:border-none focus:outiline-none'/>
                        <IoSearch className='absolute text-gray-600 right-[10px] top-[10px] lg:top-[14px] text-lg' />
                    </form>
                   </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
    </>
  )
}

export default LandingPage
