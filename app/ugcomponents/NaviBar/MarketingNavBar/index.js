import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withAuthenticated } from 'smartComponents/Authentication/hoc';
import NavBar from 'components/NavBar/index';
import NavLogo from 'components/NavBar/naviLogo';
import Grid from '@material-ui/core/Grid';
import Container from 'components/Container';
import MarketingControls from './MarketingControls';
import AuthControls from './AuthControls';

export function MarketingNavBar({ authenticated }) {
  return (
    <Container>
      <NavBar justify="space-between">
        <MarketingControls />
        <Grid key="Logo" item>
          <NavLogo link="/" />
        </Grid>
        <AuthControls isAuthenticated={authenticated} />
      </NavBar>
    </Container>
  );
}

MarketingNavBar.propTypes = {
  // hoc
  authenticated: PropTypes.bool.isRequired,
};

export default compose(withAuthenticated)(MarketingNavBar);
