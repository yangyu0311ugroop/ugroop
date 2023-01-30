import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import _ from 'lodash';
import resaga from 'resaga';
import { FormattedMessage as M } from 'react-intl';
import { CONFIRMED } from 'datastore/invitationStore/constants';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import { H5 } from 'viewComponents/Typography';
import {
  CreatedAt,
  ShareFrom,
  ShareToUserId,
} from 'smartComponents/Invitation/Share/parts';
import m from './messages';
import { CONFIG } from './config';

export class ShareDetail extends React.PureComponent {
  getToken = () => {
    const { shareTokens } = this.props;
    return _.first(shareTokens);
  };

  renderSharePart = (Component, variant, props = {}) => (
    <Component id={this.getToken()} variant={variant} {...props} />
  );

  render = () => (
    <H5 dense>
      <M
        {...m.description}
        values={{
          to: this.renderSharePart(ShareToUserId),
          from: this.renderSharePart(ShareFrom),
          at: this.renderSharePart(CreatedAt),
        }}
      />
    </H5>
  );
}

ShareDetail.propTypes = {
  // hoc
  shareTokens: PropTypes.array,

  // parent
  id: PropTypes.number,
};

ShareDetail.defaultProps = {
  shareTokens: [],

  id: null,
};

export default compose(
  resaga(CONFIG),
  INVITATION_STORE_HOC.selectShareTokens({
    shareToUserIds: 'userId',
    nodeIds: 'nodeId',
    statuses: [CONFIRMED],
  }),
)(ShareDetail);
