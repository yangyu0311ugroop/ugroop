import PropTypes from 'prop-types';
import { Component } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { ability } from 'apis/components/Ability/ability';
import { CONFIG } from './config';

export class AbilityResolver extends Component {
  componentDidMount = () => {
    this.updateAbility(this.props);
  };

  componentWillReceiveProps = nextProps => {
    if (
      this.props.nodeId !== nextProps.nodeId ||
      nextProps.executeAbilityUpdate
    ) {
      this.updateAbility(nextProps);
    }
    if (this.props.orgId !== nextProps.orgId) {
      this.updateAbility(nextProps);
    }
  };

  updateAbility = ({ organisation = [], tour = [] }) => {
    const { onSuccess } = this.props;

    ability.update([...organisation, ...tour]);
    this.props.resaga.setValue({
      abilityUpdated: Date.now(),
      executeAbilityUpdate: false,
    });

    if (onSuccess) onSuccess({ organisation, tour });
  };

  render = () => null;
}

AbilityResolver.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  nodeId: PropTypes.number,
  orgId: PropTypes.any,

  // Jay: eslint doesn't check in nextProps so I have to comment them out in here
  // organisation: PropTypes.array,
  // tour: PropTypes.array,

  onSuccess: PropTypes.func,

  // resaga props
  executeAbilityUpdate: PropTypes.bool,
};

AbilityResolver.defaultProps = {
  nodeId: 0,
  orgId: 0,
  executeAbilityUpdate: false,
};

export default compose(resaga(CONFIG))(AbilityResolver);
