import React, {Fragment, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarPageTitle
} from '@/partials/toolbar';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';

const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;
export const Add_Event_API = `${ADMIN_API_URL}/admin/addEvent`;
export const Update_Event_API = `${ADMIN_API_URL}/admin/updateEvent`;
export const CategoriesList_API = `${ADMIN_API_URL}/admin/categoriesList`;
export const SubCategoriesList_API = `${ADMIN_API_URL}/admin/category-subcategory`;
export const GET_Organiser_LIST = `${ADMIN_API_URL}/admin/userList?type=Organiser`;

interface Event {
  id?: number;
  cat_id?: number;
  sub_cat_id?: number;
  organiser_id?: number;
  name: string;
  event_title: string;
  description: string;
  banner_image?: string;
}

interface Venue {
  title: string;
  event_date: Date | null;
  start_date: Date | null;
  end_date: Date | null;
  start_time: string;
  end_time: string;
  location: string;
  state: string;
  city: string;
  prices: string[];
}

const AddEvent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event>({
    name: '',
    event_title: '',
    description: '',
    //start_date: null,
    //end_date: null,
    banner_image: '',
  });
  const [venues, setVenues] = useState<Venue[]>([{ title: '', event_date: null, start_time: '', end_time: '', location: '', state: '', city:'', prices: [''], start_date: null, end_date: null }]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [organiser, setOrganiser] = useState<{ id: number; name: string }[]>([]);
  const [subcategories, setSubcategories] = useState<{ id: number; name: string }[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formErrors, setFormErrors] = useState<any>({});

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
      setEvent(location.state.category);
      setVenues(location.state.category.venues || []);
      setIsEditMode(true);
    }
  }, [location.state]);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    fetch(GET_Organiser_LIST, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        setOrganiser(data.data);
      } else {
        console.error('Failed to fetch categories:', data.message);
      }
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
    });
  }, [location.state]);

  const fetchSubcategories = (cat_id: number) => {
    const authToken = localStorage.getItem('authToken');
    fetch(`${SubCategoriesList_API}?cat_id=${cat_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        setSubcategories(data.data);
      } else {
        setSubcategories([]);
        console.error('Failed to fetch subcategories:', data.message);
      }
    })
    .catch(error => {
      setSubcategories([]);
      console.error('Error fetching subcategories:', error);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEvent({ ...event, banner_image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddVenue = () => {
    setVenues([...venues, { title: '', event_date: null, start_time: '', end_time: '', location: '', state: '', city: '', prices: [''], start_date: null, end_date: null}]);
  };

  const handleInputVenueChange = (
    e: { target: { name: any; value: any } },
    index: any
  ) => {
    const { name, value } = e.target;
    const updatedVenues = [...venues];
    updatedVenues[index][name as keyof Venue] = value;
    setVenues(updatedVenues);
  };
  
  const handleVenueDateChange = (date: any, index: number) => {
    const updatedVenues = [...venues];
    updatedVenues[index].event_date = date;
    setVenues(updatedVenues);
  };
  

  const handleRemoveVenue = (index: number) => {
    const updatedVenues = venues.filter((_, i) => i !== index);
    setVenues(updatedVenues);
  };

  const handleAddPrice = (venueIndex: number) => {
  setVenues((prevVenues) => {
    const updatedVenues = [...prevVenues];

    // Check if prices array exists, otherwise initialize it
    if (!updatedVenues[venueIndex].prices) {
      updatedVenues[venueIndex].prices = [];
    }

    // Add a single empty price input
    updatedVenues[venueIndex].prices.push(''); // Directly push instead of spreading

    return updatedVenues;
  });
};

  
  
  
  const handleRemovePrice = (venueIndex: number, priceIndex: number) => {
    setVenues((prevVenues) => {
      const updatedVenues = [...prevVenues];
      updatedVenues[venueIndex].prices.splice(priceIndex, 1);
      return updatedVenues;
    });
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, venueIndex: number, priceIndex: number) => {
    const { value } = e.target;
  
    setVenues((prevVenues) => {
      const updatedVenues = [...prevVenues];
      updatedVenues[venueIndex].prices[priceIndex] = value;
      return updatedVenues;
    });
  };
  

  const handleOrganiserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    setFormErrors(errors);

    const formattedVenues = venues.map((venue) => {
      const startTime =
        venue.start_time && !isNaN(new Date(venue.start_time).getTime())
          ? new Date(venue.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : venue.start_time;
    
      const endTime =
        venue.end_time && !isNaN(new Date(venue.end_time).getTime())
          ? new Date(venue.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : venue.end_time;
    
      return { ...venue, start_time: startTime, end_time: endTime };
    });
    
    const authToken = localStorage.getItem('authToken');
    const url = isEditMode ? `${Update_Event_API}/${event.id}` : Add_Event_API;
    
    const payload: Record<string, any> = {
      cat_id: event.cat_id,
      sub_cat_id: event.sub_cat_id,
      organiser_id: event.organiser_id,
      name: event.name,
      description: event.description,
      event_title: event.event_title,
      venues: formattedVenues,
    };

    const isBase64Image = (image: string) => {
      return /^data:image\/(?:png|jpeg|jpg);base64,/.test(image);
    };

    if (event.banner_image && isBase64Image(event.banner_image)) {
      payload.banner_image = event.banner_image;
    }

    fetch(url, {
      method: isEditMode ? 'POST' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        navigate('/event-table/event-list');
      } else {
        console.error('Failed to add/update event');
      }
    })
    .catch(error => {
      console.error('Error submitting event:', error);
    });
  };
  

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const cat_id = parseInt(value, 10);
    setEvent((prevEvent) => ({ ...prevEvent, cat_id, sub_cat_id: undefined }));
    const selectedCategoryId = e.target.value;

    if (!selectedCategoryId) {
      setSubcategories([]);
      return;
    }

    if (!isNaN(cat_id)) {
      fetchSubcategories(cat_id);
    } else {
      setSubcategories([]); 
    }
  };

  const validateForm = () => {
    const errors: any = {};
  
    if (!event.cat_id) errors.cat_id = 'Category is required';
    //if (!event.sub_cat_id) errors.sub_cat_id = 'Sub-category is required';
    if (!event.organiser_id) errors.organiser_id = 'Organiser is required';
    if (!event.name) errors.name = 'Event title is required';
    if (!event.event_title) errors.event_title = 'Event title is required';
    if (!event.description) errors.description = 'Event description is required';
    if (!event.banner_image) errors.banner_image = 'Banner image is required';
  
    venues.forEach((venue, index) => {
      const venueErrors: any = {};
      if (!venue.title) venueErrors.title = 'Venue title is required';
      if (!venue.start_time) venueErrors.start_time = 'Start time is required';
      if (!venue.end_time) venueErrors.end_time = 'End time is required';
      if (!venue.location) venueErrors.location = 'Location is required';
      if (!venue.prices || venue.prices.length === 0 || venue.prices.some((p) => !p))
        venueErrors.prices = 'At least one valid price is required';
  
      if (Object.keys(venueErrors).length > 0) {
        errors[`venue_${index}`] = venueErrors;
      }
    });
  
    return errors;
  };

  useEffect(() => {
    if (event.cat_id) {
      fetchSubcategories(event.cat_id);
    }
  }, [event.cat_id]);
  
  return (
    <Fragment>
      <Toolbar>
        <Container>
          <div className="flex justify-between items-center">
            <ToolbarPageTitle text={isEditMode ? 'Update Event' : 'Add New Event'} />
            <ToolbarActions>
              <button
                className="btn btn-secondary"
                onClick={() => navigate('/event-table/event-list')}
              >
                Back to Event List
              </button>
            </ToolbarActions>
          </div>
        </Container>
      </Toolbar>
      <Container>
        <form onSubmit={handleOrganiserSubmit}>
          <div className="grid grid-cols-12 gap-5 mb-4">

            {/* Event Title Input */}
            <div className="col-span-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Event Title</label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Event Title"
                  name="event_title"
                  value={event.event_title}
                  onChange={handleInputChange}
                />
                {formErrors.name && <p className="text-red-500 text-xs">{formErrors.name}</p>}
            </div>
            {/* Category Dropdown */}
            <div className="col-span-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">Category</label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="cat_id"
                value={event.cat_id || ''}
                onChange={handleCategoryChange}
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

            {/* SubCategory Dropdown */}
            <div className="col-span-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">Sub Category</label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="sub_cat_id"
                value={event.sub_cat_id || ''}
                onChange={handleInputChange}
              >
                <option value="">Select a SubCategory</option>
                {subcategories.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
              </select>
              {formErrors.sub_cat_id && <p className="text-red-500 text-xs">{formErrors.sub_cat_id}</p>}
            </div>

            {/* Organiser Dropdown */}
            <div className="col-span-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">Organiser</label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="organiser_id"
                value={event.organiser_id || ''}
                onChange={handleInputChange}
              >
                <option value="">Select a Organiser</option>
                {organiser.map((organiser) => (
                  <option key={organiser.id} value={organiser.id}>
                    {organiser.name}
                  </option>
                ))}
              </select>
              {formErrors.organiser_id && <p className="text-red-500 text-xs">{formErrors.organiser_id}</p>}
            </div>
            {/* Type Dropdown */}
            <div className="col-span-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">Type</label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="organiser_id"
                value={event.organiser_id || ''}
                onChange={handleInputChange}
              >
                <option value="">Select a Type</option>
                <option value="Event">Event</option>
                <option value="Activity">Activity</option>
              </select>
              {formErrors.organiser_id && <p className="text-red-500 text-xs">{formErrors.organiser_id}</p>}
            </div>
            {/* Banner Image Input */}
            <div className="col-span-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">Banner Image</label>
              <input
                type="file"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={handleImageChange}
                accept="image/*"
              />
              {event.banner_image && (
                <div className="mt-2">
                  <img
                    src={event.banner_image} // This will now be the Base64 string
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
              <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
              <textarea
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter Description"
                name="description"
                value={event.description}
                onChange={handleTextareaChange}
              />
              {formErrors.description && <p className="text-red-500 text-xs">{formErrors.description}</p>}
            </div>

            {/* Venue Section */}
            <div className="col-span-12">
              <h3 className="text-lg font-medium text-gray-900">Venues</h3>
              {venues.map((venue, index) => (
                <div key={index} className="border p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Venue Title</label>
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter Venue Title"
                        name="title"
                        value={venue.title}
                        onChange={(e) => handleInputVenueChange(e, index)}
                      />
                      {formErrors[`venue_${index}`]?.title && <p className="text-red-500 text-xs">{formErrors[`venue_${index}`].title}</p>}
                    </div>
                    <div className="col-span-6">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Venue Date</label>
                      <Flatpickr
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        //value={venue.start_date && venue.end_date ? [venue.start_date, venue.end_date] : []}
                        value={venue.event_date ? venue.event_date : []}
                        onChange={(date) => handleVenueDateChange(date, index)}
                        options={{ mode: 'range', dateFormat: 'Y-m-d' }}
                        placeholder="Venue Date"
                      />
                    </div>
                    <div className="col-span-6">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Start Time</label>
                      <Flatpickr
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={venue.start_time}
                        onChange={([start]) =>
                          handleInputVenueChange(
                            { target: { name: 'start_time', value: start.toISOString() } },
                            index
                          )
                        }
                        options={{ enableTime: true, noCalendar: true, dateFormat: 'h:i K', time_24hr: false }}
                        placeholder="Start Time"
                      />
                    </div>
                    <div className="col-span-6">
                      <label className="block mb-2 text-sm font-medium text-gray-900">End Time</label>
                      <Flatpickr
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={venue.end_time}
                        onChange={([end]) =>
                          handleInputVenueChange(
                            { target: { name: 'end_time', value: end.toISOString() } },
                            index
                          )
                        }
                        options={{ enableTime: true, noCalendar: true, dateFormat: 'h:i K', time_24hr: false }}
                        placeholder="End Time"
                      />
                    </div>
                    <div className="col-span-6">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Venue Location</label>
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter Venue Location"
                        name="location"
                        value={venue.location}
                        onChange={(e) => handleInputVenueChange(e, index)}
                      />
                      {formErrors[`venue_${index}`]?.location && <p className="text-red-500 text-xs">{formErrors[`venue_${index}`].location}</p>}
                    </div>
                    {/* State Inputs */}
                    <div className="col-span-6">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Venue City</label>
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter Venue City"
                        name="city"
                        value={venue.city }
                        onChange={(e) => handleInputVenueChange(e, index)}
                      />
                    </div>
                    {/* State Inputs */}
                    <div className="col-span-6">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Venue State</label>
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter Venue State"
                        name="state"
                        value={venue.state }
                        onChange={(e) => handleInputVenueChange(e, index)}
                      />
                    </div>
                    {/* Dynamic Price Inputs */}
                    <div className="col-span-6">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Prices</label>
                      {venue.prices.map((price, priceIndex) => (
                        <div key={priceIndex} className="flex items-center gap-4 mb-2">
                          <input
                            type="number"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Enter Price"
                            value={price}
                            onChange={(e) => handlePriceChange(e, index, priceIndex)}
                          />
                          {/* Remove button for price */}
                          {priceIndex > 0 && (
                            <button
                              type="button"
                              onClick={() => handleRemovePrice(index, priceIndex)}
                              className="text-red-600 text-sm"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleAddPrice(index)}
                        className="text-blue-600 text-sm"
                      >
                        + New Price
                      </button>
                    </div>

                  </div>
                  {venues.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveVenue(index)}
                      className="text-red-600"
                    >
                      Remove Venue
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddVenue}
                className="btn btn-primary"
              >
                + Add Another Venue
              </button>
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

export { AddEvent };