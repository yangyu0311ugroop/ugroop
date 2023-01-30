import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { H5 } from 'viewComponents/Typography';
import classNames from 'classnames';
import style from './style';
import { LOGIC_HELPERS } from '../../../../utils/helpers/logic';

export const SectionHeader = ({
  classes,
  first,
  className,
  children,
  actions,
  noWrap,
}) => {
  const wrapperStyle = first ? classes.wrapperFirst : classes.wrapper;
  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      className={classNames(
        wrapperStyle,
        LOGIC_HELPERS.ifElse([noWrap], classes.noWrap),
      )}
    >
      <Grid item>
        <H5 className={classNames(classes.root, className)}>{children}</H5>
      </Grid>
      {actions && (
        <Grid item className={classes.actions}>
          {actions}
        </Grid>
      )}
    </Grid>
  );
};

SectionHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  first: PropTypes.bool,
  children: PropTypes.node,
  actions: PropTypes.node,
  noWrap: PropTypes.bool,
};

export default withStyles(style, { name: 'SectionHeader' })(SectionHeader);
