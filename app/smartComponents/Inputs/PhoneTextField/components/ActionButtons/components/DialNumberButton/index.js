import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Margin from 'viewComponents/Margin';
import Button from 'viewComponents/Button';
import { VARIANTS } from 'variantsConstants';

import { CONFIG } from './config';
import styles from './styles';

export class DialNumberButton extends PureComponent {
  handler = ev => {
    ev.stopPropagation();
  };

  handleCall = ev => {
    this.handler(ev);

    const { value } = this.props;
    window.open(`tel:${value}`);
  };

  render = () => {
    const { variant, color, size, title } = this.props;

    return (
      <Margin left="xs">
        <Button
          title={title}
          onClick={this.handleCall}
          dense
          size={size}
          icon="telephone"
          iconButton
          variant={variant}
          color={color}
        />
      </Margin>
    );
  };
}

DialNumberButton.propTypes = {
  // hoc props

  // parent props
  value: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  title: PropTypes.string,
};

DialNumberButton.defaultProps = {
  value: '',
  title: 'Call',
  variant: VARIANTS.OUTLINE,
  size: 'extraSmall',
  color: 'gray',
};

export default compose(
  withStyles(
    styles,
    'app/smartComponents/Inputs/PhoneTextField/components/ActionButtons/components/DialNumberButton',
  ),
  resaga(CONFIG),
)(DialNumberButton);
