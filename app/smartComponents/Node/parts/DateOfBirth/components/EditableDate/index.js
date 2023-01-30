import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { EditableDateForm } from 'smartComponents/Editables';
import inputs from '../../inputs';

export class DateOfBirthEditableDate extends React.PureComponent {
  handleSubmit = ({ model, onSuccess, onError }) => {
    const { personId } = this.props;
    PERSON_DETAIL_HELPER.updatePerson(
      {
        personId,
        ...model,
        onSuccess,
        onError,
      },
      this.props,
    );
  };

  render = () => {
    const { readOnly, name, value, renderValue } = this.props;
    return (
      <EditableDateForm
        name={name}
        value={value}
        readOnly={readOnly}
        onSubmit={this.handleSubmit}
        renderValue={renderValue}
        maxDate={MOMENT_HELPERS.getDateLastYear()}
        initialFocusedDate={MOMENT_HELPERS.getDateMiddleLastYear()}
        {...inputs.editable}
      />
    );
  };
}

DateOfBirthEditableDate.propTypes = {
  // parent
  personId: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  renderValue: PropTypes.func,
};

DateOfBirthEditableDate.defaultProps = {
  personId: null,
  name: null,
  value: null,
  readOnly: false,
};

export default resaga()(DateOfBirthEditableDate);
