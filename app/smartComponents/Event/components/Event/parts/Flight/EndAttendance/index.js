/**
 * Created by stephenkarpinskyj on 9/11/18.
 */

import React from 'react';
import Attendance from 'smartComponents/Event/components/Attendance';
import inputs from './inputs';

export class EndAttendance extends React.PureComponent {
  render = () => <Attendance inputs={inputs.endAttendance} {...this.props} />;
}

EndAttendance.propTypes = {};

EndAttendance.defaultProps = {};

export default EndAttendance;
