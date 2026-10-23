import { Fragment } from 'react';

import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle
} from '@/partials/toolbar';

import { EventDetailBannerTableContent } from '.';
import { useLayout } from '@/providers'; 
import { Link } from 'react-router-dom';

const EventDetailBannerPage = () => {
  const { currentLayout } = useLayout ();

  return (
    <Fragment>
      {currentLayout?.name === 'demo1-layout' && (
        <Container>
          <Toolbar>
            <ToolbarHeading>
              <ToolbarPageTitle />
              <ToolbarDescription>
                <div className="flex items-center flex-wrap gap-1.5 font-medium"></div>
              </ToolbarDescription>
            </ToolbarHeading>
            {/* <ToolbarActions>
              <a href="#" className="btn btn-sm btn-light">
                Import CSV
              </a>
              <Link to="/add-event-detail-banner" className="btn btn-sm btn-primary">
                Add Event Detials Banner
              </Link>
            </ToolbarActions> */}
          </Toolbar>
        </Container>
      )}

      <Container>
        <EventDetailBannerTableContent />
      </Container>
    </Fragment>
  );
};

export { EventDetailBannerPage };
