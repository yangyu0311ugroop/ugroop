import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { compose } from 'redux';
import { NameUtility } from 'utils/displayNameUtility';
import resaga from 'resaga';
import { CONFIG } from './config';
import Name from '../../../../../ugcomponents/Person/Name';
import FontWeightWithText from '../../../../../ugcomponents/FontWeightWithText';
export class NotificationContent extends PureComponent {
  stripDisplayUserName = () => {
    const { firstName, lastName, knownAs, email, content } = this.props;
    const name = NameUtility.userDisplayName({
      firstName,
      lastName,
      knownAs,
      email,
    });
    let output = content;
    if (_.startsWith(content, name, 0)) {
      output = _.replace(content, `${name} `, '');
    }
    return output;
  };

  showUser = () => {
    const {
      id,
      status,
      content,
      firstName,
      lastName,
      knownAs,
      email,
      method,
    } = this.props;
    const name = NameUtility.userDisplayName({
      firstName,
      lastName,
      knownAs,
      email,
    });
    if (
      method === 'tourInvitation' ||
      method === 'changeTourRole' ||
      method === 'changeOrgRole'
    ) {
      if (!_.startsWith(content, name, 0)) {
        return '';
      }
    }
    return (
      <>
        <Name id={id} bold={status !== 'read'} />
        &nbsp;
      </>
    );
  };

  render = () => {
    const { status, simple } = this.props;

    return (
      <>
        {this.showUser()}
        {simple ? (
          this.stripDisplayUserName()
        ) : (
          <FontWeightWithText
            fontWeight={status !== 'read' ? 600 : 0}
            content={this.stripDisplayUserName()}
          />
        )}
      </>
    );
  };
}

NotificationContent.propTypes = {
  // parent props
  status: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  method: PropTypes.string.isRequired,
  simple: PropTypes.bool,
  // resaga props
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  knownAs: PropTypes.string,
  email: PropTypes.string,
};

NotificationContent.defaultProps = {};

export default compose(resaga(CONFIG))(NotificationContent);
