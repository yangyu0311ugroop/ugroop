import { withStyles } from 'components/material-ui/index';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Node from 'smartComponents/Node';
import { CONFIG } from './config';
import styles from './styles';

export class TourLink extends PureComponent {
  render = () => {
    const { classes, id, ellipsisClassName } = this.props;

    return (
      <Node
        id={Number.parseInt(id, 10)}
        className={classes.content}
        ellipsisClassName={ellipsisClassName}
      />
    );
  };
}

TourLink.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  classes: PropTypes.object.isRequired,
  ellipsisClassName: PropTypes.string,
};

TourLink.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'FeaturedToursCardTourLink' }),
  resaga(CONFIG),
)(TourLink);
