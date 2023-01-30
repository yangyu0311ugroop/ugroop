import { DEFAULT } from 'appConstants';
import { omit } from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { JOIN_ORGANISATION, SHARE_NODE } from 'utils/modelConstants';
import { CONFIG } from './config';
import JoinOrganisation from './types/JoinOrganisation';
import ShareNode from './types/ShareNode';

export class Notification extends PureComponent {
  ownProps = () => omit(this.props, ['resaga', 'type']);

  renderJoinOrganisation = () => <JoinOrganisation {...this.ownProps()} />;

  renderShareNode = () => <ShareNode {...this.ownProps()} />;

  renderNotSupported = () => null;

  render = () => {
    const { id, type } = this.props;

    if (!id) {
      return null;
    }

    // pass in your custom variant if you need a different UI rendering
    return LOGIC_HELPERS.switchCase(type, {
      [JOIN_ORGANISATION]: this.renderJoinOrganisation,
      [SHARE_NODE]: this.renderShareNode,
      [DEFAULT]: this.renderNotSupported,
    });
  };
}

Notification.propTypes = {
  // parent props
  id: PropTypes.string, // token
  variant: PropTypes.string,
  ignore: PropTypes.array,

  // resaga props
  type: PropTypes.string,
};

Notification.defaultProps = {
  id: '',
  variant: '',
  ignore: [],

  type: '',
};

export default compose(resaga(CONFIG))(Notification);
