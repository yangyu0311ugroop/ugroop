import { withStyles } from '@material-ui/core/styles';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import styles from './styles';

export class ShareNode extends PureComponent {
  render = () => {
    const { classes } = this.props;

    return (
      <GridContainer className={classes.root} alignItems="center">
        <GridItem>Share Node - to be implemented</GridItem>
        GridItem
      </GridContainer>
    );
  };
}

ShareNode.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
};

ShareNode.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'ShareNode' }),
  resaga(),
)(ShareNode);
