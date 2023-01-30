import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import UGMarketingLink from 'containers/Marketing/Components/Link';
import Grid from '@material-ui/core/Grid';
import NaviLists from 'components/NavBar/naviLists';
import NaviItem from 'components/NavBar/naviItem';
import { LINKS } from '../navbar_marketcontrol';

export const stylesheet = {
  root: {
    alignSelf: 'center',
  },
};

export const MarketingControls = ({ classes }) => {
  const items = LINKS.map(link => (
    <UGMarketingLink key={link.route} to={link.route}>
      {link.text}
    </UGMarketingLink>
  ));
  return (
    <Grid key="Marketing Controls" item className={classes.root}>
      <NaviLists component={NaviItem} items={items} />
    </Grid>
  );
};

MarketingControls.propTypes = {
  classes: PropTypes.object,
};
MarketingControls.defaultProps = {};

export default withStyles(stylesheet, { name: 'MarketingControls' })(
  MarketingControls,
);
