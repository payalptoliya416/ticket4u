import React, { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataGrid, KeenIcon } from '@/components';
import { ColumnDef } from '@tanstack/react-table';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import he from 'he';

const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;
export const GET_EVENT_LIST_API = `${ADMIN_API_URL}/admin/eventList?type=Event`;
export const GET_EVENT_DETAIL_API = `${ADMIN_API_URL}/admin/eventDetailAdmin`;
export const DELETE_EVENT_API = `${ADMIN_API_URL}/admin/deleteEvent`;

interface Venue {
  value: number;
  label: string;
}

interface EventData {
  id: number;
  is_published: string;
  event_title: string;
  cat_id: string;
  sub_cat_id: string;
  category: string;
  subcategory: string;
  organiser_name: string;
  banner_image: string;
  thumbnail_image: string;
  description: string;
  venues: string[];
}

const Event: React.FC = () => {
  const [users, setSubCategory] = useState<EventData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  // Function to fetch users
  const fetchUsers = () => {
    const authToken = localStorage.getItem('authToken');

    setLoading(true);  // Show loading indicator while fetching
    fetch(GET_EVENT_LIST_API, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success' && Array.isArray(data.data)) {
          setSubCategory(data.data);
          setFilteredUsers(data.data); // Set both users and filteredUsers initially
        } else {
          console.error('Unexpected data format:', data);
        }
        setLoading(false);  // Hide loading indicator after fetch
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  };

  // Fetch users on initial load
  useEffect(() => {
    fetchUsers();
  }, []);

  // Toggle menu visibility
  const handleMenuToggle = (userId: number) => {
    setSelectedUserId(userId);
    setMenuVisible((prev) => !prev);
  };

  // Edit functionality
  // const handleEditUser = (id) => {
  //    navigate('/add-event', { state: { category } });
  // };
  const handleEditUser = async (id: number) => {
    const authToken = localStorage.getItem('authToken');
    
    try {
      const response = await fetch(`${GET_EVENT_DETAIL_API}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
     
      const data = await response.json();
      
      if (data.status === 'success') {
        const venueIds = data.data.venues.map((venue: any) => ({
          
          value: venue.id, // Ensure value is a plain number
          label: venue.title, // Use the title directly
        }));
        
        navigate('/add-event', {
          state: {
            category: {
              ...data.data,
              venue_ids: venueIds,
            },
          },
        });
      } else {
        console.error('Failed to fetch event data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching event data:', error);
    }
  };

  // Remove user functionality
  const handleRemoveUser = (user: any) => {
    if (!user.id) return;
  
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this event?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(user.id);
      }
    });
  };

  // Call API to delete user and re-fetch the user list
  const deleteUser = (userId: number) => {
    const authToken = localStorage.getItem('authToken');

    fetch(`${DELETE_EVENT_API}/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          // Re-fetch the user list after successful deletion
          fetchUsers();
        } else {
          alert('Failed to delete user. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
        alert('Failed to delete user. Please try again.');
      });
  };

  const handleEventDetail = (id: number) => {
    if (id) {
      navigate('/event-Detail', {
        state: { eventID: id },
      });
    } else {
      navigate('/event-table/event-list');
    }
  };

  // Define the table columns
  const columns = useMemo<ColumnDef<EventData>[]>(() => [
    {
      id: 'Chart',
      header: () => 'Chart',
      enableSorting: false,
      cell: ({ row }) => {
        const isChartKeyNull = !row.original.id;
        const buttonLabel = isChartKeyNull ? 'Event Details' : 'Event Details';
        const buttonClass = isChartKeyNull
          ? 'btn btn-sm btn-primary bg-blue-500 hover:bg-blue-600'
          : 'btn btn-sm btn-primary bg-green-500 hover:bg-green-600';
    
        return (
          <button
            className={buttonClass}
            onClick={() =>
              handleEventDetail(row.original.id)
            }
          >
            {buttonLabel}
          </button>
        );
      },
      meta: {
        className: 'min-w-[150px]',
      },
    },
    {
      accessorKey: 'Event Title',
      header: 'Event Title',
      cell: ({ row }) => (
        <span className="text-sm text-gray-900 font-normal">{row.original.event_title}</span>
      ),
      meta: {
        className: 'min-w-[200px]',
        cellClassName: 'text-gray-800 font-normal',
      },
    },
    {
      accessorKey: 'venues',
      header: 'Venue',
      cell: ({ row }) => {
        const venues = row.original.venues;
        
        const venueTitles = venues && Array.isArray(venues)
          ? venues.map((venue: any) => venue.title || venue.name).join(', ')
          : '';
    
        return (
          <span className="text-sm text-gray-900 font-normal">{venueTitles}</span>
        );
      },
      meta: {
        className: 'min-w-[200px]',
        cellClassName: 'text-gray-800 font-normal',
      },
    },    
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => (
        <span className="text-sm text-gray-900 font-normal">{row.original.category}</span>
      ),
      meta: {
        className: 'min-w-[200px]',
        cellClassName: 'text-gray-800 font-normal',
      },
    },
    {
      accessorKey: 'subcategory',
      header: 'Subcategory',
      cell: ({ row }) => (
        <span className="text-sm text-gray-900 font-normal">{row.original.subcategory}</span>
      ),
      meta: {
        className: 'min-w-[180px]',
        cellClassName: 'text-gray-800 font-normal',
      },
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => {
        const rawDescription = row.original.description;
        const decodedDescription = he.decode(rawDescription);
  
        const strippedDescription = decodedDescription.replace(/<[^>]*>/g, "");
        const truncatedDescription =
          strippedDescription.length > 20
            ? `${strippedDescription.substring(0, 20)}...`
            : strippedDescription;
    
        return (
          <span className="text-sm text-gray-700 font-normal">{truncatedDescription}</span>
        );
      },
      meta: {
        className: 'min-w-[250px]',
        cellClassName: 'text-gray-800 font-normal',
      },
    },
    {
      accessorKey: 'Status',
      header: 'Status',
      cell: ({ row }) => (
        <div
          className={`text-sm font-normal ${
            row.original.is_published === 'Published' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {row.original.is_published === 'Published' ? 'Published' : 'Draft'}
        </div>
      ),
      meta: {
        className: 'min-w-[100px]',
        cellClassName: 'text-gray-800 font-normal',
      },
    },    
    {
      id: 'edit',
      header: () => 'Action',
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <div className="relative">
            <button
              className="btn btn-sm btn-icon btn-clear btn-light"
              onClick={() => handleMenuToggle(row.original.id)}
            >
              <KeenIcon icon="dots-vertical" />
            </button>
            {menuVisible && selectedUserId === row.original.id && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => handleEditUser(row.original.id)}
                >
                  Edit
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => handleRemoveUser(row.original)}
                >
                  Remove
                </a>
              </div>
            )}
          </div>
        );
      },
      meta: {
        className: 'w-[60px]',
      },
    },
  ], [menuVisible, selectedUserId]);
  
  // Filter users based on search query
  
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.category.toLowerCase().includes(lowercasedQuery) ||
        user.event_title.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  // Add effect to monitor filteredUsers change to debug re-render
  useEffect(() => {
  }, [filteredUsers]);

  return (
    <div className="card card-grid min-w-full">
      <div className="card-header flex-wrap gap-2">
        <h3 className="card-title font-medium text-sm">Event List</h3>
        <div className="flex flex-wrap gap-2 lg:gap-5">
          <div className="flex">
            <label className="input input-sm">
              <KeenIcon icon="magnifier" />
              <input
                placeholder="Search event"
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="card-body">
        {loading ? (
          <div className="flex justify-center items-center my-4">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9765 22.3858 0.5908 50 0.5908C77.6142 0.5908 100 22.9765 100 50.5908ZM93.9676 39.0409C91.5421 39.6781 89.083 38.2158 88.1811 35.8758C86.7997 32.2913 84.9175 28.9121 82.5849 25.841C79.3347 21.5619 75.2735 17.9648 70.6331 15.2552C65.9928 12.5457 60.8642 10.7766 55.5402 10.0491C51.7191 9.52689 47.8511 9.54855 44.0505 10.1071C41.5694 10.4717 39.0873 9.04874 38.4501 6.62326C37.813 4.19778 39.2613 1.69328 41.7345 1.27873C46.6976 0.446843 51.7666 0.367541 56.7698 1.05124C63.2754 1.94025 69.5422 4.10194 75.2124 7.41289C80.8826 10.7238 85.8452 15.1192 90.348C20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <DataGrid
            key={filteredUsers.length}
            columns={columns}
            data={filteredUsers}
            rowSelect={true}
            pagination={{ size: 10 }}
          />
        )}
      </div>
    </div>
  );
};

export { Event };