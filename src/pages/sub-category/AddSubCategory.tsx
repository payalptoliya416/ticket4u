import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarPageTitle
} from '@/partials/toolbar';

const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;
export const Add_SubCategory_API = `${ADMIN_API_URL}/admin/addSubCategory`;
export const Update_SubCategory_API = `${ADMIN_API_URL}/admin/updateSubCategory`;
export const CategoriesList_API = `${ADMIN_API_URL}/admin/categoriesList`;

interface SubCategory {
  id?: number;
  cat_id?: number;
  name: string;
  description: string;
}

const AddSubCategory: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [subcategory, setSubCategory] = useState<SubCategory>({
    name: '',
    description: '',
  });
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch categories on component mount
    useEffect(() => {
      const authToken = localStorage.getItem('authToken');

      fetch(CategoriesList_API, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setCategories(data.data);
        } else {
          console.error('Failed to fetch categories:', data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });

      if (location.state && location.state.category) {
        setSubCategory(location.state.category);
        setIsEditMode(true);
      }
    }, [location.state]);


  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSubCategory({ ...subcategory, [name]: value });
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    // Category Validation
    if (!subcategory.cat_id) {
      errors.cat_id = 'Category is required';
    }

    // Name Validation
    if (!subcategory.name) {
      errors.name = 'Name is required';
    }

    // Description Validation
    if (!subcategory.description) {
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
    const url = isEditMode ? `${Update_SubCategory_API}/${subcategory.id}` : Add_SubCategory_API;
    const method = isEditMode ? 'POST' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        cat_id: subcategory.cat_id,
        name: subcategory.name,
        description: subcategory.description,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          navigate('/sub-category-table/sub-category-list');
        } else {
          setError('Failed to add or update category. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error processing the request:', error);
        setError('Failed to add or update category. Please try again.');
      });
  };

  return (
    <Fragment>
      <Toolbar>
        <Container>
          <div className="flex justify-between items-center">
            <ToolbarPageTitle text={isEditMode ? 'Update SubCategory' : 'Add New SubCategory'} />
            <ToolbarActions>
              <button
                className="btn btn-secondary"
                onClick={() => navigate('/sub-category-table/sub-category-list')}
              >
                Back to SubCategory List
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

              {/* Category Dropdown */}
              <div className="col-span-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Category<span className="isRequire text-danger">*</span></label>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  name="cat_id"
                  value={subcategory.cat_id || ''}
                  onChange={handleInputChange}
                >
                  <option value="">Select a Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {formErrors.cat_id && <p className="text-red-500 text-xs">{formErrors.cat_id}</p>}
              </div>

              {/* Name Input */}
              <div className="col-span-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Name<span className="isRequire text-danger">*</span></label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Name"
                  name="name"
                  value={subcategory.name}
                  onChange={handleInputChange}
                />
                {formErrors.name && <p className="text-red-500 text-xs">{formErrors.name}</p>}
              </div>

              {/* Description Input */}
              <div className="col-span-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Description<span className="isRequire text-danger">*</span></label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Description"
                  name="description"
                  value={subcategory.description}
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

export { AddSubCategory };