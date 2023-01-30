import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { DEFAULT } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { Span } from 'viewComponents/Typography';
import { Text } from 'smartComponents/Inputs';
import inputs from './inputs';
import { CONFIG } from './config';

export class StudentDetailClass extends React.PureComponent {
  renderTextOnly = () => {
    const { value } = this.props;
    return (
      <Span dense transform="capitalize">
        {value}
      </Span>
    );
  };

  renderTextField = () => (
    <Text value={this.props.value} {...inputs.textField} />
  );

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_FIELD]: this.renderTextField,
      [DEFAULT]: this.renderTextOnly,
    });
  };
}

StudentDetailClass.propTypes = {
  // parent
  variant: PropTypes.string,

  // resaga value
  value: PropTypes.string,
};

StudentDetailClass.defaultProps = {
  variant: '',

  value: '',
};

export default resaga(CONFIG)(StudentDetailClass);
