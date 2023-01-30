import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { DEFAULT } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { withStyles } from 'components/material-ui';
import { Span } from 'viewComponents/Typography';
import { Text } from 'smartComponents/Inputs';
import inputs from './inputs';
import style from './style';
import { CONFIG } from './config';

export class MedicalDescription extends React.PureComponent {
  renderTextOnly = () => {
    const { value } = this.props;
    return (
      <Span dense weight="bold" transform="capitalize">
        {value}
      </Span>
    );
  };

  renderTextField = () => {
    const { classes } = this.props;
    return (
      <Text
        className={classes.text}
        value={this.props.value}
        {...inputs.textField}
      />
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_FIELD]: this.renderTextField,
      [DEFAULT]: this.renderTextOnly,
    });
  };
}

MedicalDescription.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  variant: PropTypes.string,

  // resaga value
  value: PropTypes.string,
};

MedicalDescription.defaultProps = {
  variant: '',

  value: '',
};

export default compose(
  withStyles(style, { name: 'smartComponents/Person/Medical/Description' }),
  resaga(CONFIG),
)(MedicalDescription);
