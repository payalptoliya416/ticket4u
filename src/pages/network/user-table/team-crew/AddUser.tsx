import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarPageTitle
} from '@/partials/toolbar';

import { useLayout } from '@/providers';

const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;
export const Add_User = `${ADMIN_API_URL}/admin/addUser`;
export const Update_User = `${ADMIN_API_URL}/admin/updateUser`;

interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
}

const AddUser: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);
      setIsEditMode(true);
    }
  }, [location.state]);

  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    // Name Validation
    if (!user.name) {
      errors.name = 'Name is required';
    }

    // Email Validation
    if (!user.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = 'Email is invalid';
    }

    // Password Validation (only if adding a new user)
    if (!isEditMode) {
      if (!user.password) {
        errors.password = 'Password is required';
      } else if (user.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }

      // Confirm Password Validation
      if (!user.confirmPassword) {
        errors.confirmPassword = 'Confirm Password is required';
      } else if (user.password !== user.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setError(null);
      return;
    }

    setFormErrors({});
    const authToken = localStorage.getItem('authToken');
    const url = isEditMode ? `${Update_User}/${user.id}` : Add_User;
    const method = isEditMode ? 'POST' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        ...(isEditMode ? {} : { password: user.password, type: 'Team' }),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        
        if (data.status === 'success') {
          navigate('/user-table/user-list');
        } else {
          setError('Failed to add or update user. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error processing the request:', error);
        setError('Failed to add or update user. Please try again.');
      });
  };

  return (
    <Fragment>
      <Toolbar>
        <Container>
          <div className="flex justify-between items-center">
            <ToolbarPageTitle text={isEditMode ? 'Update User' : 'Add New User'} />
            <ToolbarActions>
              <button
                className="btn btn-secondary"
                onClick={() => navigate('/user-table/user-list')}
              >
                Back to User List
              </button>
            </ToolbarActions>
          </div>
        </Container>
      </Toolbar>

      <Container>
        <div className="form-container">
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-12 gap-5 mb-4">
              <div className="col-span-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Name<span className="isRequire text-danger">*</span></label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Name"
                  name="name"
                  value={user.name}
                  onChange={handleInputChange}
                />
                {formErrors.name && <p className="text-red-500 text-xs">{formErrors.name}</p>}
              </div>

              <div className="col-span-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Email<span className="isRequire text-danger">*</span></label>
                <input
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                />
                {formErrors.email && <p className="text-red-500 text-xs">{formErrors.email}</p>}
              </div>

              {!isEditMode && (
                <>
                  <div className="col-span-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Password<span className="isRequire text-danger">*</span></label>
                    <input
                      type="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="******"
                      name="password"
                      value={user.password}
                      onChange={handleInputChange}
                    />
                    {formErrors.password && <p className="text-red-500 text-xs">{formErrors.password}</p>}
                  </div>

                  <div className="col-span-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Confirm Password<span className="isRequire text-danger">*</span></label>
                    <input
                      type="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={user.confirmPassword}
                      onChange={handleInputChange}
                    />
                    {formErrors.confirmPassword && <p className="text-red-500 text-xs">{formErrors.confirmPassword}</p>}
                  </div>
                </>
              )}
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center"
            >
              {isEditMode ? 'Update' : 'Submit'}
            </button>
          </form>
        </div>
      </Container>
    </Fragment>
  );
};

export { AddUser };