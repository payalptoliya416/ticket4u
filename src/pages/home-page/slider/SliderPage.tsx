import { Fragment } from 'react';

import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle
} from '@/partials/toolbar';

import { SliderTableContent } from '.';
import { useLayout } from '@/providers'; 
import { Link } from 'react-router-dom';

const SliderPage = () => {
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
              <Link to="/add-slider" className="btn btn-sm btn-primary">
                Add Slider
              </Link>
            </ToolbarActions>
          </Toolbar>
        </Container>
      )}

      <Container>
        <SliderTableContent />
      </Container>
    </Fragment>
  );
};

export { SliderPage };
