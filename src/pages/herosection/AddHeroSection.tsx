import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarPageTitle
} from '@/partials/toolbar';


const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;
export const Add_User = `${ADMIN_API_URL}/hero-sec`;
export const Update_User = `${ADMIN_API_URL}/hero-sec`;

interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  phone_number?: string;
  website_link?: string;
  title : string;
  description: string;
  video_url?: string;
  btn_text: string;
  btn_url?: string;

}

const AddheroSection: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: '',
    website_link: '',
    title : '',
    description: '',
    video_url: '',
    btn_text: '',
    btn_url: '',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!user.title) {
      errors.title = 'Title is required';
    }
    if (!user.description) {
      errors.description = 'Description is required';
    }
  
    if (!user.video_url) {
      errors.video_url = 'video_url is required';
    }
  
    if (!user.btn_text) {
      errors.btn_text = 'btn_text is required';
    }
    if (!user.btn_url) {
      errors.btn_url = 'btn_url is required';
    }
  

    return errors;
  };

  const handleHeroSecSUbmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setError(null);
      return;
    }
    setFormErrors({});
    const authToken = localStorage.getItem('authToken');
    const url =`${ADMIN_API_URL}/hero-sec`;
    const method = isEditMode ? 'POST' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        video_url: user.video_url,
        title: user.title,
        description: user.description,
        btn_text: user.btn_text,
        btn_url: user.btn_url,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) { 
          navigate('/herosec-table/herosec-list');
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
            <ToolbarPageTitle text={isEditMode ? 'Update Hero Section' : 'Add New Hero Section'} />
            <ToolbarActions>
              <button
                className="btn btn-secondary"
                onClick={() => navigate('/herosec-table/herosec-list')}
              >
                Back to HeroSection List
              </button>
            </ToolbarActions>
          </div>
        </Container>
      </Toolbar>

      <Container>
        <div className="form-container">
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <form onSubmit={handleHeroSecSUbmit}>
            <div className="grid grid-cols-12 gap-5 mb-4">
              <div className="col-span-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Title<span className="isRequire text-danger">*</span></label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Title"
                  name="title"
                  value={user.title}
                  onChange={handleInputChange}
                />
                {formErrors.title && <p className="text-red-500 text-xs">{formErrors.title}</p>}
              </div>

              <div className="col-span-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Button Text<span className="isRequire text-danger">*</span></label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Button Text  "
                  name="btn_text"
                  value={user.btn_text}
                  onChange={handleInputChange}
                />
                {formErrors.btn_text && <p className="text-red-500 text-xs">{formErrors.btn_text}</p>}
              </div>

              <div className="col-span-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Video URL<span className="isRequire text-danger">*</span></label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Video URL"
                  name="video_url"
                  value={user.video_url}
                  onChange={handleInputChange}
                />
                {formErrors.video_url && <p className="text-red-500 text-xs">{formErrors.video_url}</p>}
              </div>

              <div className="col-span-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Button URL<span className="isRequire text-danger">*</span></label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Button URL"
                  name="btn_url"
                  value={user.btn_url}
                  onChange={handleInputChange}
                />
                {formErrors.btn_url && <p className="text-red-500 text-xs">{formErrors.btn_url}</p>}
              </div>
              <div className="col-span-12">
              <label className="block mb-2 text-sm font-medium text-gray-900">Description<span className="isRequire text-danger">*</span></label>
              <textarea
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter Description"
                name="description"
                value={user.description}
                onChange={handleInputChange}
              />
              {formErrors.description && <p className="text-red-500 text-xs">{formErrors.description}</p>}
            </div>
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {isEditMode ? 'Update' : 'Submit'}
            </button>
          </form>
        </div>
      </Container>
    </Fragment>
  );
};

export { AddheroSection };