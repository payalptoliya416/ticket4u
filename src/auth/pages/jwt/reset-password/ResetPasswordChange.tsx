import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/container';
import { Toolbar, ToolbarDescription, ToolbarHeading, ToolbarPageTitle } from '@/partials/toolbar';
import { PageNavbar } from '@/pages/account';
import { ModalChangePassword } from '@/partials/modals/change-password';
import { DefaultPage } from '@/pages/dashboards';

const ResetPasswordChange = () => {
  const [profileModalOpen, setProfileModalOpen] = useState(true);
  const handleClose = () => {
    setProfileModalOpen(false);
  };

  return (
    <Fragment>
      <PageNavbar />
      <Container>
        <DefaultPage />
        <ModalChangePassword open={profileModalOpen} onClose={handleClose} />
      </Container>
    </Fragment>
  );
};

export { ResetPasswordChange };
