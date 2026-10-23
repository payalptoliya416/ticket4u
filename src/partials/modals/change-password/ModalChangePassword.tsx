import React, { useState } from 'react';
import { Modal, ModalContent, ModalBody, ModalHeader } from '@/components/modal'; // Import your custom Modal component
import { KeenIcon } from '@/components';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;
export const ChangePassword = `${ADMIN_API_URL}/admin/changePassword`;

interface IModalChangePasswordProps {
  open: boolean;
  onClose: () => void;
}

const ModalChangePassword = ({ open, onClose }: IModalChangePasswordProps) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/dashboard');
    onClose();
  };

  const handlePasswordChange = async () => {
    setError(null);
    setSuccessMessage(null);

    const authToken = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userID');

    if (!authToken) {
      setError('You are not authorized. Please log in again.');
      return;
    }

    try {
      const response = await fetch(ChangePassword, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          UserId: userId,
          OldPassword: oldPassword,
          NewPassword: newPassword,
        }),
      });

      if (response.ok) {
        setSuccessMessage('Password changed successfully!');

        setTimeout(() => {
          handleClose();
        }, 1000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to change password.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalContent className="modal-center w-full max-w-[500px] max-h-[95%] scrollable-y-auto">
        <ModalHeader className="justify-end border-0 pt-5">
          <button
            className="btn btn-sm btn-icon btn-light btn-clear shrink-0"
            onClick={handleClose}
          >
            <KeenIcon icon="cross" />
          </button>
        </ModalHeader>
        <ModalBody className="flex flex-col items-center pt-0 pb-10">
          <h3 className="text-lg font-medium text-gray-900 text-center mb-3">
            Change Password
          </h3>

          {error && <div className="text-sm text-red-500 mb-4">{error}</div>}
          {successMessage && <div className="text-sm text-green-500 mb-4">{successMessage}</div>}

          <div className="w-full max-w-[400px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
            <input
              type="password"
              className="input input-bordered w-full mb-4"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              className="input input-bordered w-full mb-4"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button
              className="btn btn-primary w-full"
              onClick={handlePasswordChange}
              disabled={!oldPassword || !newPassword}
            >
              Update Password
            </button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { ModalChangePassword };