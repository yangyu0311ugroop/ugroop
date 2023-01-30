import React from 'react';
import PropTypes from 'prop-types';
import head from 'lodash/head';
import resaga from 'resaga';
import { DEFAULT } from 'appConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import StudentDetail from 'smartComponents/Person/components/StudentDetail';
import { CONFIG } from './config';

export class StudentDetails extends React.PureComponent {
  getValue = () => {
    const { value } = this.props;
    return head(value);
  };

  show = () => this.props.show;

  renderStudentDetail = () => {
    const { id, variant, readOnly } = this.props;
    const value = this.getValue();
    return (
      <StudentDetail
        id={value}
        personId={id}
        variant={variant}
        readOnly={readOnly}
      />
    );
  };

  render = () => {
    const { variant } = this.props;

    return (
      this.show() &&
      LOGIC_HELPERS.switchCase(variant, {
        [DEFAULT]: this.renderStudentDetail,
      })
    );
  };
}

StudentDetails.propTypes = {
  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  show: PropTypes.bool,
  readOnly: PropTypes.bool,
  // resaga value
  value: PropTypes.array,
};

StudentDetails.defaultProps = {
  id: null,
  variant: null,
  show: false,

  value: [],
};

export default resaga(CONFIG)(StudentDetails);
