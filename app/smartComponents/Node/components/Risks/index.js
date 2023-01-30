import { CARD } from 'appConstants';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import RiskCard from './components/RiskCard';

export class Risks extends PureComponent {
  renderCard = () => <RiskCard {...this.props} />;

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [CARD]: this.renderCard,
    });
  };
}

Risks.propTypes = {
  // hoc props
  // classes: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,

  // resaga props
};

Risks.defaultProps = {};

export default compose()(Risks);
// withStyles(styles, { name: 'Risks' }),
// resaga(CONFIG),
