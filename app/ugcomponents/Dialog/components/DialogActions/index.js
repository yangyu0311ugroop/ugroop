import GridItem from 'components/GridItem';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FormattedMessage as M } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import LogoutLink from 'smartComponents/Authentication/components/LogoutLink';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Button from 'viewComponents/Button';
import GridContainer from 'components/GridContainer/index';
import styles from './styles';
import m from './messages';

export class DialogActions extends PureComponent {
  render() {
    let CancelButton;
    let confirmDefault = <M {...m.confirmDefault} />;
    const {
      classes,
      button,
      confirmButton,
      cancelButton,
      confirmFunc,
      cancelFunc,
      disabled,
      loading,
      template,
      type,
      confirmButtonNode,
      disableConfirmButton,
      actionContainerClassName,
      cancelButtonClassName,
      confirmButtonClassName,
      logoutOnConfirm,
      simplifyDialog,
      confirmation,
    } = this.props;

    // Changes the default confirmButton text according to template
    if (template === 'delete') {
      confirmDefault = (
        <M
          {...m.confirmDelete}
          values={{ type: type === 'template' ? 'Tour' : type }}
        />
      );
    }
    // If confirmButton text is set by user, override defaults
    if (confirmButton !== m.confirmDefault.defaultMessage) {
      confirmDefault = confirmButton;
    }

    if (button !== 1) {
      CancelButton = (
        <Button
          noMargin
          size={LOGIC_HELPERS.ifElse(simplifyDialog, 'xs')}
          color="gray"
          disabled={disabled}
          onClick={cancelFunc}
          className={cancelButtonClassName}
        >
          {cancelButton}
        </Button>
      );
    }

    const confirmColor = LOGIC_HELPERS.ifElse(
      [template === 'confirm', template === 'add'],
      'primary',
      'gray',
      true,
    );

    const ConfirmButton = confirmButtonNode || (
      <Button
        block
        noMargin
        size={LOGIC_HELPERS.ifElse(simplifyDialog, 'xs')}
        color={LOGIC_HELPERS.ifElse(
          template === 'delete',
          'alert',
          confirmColor,
        )}
        type="submit"
        loading={loading}
        disabled={disabled || disableConfirmButton}
        onClick={confirmFunc}
        className={classnames(classes.confirmButton, confirmButtonClassName)}
      >
        {confirmButton !== confirmDefault ? confirmDefault : confirmButton}
      </Button>
    );

    return (
      <div className={classnames(classes.root, actionContainerClassName)}>
        <GridContainer alignItems="center" justify="flex-end">
          {!confirmation && <GridItem>{CancelButton}</GridItem>}
          <GridItem className={classnames(!simplifyDialog && classes.grow)}>
            {!logoutOnConfirm ? (
              ConfirmButton
            ) : (
              <LogoutLink className={classes.grow}>{ConfirmButton}</LogoutLink>
            )}
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

DialogActions.propTypes = {
  type: PropTypes.string,
  button: PropTypes.number,
  disabled: PropTypes.bool,
  template: PropTypes.string,
  cancelFunc: PropTypes.func,
  confirmFunc: PropTypes.func,
  cancelButton: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  confirmButton: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  confirmButtonNode: PropTypes.node,
  classes: PropTypes.object.isRequired,
  disableConfirmButton: PropTypes.bool,
  loading: PropTypes.bool,
  actionContainerClassName: PropTypes.string,
  confirmButtonClassName: PropTypes.string,
  cancelButtonClassName: PropTypes.string,
  logoutOnConfirm: PropTypes.bool,
  simplifyDialog: PropTypes.bool,
  confirmation: PropTypes.bool,
};

export const preventDefault = e => e.preventDefault();
DialogActions.defaultProps = {
  type: '',
  cancelFunc: preventDefault,
  confirmFunc: preventDefault,
  disableConfirmButton: false,
  actionContainerClassName: '',
  confirmButtonClassName: '',
  cancelButtonClassName: '',
  logoutOnConfirm: false,
};

export default withStyles(styles, { name: 'DialogActions' })(DialogActions);
