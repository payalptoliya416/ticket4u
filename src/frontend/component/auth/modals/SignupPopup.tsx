import React, { useState } from 'react';
import { Modal, ModalContent, ModalBody, ModalHeader } from '@/components/modal';
import { KeenIcon } from '@/components';

const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;
export const Add_Customer = `${ADMIN_API_URL}/addCustomer`;

interface IModalProps {
  open: boolean;
  onClose: () => void;
  handleLoginOpen: ()=> void;
}

const SignupPopup = ({ open, onClose ,handleLoginOpen }: IModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const handleClose = () => {
    onClose();
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
  
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please ensure both fields are the same.");
      return;
    }
  
    try {
      const response = await fetch(Add_Customer, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        
        if (data.status === "success") {
          setSuccessMessage(data.message || "Signup successful! Redirecting...");
          setTimeout(() => {
            handleClose();
          }, 1500);
        } else {
          setError(data.message || "Failed to sign up. Please try again.");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "An unexpected error occurred.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please check your network.");
    }
  };
   

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalContent className="modal-center w-full max-w-[500px] max-h-[100%] scrollable-y-auto">
        <ModalHeader className="justify-end border-0 pt-3 sm:pt-4">
          <button
            className="btn btn-sm btn-icon btn-light btn-clear shrink-0"
            onClick={handleClose}>
            <KeenIcon icon="cross" />
          </button>
        </ModalHeader>
        <ModalBody className="flex flex-col pt-0 pb-8">
          {error && <div className="text-sm text-red-500 mb-4">{error}</div>}
          {successMessage && (
            <div className="text-sm text-green-500 mb-4">{successMessage}</div>
          )}
          <div className="flex  justify-center grow bg-center bg-no-repeat page-bg">
            <div className="card max-w-[370px] w-full">
              <form
                className="card-body flex flex-col gap-4 p-5 sm:p-10"
                onSubmit={handleSignup}
              >
                <div className="text-center mb-2.5">
                  <h3 className="text-lg font-medium text-gray-900 leading-none mb-2.5">
                    Sign up
                  </h3>
                  <div className="flex items-center justify-center flex-wrap sm:flex-nowrap">
                    <span className="text-2sm text-gray-700 me-1.5">
                      Already have an Account?
                    </span>
                    <span className="text-2sm link cursor-pointer" onClick={handleLoginOpen} >
                      Sign In
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="form-label text-gray-900">Name</label>
                  <input
                    className="input"
                    name="user_name"
                    placeholder="Enter Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="form-label text-gray-900">Email</label>
                  <input
                    className="input"
                    name="user_email"
                    placeholder="email@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="form-label text-gray-900">Password</label>
                  <input
                    className="input"
                    name="user_password"
                    placeholder="Enter Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="form-label text-gray-900">
                    Confirm Password
                  </label>
                  <input
                    className="input"
                    name="confirm_password"
                    placeholder="Re-enter Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <label className="checkbox-group">
                  <input
                    className="checkbox checkbox-sm"
                    name="terms"
                    type="checkbox"
                    required
                  />
                  <span className="checkbox-label">
                    I accept{' '}
                    <a className="text-2sm link" href="#">
                      Terms & Conditions
                    </a>
                  </span>
                </label>
                <button className="btn btn-primary flex justify-center grow">
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { SignupPopup };