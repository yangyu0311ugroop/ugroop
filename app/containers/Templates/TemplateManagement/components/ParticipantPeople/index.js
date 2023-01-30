import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { CONFIG } from './config';

export class TemplateParticipantPeople extends React.PureComponent {
  componentWillMount = () => {
    const { participantIds } = this.props;
    if (participantIds.length) {
      this.fetchParticipants();
    }
  };

  componentDidUpdate = prevProps => {
    const { participantIds } = this.props;
    if (participantIds.length && !prevProps.participantIds.length) {
      this.fetchParticipants();
    }
  };

  fetchParticipants = () => {
    const { id, participantIds: ids } = this.props;
    TEMPLATE_API_HELPERS.getParticipants({ id, ids }, this.props);
  };

  render = () => null;
}

TemplateParticipantPeople.propTypes = {
  // parent
  id: PropTypes.number, // eslint-disable-line react/no-unused-prop-types

  // resaga value
  participantIds: PropTypes.array,
};

TemplateParticipantPeople.defaultProps = {
  participantIds: [],
};

export default resaga(CONFIG)(TemplateParticipantPeople);
