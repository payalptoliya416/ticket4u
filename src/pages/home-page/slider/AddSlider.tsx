import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarPageTitle
} from '@/partials/toolbar';
import 'flatpickr/dist/themes/material_green.css';
import { number } from 'yup';
import { log } from 'console';

const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;
export const Add_Slider_API = `${ADMIN_API_URL}/slider-add`;
export const Update_Slider_API = `${ADMIN_API_URL}/slider-edit`;

interface Slider {
  slider_id?: number;
  type: string;
  image: string;
  url: string;
  video_url: string;
  imageFile: File | null;
}

const AddSlider: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [slider, setSlider] = useState<Slider>({
    // slider_id: number,
    type: 'image', // Default to 'image'
    image: '',
    video_url: '',
    url: '',
    imageFile: null,
  });
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [formErrors, setFormErrors] = useState<any>({});

  useEffect(() => {
    if (location.state && location.state.slider) {
      setSlider(location.state.slider);
      setIsEditMode(true);
    }
  }, [location.state]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
        validateImageDimensions(file, 1920, 450)
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
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSlider({ ...slider, [name]: value });
  };
  
  const handleSliderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
  
    const authToken = localStorage.getItem('authToken');
    const url = isEditMode ? `${Update_Slider_API}` : Add_Slider_API;
    
    // Create FormData to handle file upload
    const formData = new FormData();
    if (isEditMode && slider.slider_id) {
      formData.append('slider_id', slider.slider_id.toString());
    }
    formData.append('type', slider.type);
  
    if (slider.type === 'image' && slider.imageFile) {
      formData.append('image', slider.imageFile); // Append the file directly
    } else if (slider.type === 'video') {
      formData.append('video_url', slider.video_url);
    }
  
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`, // No Content-Type header here; it will be set automatically
      },
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          navigate('/slider-table/slider-list');
        } else {
          console.error('Failed to add/update slider');
        }
      })
      .catch(error => {
        console.error('Error submitting slider:', error);
      });
  }; 
  
  const validateForm = () => {
    const errors: any = {};
  
    if (!slider.type) errors.type = 'Type is required';
    if (slider.type === 'image' && !slider.imageFile) errors.image = 'Image file is required';
    if (slider.type === 'video' && !slider.video_url) errors.video_url = 'Video URL is required';
  
    return errors;
  };
  
  return (
    <Fragment>
      <Toolbar>
        <Container>
          <div className="flex justify-between items-center">
            <ToolbarPageTitle text={isEditMode ? 'Update Slider' : 'Add New Slider'} />
            <ToolbarActions>
              <button
                className="btn btn-secondary"
                onClick={() => navigate('/slider-table/slider-list')}
              >
                Back to Slider List
              </button>
            </ToolbarActions>
          </div>
        </Container>
      </Toolbar>
      <Container>
        <form onSubmit={handleSliderSubmit}>
          <input type="hidden" name="slider_id" value={slider.slider_id} />
          <div className="grid grid-cols-12 gap-5 mb-4">
            {/* Type Dropdown */}
            <div className="col-span-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">Type</label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="type"
                value={slider.type}
                onChange={handleInputChange}
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
              {formErrors.type && <p className="text-red-500 text-xs">{formErrors.type}</p>}
            </div>
            
            {/* Image Input */}
            {slider.type === 'image' && (
              <div className="col-span-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Image ( 1920 X 450 )</label>
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
            )}

            {/* Video URL Input */}
            {slider.type === 'video' && (
              <div className="col-span-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Video Link</label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Video URL"
                  name="video_url"
                  value={slider.video_url}
                  onChange={handleInputChange}
                />
                {formErrors.video_url && <p className="text-red-500 text-xs">{formErrors.video_url}</p>}
              </div>
            )}
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

export { AddSlider };
