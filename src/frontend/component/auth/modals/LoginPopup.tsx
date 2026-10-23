import React, { useState } from 'react';
import { Modal, ModalContent, ModalBody, ModalHeader } from '@/components/modal';
import { KeenIcon } from '@/components';

const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;
const LOGIN_API_URL = `${ADMIN_API_URL}/login`;

interface IModalProps {
  open: boolean;
  onClose: () => void;
  SignUpPopupOpen : ()=> void;
}

const LoginPopup = ({ open, onClose ,SignUpPopupOpen }: IModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleClose = () => {
    onClose();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Validate password
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    try {
      const response = await fetch(LOGIN_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      // Handle the API response
      if (response.ok) {
        const data = await response.json();

        if (data.access_token && data.user) {
          localStorage.setItem('cust_access_token', data.access_token);
          localStorage.setItem('cust_id', data.user.cust_id.toString());
          localStorage.setItem('user_name', data.user.name);
          setSuccessMessage('Login successful! Redirecting...');
          setTimeout(() => {
            handleClose();
          }, 1500);
        } else {
          setError(data.message || 'Login failed. Please try again.');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'An unexpected error occurred.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please check your network.');
    }
  };

  return (
    
    <Modal open={open} onClose={handleClose}>
      <ModalContent className="modal-center w-full max-w-[500px] max-h-[100%] scrollable-y-auto">
        <ModalHeader className="justify-end border-0 pt-3 sm:pt-4">
          <button
            className="btn btn-sm btn-icon btn-light btn-clear shrink-0"
            onClick={handleClose}
          >
            <KeenIcon icon="cross" />
          </button>
        </ModalHeader>
        <ModalBody className="flex flex-col  pt-0 pb-8">
          {error && <div className="text-sm text-red-500 mb-4">{error}</div>}
          {successMessage && (
            <div className="text-sm text-green-500 mb-4">{successMessage}</div>
          )}
          <div className="flex justify-center grow bg-center bg-no-repeat page-bg">
            <div className="card max-w-[370px] w-full">
              <form
                className="card-body flex flex-col gap-4  p-5 sm:p-10"
                onSubmit={handleLogin}
              >
                <div className="text-center mb-2.5">
                  <h3 className="text-lg font-medium text-gray-900 leading-none mb-2.5">
                    Sign in
                  </h3>
                  <div className="flex items-center justify-center flex-wrap sm:flex-nowrap">
                    <span className="text-2sm text-gray-700 me-1.5">
                      Need an account?
                    </span>
                    <span className="text-2sm link cursor-pointer" onClick={SignUpPopupOpen}>
                      Sign Up
                    </span>
                  </div>
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

                <button className="btn btn-primary flex justify-center grow">
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { LoginPopup };