import { DEFAULT } from 'appConstants';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Container from 'components/Container';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { PERSON_TAB_ITEM_KEYS } from 'containers/Profile/constants';
import { parseQueryParam } from 'utils/helpers/url';

import DocumentTab from './components/Documents';
import PassportTab from './components/Passports';
import PasswordTab from './components/Password';
import RolesTab from './components/Roles';
import Preferences from './components/Preferences';
import ProfileTab from './components/Profile';
import BillingTab from './components/Billing';

export class Content extends PureComponent {
  renderPasswordTab = () => <PasswordTab id={this.props.userId} />;

  renderRolesTab = () => <RolesTab id={this.props.userId} />;

  renderPreferencesTab = () => <Preferences id={this.props.userId} />;

  renderDocumentTab = () => <DocumentTab id={this.props.userId} />;

  renderPassportTab = () => <PassportTab id={this.props.userId} />;

  renderProfileTab = () => <ProfileTab id={this.props.userId} />;

  renderBillingTab = () => <BillingTab userId={this.props.userId} />;

  render = () => {
    const { location } = this.props;

    const parsedSearch = parseQueryParam(location.search);

    const content = LOGIC_HELPERS.switchCase(parsedSearch.tab, {
      [PERSON_TAB_ITEM_KEYS.PROFILE]: this.renderProfileTab,
      [PERSON_TAB_ITEM_KEYS.DOCUMENTS]: this.renderDocumentTab,
      [PERSON_TAB_ITEM_KEYS.PASSPORT]: this.renderPassportTab,
      [PERSON_TAB_ITEM_KEYS.CHANGE_PASSWORD]: this.renderPasswordTab,
      [PERSON_TAB_ITEM_KEYS.ROLES]: this.renderRolesTab,
      [PERSON_TAB_ITEM_KEYS.PREFERENCES]: this.renderPreferencesTab,
      [PERSON_TAB_ITEM_KEYS.BILLING]: this.renderBillingTab,
      [DEFAULT]: this.renderProfileTab,
    });

    return <Container padding={false}>{content}</Container>;
  };
}

Content.propTypes = {
  // hoc props
  location: PropTypes.object,

  // parent props
  userId: PropTypes.number.isRequired,

  // resaga props
};

Content.defaultProps = {
  location: {},
};

export default compose(withRouter)(Content);
