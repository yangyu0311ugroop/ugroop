import { DEFAULT } from 'appConstants';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import RatingItem from 'smartComponents/Node/components/Ratings/components/RatingItem';

import { CONFIG } from './config';

export class Rating extends PureComponent {
  renderItem = () => <RatingItem id={this.props.id} />;

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderItem,
    });
  };
}

Rating.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,
  id: PropTypes.number,

  // resaga props
};

Rating.defaultProps = {};

export default compose(resaga(CONFIG))(Rating);
