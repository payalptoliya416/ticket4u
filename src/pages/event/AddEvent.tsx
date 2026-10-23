import React, {Fragment, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarPageTitle
} from '@/partials/toolbar';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import Select, { MultiValue, ActionMeta } from 'react-select';
import axios from 'axios';
import { number } from 'yup';
import { log } from 'node:console';

const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;
export const Add_Event_API = `${ADMIN_API_URL}/admin/addEvent`;
export const Update_Event_API = `${ADMIN_API_URL}/admin/updateEvent`;
export const CategoriesList_API = `${ADMIN_API_URL}/admin/categoriesList`;
export const SubCategoriesList_API = `${ADMIN_API_URL}/admin/category-subcategory`;
export const GET_Organiser_LIST = `${ADMIN_API_URL}/admin/userList?type=Organiser`;
export const GET_Venue_LIST = `${ADMIN_API_URL}/admin/venueList`;
export const GET_Chart_Category_API = `${ADMIN_API_URL}/admin/getChartCategory`;

interface Event {
  id?: number;
  cat_id?: number;
  sub_cat_id?: number;
  organiser_id?: number;
  venue_id?: number;
  type?: string;
  banner_type?: string;
  featured?: string;
  name: string;
  event_title: string;
  description: string;
  is_published?: string;
  banner_image?: string;
  thumbnail_image?: string;
  video_url: string;
}

type Venue = {
  id: number;
  event_key: string;
  event_date: string;
  title?: string;
  start_time?: string;
  end_time?: string;
};


interface VenueOption {
  value: string;
  label: string;
}

interface DateEntry {
  id: number;
  date: string[];
  start_time?: string;
  end_time?: string; 
}

interface VenueDates {
  [key: string]: DateEntry[];
}


type CategoryPrice = {
  price: string;
  label: string;
};

interface Category {
  category_key: string;
  category_label: string;
  price: number;
  venue_id: number;
}


type CategoryPrices = {
  [venueID: string]: {
    [categoryKey: string]: CategoryPrice;
  };
};

type VenueDateEntry = { id: string; date: string };
type VenueDatesNew = { [key: string]: VenueDateEntry[] };
const AddEvent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event>({
    name: '',
    event_title: '',
    description: '',
    type: '',
    banner_type: 'image',
    banner_image: '',
    thumbnail_image: '',
    is_published: '',
    featured: '',
    video_url: '',
    organiser_id: undefined,
  });
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [organiser, setOrganiser] = useState<{ id: number; name: string }[]>([]);
  const [venues, setVenues] = useState<{ value: number; label: string }[]>([]);
  const [subcategories, setSubcategories] = useState<{ id: number; name: string }[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formErrors, setFormErrors] = useState<any>({});
  const [selectedVenues, setSelectedVenues] = useState<{ value: string; label: string }[]>([]);
  const [venueDates, setVenueDates] = useState<{
    [key: string]: { id: number; date: string[]; start_time?: string; end_time?: string }[];
  }>({});  
  const initialDates: Record<string, { id: number; date: string; start_time?: string; end_time?: string }[]> = {};
  const [categoryPrices, setCategoryPrices] = useState<{
    [venueId: string]: { [categoryKey: string]: { label: string; price: number } };
  }>({});
  const [apiErrors, setApiErrors] = useState<string[]>([]);  
  const loginType = localStorage.getItem('loginType');
  const userID = localStorage.getItem('userID');
  const [selectedType, setSelectedType] = useState(event.type || '');

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
      const eventData = location.state.category;
      setEvent(eventData);
      setIsEditMode(true);
      
      if (eventData.venue_ids && Array.isArray(eventData.venue_ids)) {
        const initialSelectedVenues = eventData.venue_ids.map((venue: { value: number; label: string }) => {
          const venueObj = venues.find(v => v.value === venue.value);
          return venueObj || venue;
        });
        setSelectedVenues(initialSelectedVenues);
      }      
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

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    fetch(GET_Venue_LIST, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        const fetchedVenues = data.data.map((venue: { id: number; title: string }) => ({
          value: String(venue.id),   // 'id' as 'value'
          label: venue.title, // 'title' as 'label'
        }));
        setVenues(fetchedVenues);  // Set venues state with correctly mapped data
      } else {
        console.error('Failed to fetch venues:', data.message);
      }
    })
    .catch(error => {
      console.error('Error fetching venues:', error);
    });
  }, []);

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

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedType(value);
    handleInputChange(e);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleInputChangeOrganiser = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedValue = name === 'organiser_id' ? Number(value) : value;
    setEvent((prevEvent) => ({ ...prevEvent, [name]: updatedValue }));
  };

  React.useEffect(() => {
    if (loginType === 'Organiser' && userID) {
      setEvent((prevEvent) => ({
        ...prevEvent,
        organiser_id: Number(userID),
      }));
    }
  }, [loginType, userID]);

  const handleDescriptionChange = (value: string) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      description: value,
    }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      validateImageDimensions(file, 1440, 650)
        .then(() => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setEvent({ ...event, banner_image: reader.result as string });
          };
          reader.readAsDataURL(file);
        })
        .catch((error) => {
          setFormErrors({ ...formErrors, banner_image: error });
        });
    }
  };
  const handleThumbnailImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      validateImageDimensions(file, 240, 290)
        .then(() => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setEvent({ ...event, thumbnail_image: reader.result as string });
          };
          reader.readAsDataURL(file);
        })
        .catch((error) => {
          setFormErrors({ ...formErrors, thumbnail_image: error });
        });
    }
  };

  const validateImageDimensions = (file: File, requiredWidth: number, requiredHeight: number): Promise<boolean> => {
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
  

  const dataURLToFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    
    if (!mimeMatch) {
      throw new Error("Invalid data URL format");
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
  
  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      return;
    }
       
    const authToken = localStorage.getItem('authToken');
    const url = isEditMode ? `${Update_Event_API}/${event.id}` : Add_Event_API;
    const venueIds = selectedVenues.map(venue => venue.value);
    const venueIdsString = venueIds.join(',');

    const formatTime = (time: string | Date) => {
      const date = new Date(time);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    
    const payload: Record<string, any> = {
      cat_id: event.cat_id,
      user_id: localStorage.getItem('userID'),
      sub_cat_id: event.sub_cat_id,
      organiser_id: event.organiser_id,
      venue_id: event.venue_id,
      type: event.type,
      description: event.description,
      is_published: event.is_published,
      featured: event.featured,
      event_title: event.event_title,
      video_url: event.video_url,
      banner_type: event.banner_type,
      venue_ids: venueIdsString,
      created_by: loginType === 'Organiser' ? 'Organiser' : 'Admin',
      venues: Object.keys(venueDates).map((venueId) => ({
        venue_id: venueId,
        dates: venueDates[venueId].map((entry) => ({
          entryID: entry.id,
          // date: entry.date,
          date: Array.isArray(entry.date) && entry.date.length > 0
              ? new Date(entry.date[0]).toISOString()
              : typeof entry.date === "string"
              ? new Date(entry.date).toISOString()
              : null,
          start_time: entry.start_time ? formatTime(entry.start_time) : "",
          end_time: entry.end_time ? formatTime(entry.end_time) : "",
        })),
        categories: Object.keys(categoryPrices[venueId] || {}).map((categoryKey) => ({
          key: categoryKey,
          label: categoryPrices[venueId][categoryKey].label,
          price: categoryPrices[venueId][categoryKey].price,
        })),
      })),
    };
    
    const isBase64Image = (image: string) => {
      return /^data:image\/(?:png|jpeg|jpg);base64,/.test(image);
    };

    if (event.banner_image && isBase64Image(event.banner_image)) {
      payload.banner_image = event.banner_image;
    }
    if (event.thumbnail_image && isBase64Image(event.thumbnail_image)) {
      payload.thumbnail_image = event.thumbnail_image;
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
        setApiErrors([data.message || 'Failed to add/update event.']);
      }
    })
    .catch(error => {
      setApiErrors(['An unexpected error occurred. Please try again.']);
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
  const handleVenueChange = (newValue: any) => {
    const newVenues = [...newValue];
    setSelectedVenues(newVenues);

    const newVenueDates = { ...venueDates };
    newVenues.forEach((venue) => {
      if (!newVenueDates[venue.value]) {
        // newVenueDates[venue.value] = [{ id: Date.now(), date: "" }];
        newVenueDates[venue.value] = [{ id: Date.now(), date: [] }];
      }
    });
    setVenueDates(newVenueDates);

    const newCategoryPrices = { ...categoryPrices };
    newVenues.forEach((venue) => {
      if (!newCategoryPrices[venue.value]) {
        fetchChartCategories(venue.value); // Fetch category data when venue is selected
      }
    });

    // Remove prices for unselected venues
    // Object.keys(newCategoryPrices).forEach((venueID) => {
    //   if (!newVenues.find((v) => v.value === venueID)) {
    //     delete newCategoryPrices[venueID];
    //   }
    // });

    setCategoryPrices(newCategoryPrices);
  };

  const fetchChartCategories = (venueID: string) => {
    const authToken = localStorage.getItem("authToken");
  
    fetch(`${GET_Chart_Category_API}/${venueID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setCategoryPrices((prevState) => ({
            ...prevState,
            [venueID]: data.categories.reduce((acc: any, category: any) => {
              acc[category.key] = { price: "", label: category.label };
              return acc;
            }, {}),
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const handlePriceChange = (venueId: string, categoryKey: string, value: string) => {
    setCategoryPrices((prev) => ({
      ...prev,
      [venueId]: {
        ...prev[venueId],
        [categoryKey]: {
          ...prev[venueId][categoryKey],
          price: parseFloat(value) || 0,
        },
      },
    }));
  };
  
  const handleDateChange = (
    venueId: string,
    entryId: number,
    field: "date" | "start_time" | "end_time",
    value: string
  ) => {
    const updatedVenueDates = { ...venueDates };
    const updatedDates = updatedVenueDates[venueId].map((entry) =>
      entry.id === entryId
        ? {
            ...entry,
            [field]:
              field === "date"
                ? value 
                : new Date(value).toISOString(),
          }
        : entry
    );
  
    updatedVenueDates[venueId] = updatedDates;    
    setVenueDates(updatedVenueDates);
  };
  
  const addDateField = (venueId: string) => {
    const newVenueDates = { ...venueDates };
    const venue = newVenueDates[venueId] || [];
  
    const newDate = {
      id: Date.now(),
      date: [""],
      start_time: "",
      end_time: "",
    };
  
    venue.push(newDate);
    newVenueDates[venueId] = venue;
    setVenueDates(newVenueDates);
  };
  
  const removeDateField = (venueId: any, dateId: number) => {
    const updatedVenueDates = { ...venueDates };
    const venueDateArray = updatedVenueDates[venueId] || [];
    const updatedDateArray = venueDateArray.filter((entry) => entry.id !== dateId);
    updatedVenueDates[venueId] = updatedDateArray;
    setVenueDates(updatedVenueDates);
  };  

  useEffect(() => {
    if ((event as any).venues && Array.isArray((event as any).venues)) {
      const initialCategoryPrices: Record<string, { [key: string]: { label: string; price: number } }> = {};
  
      (event as any).venues.forEach((venue : any) => {
        initialCategoryPrices[venue.id] = {};
        (event as any).event_categories
          .filter((category: any) => category.venue_id === venue.id)
          .forEach((category: any) => {
            initialCategoryPrices[venue.id][category.category_key] = {
              label: category.category_label,
              price: category.price,
            };
          });
      });
  
      setCategoryPrices(initialCategoryPrices);
    }
  }, [(event as any).venues]);
  
  useEffect(() => {
    const initialDates: Record<string, { id: number; date: string[]; start_time?: string; end_time?: string }[]> = {};
    
    if (event && Array.isArray((event as any).venues)) {
      (event as any).venues.forEach((venue : any) => {
        initialDates[venue.id] = venue.dates.map((dateEntry : any) => ({
          // recordID:dateEntry.recordID,
          id:dateEntry.entryID,
          date: [dateEntry.event_date],
          start_time: dateEntry.start_time,
          end_time: dateEntry.end_time,
        }));
      });
      setVenueDates(initialDates);
    }
  }, [event]);
   

  const validateForm = () => {
    const errors: any = {};
  
    if (!event.cat_id) errors.cat_id = 'Category is required';
    if (!event.organiser_id && loginType !== 'Organiser') {
      errors.organiser_id = 'Organiser is required';
    }
    // {selectedType !== 'Activity' && (
    if (selectedType !== 'Activity' && (!selectedVenues || selectedVenues.length === 0)) {
      errors.venue_id = 'At least one venue is required';
    }
    if (!event.event_title) errors.event_title = 'Event title is required';
    if (!event.description) errors.description = 'Event description is required';
    if (event.banner_type === 'image' && !event.banner_image) {
      errors.banner_image = 'Banner image is required';
    }
    if (event.banner_type === 'video' && !event.video_url) {
      errors.video_url = 'Video URL is required';
    }
    if (!event.thumbnail_image) errors.thumbnail_image = 'Thumbnail image is required';
    if (!event.type) errors.type = 'Type is required';
    if (!event.featured) errors.featured = 'Featured is required';
    if (!event.is_published) errors.is_published = 'Status is required'; 
    return errors;
  };

  useEffect(() => {
    if (event.cat_id) {
      fetchSubcategories(event.cat_id);
    }
    if(event.type == 'Activity'){
      setSelectedType('Activity');
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
        <form onSubmit={handleEventSubmit}>
          <div className="grid grid-cols-12 gap-5 mb-4">

            {/* Event Title Input */}
            <div className="col-span-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">Event Title<span className="isRequire text-danger">*</span></label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter Event Title"
                name="event_title"
                value={event.event_title}
                onChange={handleInputChange}
              />
              {formErrors.event_title && <p className="text-red-500 text-xs">{formErrors.event_title}</p>}
            </div>

            {/* Type Dropdown */}
            <div className="col-span-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">Type<span className="isRequire text-danger">*</span></label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="type"
                value={event.type || ''}
                onChange={handleTypeChange}
              >
                <option value="">Select a Type</option>
                <option value="Event">Event</option>
                <option value="Activity">Activity</option>
              </select>
              {formErrors.type && <p className="text-red-500 text-xs">{formErrors.type}</p>}
            </div>

            {/* Category Dropdown */}
            <div className="col-span-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">Category<span className="isRequire text-danger">*</span></label>
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
            {loginType !== 'Organiser' ? (
              <div className="col-span-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Organiser<span className="isRequire text-danger">*</span></label>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  name="organiser_id"
                  value={event.organiser_id || ''}
                  onChange={handleInputChangeOrganiser}
                >
                  <option value="">Select an Organiser</option>
                  {organiser.map((organiser) => (
                    <option key={organiser.id} value={organiser.id}>
                      {organiser.name}
                    </option>
                  ))}
                </select>
                {formErrors.organiser_id && <p className="text-red-500 text-xs">{formErrors.organiser_id}</p>}
              </div>
            ) : (
              <input type="hidden" name="organiser_id" value={event.organiser_id}/>
            )}
            {/* Featured EVENTS */}
            <div className="col-span-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">Is Featured<span className="isRequire text-danger">*</span></label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="featured"
                value={event.featured || ''}
                onChange={handleInputChange}
              >
                <option value="">Select an Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {formErrors.featured && <p className="text-red-500 text-xs">{formErrors.featured}</p>}
            </div>

            {/* Thumbnail Image Input */}
            <div className="col-span-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">Thumbnail Image (240 X 290)<span className="isRequire text-danger">*</span></label>
              <input
                type="file"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={handleThumbnailImageChange}
                accept="image/*"
              />
              {event.thumbnail_image && (
                <div className="mt-2">
                  <img
                    src={event.thumbnail_image} // This will now be the Base64 string
                    alt="Thumbnail Preview"
                    className="w-full h-auto rounded-lg"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                </div>
              )}
              {formErrors.thumbnail_image && <p className="text-red-500 text-xs">{formErrors.thumbnail_image}</p>}
            </div>

            {/* Type Dropdown */}
            <div className="col-span-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">Banner Type</label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="banner_type"
                value={event.banner_type}
                onChange={handleInputChange}
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
              {formErrors.banner_type && <p className="text-red-500 text-xs">{formErrors.banner_type}</p>}
            </div>

            {/* Banner Image Input */}
            {event.banner_type === 'image' && (
              <div className="col-span-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Banner Image (1440 X 650)<span className="isRequire text-danger">*</span></label>
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
            )}

            {/* Video URL Input */}
            {event.banner_type === 'video' && (
              <div className="col-span-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Video Link<span className="isRequire text-danger">*</span></label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Video URL"
                  name="video_url"
                  value={event.video_url}
                  onChange={handleInputChange}
                />
                {formErrors.video_url && <p className="text-red-500 text-xs">{formErrors.video_url}</p>}
              </div>
            )}

            {/* Description Text Area */}
            <div className="col-span-12">
              <label className="block mb-2 text-sm font-medium text-gray-900">Description<span className="isRequire text-danger">*</span></label>
              <ReactQuill
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
                theme="snow"
                value={event.description}
                onChange={handleDescriptionChange}
                placeholder="Enter Description"
              />
              {formErrors.description && <p className="text-red-500 text-xs">{formErrors.description}</p>}
            </div>

            {/* Venues Dropdown */}
            {selectedType !== 'Activity' && (
              <div className="col-span-12">
                <label className="block mb-2 text-sm font-medium text-gray-900">Venue<span className="isRequire text-danger">*</span></label>
                <Select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  name="venue_id"
                  isMulti
                  options={venues.map((venue) => ({
                    value: String(venue.value),
                    label: venue.label,
                  }))}
                  value={selectedVenues}
                  onChange={handleVenueChange}
                  getOptionLabel={(e) => e.label}
                />
                {formErrors.venue_id && <p className="text-red-500 text-xs">{formErrors.venue_id}</p>}
              </div>
            )}
            {/* {selectedVenues.map((venue) => ( */}
            {selectedType !== 'Activity' && selectedVenues.map((venue) => (
              <div key={venue.value} className="col-span-12 mb-6 border p-4 rounded-lg">
                <div className="flex flex-col space-y-6">
                  
                  {/* Left side: Prices */}
                  <div>
                    {categoryPrices[venue.value] && (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-sm font-medium text-gray-900 underline">
                            {venue.label} Prices
                          </label>
                        </div>
                        {Object.keys(categoryPrices[venue.value]).map((categoryKey) => (
                          <div key={categoryKey} className="col-span-6 mb-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                              {categoryPrices[venue.value][categoryKey].label}
                            </label>
                            <input
                              type="number"
                              value={categoryPrices[venue.value][categoryKey].price}
                              onChange={(e) => handlePriceChange(venue.value, categoryKey, e.target.value)}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5"
                              placeholder="Price"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right side: Event Dates */}
                  <div>
                    <div className="flex justify-between items-center mb-2 mt-7">
                      <label className="block text-sm font-medium text-gray-900 underline">{venue.label} Event Dates</label>
                    </div>
                    {venueDates[venue.value]?.map((entry) => (
                      <div key={entry.id} className="flex items-center mb-8 space-x-4">
                        <Flatpickr
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          value={entry.date}
                          onChange={(date) => handleDateChange(venue.value, entry.id, "date", date[0].toISOString())}
                          options={{ mode: "range", dateFormat: "Y-m-d" }}
                          placeholder="Select Date Range"
                        />
                        <Flatpickr
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          value={entry.start_time}
                          onChange={([start]) => {
                            handleDateChange(venue.value, entry.id, "start_time", start.toISOString());
                          }}
                          options={{ enableTime: true, noCalendar: true, dateFormat: "h:i K", time_24hr: false }}
                          placeholder="Start Time"
                        />
                        <Flatpickr
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          value={entry.end_time}
                          onChange={([end]) => handleDateChange(venue.value, entry.id, "end_time", end.toISOString())}
                          options={{ enableTime: true, noCalendar: true, dateFormat: "h:i K", time_24hr: false }}
                          placeholder="End Time"
                        />
                        <button
                          type="button"
                          onClick={() => removeDateField(venue.value, entry.id)}
                          className="ml-2 text-red-500 hover:underline text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addDateField(venue.value)}
                      className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                    >
                      + Add Another Date
                    </button>
                  </div>
                </div>
              </div>
            ))}

            
            {/* Event Status */}
            <div className="col-span-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">Event Status<span className="isRequire text-danger">*</span></label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full max-w-40"
                name="is_published"
                value={event.is_published || ''}
                onChange={handleInputChange}
              >
                <option value="">Select a Status</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
              {formErrors.is_published && <p className="text-red-500 text-xs">{formErrors.is_published}</p>}
              
              <br/>
              {apiErrors.length > 0 && (
                <div className="mb-4 text-red-600 bg-red-100 border border-red-400 rounded p-3">
                  <ul>
                    {apiErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
           
              <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center mt-4"
                >
                  {isEditMode ? 'Update' : 'Submit'}
              </button>
            </div>
          </div>
        </form>
        
      </Container>
    </Fragment>
  );
};

export { AddEvent };