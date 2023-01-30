import { DEFAULT } from 'appConstants';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import RatingForm from './components/RatingForm';
import { CONFIG } from './config';
import styles from './styles';

export class Rating extends PureComponent {
  renderForm = () => <RatingForm {...this.props} />;

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderForm,
    });
  };
}

Rating.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,

  // resaga props
};

Rating.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Rating' }),
  resaga(CONFIG),
)(Rating);
