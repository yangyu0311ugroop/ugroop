import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import UGMarketingLink from 'containers/Marketing/Components/Link';
import Grid from '@material-ui/core/Grid';
import NaviLists from 'components/NavBar/naviLists';
import NaviItem from 'components/NavBar/naviItem';
import { AuthLinks, UnAuthLinks } from '../navbar_authcontrol';

export const stylesheet = {
  root: {
    alignSelf: 'center',
  },
};

export const AuthControls = ({ isAuthenticated, classes }) => {
  let items = [];
  if (isAuthenticated) {
    items = UnAuthLinks.map(link => (
      <UGMarketingLink to={link.route}>{link.text}</UGMarketingLink>
    ));
  } else {
    items = AuthLinks.map(link => {
      if (link.route === '/registration') {
        return <UGMarketingLink to={link.route}>{link.text}</UGMarketingLink>;
      }
      return (
        <UGMarketingLink isButton outline="orange" to={link.route}>
          {link.text}
        </UGMarketingLink>
      );
    });
  }

  return (
    <Grid key="Login Controls" item className={classes.root}>
      <NaviLists component={NaviItem} items={items} />
    </Grid>
  );
};

AuthControls.propTypes = {
  isAuthenticated: PropTypes.bool,
  classes: PropTypes.object,
};
AuthControls.defaultProps = {};

export default withStyles(stylesheet, { name: 'AuthControls' })(AuthControls);
