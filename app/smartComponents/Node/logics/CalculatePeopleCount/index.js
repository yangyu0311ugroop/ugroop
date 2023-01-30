import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import { withFollowers } from 'smartComponents/Node/hoc/withFollowers';
import { withNodeRole } from 'smartComponents/Node/hoc/withNodeRole';
import { withParticipants } from 'smartComponents/Node/hoc/withParticipants';
import { CONFIG, CONFIG_2, CONFIG_0, CONFIG_3, GET_ROLES } from './config';

export class CalculatePeopleCount extends PureComponent {
  componentDidMount() {
    this.props.resaga.setValue({
      calculatedPeopleCount: this.props.mergedUserEmails.length,
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.mergedUserEmails.length !== this.props.mergedUserEmails.length
    ) {
      this.props.resaga.setValue({
        calculatedPeopleCount: this.props.mergedUserEmails.length,
      });
    }
  }

  render = () => null;
}

CalculatePeopleCount.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
  mergedUserEmails: PropTypes.array,
};

CalculatePeopleCount.defaultProps = {
  mergedUserEmails: [],
};

// TODO: Explore other way of selecting the needed data using redux
export default compose(
  resaga(CONFIG_0),
  withNodeRole,
  withFollowers,
  withParticipants,
  resaga(GET_ROLES),
  INVITATION_STORE_HOC.selectUserNodeIds({
    nodeIds: 'id',
  }),
  resaga(CONFIG),
  resaga(CONFIG_2),
  resaga(CONFIG_3),
)(CalculatePeopleCount);
