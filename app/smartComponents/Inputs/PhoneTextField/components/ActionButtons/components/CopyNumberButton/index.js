import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import resaga from 'resaga';
import Margin from 'viewComponents/Margin';
import Button from 'viewComponents/Button';
import SnackbarHelper from 'ugcomponents/SnackBar/helpers';
import { VARIANTS } from 'variantsConstants';

import { CONFIG } from './config';
import styles from './styles';

export class CopyNumberButton extends PureComponent {
  handler = ev => {
    ev.stopPropagation();
  };

  handleCopy = () => {
    const { value } = this.props;
    SnackbarHelper.openInfoSnackbar(`Copied ${value}`, this.props.resaga);
  };

  render = () => {
    const { value, title, variant, color, size } = this.props;

    return (
      <Margin>
        <CopyToClipboard text={value} onCopy={this.handleCopy}>
          <Button
            title={title}
            onClick={this.handler}
            dense
            size={size}
            icon="copy"
            iconButton
            variant={variant}
            color={color}
          />
        </CopyToClipboard>
      </Margin>
    );
  };
}

CopyNumberButton.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  value: PropTypes.string,
  title: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
};

CopyNumberButton.defaultProps = {
  value: '',
  title: 'Copy',
  variant: VARIANTS.OUTLINE,
  size: 'extraSmall',
  color: 'gray',
};

export default compose(
  withStyles(
    styles,
    'app/smartComponents/Inputs/PhoneTextField/components/ActionButtons/components/CopyNumberButton',
  ),
  resaga(CONFIG),
)(CopyNumberButton);
