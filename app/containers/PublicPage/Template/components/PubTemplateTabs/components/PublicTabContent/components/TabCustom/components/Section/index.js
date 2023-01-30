import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import resaga from 'resaga';
import Body from './components/Body';
import Header from './components/Header';
import { CONFIG } from './config';
import styles from './styles';

export class Section extends PureComponent {
  render = () => {
    const { id, classes, photo, exist } = this.props;

    if (!exist) return <span />;

    return (
      <GridContainer className={classes.root} spacing={0} alignItems="center">
        <GridItem className={classes.grow}>
          <GridContainer direction="column" spacing={0}>
            <GridItem className={classNames({ [classes.paddingRight]: photo })}>
              <Header id={id} />
            </GridItem>
            <Body id={id} />
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };
}

Section.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number.isRequired, // section id

  // resaga props
  exist: PropTypes.number,
  photo: PropTypes.any,
};

Section.defaultProps = {
  exist: 0,
};

export default compose(
  withStyles(styles, { name: 'Section' }),
  resaga(CONFIG),
)(Section);
