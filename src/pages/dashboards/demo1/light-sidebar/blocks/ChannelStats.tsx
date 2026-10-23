import { Fragment, useState, useEffect } from 'react';

interface IChannelStatsItem {
  logo: string;
  logoDark?: string;
  info: string;
  desc: string;
  path: string;
}

const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;
export const GET_Dashboard_Stats_API = `${ADMIN_API_URL}/admin/dashboardStats`;

const ChannelStats = () => {
  const [items, setItems] = useState<IChannelStatsItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch(`${GET_Dashboard_Stats_API}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();

        if (result.status === 'success') {
          const data = result.data;
          const formattedItems: IChannelStatsItem[] = [
            { logo: 'presentation.svg', logoDark: 'tiktok-dark.svg', info: data.totalEvent, desc: 'Total Events', path: '' },
            { logo: 'published_icon.svg', info: data.totalPublishedEvent, desc: 'Published Events', path: '' },
            { logo: 'upcoming.svg', info: data.upcomingEventCount, desc: 'Upcoming Events', path: '' },
            { logo: 'active-user.svg', info: data.totalActivity, desc: 'Total Activities', path: '' },
            { logo: 'marketing.svg', info: data.totalPublishedActivity, desc: 'Published Activities', path: '' },
            { logo: 'time-management.svg', info: data.totalActiveOrganizers, desc: 'Active Organizers', path: '' }
          ];
          setItems(formattedItems);
        } else {
          console.error('Failed to fetch dashboard stats:', result.message);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on component mount.

  const renderItem = (item: IChannelStatsItem, index: number) => (
    <div
      key={index}
      className="card flex flex-col justify-between gap-6 h-full bg-cover bg-no-repeat channel-stats-bg"
    >
      {item.logoDark ? (
        <>
          <img
            src={`/media/app/${item.logo}`}
            className="dark:hidden w-12 mt-4 ms-5"
            alt=""
          />
          <img
            src={`/media/brand-logos/${item.logoDark}`}
            className="light:hidden w-12 mt-4 ms-5"
            alt=""
          />
        </>
      ) : (
        <img
          src={`/media/app/${item.logo}`}
          className="w-12 mt-4 ms-5"
          alt=""
        />
      )}

      <div className="flex flex-col gap-1 pb-4 px-5">
        <span className="text-3xl font-semibold text-gray-900">{item.info}</span>
        <span className="text-2sm font-normal text-gray-700">{item.desc}</span>
      </div>
    </div>
  );

  return (
    <Fragment>
      <style>
        {`
          .channel-stats-bg {
            background-image: url('/media/images/2600x1600/bg-3.png');
          }
          .dark .channel-stats-bg {
            background-image: url('/media/images/2600x1600/bg-3-dark.png');
          }
        `}
      </style>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 w-full">
        {items.map((item, index) => renderItem(item, index))}
      </div>
    </Fragment>
  );
};

export { ChannelStats, type IChannelStatsItem };
