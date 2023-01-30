import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import classnames from 'classnames';
import { generateFontClass } from 'utils/style-utils';
import Text from 'ugcomponents/Inputs/ValidationTextField';
import styles from './styles';

export class InlineText extends PureComponent {
  componentWillMount = () => {
    const { classes, className, Typography, useTypography } = this.props;

    const inputClass = generateFontClass(Typography, classes);

    this.inputProps = {
      className: classnames(
        classes.input,
        className,
        useTypography && inputClass,
      ),
    };
    this.InputProps = { className: classes.text };
  };

  render = () => {
    const {
      classes,
      textClassName,
      className,
      TextComponent,
      Typography,
      useTypography,
      ...props
    } = this.props;

    return (
      <TextComponent
        margin="none"
        className={classnames(classes.text, textClassName)}
        inputProps={this.inputProps}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        InputProps={this.InputProps}
        {...props}
      />
    );
  };
}

InlineText.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  className: PropTypes.string,
  textClassName: PropTypes.string,
  TextComponent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),
  Typography: PropTypes.string,
  bold: PropTypes.bool,
  useTypography: PropTypes.bool,
  // resaga props
};

InlineText.defaultProps = {
  className: '',
  textClassName: '',
  Typography: 'P',
  TextComponent: Text,
  useTypography: true,
};

export default compose(withStyles(styles, { name: 'InlineText' }))(InlineText);
