import resaga from 'resaga';
import { PureComponent } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { TOUR_ROLE } from 'apis/components/Ability/roles';
import { PENDING } from 'appConstants';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import { CONFIG_0, CONFIG_1, CONFIG_2, CONFIG_3 } from './config';

export class InterestedPersons extends PureComponent {
  render = () => {
    if (this.props.move) {
      return this.props.children(this.props.unfilteredInterested);
    }
    return this.props.children(this.props.interestedPersonIds);
  };
}

InterestedPersons.propTypes = {
  // parent
  children: PropTypes.func,
  move: PropTypes.bool,

  // resaga
  interestedPersonIds: PropTypes.array,
  unfilteredInterested: PropTypes.array,
};

InterestedPersons.defaultProps = {
  interestedPersonIds: [],
  move: false,
};

export default compose(
  INVITATION_STORE_HOC.selectShareTokens({
    nodeIds: 'templateId',
    roles: [TOUR_ROLE.TOUR_INTERESTED],
    statuses: [PENDING],
  }),
  resaga(CONFIG_0()),
  resaga(CONFIG_1()),
  resaga(CONFIG_2()),
  resaga(CONFIG_3()),
)(InterestedPersons);
