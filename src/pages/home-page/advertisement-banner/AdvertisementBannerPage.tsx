import { Fragment } from 'react';

import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle
} from '@/partials/toolbar';

import { AdvertisementBannerTableContent } from '.';
import { useLayout } from '@/providers'; 
import { Link } from 'react-router-dom';

const AdvertisementBannerPage = () => {
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
            <ToolbarActions>
              {/* <a href="#" className="btn btn-sm btn-light">
                Import CSV
              </a> */}
              <Link to="/add-advertisement-banner" className="btn btn-sm btn-primary">
                Add Advertisement Banner
              </Link>
            </ToolbarActions>
          </Toolbar>
        </Container>
      )}

      <Container>
        <AdvertisementBannerTableContent />
      </Container>
    </Fragment>
  );
};

export { AdvertisementBannerPage };
