/**
 * Created by stephenkarpinskyj on 28/11/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import GridItem from 'components/GridItem';
import { withStyles } from 'components/material-ui';
import style from './style';

export class ListHeading extends React.PureComponent {
  render = () => {
    const { classes, children, link } = this.props;
    return (
      children && (
        <GridItem>
          <div
            className={classNames(
              classes.item,
              classes.header,
              link && classes.link,
            )}
          >
            {children}
          </div>
        </GridItem>
      )
    );
  };
}

ListHeading.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  children: PropTypes.any,
  link: PropTypes.bool,
};

ListHeading.defaultProps = {
  children: null,
  link: false,
};

export default withStyles(style, { name: 'viewComponents/People/ListHeading' })(
  ListHeading,
);
