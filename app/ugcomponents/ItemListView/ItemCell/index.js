/**
 * Created by Yang on 13/7/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from '@material-ui/core';
const UGItemCell = ({
  style,
  delegate,
  row,
  isButton = true,
  Title,
  SubTitle,
}) => {
  const handleClick = () => {
    delegate.didSelectRowAt(row);
  };

  let secondaryButtonsContent = null;
  if (typeof delegate.secondaryButtons === 'function') {
    secondaryButtonsContent = delegate.secondaryButtons(row);
  }
  const cell = (
    <ListItem
      className={style ? style.item : ''}
      button={isButton}
      onClick={handleClick}
    >
      <ListItemText primary={Title} secondary={SubTitle} />
      {secondaryButtonsContent}
    </ListItem>
  );
  return cell;
};

UGItemCell.propTypes = {
  style: PropTypes.object,
  delegate: PropTypes.object.isRequired,
  row: PropTypes.number.isRequired,
};

export default UGItemCell;
