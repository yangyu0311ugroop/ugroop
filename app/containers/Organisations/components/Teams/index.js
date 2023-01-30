import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Container from 'components/Container';
import ComingSoon from 'components/ComingSoon';
import { CONFIG } from './config';
import styles from './styles';

export class Teams extends PureComponent {
  render = () => {
    const { classes } = this.props;

    return (
      <Container>
        <ComingSoon className={classes.root} />
      </Container>
    );
  };
}

Teams.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props

  // resaga props
};

Teams.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Teams' }),
  resaga(CONFIG),
)(Teams);
