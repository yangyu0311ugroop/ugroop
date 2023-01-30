import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import styles from './styles';

export class Empty extends PureComponent {
  render = () => {
    const { classes } = this.props;

    return (
      <GridContainer
        direction="column"
        alignItems="center"
        className={classes.root}
        spacing={2}
      >
        <GridItem>
          <div className={classes.title}>No Sections To Be Displayed</div>
        </GridItem>
      </GridContainer>
    );
  };
}

Empty.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles, { name: 'Empty' }))(Empty);
