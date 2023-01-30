import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { DEFAULT } from 'appConstants';
import { PERSON_TYPES } from 'smartComponents/Node/parts/PersonType/constants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import PersonStudentDetails from 'smartComponents/Person/parts/StudentDetails';
import { CONFIG_1, CONFIG_2 } from './config';

export class StudentDetails extends React.PureComponent {
  getValue = () => {
    const { nodeValues, userValues } = this.props;
    return [...userValues, ...nodeValues];
  };

  getProps = () => {
    const { personId, personType } = this.props;
    return {
      id: personId,
      value: this.getValue(),
      show: personType === PERSON_TYPES.student,
    };
  };

  renderEditable = () => {
    const { readOnly } = this.props;
    return <PersonStudentDetails readOnly={readOnly} {...this.getProps()} />;
  };

  renderDefault = variant => () => (
    <PersonStudentDetails variant={variant} {...this.getProps()} />
  );

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.EDITABLE]: this.renderEditable,
      [DEFAULT]: this.renderDefault(variant),
    });
  };
}

StudentDetails.propTypes = {
  // parent
  id: PropTypes.number,
  personId: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,

  // resaga value
  nodeValues: PropTypes.array,
  userValues: PropTypes.array,
  personType: PropTypes.string,
};

StudentDetails.defaultProps = {
  id: null,
  personId: null,
  variant: null,
  readOnly: false,

  nodeValues: [],
  userValues: [],
  personType: null,
};

export default compose(
  resaga(CONFIG_1),
  resaga(CONFIG_2),
)(StudentDetails);
