import { ABILITY_API, FIND_MY_ABILITIES, FIND_MY_TOURS } from 'apis/constants';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';
import injectReducer from 'utils/injectReducer';

import { CONFIG } from './config';

export AbilityResolver from './components/AbilityResolver';

export class Ability extends Component {
  componentDidMount = () => {
    this.props.resaga.dispatch({}, FIND_MY_ABILITIES);
  };

  componentWillReceiveProps = nextProps =>
    this.props.resaga.analyse(nextProps, {
      [FIND_MY_ABILITIES]: { onSuccess: this.findAbilitiesSuccess },
      [FIND_MY_TOURS]: { onSuccess: this.props.resaga.setValue },
    });

  shouldComponentUpdate = () => false;

  findAbilitiesSuccess = (...params) => {
    const { onSuccess } = this.props;

    this.props.resaga.setValue(...params);

    if (onSuccess) onSuccess(...params);
  };

  render = () => false;
}

Ability.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  onSuccess: PropTypes.func,

  // resaga props
};

Ability.defaultProps = {};

export default compose(
  injectReducer({ key: ABILITY_API, reducer: reducer(ABILITY_API) }),
  resaga(CONFIG),
)(Ability);
