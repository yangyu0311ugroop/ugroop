import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import resaga from 'resaga';
import { DEFAULT } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { Span } from 'viewComponents/Typography';
import { Text } from 'smartComponents/Inputs';
import inputs from './inputs';
import { CONFIG } from './config';
import m from './messages';

export class MedicalAction extends React.PureComponent {
  renderTextOnly = () =>
    this.props.value || (
      <Span dense subtitle>
        <M {...m.textOnlyPlaceholder} />
      </Span>
    );

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

MedicalAction.propTypes = {
  // parent
  variant: PropTypes.string,

  // resaga value
  value: PropTypes.string,
};

MedicalAction.defaultProps = {
  variant: '',

  value: '',
};

export default resaga(CONFIG)(MedicalAction);
