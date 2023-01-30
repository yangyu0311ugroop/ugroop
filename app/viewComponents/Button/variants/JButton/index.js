import classnames from 'classnames';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Button from 'viewComponents/Button/index';
import styles from './styles';

export class JButton extends PureComponent {
  render = () => {
    const {
      classes,
      className,
      bg,
      borderGray,
      padding,
      bold,
      textAlignLeft,
      ...rest
    } = this.props;

    return (
      <Button
        dense
        noPadding
        size="extraSmall"
        color="black"
        className={classnames(
          classes.root,
          LOGIC_HELPERS.ifElse(bg, classes[`${bg}Background`]),
          LOGIC_HELPERS.ifElse(padding, classes[`${padding}Padding`]),
          LOGIC_HELPERS.ifElse(bold, classes.bold),
          LOGIC_HELPERS.ifElse(textAlignLeft, classes.textAlignLeft),
          LOGIC_HELPERS.ifElse(borderGray, classes.borderGray),
          className,
        )}
        {...rest}
      />
    );
  };
}

JButton.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  className: PropTypes.string,
  bg: PropTypes.oneOf(['gray', 'green', 'blue', 'dark', 'white']),
  padding: PropTypes.oneOf(['md', 'lg']),
  bold: PropTypes.bool,
  borderGray: PropTypes.bool,
  textAlignLeft: PropTypes.bool,

  // resaga props
};

JButton.defaultProps = {
  padding: 'md',
};

export default compose(withStyles(styles, { name: 'JButton' }))(JButton);
