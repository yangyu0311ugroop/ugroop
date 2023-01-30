import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';

import CopyNumberButton from './components/CopyNumberButton';
import DialNumberButton from './components/DialNumberButton';
import { CONFIG } from './config';
import styles from './styles';

export class ActionButtons extends PureComponent {
  render = () => {
    const {
      classes,
      value,
      showCopyButton,
      copyButtonTitle,
      showDialButton,
    } = this.props;

    return (
      <div className={classes.root}>
        {showCopyButton && (
          <CopyNumberButton
            value={value}
            title={copyButtonTitle}
            variant={VARIANTS.OUTLINE}
            size="extraSmall"
            color="gray"
          />
        )}
        {showDialButton && (
          <DialNumberButton
            value={value}
            variant={VARIANTS.OUTLINE}
            size="extraSmall"
            color="gray"
          />
        )}
      </div>
    );
  };
}

ActionButtons.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  value: PropTypes.string,
  showCopyButton: PropTypes.bool,
  copyButtonTitle: PropTypes.any,
  showDialButton: PropTypes.bool,

  // resaga props
};

ActionButtons.defaultProps = {
  value: '',
  showCopyButton: true,
  showDialButton: true,
};

export default compose(
  withStyles(styles, {
    name: 'app/smartComponents/Inputs/PhoneTextField/components/ActionButtons',
  }),
  resaga(CONFIG),
)(ActionButtons);
