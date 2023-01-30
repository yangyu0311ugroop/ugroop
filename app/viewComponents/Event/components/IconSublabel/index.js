/**
 * Created by stephenkarpinskyj on 21/10/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import GridItem from 'components/GridItem';
import { withStyles } from 'components/material-ui';
import P from 'viewComponents/Typography';
import style from './style';

export class IconSublabel extends React.PureComponent {
  render = () => {
    const { classes, children } = this.props;
    return (
      !!children && (
        <GridItem>
          <P dense className={classes.p}>
            {children}
          </P>
        </GridItem>
      )
    );
  };
}

IconSublabel.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  children: PropTypes.any,
};

IconSublabel.defaultProps = {
  children: null,
};

export default compose(
  withStyles(style, { name: 'viewComponents/Event/IconSublabel' }),
)(IconSublabel);
