import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container } from '@/components/container';
import { Toolbar, ToolbarActions, ToolbarPageTitle } from '@/partials/toolbar';
import { SeatsioEventManager } from '@seatsio/seatsio-react';
import { DataGrid, KeenIcon } from '@/components';
import { ColumnDef } from '@tanstack/react-table';

const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;
export const GET_EVENT_DETAIL_API = `${ADMIN_API_URL}/admin/eventDetailList`;

interface EventDetailData {
  id: number;
  venue_id: number;
  event_id: number;
  user_id: number;
  eventKey: string;
  date: string;
  start_time: string;
  end_time: string;
  entryID: string;
  created_at: string;
  updated_at: string;
}

interface Venue {
  venue_id: number;
  venue_title: string;
  events: EventDetailData[];
}

interface statusChangeData {
  objectLabel: string;
  status: string;
  date: string;
  quantity: string;
}

interface EventStats {
  available: {
    count: number;
  };
  booked: {
    count: number;
  };
  not_for_sale: {
    count: number;
  };
  disabled_by_social_distancing: {
    count: number;
  };
  reservedByToken: {
    count: number;
  };
}

const EventDetail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventID } = location.state || {};

  const [venueDetails, setVenueDetails] = useState<Venue[]>([]);
  const [activeVenue, setActiveVenue] = useState<Venue | null>(null);
  const [activeEventKey, setActiveEventKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openVenue, setOpenVenue] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'statuses' | 'forsale' | 'categories' | 'statuschanges'>('statuses');
  const [statusChanges, setStatusChanges] = useState<statusChangeData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredStatusChange, setFilteredStatusChange] = useState<statusChangeData[]>([]);
  const [eventStats, setEventStats] = useState<EventStats | null>(null);


  useEffect(() => {
    if (!eventID) {
      navigate('/Venues-table/Venues-list');
      return;
    }

    const fetchEventDetails = async (id: number) => {
      const authToken = localStorage.getItem('authToken');
      try {
        const response = await fetch(`${GET_EVENT_DETAIL_API}/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch event details');
        }

        const data = await response.json();
        if (data.status === 'success') {
          setVenueDetails(data.data);
          const firstVenue = data.data[0];
          if (firstVenue) {
            setActiveVenue(firstVenue);
            setActiveEventKey(firstVenue.events[0]?.eventKey || null);
            setOpenVenue(firstVenue.venue_id);
          }
        } else {
          setError('Failed to load event details');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails(eventID);
  }, [eventID, navigate]);

  useEffect(() => {
    const fetchStatusChanges = async () => {
      if (!activeEventKey) return;
      const region = 'eu';
      const secretKey = '8849088d-bd0c-46b3-991a-b7640b49cc1d';
      const url = `https://api-${region}.seatsio.net/events/${activeEventKey}/status-changes`;
      const headers = {
        Authorization: `Basic ${btoa(secretKey + ':')}`,
      };

        try {
          const response = await fetch(url, { headers });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setStatusChanges(data.items);
        } catch (err) {
          // setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchStatusChanges();
  }, [activeEventKey]);

  useEffect(() => {
    const fetchEventStats = async () => {
      if (!activeEventKey) return;
      const region = 'eu';
      const secretKey = '8849088d-bd0c-46b3-991a-b7640b49cc1d';
      const url = `https://api-${region}.seatsio.net/reports/events/${activeEventKey}/byAvailabilityReason/summary`;
      const headers = {
        Authorization: `Basic ${btoa(secretKey + ':')}`,
      };

        try {
          const response = await fetch(url, { headers });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();  
          setEventStats(data);
        } catch (err) {
          // setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchEventStats();
  }, [activeEventKey]);

  const handleVenueClick = (venue: Venue) => {
    setActiveVenue(venue);
    setActiveEventKey(venue.events[0]?.eventKey || null);
    setOpenVenue(venue.venue_id);
  };

  const handleEventClick = (eventKey: string) => {
    setActiveEventKey(eventKey);
  };

  const columns = useMemo<ColumnDef<statusChangeData>[]>(() => [
    {
      accessorKey: 'objectLabel',
      header: 'Object',
      cell: ({ row }) => (
        <span>{row.original.objectLabel}</span>
      ),
      meta: {
        className: 'min-w-[200px]',
        cellClassName: 'text-gray-800 font-normal',
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className="text-sm text-gray-900 font-normal">{row.original.status}</span>
      ),
      meta: {
        className: 'min-w-[150px]',
        cellClassName: 'text-gray-800 font-normal',
      },
    },
    {
      accessorKey: 'quantity',
      header: 'Qty',
      cell: ({ row }) => (
        <span className="text-sm text-gray-900 font-normal">{row.original.quantity}</span>
      ),
      meta: {
        className: 'min-w-[100px]',
        cellClassName: 'text-gray-800 font-normal',
      },
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => (
        <span className="text-sm text-gray-900 font-normal">
          {new Date(row.original.date).toLocaleString()}
        </span>
      ),
      meta: {
        className: 'min-w-[250px]',
        cellClassName: 'text-gray-800 font-normal',
      },
    },
  ], []);

  useEffect(() => {
      const lowercasedQuery = searchQuery.toLowerCase();

      const filtered = statusChanges.filter(
        (user) =>
          user.objectLabel.toLowerCase().includes(lowercasedQuery) ||
          user.status.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredStatusChange(filtered);
    }, [searchQuery, statusChanges]);

    useEffect(() => {
      }, [filteredStatusChange]);

      useEffect(() => {
        if (eventStats) {
          const totalCapacity = eventStats.available.count + eventStats.booked.count + eventStats.not_for_sale.count;
          const bookedPercentage = (eventStats.booked.count / totalCapacity) * 100;
          const totalbooked = eventStats.booked.count;
          const notForSalePercentage = (eventStats.not_for_sale.count / totalCapacity) * 100;
          const totalForSale = eventStats.not_for_sale.count;
          const availablePercentage = (eventStats.available.count / totalCapacity) * 100;
        }
      }, [eventStats]);
      
  return (
    <React.Fragment>
      <Toolbar>
        <Container>
          <div className="flex justify-between items-center">
            <ToolbarPageTitle text="Event Details" />
            <ToolbarActions>
              <button
                className="btn btn-secondary"
                onClick={() => navigate('/event-table/event-list')}
              >
                Back to Event List
              </button>
            </ToolbarActions>
          </div>
          {/* <div class="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
              <div class="h-6 bg-blue-600 rounded-full dark:bg-blue-500" style="width: 45%"></div>
          </div> */}
        </Container>
      </Toolbar>

      <Container>
        {loading && <p>Loading event details...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && venueDetails && (
          <div className="flex">
            <div className="w-1/4 bg-gray-100 p-4 rounded-l-lg">
              <div className="flex flex-col space-y-2">
                {venueDetails.map((venue) => (
                  <div key={venue.venue_id}>
                    <button
                      className={`px-4 py-2 text-sm font-medium text-left rounded-lg hover:bg-blue-500 hover:text-white w-full text-left ${
                        activeVenue?.venue_id === venue.venue_id ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                      }`}
                      onClick={() => handleVenueClick(venue)}
                    >
                      {venue.venue_title}
                    </button>
                    {openVenue === venue.venue_id && (
                      <div className="ml-4 mt-2 space-y-1">
                        {venue.events.map((event) => (
                          <button
                            key={event.eventKey}
                            className={`px-4 py-2 text-sm font-medium text-left rounded-lg hover:bg-green-500 hover:text-white w-full text-left ${
                              activeEventKey === event.eventKey
                                ? 'bg-green-500 text-white'
                                : 'bg-white text-gray-700'
                            }`}
                            onClick={() => handleEventClick(event.eventKey)}
                          >
                            {event.eventKey}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-3/4 p-4 bg-white rounded-r-lg shadow-md">
              {activeVenue && activeEventKey && (
                <div>
                  <div className="mb-4 flex">
                    <button
                      className={`px-4 py-2 mr-2 text-sm font-medium rounded-lg ${
                        activeTab === 'statuses' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                      }`}
                      onClick={() => setActiveTab('statuses')}
                    >
                      Statuses
                    </button>
                    <button
                      className={`px-4 py-2 mr-2 text-sm font-medium rounded-lg ${
                        activeTab === 'forsale' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
                      }`}
                      onClick={() => setActiveTab('forsale')}
                    >
                      For Sale
                    </button>
                    <button
                      className={`px-4 py-2 mr-2 text-sm font-medium rounded-lg ${
                        activeTab === 'categories' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                      }`}
                      onClick={() => setActiveTab('categories')}
                    >
                      Categories
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium rounded-lg ${
                        activeTab === 'statuschanges' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                      }`}
                      onClick={() => setActiveTab('statuschanges')}
                    >
                      Status Changes
                    </button>
                  </div>

                  <div style={{ height: '500px', overflowY: 'auto' }}>
                    {activeTab === 'statuses' && (
                      <SeatsioEventManager
                        secretKey="8849088d-bd0c-46b3-991a-b7640b49cc1d"
                        event={activeEventKey}
                        mode="manageObjectStatuses"
                        region="eu"
                      />
                    )}
                    {activeTab === 'forsale' && (
                      <SeatsioEventManager
                        secretKey="8849088d-bd0c-46b3-991a-b7640b49cc1d"
                        event={activeEventKey}
                        mode="manageForSaleConfig"
                        region="eu"
                      />
                    )}
                    {activeTab === 'categories' && (
                      <SeatsioEventManager
                        secretKey="8849088d-bd0c-46b3-991a-b7640b49cc1d"
                        event={activeEventKey}
                        mode="manageCategories"
                        region="eu"
                      />
                    )}
                    {activeTab === 'statuschanges' && (
                      <div className="card card-grid min-w-full">
                        <div className="card-header flex-wrap gap-2">
                          <div className="flex flex-wrap gap-2 lg:gap-5">
                            <div className="flex">
                              <label className="input input-sm">
                                <KeenIcon icon="magnifier" />
                                <input
                                  placeholder="Search..."
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
                              key={filteredStatusChange.length}
                              columns={columns}
                              data={filteredStatusChange}
                              rowSelect={true}
                              pagination={{ size: 10 }}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </React.Fragment>
  );
};

export { EventDetail };