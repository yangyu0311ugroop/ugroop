/**
 * Created by stephenkarpinskyj on 9/11/18.
 */

import React from 'react';
import Attendance from 'smartComponents/Event/components/Attendance';
import inputs from './inputs';

export class DailyAttendance extends React.PureComponent {
  render = () => <Attendance inputs={inputs.dailyAttendance} {...this.props} />;
}

DailyAttendance.propTypes = {};

DailyAttendance.defaultProps = {};

export default DailyAttendance;
