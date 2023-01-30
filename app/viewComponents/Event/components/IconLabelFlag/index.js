/**
 * Created by stephenkarpinskyj on 21/10/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import classNames from 'classnames';
import GridItem from 'components/GridItem';
import { withStyles } from 'components/material-ui';
import P from 'viewComponents/Typography';
import style from './style';

export class IconLabelFlag extends React.PureComponent {
  render = () => {
    const { classes, children } = this.props;
    return (
      !!children && (
        <div className={classes.root}>
          <GridItem className={classes.item}>
            <P className={classNames(classes.p)} dense>
              {children}
            </P>
          </GridItem>
        </div>
      )
    );
  };
}

IconLabelFlag.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  children: PropTypes.any,
};

IconLabelFlag.defaultProps = {
  children: null,
};

export default compose(
  withStyles(style, { name: 'viewComponents/Event/IconLabelFlag' }),
)(IconLabelFlag);
