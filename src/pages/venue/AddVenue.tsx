import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container } from '@/components/container';
import Flatpickr from 'react-flatpickr';
import {Toolbar,ToolbarActions,ToolbarPageTitle} from '@/partials/toolbar';
import ReactQuill from "react-quill";
import 'flatpickr/dist/flatpickr.css';
import { SeatsioSeatingChart, SeatsioDesigner  } from '@seatsio/seatsio-react';
import Select, { MultiValue, ActionMeta } from 'react-select';
import { log } from 'node:console';

const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;
export const Add_Venue_API = `${ADMIN_API_URL}/admin/addVenue`;
export const Update_Venue_API = `${ADMIN_API_URL}/admin/updateVenue`;
export const GET_Amenities_LIST = `${ADMIN_API_URL}/admin/amenities-list`;

interface Venue {
  id?: number;
  title: string;
  location: string;
  city: string;
  state: string;
  country: string;
  banner_image?: string;
  thumbnail_image?: string;
  description: string;
  map_url: string;
  amenities: [];
}

const AddVenue: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [venue, setVenue] = useState<Venue>({
    title: '',
    location: '',
    city: '',
    state: '',
    country: '',
    banner_image: '',
    thumbnail_image: '',
    description: '',
    map_url: '',
    amenities: [],
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  // const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  // const [amenities, setAmenities] = useState<{ value: number; label: string }[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<{ value: string; label: string }[]>([]);
  const [amenities, setAmenities] = useState<{ value: number; label: string }[]>([]);

  useEffect(() => {
      const authToken = localStorage.getItem('authToken');
      fetch(GET_Amenities_LIST, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          const fetchedAmenities = data.data.map((venue: { id: number; title: string }) => ({
            value: String(venue.id),
            label: venue.title,
          }));
          setAmenities(fetchedAmenities);
        } else {
          console.error('Failed to fetch amenities:', data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching amenities:', error);
      });
    }, []);


  useEffect(() => {
    if (location.state && location.state.venue) {
      const venueData = location.state.venue;
      setVenue({
        ...venueData,
        prices: JSON.parse(venueData.prices || '[]'),
      });

      if (venueData.amenities && Array.isArray(venueData.amenities)) {
        const formattedAmenities = venueData.amenities.map((amenity : any) => ({
            value: amenity.id,
            label: amenity.title,
        }));
        setSelectedAmenities(formattedAmenities);
    }

      // const initialSelectedVenues = venueData.venue_ids.map((venue: { value: number; label: string }) => {
      //   const venueObj = amenities.find(v => v.value === venue.value);
      //   return venueObj || venue;
      // });
      // setSelectedAmenities(initialSelectedVenues);

      setGalleryImages(venueData.gallery_images.map((image: { image_url: string }) => image.image_url));
      setIsEditMode(true);
    }
  }, [location.state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    //setVenue({ ...venue, [name]: value });
    setVenue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e : any) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      validateImageDimensions(file, 1440, 460)
        .then(() => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setVenue({ ...venue, banner_image: reader.result as string });
            setFormErrors({ ...formErrors, banner_image: "" });
          };
          reader.readAsDataURL(file);
        })
        .catch((error) => {
          setFormErrors({ ...formErrors, banner_image: error });
        });
    }
  };

  const handleThumbnailImageChange = (e : any) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      validateImageDimensions(file, 160, 131)
        .then(() => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setVenue({ ...venue, thumbnail_image: reader.result as string});
            setFormErrors({ ...formErrors, thumbnail_image: "" });
          };
          reader.readAsDataURL(file);
        })
        .catch((error) => {
          setFormErrors({ ...formErrors, thumbnail_image: error });
        });
    }
  };
  
  const validateImageDimensions = (file : any, requiredWidth : any, requiredHeight : any) => {
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

  const handleAmenitiesChange = (newValue: any) => {
    const amenitiesString = newValue.map((option: any) => option.value).join(',');
    setSelectedAmenities(newValue);
    //setAmenities(newVenueDates);
  };

  const dataURLToFile = (dataurl : any, filename : any) => {
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);

    if (!mimeMatch) {
      throw new Error('Invalid data URL format');
    }

    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const handleDescriptionChange = (value: string) => {
    setVenue((prevEvent) => ({
      ...prevEvent,
      description: value,
    }));
  };

  const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files) as File[];
  
    const validations = files.map((file) =>
      validateImageDimensions(file, 272, 220)
        .then(() => {
          const reader = new FileReader();
          return new Promise<string>((resolve) => {
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });
        })
        .catch((error) => {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            gallery_images: error,
          }));
          return null;
        })
    );
  
    Promise.all(validations).then((imagePreviews) => {
      const validImages = imagePreviews.filter((img) => img !== null) as string[];
      setGalleryImages((prevImages) => [...prevImages, ...validImages]);
    });
  };
  
  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages((prevImages) =>
      prevImages.filter((_, imgIndex) => imgIndex !== index)
    );
  };

  // const handleAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value, checked } = e.target;
  //   if (checked) {
  //     setSelectedAmenities((prev) => [...prev, value]);
  //   } else {
  //     setSelectedAmenities((prev) => prev.filter((amenity) => amenity !== value));
  //   }
  // };

  const handleInputVenueChange = (name: string, value: string) => {
    setVenue((prevVenue) => ({
      ...prevVenue,
      [name]: value,
    }));
  };   
  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!venue.title) errors.title = 'Venue title is required';
    if (!venue.location) errors.location = 'Location is required';
    if (!venue.city) errors.city = 'City is required';
    if (!venue.state) errors.state = 'State is required';
    if (!venue.country) errors.country = 'Country is required';
    if (!venue.banner_image) errors.banner_image = 'Banner image is required';
    if (!venue.description) errors.description = 'Event description is required';

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
      const isBase64Image = (image: string): boolean => {
        return /^data:image\/(?:png|jpeg|jpg);base64,/.test(image);
      };
     
      const handleGalleryImages = (galleryImages: string[]): string[] => {
        return galleryImages.filter((image) => {
          return isBase64Image(image);
        });
      };

    const oldGalleryImages = galleryImages.filter((image) => !isBase64Image(image));

    const payload = {
      ...venue,
      gallery_images: handleGalleryImages(galleryImages),
      old_gallery_images: oldGalleryImages,
      // amenities: selectedAmenities,
      amenities: selectedAmenities.map((option: any) => option.value).join(','),
      description: venue.description,
    };
        
    if (venue.banner_image) {
      if (isBase64Image(venue.banner_image)) {
        payload.banner_image = venue.banner_image;
      } else {
        delete payload.banner_image;
      }
    }
    
    if (venue.thumbnail_image) {
      if (isBase64Image(venue.thumbnail_image)) {
        payload.thumbnail_image = venue.thumbnail_image;
      } else {
        delete payload.thumbnail_image;
      }
    }
    
    const authToken = localStorage.getItem('authToken');
    const url = isEditMode ? `${Update_Venue_API}/${venue.id}` : Add_Venue_API;
    
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          navigate('/Venues-table/Venues-list');
        } else {
          setError('Failed to add or update venue. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error processing the request:', error);
        setError('Failed to add or update venue. Please try again.');
      });
  };

  return (
    <Fragment>
      <Toolbar>
        <Container>
          <div className="flex justify-between items-center">
            <ToolbarPageTitle text={isEditMode ? 'Update Venue' : 'Add New Venue'} />
            <ToolbarActions>
              <button
                className="btn btn-secondary"
                onClick={() => navigate('/Venues-table/Venues-list')}
              >
                Back to Venue List
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
                <label className="block mb-2 text-sm font-medium text-gray-900">Venue Title<span className="isRequire text-danger">*</span></label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Venue Title"
                  name="title"
                  value={venue.title}
                  onChange={handleInputChange}
                />
                {formErrors.title && <p className="text-red-500 text-xs">{formErrors.title}</p>}
              </div>
              <div className="col-span-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Location<span className="isRequire text-danger">*</span></label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Location"
                  name="location"
                  value={venue.location}
                  onChange={handleInputChange}
                />
                {formErrors.location && <p className="text-red-500 text-xs">{formErrors.location}</p>}
              </div>

              <div className="col-span-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">City<span className="isRequire text-danger">*</span></label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter City"
                  name="city"
                  value={venue.city}
                  onChange={handleInputChange}
                />
                {formErrors.city && <p className="text-red-500 text-xs">{formErrors.city}</p>}
              </div>

              <div className="col-span-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">State<span className="isRequire text-danger">*</span></label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter State"
                  name="state"
                  value={venue.state}
                  onChange={handleInputChange}
                />
                {formErrors.state && <p className="text-red-500 text-xs">{formErrors.state}</p>}
              </div>

              <div className="col-span-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Country<span className="isRequire text-danger">*</span></label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Country"
                  name="country"
                  value={venue.country}
                  onChange={handleInputChange}
                />
                {formErrors.country && <p className="text-red-500 text-xs">{formErrors.country}</p>}
              </div>
              {/* Thumbnail Image Input */}
            <div className="col-span-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">Thumbnail Image (160 X 131)</label>
              <input
                type="file"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={handleThumbnailImageChange}
                accept="image/*"
              />
              {venue.thumbnail_image && (
                <div className="mt-2">
                  <img
                    src={venue.thumbnail_image} // This will now be the Base64 string
                    alt="Thumbnail Preview"
                    className="w-full h-auto rounded-lg"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                </div>
              )}
              {formErrors.thumbnail_image && <p className="text-red-500 text-xs">{formErrors.thumbnail_image}</p>}
            </div>
            {/* Banner Image Input */}
            <div className="col-span-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">Banner Image (1440 X 460)<span className="isRequire text-danger">*</span></label>
              <input
                type="file"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={handleImageChange}
                accept="image/*"
              />
              {venue.banner_image && (
                <div className="mt-2">
                  <img
                    src={venue.banner_image}
                    alt="Banner Preview"
                    className="w-full h-auto rounded-lg"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                </div>
              )}
              {formErrors.banner_image && <p className="text-red-500 text-xs">{formErrors.banner_image}</p>}
            </div>
            {/* Description Text Area */}
            <div className="col-span-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">Description<span className="isRequire text-danger">*</span></label>
              <ReactQuill
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
                theme="snow"
                value={venue.description}
                onChange={handleDescriptionChange}
                placeholder="Enter Description"
              />
              {formErrors.description && <p className="text-red-500 text-xs">{formErrors.description}</p>}
            </div>
            {/* Map Url */}
            <div className="col-span-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">Map Url</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter Map Url"
                name="map_url"
                value={venue.map_url}
                onChange={handleInputChange}
              />
              {formErrors.map_url && <p className="text-red-500 text-xs">{formErrors.map_url}</p>}
            </div>
            {/* Amenities */}
            {/* <div className="col-span-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">Amenities</label>
              <div className="flex gap-4">
                {["Parking", "Toilets", "Wheel Chair Accessible"].map((amenity) => (
                  <label key={amenity} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={amenity}
                      checked={selectedAmenities.includes(amenity)}
                      onChange={handleAmenityChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-gray-900">{amenity}</span>
                  </label>
                ))}
              </div>
              {formErrors.amenities && <p className="text-red-500 text-xs">{formErrors.amenities}</p>}
            </div> */}
            <div className="col-span-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">Amenities</label>
              <Select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="amenities"
                isMulti
                // options={amenities.map((amenitie) => ({
                //   value: String(amenitie.value),
                //   label: amenitie.label,
                // }))}
                options={amenities.map((amenity) => ({
                  value: String(amenity.value),
                  label: amenity.label,
                }))} 
                value={selectedAmenities}
                onChange={handleAmenitiesChange}
                getOptionLabel={(e) => e.label}
              />
              {formErrors.amenities && <p className="text-red-500 text-xs">{formErrors.amenities}</p>}
            </div>
            {/* Gallery Images */}
          <div className="col-span-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">Gallery Images (272 X 220)</label>
            <input
              type="file"
              multiple
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={handleGalleryImagesChange}
              accept="image/*"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {/* Show gallery image previews */}
              {galleryImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="rounded-lg"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveGalleryImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            {formErrors.gallery_images && <p className="text-red-500 text-xs">{formErrors.gallery_images}</p>}
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
        {/* <div className="mt-6" style={{ 'height': '500px' }}>
          <SeatsioSeatingChart
              workspaceKey="091afdc1-5214-4cc4-a869-fdd1d86c4846"
              event="NewToday2024-12-30"
              region="eu"
              pricing={[
                { category: 'S1', price: 75.00 },
                { category: 'S2', ticketTypes: [
                  { ticketType: 'adult', price: 30, label: 'Adults' },
                  { ticketType: 'child', price: 20, label: 'Children' },
                  { ticketType: 'senior', price: 25, label: 'Senior', description: '65+ – Requires ID' }
              ]},
              ]}
              priceFormatter={(price) => `$${price.toFixed(2)}`}
          />
        </div> */}
        {/* <div className="mt-6" style={{ 'height': '700px' }}>
          <SeatsioDesigner
              secretKey="8849088d-bd0c-46b3-991a-b7640b49cc1d"
              chartKey ="3c3393d5-cd07-4dcc-8b73-296ab56e0673"
              region="eu"
          />
        </div> */}
      </Container>
    </Fragment>
  );
};

export { AddVenue };
