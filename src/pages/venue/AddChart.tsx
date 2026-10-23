import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container } from '@/components/container';
import { Toolbar, ToolbarActions, ToolbarPageTitle } from '@/partials/toolbar';
import { SeatsioDesigner } from '@seatsio/seatsio-react';

interface Chart {
  key: string;
  name: string;
}

const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;
export const Update_Venue_Chart_API = `${ADMIN_API_URL}/admin/updateChartKey`;

const AddChart: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditMode, setIsEditMode] = useState(false);
  const { venueID, chartKey } = location.state || {};

  const [charts, setCharts] = useState<Chart[]>([]);
  const [selectedChart, setSelectedChart] = useState<string>('');
  const [newChartKey, setNewChartKey] = useState<string>('');

  useEffect(() => {
    if (!venueID) {
      navigate('/Venues-table/Venues-list');
    }

    if (chartKey) {
      setIsEditMode(true);
      setSelectedChart(chartKey);
    }

    const fetchCharts = async () => {
      try {
        const region = 'eu';
        const secretKey = '8849088d-bd0c-46b3-991a-b7640b49cc1d';
        const response = await fetch(`https://api-${region}.seatsio.net/charts`, {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${btoa(`${secretKey}:`)}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching charts: ${response.statusText}`);
        }

        const data = await response.json();
        setCharts(data.items); 
      } catch (error) {
        console.error('Failed to fetch charts:', error);
      }
    };

    fetchCharts();
  }, [venueID, navigate]);

  // Handle chart selection
  const handleChartSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChart(event.target.value); // Set selected chart key
  };

  // Handle new chart creation and get the new chart key from SeatsioDesigner
  const handleChartCreated = (chartKey: string) => {
    setNewChartKey(chartKey); // Store the new chart key
  };

  const handleChartSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let chartKeyToSend = selectedChart || newChartKey;
    
    if (!chartKeyToSend) {
      console.log('Please select or create a chart!');
      return;
    }
    
    try {
      const authToken = localStorage.getItem('authToken');
      const url = `${Update_Venue_Chart_API}/${venueID}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
        body: JSON.stringify({
          chart_key: chartKeyToSend,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit chart');
      }
      navigate('/Venues-table/Venues-list');
    } catch (error) {
        navigate('/Venues-table/Venues-list');
    }
  };

  return (
    <React.Fragment>
      <Toolbar>
        <Container>
          <div className="flex justify-between items-center">
            <ToolbarPageTitle text={isEditMode ? 'Update Chart' : 'Add Chart'} />
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
        <form onSubmit={handleChartSubmit}>
          {/* Dropdown for Chart Selection */}
          <div className="flex items-center space-x-4">
            <div className="w-80">
              <label className="block mb-2 text-sm font-medium text-gray-900">Select a Chart:</label>
              <select
                id="chartSelect"
                name="chartSelect"
                value={selectedChart}
                onChange={handleChartSelection}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">New Chart</option>
                {charts.map((chart) => (
                  <option key={chart.key} value={chart.key}>
                    {chart.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-48 mt-6">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
              >
                {isEditMode ? 'Update' : 'Submit'}
              </button>
            </div>
          </div>

          {/* Seatsio Designer for creating a new chart */}
          <div className="mt-6" style={{ height: '700px' }}>
            <SeatsioDesigner
              secretKey="8849088d-bd0c-46b3-991a-b7640b49cc1d"
              region="eu"
              chartKey={selectedChart || newChartKey}
              onChartCreated={handleChartCreated}
            />
          </div>
        </form>
      </Container>
    </React.Fragment>
  );
};

export { AddChart };