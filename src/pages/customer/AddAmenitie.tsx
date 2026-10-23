import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Container } from '@/components/container';
import { Toolbar, ToolbarActions, ToolbarPageTitle } from '@/partials/toolbar';

const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;
export const Add_Amenitie = `${ADMIN_API_URL}/admin/amenitie-add`;
export const Update_Amenitie = `${ADMIN_API_URL}/admin/amenitie-edit`;

interface Category {
  id?: number;
  icon: File | null; // Update icon to File type
  title: string;
}

const AddAmenitie: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category>({
    icon: null, // Initialize as null
    title: '',
  });

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (location.state && location.state.category) {
      setCategory(location.state.category);
      setIsEditMode(true);
    }
  }, [location.state]);

  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    // Icon Validation
    if (!category.icon) {
      errors.icon = 'Icon is required';
    }

    // Title Validation
    if (!category.title) {
      errors.title = 'Title is required';
    }

    return errors;
  };

  const handleIconChange = (e: any) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      validateImageDimensions(file, 24, 24)
        .then(() => {
          setCategory({ ...category, icon: file });
          setFormErrors({ ...formErrors, icon: "" });
        })
        .catch((error) => {
          setFormErrors({ ...formErrors, icon: error });
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
            reject(`Image must be ${requiredWidth}x${requiredHeight}px.`);
          }
        };
        img.onerror = () => reject('Invalid image file.');
        img.src = reader.result as string;
      };

      reader.readAsDataURL(file);
    });
  };

  const handleOrganiserSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setError(null);
      return;
    }

    setFormErrors({});
    const authToken = localStorage.getItem('authToken');
    const url = isEditMode ? `${Update_Amenitie}/${category.id}` : Add_Amenitie;

    // Prepare FormData for file upload
    const formData = new FormData();
    formData.append('title', category.title);

    if (category.icon instanceof File) {
      formData.append('icon', category.icon);
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          navigate('/amenities-table/amenities-list');
        } else {
          setError('Failed to add or update amenity. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error processing the request:', error);
        setError('Failed to add or update amenity. Please try again.');
      });
  };

  return (
    <Fragment>
      <Toolbar>
        <Container>
          <div className="flex justify-between items-center">
            <ToolbarPageTitle text={isEditMode ? 'Update Amenitie' : 'Add New Amenitie'} />
            <ToolbarActions>
              <button
                className="btn btn-secondary"
                onClick={() => navigate('/amenities-table/amenities-list')}
              >
                Back to Amenities List
              </button>
            </ToolbarActions>
          </div>
        </Container>
      </Toolbar>

      <Container>
        <div className="form-container">
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <form onSubmit={handleOrganiserSubmit}>
            <div className="grid grid-cols-12 gap-5 mb-4">
              <div className="col-span-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Icon (24 X 24)<span className="isRequire text-danger">*</span></label>
                <input
                  type="file"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={handleIconChange}
                  accept="image/*"
                />
                {category.icon && (
                  <div className="mt-2">
                    <img
                      src={typeof category.icon === 'string' ? category.icon : URL.createObjectURL(category.icon)}
                      alt="Thumbnail Preview"
                      className="w-full h-auto rounded-lg"
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                  </div>
                )}
                {formErrors.icon && <p className="text-red-500 text-xs">{formErrors.icon}</p>}
              </div>

              <div className="col-span-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Title<span className="isRequire text-danger">*</span></label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Title"
                  name="title"
                  value={category.title}
                  onChange={handleInputChange}
                />
                {formErrors.title && <p className="text-red-500 text-xs">{formErrors.title}</p>}
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

export { AddAmenitie };