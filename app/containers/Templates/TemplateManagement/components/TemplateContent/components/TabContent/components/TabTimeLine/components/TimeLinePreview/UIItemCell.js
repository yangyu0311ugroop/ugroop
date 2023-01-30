/**
 * Created by edil on 10/30/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import H5 from 'components/H5';
import H6 from 'components/H6';
import classnames from 'classnames';
import { ListItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import styleSheet from './style';

export const UGItemCell = props => {
  const {
    classes,
    row,
    isButton = true,
    Title,
    SubTitle,
    active,
    didSelectRowAt,
    showTooltip,
    hasBadge,
  } = props;
  const handleClick = () => {
    didSelectRowAt(row);
  };
  let indexClass = classes.index;
  let titleClass = classes.title;
  let subtitleClass = classes.subtitle;
  let listItemClass = classnames(classes.list, row === 0 && classes.firstItem);

  if (active) {
    indexClass = classnames(classes.indexActive, indexClass);
    titleClass = classnames(classes.titleActive, titleClass);
    subtitleClass = classnames(classes.subtitleActive, subtitleClass);
    listItemClass = classnames(classes.listItemActive, listItemClass);
  }
  const title = showTooltip ? SubTitle : '';
  return (
    <div className={classes.tooltipRoot}>
      <Tooltip title={title} placement="top">
        <ListItem
          disableRipple
          button={isButton}
          onClick={handleClick}
          className={listItemClass}
        >
          <div className={classes.items}>
            <div className={indexClass}>
              {row + 1}
              <div className={classnames(hasBadge && classes.badge)} />
            </div>
            <div className={classes.headers}>
              <H6 className={titleClass}>{Title}</H6>
              <H5 className={subtitleClass}>{SubTitle}</H5>
            </div>
          </div>
        </ListItem>
      </Tooltip>
    </div>
  );
};

UGItemCell.propTypes = {
  active: PropTypes.bool,
  isButton: PropTypes.bool,
  Title: PropTypes.node,
  SubTitle: PropTypes.node,
  classes: PropTypes.object.isRequired,
  didSelectRowAt: PropTypes.func.isRequired,
  row: PropTypes.number.isRequired,
  showTooltip: PropTypes.bool,
  hasBadge: PropTypes.bool,
};

UGItemCell.defaultProps = {
  showTooltip: true,
  hasBadge: false,
};

export default withStyles(styleSheet, { name: 'UGItemCell' })(UGItemCell);
