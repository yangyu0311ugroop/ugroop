import { EMPTY_RTE } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Icon from 'ugcomponents/Icon';
import { CONFIG } from './config';
import styles from './styles';

export class Control extends PureComponent {
  isEmpty = value => !value || value === EMPTY_RTE;

  control = () => {
    const { classes, control: rte } = this.props;

    if (this.isEmpty(rte)) {
      return (
        <GridItem className={classnames(classes.control, classes.cross)}>
          <Icon size="xsmall" icon="lnr-cross2" bold color="danger" />
        </GridItem>
      );
    }

    return (
      <GridItem className={classnames(classes.control, classes.check)}>
        <Icon size="xsmall" icon="lnr-check" bold color="success" />
      </GridItem>
    );
  };

  render = () => {
    const { classes } = this.props;

    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem className={classes.heading}>Control</GridItem>
        {this.control()}
      </GridContainer>
    );
  };
}

Control.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props

  // resaga props
  control: PropTypes.number,
};

Control.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Control' }),
  resaga(CONFIG),
)(Control);
