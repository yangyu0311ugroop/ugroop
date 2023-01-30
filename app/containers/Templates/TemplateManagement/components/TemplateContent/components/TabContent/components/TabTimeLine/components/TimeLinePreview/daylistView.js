/**
 * Created by Yang on 6/7/17.
 */
import PropTypes from 'prop-types';
import React from 'react';
import resaga from 'resaga';
import { compose } from 'redux';
import List from '@material-ui/core/List';
import DayCell from './dayCell';
import { CONFIG } from './defines/daylistViewConfig';

export const DayListView = props => {
  const children = props.dayIds.map((id, index) => (
    <DayCell key={id} dayId={id} row={index} />
  ));
  return <List className={props.className}>{children}</List>;
};

DayListView.propTypes = {
  dayIds: PropTypes.array,
  className: PropTypes.string,
};

DayListView.defaultProps = {
  dayIds: [],
  className: {},
};

export default compose(resaga(CONFIG))(DayListView);
