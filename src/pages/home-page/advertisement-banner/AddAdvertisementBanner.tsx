import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarPageTitle
} from '@/partials/toolbar';
import 'flatpickr/dist/themes/material_green.css';

const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;
export const Add_Slider_API = `${ADMIN_API_URL}/advertisement-banners-add`;
export const Update_Slider_API = `${ADMIN_API_URL}/advertisement-banners-edit`;

interface Slider {
  banner_id?: number;
  image: string;
  url: string;
  video_url: string;
  imageFile: File | null;
}

const AddAdvertisementBanner: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [slider, setSlider] = useState<Slider>({
    image: '',
    video_url: '',
    url: '',
    imageFile: null,
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [formErrors, setFormErrors] = useState<any>({});

  // Populate state if editing an existing banner
  useEffect(() => {
    if (location.state && location.state.slider) {
      setSlider(location.state.slider);
      setIsEditMode(true);
    }
  }, [location.state]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
        validateImageDimensions(file, 370, 150)
            .then(() => {
                setSlider({ ...slider, imageFile: file });
                const reader = new FileReader();
                reader.onloadend = () => {
                    setSlider((prev) => ({ ...prev, image: reader.result as string }));
                };
                reader.readAsDataURL(file);
                setFormErrors({ ...formErrors, image: "" });
            })
            .catch((error) => {
                setFormErrors({ ...formErrors, image: error });
            });
    }
  };
  
  const validateImageDimensions = (file: File, requiredWidth: number, requiredHeight: number) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = () => {
        img.onload = () => {
          if (img.width === requiredWidth && img.height === requiredHeight) {
            resolve(true);
          } else {
            reject(`Image must be ${requiredWidth}x${requiredHeight} px.`);
          }
        };
        img.onerror = () => reject('Invalid image file.');
        img.src = reader.result as string;
      };

      reader.readAsDataURL(file);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSlider({ ...slider, [name]: value });
  };

  const handleSliderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const authToken = localStorage.getItem('authToken');
    const url = isEditMode ? Update_Slider_API : Add_Slider_API;

    const formData = new FormData();
    if (isEditMode && slider.banner_id) {
      formData.append('banner_id', slider.banner_id.toString());
    }

    if (slider.imageFile) {
      formData.append('image', slider.imageFile);
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (data.status === 'success') {
        navigate('/advertisement-banner-table/advertisement-banner-list');
      } else {
        console.error('Failed to add/update advertisement banner', data.message);
      }
    } catch (error) {
      console.error('Error submitting advertisement banner:', error);
    }
  };

  const validateForm = () => {
    const errors: any = {};
    if (!slider.imageFile && !slider.image) errors.image = 'Image file is required';
    return errors;
  };

  return (
    <Fragment>
      <Toolbar>
        <Container>
          <div className="flex justify-between items-center">
            <ToolbarPageTitle text={isEditMode ? 'Update Advertisement Banner' : 'Add New Advertisement Banner'} />
            <ToolbarActions>
              <button
                className="btn btn-secondary"
                onClick={() => navigate('/advertisement-banner-table/advertisement-banner-list')}
              >
                Back to Advertisement Banner List
              </button>
            </ToolbarActions>
          </div>
        </Container>
      </Toolbar>
      <Container>
        <form onSubmit={handleSliderSubmit}>
          <input type="hidden" name="banner_id" value={slider.banner_id || ''} />
          <div className="grid grid-cols-12 gap-5 mb-4">
            {/* Image Input */}
            <div className="col-span-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">Image ( 370 X 150 )<span className="isRequire text-danger">*</span></label>
              <input
                type="file"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={handleImageChange}
                accept="image/*"
              />
              {slider.image && (
                <div className="mt-2">
                  <img
                    src={slider.image}
                    alt="Banner Preview"
                    className="w-full h-auto rounded-lg"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                </div>
              )}
              {formErrors.image && <p className="text-red-500 text-xs">{formErrors.image}</p>}
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {isEditMode ? 'Update' : 'Submit'}
          </button>
        </form>
      </Container>
    </Fragment>
  );
};

export { AddAdvertisementBanner };
