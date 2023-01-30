import LinearProgress from '@material-ui/core/LinearProgress';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import P from 'viewComponents/Typography';
import { CONFIG } from './config';
import styles from './styles';

export class RateBar extends PureComponent {
  linearClasses = {
    root: this.props.classes.bar,
    barColorPrimary: this.props.classes.barPrimary,
  };

  render = () => {
    const { value, percentage } = this.props;

    return (
      <GridContainer alignItems="center">
        <GridItem>
          <P dense>{value}</P>
        </GridItem>
        <GridItem xs>
          <LinearProgress
            classes={this.linearClasses}
            variant="determinate"
            value={LOGIC_HELPERS.ifElse(
              Number.isNaN(percentage),
              0,
              percentage,
            )}
          />
        </GridItem>
      </GridContainer>
    );
  };
}

RateBar.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  value: PropTypes.number,
  percentage: PropTypes.number,

  // resaga props
};

RateBar.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'RateBar' }),
  resaga(CONFIG),
)(RateBar);
