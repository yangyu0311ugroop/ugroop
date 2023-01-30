import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Hr from 'components/Hr';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import Formsy from 'formsy-react';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import Icon from 'ugcomponents/Icon';
import styles from 'ugcomponents/JDialog/styles';
import PageLogo from 'ugcomponents/NaviBar/AdminNavBar/PageLogo';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Button from 'viewComponents/Button';

export class JDialog extends PureComponent {
  componentWillMount = () => {
    const { classes, sm, className, onValidSubmit, popper } = this.props;

    this.PaperProps = {
      classes: {
        root: classnames(
          LOGIC_HELPERS.ifElse(popper, classes.paperRoot),
          LOGIC_HELPERS.ifElse(sm, classes.sm),
          className,
        ),
      },
      component: LOGIC_HELPERS.ifElse(onValidSubmit, this.renderForm),
    };
  };

  ownProps = () => ({
    PaperProps: this.PaperProps,
    ...omit(this.props, [
      'classes',
      'onValidSubmit',
      'children',
      'header',
      'submitButton',
      'className',
      'onButtonClose',
      'disabled',
      'overrideClasses',
      'onInvalidSubmit',
      'smDown',
      'notesTextWrap',
      'fullWidthNotes',
      'loading',
      'popper',
      'dividers',
    ]),
  });

  renderForm = props => {
    const { onValidSubmit, onInvalidSubmit } = this.props;

    return (
      <Formsy
        onValidSubmit={onValidSubmit}
        onInvalidSubmit={onInvalidSubmit}
        {...props}
      />
    );
  };

  renderNotes = () => {
    const { notes, notesTextWrap, fullWidthNotes, classes } = this.props;

    return (
      notes && (
        <GridItem className={fullWidthNotes && classes.fullWidthNotes}>
          <JText nowrap={notesTextWrap} gray italic>
            {notes}
          </JText>
        </GridItem>
      )
    );
  };

  renderActions = () => {
    const {
      classes,
      submitButton,
      disabled,
      hideSubmitButton,
      loading,
      customAction,
      actionDivider,
    } = this.props;

    const action = !customAction ? (
      <GridContainer direction="column" alignItems="center">
        {this.renderNotes()}
        <GridItem>
          <Button
            dialog
            color="primary"
            type="submit"
            disabled={disabled}
            loading={loading}
            data-testid="jdialog-submit"
          >
            {submitButton}
          </Button>
        </GridItem>
      </GridContainer>
    ) : (
      customAction
    );

    return (
      !hideSubmitButton && (
        <React.Fragment>
          {actionDivider && <Hr noMarginTop />}
          <DialogActions classes={{ root: classes.actions }}>
            {action}
          </DialogActions>
        </React.Fragment>
      )
    );
  };

  render = () => {
    const {
      classes,
      children,
      header,
      onButtonClose,
      onClose,
      dividers,
      fullScreen,
      overrideClasses,
      contentClassName,
      titleClassName,
      actions,
      smDown,
      noLogo,
      headerNoWrap,
      headerContainerAlign,
    } = this.props;

    return (
      <Dialog
        fullScreen={fullScreen}
        classes={overrideClasses}
        {...this.ownProps()}
      >
        {header && (
          <DialogTitle
            disableTypography
            classes={{
              root: classnames(
                classes.title,
                LOGIC_HELPERS.ifElse(!header, classes.denseTitle),
                titleClassName,
              ),
            }}
          >
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <GridContainer
                  alignItems={headerContainerAlign}
                  justify={LOGIC_HELPERS.ifElse(!noLogo, 'space-between')}
                  noWrap={headerNoWrap}
                >
                  {!noLogo && (
                    <GridItem>
                      <PageLogo xs />
                    </GridItem>
                  )}
                  <GridItem xs={noLogo}>{header}</GridItem>
                  <GridItem>
                    <Button
                      size="xs"
                      color="gray"
                      onClick={onButtonClose || onClose}
                      className={classes.closeDialogButton}
                      testId="JDialogCloseButton"
                    >
                      <Icon icon="lnr-cross2" size="normal" />
                    </Button>
                  </GridItem>
                </GridContainer>
              </GridItem>

              {actions && (
                <>
                  <Hr halfMarginBottom />
                  <GridItem>
                    {LOGIC_HELPERS.ifFunction(actions, [], actions)}
                  </GridItem>
                </>
              )}
            </GridContainer>
          </DialogTitle>
        )}

        <DialogContent
          classes={{
            root: classnames(
              LOGIC_HELPERS.ifElse(
                fullScreen,
                classes.contentFullScreen,
                classes.content,
              ),
              LOGIC_HELPERS.ifElse(smDown, classes.contentSm),
              contentClassName,
            ),
          }}
          dividers={dividers}
        >
          {children}
        </DialogContent>

        {this.renderActions()}
      </Dialog>
    );
  };
}

JDialog.propTypes = {
  // Please note, if you added a new props and its not intended to use in formsy, please make sure exclude in PaperProps
  // hoc props
  classes: PropTypes.object.isRequired,
  smDown: PropTypes.bool,

  // parent props
  header: PropTypes.node.isRequired,
  children: PropTypes.node,
  submitButton: PropTypes.node,
  notes: PropTypes.node,
  sm: PropTypes.bool,
  popper: PropTypes.bool,
  disabled: PropTypes.bool,
  noLogo: PropTypes.bool,
  fullScreen: PropTypes.bool,
  dividers: PropTypes.bool,
  hideSubmitButton: PropTypes.bool,
  overrideClasses: PropTypes.object,
  maxWidth: PropTypes.string,
  className: PropTypes.string,
  onValidSubmit: PropTypes.func,
  onButtonClose: PropTypes.func,
  onClose: PropTypes.func,
  onInvalidSubmit: PropTypes.func,
  loading: PropTypes.bool,
  contentClassName: PropTypes.string,
  titleClassName: PropTypes.string,
  actions: PropTypes.any,
  notesTextWrap: PropTypes.bool,
  headerNoWrap: PropTypes.bool,
  fullWidthNotes: PropTypes.bool,
  headerContainerAlign: PropTypes.string,
  customAction: PropTypes.any,
  actionDivider: PropTypes.bool,
  // resaga props
};

JDialog.defaultProps = {
  submitButton: 'Save',
  popper: false,
  onInvalidSubmit: () => '',
  loading: false,
  notesTextWrap: true,
  headerContainerAlign: 'cecnter',
};

export default compose(
  withStyles(styles, { name: 'JDialog' }),
  withSMDown,
)(JDialog);
