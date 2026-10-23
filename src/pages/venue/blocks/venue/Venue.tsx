import React, { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataGrid, KeenIcon } from '@/components';
import { ColumnDef } from '@tanstack/react-table';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import he from 'he';

const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;
export const GET_VENUE_LIST_API = `${ADMIN_API_URL}/admin/venueList`;
export const GET_VENUE_DETAIL_API = `${ADMIN_API_URL}/admin/venueDetail`;
export const DELETE_VENUE_API = `${ADMIN_API_URL}/admin/deleteVenue`;

interface VenueData {
  id: number;
  title: string;
  event_date: string;
  start_time: string;
  end_time: string;
  location: string;
  city: string;
  state: string;
  country: string;
  prices: string;
  chart_key: string;
}

const Venue: React.FC = () => {
  const [venues, setSubCategory] = useState<VenueData[]>([]);
  const [filteredVenues, setFilteredVenues] = useState<VenueData[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  // Function to fetch venues
  const fetchVenues = () => {
    const authToken = localStorage.getItem('authToken');

    setLoading(true);  // Show loading indicator while fetching
    fetch(GET_VENUE_LIST_API, {
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
          setFilteredVenues(data.data); // Set both venues and filteredVenues initially
        } else {
          console.error('Unexpected data format:', data);
        }
        setLoading(false);  // Hide loading indicator after fetch
      })
      .catch((error) => {
        console.error('Error fetching venues:', error);
        setLoading(false);
      });
  };

  // Fetch venues on initial load
  useEffect(() => {
    fetchVenues();
  }, []);

  // Toggle menu visibility
  const handleMenuToggle = (venueId: number) => {
    setSelectedUserId(venueId);
    setMenuVisible((prev) => !prev);
  };

  const handleEditVenue = async (id: number) => {
    const authToken = localStorage.getItem('authToken');
    
    try {
      const response = await fetch(`${GET_VENUE_DETAIL_API}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
  
      const data = await response.json();
      
      if (data.status === 'success') {
        navigate('/add-Venues', { state: { venue: data.data } });
      } else {
        console.error('Failed to fetch venue data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching venue data:', error);
    }
  };

  const handleAddChart = (id: number, chartKey?: string) => {
    if (chartKey) {
      navigate('/add-Chart', {
        state: { venueID: id, chartKey: chartKey },
      });
    } else {
      navigate('/add-Chart', {
        state: { venueID: id },
      });
    }
  };

  // Remove venue functionality
  const handleRemoveVenue = (venue: any) => {
    if (!venue.id) return;
  
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this venue?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        deletevenue(venue.id);
      }
    });
  };

  // Call API to delete venue and re-fetch the venue list
  const deletevenue = (venueId: number) => {
    const authToken = localStorage.getItem('authToken');

    fetch(`${DELETE_VENUE_API}/${venueId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          // Re-fetch the venue list after successful deletion
          fetchVenues();
        } else {
          alert('Failed to delete venue. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error deleting venue:', error);
        alert('Failed to delete venue. Please try again.');
      });
  };

  // Define the table columns
  const columns = useMemo<ColumnDef<VenueData>[]>(() => [
    {
      id: 'Chart',
      header: () => 'Chart',
      enableSorting: false,
      cell: ({ row }) => {
        const isChartKeyNull = !row.original.chart_key;
        const buttonLabel = isChartKeyNull ? 'Create Seating Chart' : 'Update Seating Chart';
        const buttonClass = isChartKeyNull
          ? 'btn btn-sm btn-primary bg-blue-500 hover:bg-blue-600'
          : 'btn btn-sm btn-primary bg-green-500 hover:bg-green-600';
    
        return (
          <button
            className={buttonClass}
            onClick={() =>
              handleAddChart(row.original.id, row.original.chart_key)
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
      accessorKey: 'Venue Title',
      header: 'Venue Title',
      cell: ({ row }) => (
        <span className="text-sm text-gray-900 font-normal">{row.original.title}</span>
      ),
      meta: {
        className: 'min-w-[200px]',
        cellClassName: 'text-gray-800 font-normal',
      },
    },
    // {
    //   accessorKey: 'Date',
    //   header: 'Date',
    //   cell: ({ row }) => {
    //     try {
    //       const eventDateRaw = row.original.event_date;
    //       if (!eventDateRaw) {
    //         return <span className="text-sm text-gray-900 font-normal">N/A</span>;
    //       }
    //       const dates = Array.isArray(eventDateRaw) ? eventDateRaw : JSON.parse(eventDateRaw);
    //       if (!Array.isArray(dates) || dates.length !== 2) {
    //         return <span className="text-sm text-gray-900 font-normal">Invalid Date</span>;
    //       }

    //       const startDate = new Date(dates[0]);
    //       const endDate = new Date(dates[1]);
    
    //       // Format the dates to YYYY-MM-DD format
    //       const startFormatted = startDate.toLocaleDateString('en-GB');
    //       const endFormatted = endDate.toLocaleDateString('en-GB');
    
    //       const formattedDates = startFormatted === endFormatted ? startFormatted : `${startFormatted} to ${endFormatted}`;
    
    //       return <span className="text-sm text-gray-900 font-normal">{formattedDates}</span>;
    //     } catch (error) {
    //       return <span className="text-sm text-gray-900 font-normal">Invalid Date</span>;
    //     }
    //   },
    //   meta: {
    //     className: 'min-w-[200px]',
    //     cellClassName: 'text-gray-800 font-normal',
    //   },
    // },           
    // {
    //   accessorKey: 'Start Time',
    //   header: 'Start Time',
    //   cell: ({ row }) => (
    //     <span className="text-sm text-gray-900 font-normal">{row.original.start_time}</span>
    //   ),
    //   meta: {
    //     className: 'min-w-[200px]',
    //     cellClassName: 'text-gray-800 font-normal',
    //   },
    // },
    // {
    //   accessorKey: 'End Time',
    //   header: 'End Time',
    //   cell: ({ row }) => (
    //     <span className="text-sm text-gray-900 font-normal">{row.original.end_time}</span>
    //   ),
    //   meta: {
    //     className: 'min-w-[200px]',
    //     cellClassName: 'text-gray-800 font-normal',
    //   },
    // },
    {
      accessorKey: 'Location',
      header: 'Location',
      cell: ({ row }) => (
        <span className="text-sm text-gray-900 font-normal">{row.original.location}</span>
      ),
      meta: {
        className: 'min-w-[200px]',
        cellClassName: 'text-gray-800 font-normal',
      },
    },
    {
      accessorKey: 'City',
      header: 'City',
      cell: ({ row }) => (
        <span className="text-sm text-gray-900 font-normal">{row.original.city}</span>
      ),
      meta: {
        className: 'min-w-[200px]',
        cellClassName: 'text-gray-800 font-normal',
      },
    },
    {
      accessorKey: 'State',
      header: 'State',
      cell: ({ row }) => (
        <span className="text-sm text-gray-900 font-normal">{row.original.state}</span>
      ),
      meta: {
        className: 'min-w-[200px]',
        cellClassName: 'text-gray-800 font-normal',
      },
    },
    {
      accessorKey: 'Country',
      header: 'Country',
      cell: ({ row }) => (
        <span className="text-sm text-gray-900 font-normal">{row.original.country}</span>
      ),
      meta: {
        className: 'min-w-[200px]',
        cellClassName: 'text-gray-800 font-normal',
      },
    },
    // {
    //   accessorKey: 'Prices',
    //   header: 'Prices',
    //   cell: ({ row }) => {
    //     const prices = JSON.parse(row.original.prices); // Parse the prices JSON string
    //     const formattedPrices = prices.join(','); // Join prices with a comma
    //     return <span className="text-sm text-gray-900 font-normal">{formattedPrices}</span>;
    //   },
    //   meta: {
    //     className: 'min-w-[200px]',
    //     cellClassName: 'text-gray-800 font-normal',
    //   },
    // },
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
                  onClick={() => handleEditVenue(row.original.id)}
                >
                  Edit
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => handleRemoveVenue(row.original)}
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

  // Filter venues based on search query
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = venues.filter(
      (venue) =>
        venue.title.toLowerCase().includes(lowercasedQuery) ||
        venue.location.toLowerCase().includes(lowercasedQuery) ||
        venue.city.toLowerCase().includes(lowercasedQuery) ||
        venue.state.toLowerCase().includes(lowercasedQuery) ||
        venue.country.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredVenues(filtered);
  }, [searchQuery, venues]);

  // Add effect to monitor filteredVenues change to debug re-render
  useEffect(() => {
  }, [filteredVenues]);

  return (
    <div className="card card-grid min-w-full">
      <div className="card-header flex-wrap gap-2">
        <h3 className="card-title font-medium text-sm">Venue List</h3>
        <div className="flex flex-wrap gap-2 lg:gap-5">
          <div className="flex">
            <label className="input input-sm">
              <KeenIcon icon="magnifier" />
              <input
                placeholder="Search venue"
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
            key={filteredVenues.length}
            columns={columns}
            data={filteredVenues}
            rowSelect={true}
            pagination={{ size: 10 }}
          />
        )}
      </div>
    </div>
  );
};

export { Venue };