import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { ForEachEventVariant } from 'smartComponents/Event/logics';

import ShowRatingList from 'smartComponents/Node/components/Ratings/components/ShowRatingList';

import { CONFIG, GET_EVENT_RATINGS, GET_EVENT_USER_RATINGS } from './config';
import styles from './styles';

export class Ratings extends PureComponent {
  renderDefault = () => {
    const {
      id,
      templateId,
      userRatingIds,
      simplify,
      badge,
      component,
    } = this.props;

    return (
      <ShowRatingList
        id={id}
        userRatingIds={userRatingIds}
        templateId={templateId}
        simplify={simplify}
        badge={badge}
        component={component}
      />
    );
  };

  render = () => {
    const { variant } = this.props;

    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderDefault}
      />
    );
  };
}

Ratings.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,
  id: PropTypes.number,
  templateId: PropTypes.number,
  simplify: PropTypes.bool,
  badge: PropTypes.bool,
  component: PropTypes.any,

  // resaga props
  userRatingIds: PropTypes.array,
};

Ratings.defaultProps = {
  userRatingIds: [],
  component: 'span',
};

export default compose(
  withStyles(styles, { name: 'Ratings' }),
  resaga(CONFIG),
  resaga(GET_EVENT_RATINGS),
  resaga(GET_EVENT_USER_RATINGS),
)(Ratings);
