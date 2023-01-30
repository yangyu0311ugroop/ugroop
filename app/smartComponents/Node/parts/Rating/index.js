import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { Rating as RatingField } from 'smartComponents/Inputs';
import { VARIANTS } from 'variantsConstants';

import { NODE_RATING_INPUT } from './inputs';
import { CONFIG } from './config';
import styles from './styles';

export class Rating extends PureComponent {
  renderField = () => (
    <RatingField value={this.props.rating} {...NODE_RATING_INPUT.input} />
  );

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_FIELD]: this.renderField,
      [DEFAULT]: this.renderField,
    });
  };
}

Rating.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,

  // resaga props
  rating: PropTypes.number,
};

Rating.defaultProps = {
  rating: 0,
};

export default compose(
  withStyles(styles, { name: 'Rating' }),
  resaga(CONFIG),
)(Rating);
