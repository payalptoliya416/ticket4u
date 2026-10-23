import { Fragment } from 'react';

import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle
} from '@/partials/toolbar';

import { useLayout } from '@/providers'; 
import { Link } from 'react-router-dom';
import HeroSectionTableContent from './HeroSectionTableContent';

const HeroSecPage = () => {
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
                </div>
              </ToolbarDescription>
            </ToolbarHeading>
            {/* <ToolbarActions>
          
              <Link to="/add-herosection" className="btn btn-sm btn-primary">
                Add Herosection
              </Link>
            </ToolbarActions> */}
          </Toolbar>
        </Container>
      )}

      <Container>
        <HeroSectionTableContent />
      </Container>
    </Fragment>
  );
};

export { HeroSecPage };
