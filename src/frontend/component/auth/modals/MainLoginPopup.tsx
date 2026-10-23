import React, { useState } from 'react'
import { LoginPopup } from './LoginPopup'
import { SignupPopup } from './SignupPopup'

function MainLoginPopup({signUpPopup ,loginPopup ,handleLoginOpen,SignUpPopupOpen ,setPopup,setLoginPopup , setSignUpPopup} : any) {
      const [signupModalOpen, setSignupModalOpen] = useState(true);
          const handleClose = () => {
            setSignupModalOpen(false);
            setPopup(false);
            setLoginPopup(false);
            setSignUpPopup(false);
     };
          
  return (
    <>
    {loginPopup && <LoginPopup  open={signupModalOpen} onClose={handleClose} SignUpPopupOpen={SignUpPopupOpen}/>}
    {signUpPopup && <SignupPopup  open={signupModalOpen} onClose={handleClose} handleLoginOpen={handleLoginOpen}/>}  
    </>
  )
}

export default MainLoginPopup
