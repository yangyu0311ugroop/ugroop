import {
  TAB_ITEMS_PERSON,
  DEFAULT_PERSON_TAB_INDEX,
} from 'containers/Profile/constants';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { stringifyParam, parseQueryParam } from 'utils/helpers/url';
import { withRouter } from 'react-router-dom';
import Button from 'viewComponents/Button';

import { withStyles } from '@material-ui/core';
import { VARIANTS } from 'variantsConstants';
import GridItem from 'components/GridItem';
import { URL_HELPERS } from 'appConstants';
import OrganisationList from 'smartComponents/Users/components/OrganisationList';
import styles from './styles';

export class ProfileTabHeader extends PureComponent {
  handleTabChange = item => () => {
    const { history, location } = this.props;
    const index = item.id;
    const parsedParams = parseQueryParam(location.search);

    parsedParams.tab = index;

    const stringified = stringifyParam(parsedParams);
    history.push(`${location.pathname}?${stringified}`);
  };

  renderOrgRole = () => {
    const { classes } = this.props;
    return (
      <>
        <GridItem xs={6} sm={6} md={12} className={classes.orgHeaderTitle}>
          Organisation Settings
        </GridItem>
        <GridItem xs={6} sm={6} md={12}>
          <OrganisationList
            overlay
            canCreate={false}
            redirectToUrl={URL_HELPERS.orgSettings}
            excludeOrg={[-1]}
          />
        </GridItem>
      </>
    );
  };

  renderPersonalItems = () => {
    const { location, classes } = this.props;
    const parsedUrl = parseQueryParam(location.search);
    const activeLink = Number(parsedUrl.tab) || DEFAULT_PERSON_TAB_INDEX;
    return TAB_ITEMS_PERSON.map(item => (
      <GridItem xs={6} sm={6} md={12} key={item.id}>
        <Button
          onClick={this.handleTabChange(item)}
          variant={VARIANTS.INLINE}
          dense
          className={activeLink === item.id ? classes.active : classes.link}
        >
          {item.label}
        </Button>
      </GridItem>
    ));
  };

  renderPersonal = () => {
    const { classes } = this.props;
    return (
      <>
        <GridItem xs={6} sm={6} md={12} className={classes.personalHeaderTitle}>
          Personal Settings
        </GridItem>
        {this.renderPersonalItems()}
      </>
    );
  };

  render = () => (
    <>
      {this.renderPersonal()}
      {this.renderOrgRole()}
    </>
  );
}

ProfileTabHeader.propTypes = {
  // hoc props
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  // parent props
};

ProfileTabHeader.defaultProps = {};

export default compose(
  withRouter,
  withStyles(styles, { name: 'ProfileTabHeader' }),
)(ProfileTabHeader);
