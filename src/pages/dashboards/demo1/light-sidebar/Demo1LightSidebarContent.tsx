import {
  ChannelStats,
  EarningsChart,
  EntryCallout,
  Highlights,
  TeamMeeting,
  // Teams
} from './blocks';

const Demo1LightSidebarContent = () => {
  return (
    <div className="grid gap-5 lg:gap-7.5">
      {/* Full-width ChannelStats row */}
      <div className="w-full">
        <ChannelStats />
      </div>

      {/* Additional components */}
      <div className="grid lg:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
        <div className="lg:col-span-1">
          <Highlights limit={3} />
        </div>

        <div className="lg:col-span-2">
          <EarningsChart />
        </div>
      </div>

      {/* <div className="grid lg:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
        <div className="lg:col-span-1">
          <TeamMeeting />
        </div>

        <div className="lg:col-span-2">
          <Teams /> 
        </div>
      </div> */}
    </div>
  );
};

export { Demo1LightSidebarContent };
