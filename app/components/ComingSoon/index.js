import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Icon from 'ugcomponents/Icon/index';
import { withStyles } from 'components/material-ui/index';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import styles from './styles';

export class ComingSoon extends PureComponent {
  render = () => {
    const { classes } = this.props;

    return (
      <GridContainer direction="column" className={classes.root}>
        <GridItem>
          <Icon icon="lnr-construction" size="xl" />
        </GridItem>
        <GridItem>Coming Soon</GridItem>
      </GridContainer>
    );
  };
}

ComingSoon.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props

  // resaga props
};

ComingSoon.defaultProps = {};

export default compose(withStyles(styles, { name: 'ComingSoon' }))(ComingSoon);
