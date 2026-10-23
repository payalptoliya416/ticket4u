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
export const Add_Category = `${ADMIN_API_URL}/admin/addCategory`;
export const Update_Category = `${ADMIN_API_URL}/admin/updateCategory`;

interface Category {
  id?: number;
  name: string;
  description: string;
}

const AddCategory: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category>({
    name: '',
    description: '',
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

    // Name Validation
    if (!category.name) {
      errors.name = 'Name is required';
    }

    // description Validation
    if (!category.description) {
      errors.description = 'Description is required';
    }


    return errors;
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
    const url = isEditMode ? `${Update_Category}/${category.id}` : Add_Category;
    const method = isEditMode ? 'POST' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        name: category.name,
        description: category.description,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          navigate('/category-table/category-list');
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
            <ToolbarPageTitle text={isEditMode ? 'Update Category' : 'Add New Category'} />
            <ToolbarActions>
              <button
                className="btn btn-secondary"
                onClick={() => navigate('/category-table/category-list')}
              >
                Back to Category List
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
                <label className="block mb-2 text-sm font-medium text-gray-900">Name<span className="isRequire text-danger">*</span></label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Name"
                  name="name"
                  value={category.name}
                  onChange={handleInputChange}
                />
                {formErrors.name && <p className="text-red-500 text-xs">{formErrors.name}</p>}
              </div>

              <div className="col-span-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Description<span className="isRequire text-danger">*</span></label>
                <input
                  type="description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter description"
                  name="description"
                  value={category.description}
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

export { AddCategory };