/**
 * Created by stephenkarpinskyj on 9/11/18.
 */

import React from 'react';
import Attendance from 'smartComponents/Event/components/Attendance';
import inputs from './inputs';

export class StartAttendance extends React.PureComponent {
  render = () => <Attendance inputs={inputs.startAttendance} {...this.props} />;
}

StartAttendance.propTypes = {};

StartAttendance.defaultProps = {};

export default StartAttendance;
