import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { VARIANTS } from 'variantsConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';

import Button from 'viewComponents/Button';
import UGDialog from 'ugcomponents/Dialog';
import Dialog from 'components/Dialog';
import DialogContent from 'components/Dialog/UGDialogContent';
import DialogFooter from 'components/Dialog/UGDialogAction';
import Icon from 'ugcomponents/Icon';
import Form from 'ugcomponents/Form/index';
import stylesheet from './styles';

export class DialogFlow extends PureComponent {
  render = () => {
    const {
      children,
      isOpen,
      isFullWidth,
      classes,
      actionBtnSize,
      isDiscardBtnHidden,
      isXBtnHidden,
      onClose,
      onSave,
      saveText,
      isSaveDisabled,
      isBeingDiscarded,
      onDiscardClick,
      onCloseClick,
      onCancelClick,
      dialogClassName,
      onValidSubmit,
      onValid,
      onInvalid,
    } = this.props;

    const discardBtn = isDiscardBtnHidden ? (
      ''
    ) : (
      <Button
        onClick={onDiscardClick}
        variant={VARIANTS.OUTLINE}
        color="gray"
        size={actionBtnSize}
        dense
      >
        Discard
      </Button>
    );
    const xBtn = isXBtnHidden ? (
      ''
    ) : (
      <Button
        color="black"
        icon="cross"
        iconButton
        variant={VARIANTS.BORDERLESS}
        onClick={onClose}
        className={classes.xBtn}
        disableRipple
      >
        <Icon icon="cross" />
      </Button>
    );
    const customClassnames = {
      headline: classes.headlineText,
      action: classes.actionButtons,
    };
    return (
      <div className={classes.container}>
        <Dialog
          disableRestoreFocus
          className={dialogClassName}
          open={isOpen}
          fullWidth={isFullWidth}
        >
          <Form
            onValidSubmit={onValidSubmit}
            onValid={onValid}
            onInvalid={onInvalid}
          >
            <DialogContent noPaddingTop noPaddingBottom>
              {xBtn}
            </DialogContent>
            <DialogContent>{children}</DialogContent>
            <DialogFooter>
              <GridContainer justify="flex-end">
                <GridItem>{discardBtn}</GridItem>
                <GridItem>
                  <Button
                    disabled={isSaveDisabled}
                    type="submit"
                    onClick={onSave}
                    color="primary"
                    size={actionBtnSize}
                    dense
                  >
                    {saveText}
                  </Button>
                </GridItem>
              </GridContainer>
            </DialogFooter>
          </Form>
        </Dialog>
        <UGDialog
          open={isBeingDiscarded}
          template="delete"
          dialogTitle="Discard Changes"
          cancelButton="I'm not done yet"
          confirmButton="Discard Changes and Proceed"
          headlineIcon="lnr-bubble-alert"
          headlineTitle="You are leaving without saving"
          headlineText="You have entered some information that is not going to be saved. Are you sure you want to discard this input?"
          confirmFunc={onCloseClick}
          cancelFunc={onCancelClick}
          customClassnames={customClassnames}
        />
      </div>
    );
  };
}

DialogFlow.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isFullWidth: PropTypes.bool.isRequired,
  actionBtnSize: PropTypes.string.isRequired,
  isDiscardBtnHidden: PropTypes.bool.isRequired,
  isXBtnHidden: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  onDiscardClick: PropTypes.func.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  isSaveDisabled: PropTypes.bool.isRequired,
  isBeingDiscarded: PropTypes.bool.isRequired,
  dialogClassName: PropTypes.string.isRequired,
  saveText: PropTypes.node,
  onValidSubmit: PropTypes.func,
  onValid: PropTypes.func,
  onInvalid: PropTypes.func,
};
DialogFlow.defaultProps = {
  saveText: <span>Save & Continue</span>,
  onValidSubmit: () => {},
  onValid: () => {},
  onInvalid: () => {},
  onSave: () => {},
};

export default withStyles(stylesheet, { name: 'DialogFlow' })(DialogFlow);
