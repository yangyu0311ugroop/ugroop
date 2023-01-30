import { DEFAULT } from 'appConstants';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { withRouter } from 'react-router-dom';
import Container from 'components/Container';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { ORGANISATION_TAB_ITEM_KEYS } from 'containers/Profile/constants';
import People from 'containers/Organisations/components/People';
import { parseQueryParam } from 'utils/helpers/url';
import ProfileTab from './components/Profile';
import School from './components/School';
import Preferences from './components/Preferences';
import Billing from './components/Billing';
import { CONFIG } from './config';

export class Content extends PureComponent {
  renderPreferencesTab = () => <Preferences id={this.props.id} />;

  renderRolesTab = () => (
    <People id={this.props.id} showHeader userId={this.props.userId} />
  );

  renderSchoolTab = () => <School id={this.props.id} />;

  renderProfileTab = () => <ProfileTab id={this.props.id} />;

  renderBillingTab = () => (
    <Billing id={this.props.id} userId={this.props.userId} />
  );

  render = () => {
    const { location } = this.props;

    const parsedSearch = parseQueryParam(location.search);

    const content = LOGIC_HELPERS.switchCase(parsedSearch.tab, {
      [ORGANISATION_TAB_ITEM_KEYS.PROFILE]: this.renderProfileTab,
      [ORGANISATION_TAB_ITEM_KEYS.SCHOOL]: this.renderSchoolTab,
      [ORGANISATION_TAB_ITEM_KEYS.ROLES]: this.renderRolesTab,
      [ORGANISATION_TAB_ITEM_KEYS.PREFERENCES]: this.renderPreferencesTab,
      [ORGANISATION_TAB_ITEM_KEYS.SUBSCRIPTION]: this.renderBillingTab,
      [DEFAULT]: this.renderProfileTab,
    });

    return <Container>{content}</Container>;
  };
}

Content.propTypes = {
  // hoc props
  location: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number.isRequired,
  userId: PropTypes.number,
  // resaga props
};

Content.defaultProps = {};

export default compose(
  withRouter,
  resaga(CONFIG),
)(Content);
