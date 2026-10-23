import { Organiser } from './blocks/organiser';
import { MiscFaq, MiscHelp2 } from '@/partials/misc';

const OrganiserTableContent = () => {
  return (
    <div className="grid gap-5 lg:gap-7.5">
      <Organiser />

      {/* <MiscFaq /> */}

      {/* <MiscHelp2 /> */}
    </div>
  );
};

export { OrganiserTableContent };