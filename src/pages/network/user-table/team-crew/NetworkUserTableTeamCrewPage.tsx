import { Fragment } from 'react';

import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle
} from '@/partials/toolbar';

import { NetworkUserTableTeamCrewContent } from '.';
import { useLayout } from '@/providers'; 
import { Link } from 'react-router-dom';

const NetworkUserTableTeamCrewPage = () => {
  const { currentLayout } = useLayout ();

  return (
    <Fragment>
      {currentLayout?.name === 'demo1-layout' && (
        <Container>
          <Toolbar>
            <ToolbarHeading>
              <ToolbarPageTitle />
              <ToolbarDescription>
                <div className="flex items-center flex-wrap gap-1.5 font-medium">
                  {/* <span className="text-md text-gray-700">All Members:</span> */}
                  {/* <span className="text-md text-gray-800 font-medium me-2">49,053</span> */}
                  {/* <span className="text-md text-gray-700">Pro Licenses</span> */}
                  {/* <span className="text-md text-gray-800 font-medium">724</span> */}
                </div>
              </ToolbarDescription>
            </ToolbarHeading>
            <ToolbarActions>
              {/* <a href="#" className="btn btn-sm btn-light">
                Import CSV
              </a> */}
              <Link to="/add-user" className="btn btn-sm btn-primary">
                Add User
              </Link>
            </ToolbarActions>
          </Toolbar>
        </Container>
      )}

      <Container>
        <NetworkUserTableTeamCrewContent />
      </Container>
    </Fragment>
  );
};

export { NetworkUserTableTeamCrewPage };
