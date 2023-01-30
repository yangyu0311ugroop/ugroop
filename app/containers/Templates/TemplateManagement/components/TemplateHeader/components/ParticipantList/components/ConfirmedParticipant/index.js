import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { DEFAULT } from 'appConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { PARTICIPANT_LINKEE } from 'utils/modelConstants';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import { CONFIG_1, CONFIG_2 } from './config';

export class TemplateConfirmedParticipant extends React.PureComponent {
  renderProp = () => {
    const { children, nodeId } = this.props;
    return LOGIC_HELPERS.ifFunction(children, [nodeId]);
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderProp,
    });
  };
}

TemplateConfirmedParticipant.propTypes = {
  // parent
  variant: PropTypes.string,
  children: PropTypes.any,

  // resaga value
  nodeId: PropTypes.number,
};

TemplateConfirmedParticipant.defaultProps = {
  variant: null,
  children: null,

  nodeId: null,
};

export default compose(
  INVITATION_STORE_HOC.selectUserNodeIds({
    userIds: 'userId',
    nodeIds: 'participantIds',
    roles: [PARTICIPANT_LINKEE],
  }),
  resaga(CONFIG_1),
  resaga(CONFIG_2),
)(TemplateConfirmedParticipant);
